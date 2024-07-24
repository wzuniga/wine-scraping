import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  value: number;
}

interface LineChartProps {
  data: Record<string, DataPoint[]>;
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, width = 600, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f0f0f0')
      .style('margin-top', '50')
      .style('overflow', 'visible');

    const allDataPoints = Object.values(data).flat();
    const xScale = d3.scaleTime()
      .domain([
        d3.min(allDataPoints, d => d.date) as Date,
        d3.max(allDataPoints, d => d.date) as Date
      ])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(allDataPoints, d => d.value) as number])
      .range([height, 0]);

    const lineGenerator = d3.line<DataPoint>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveLinear);

    const xAxis = d3.axisBottom(xScale).ticks(allDataPoints.length + 5);
    const yAxis = d3.axisLeft(yScale).ticks(20);

    svg.selectAll('*').remove();
    const gX = svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height})`);

    const gY = svg.append('g')
      .call(yAxis);

    Object.entries(data).forEach(([key, lineData], index) => {
      svg.append('path')
        .datum(lineData)
        .attr('fill', 'none')
        .attr('stroke', d3.schemeCategory10[index])
        .attr('stroke-width', 1.5)
        .attr('d', lineGenerator);

      svg.selectAll(`.point-${key}`)
        .data(lineData)
        .enter()
        .append('circle')
        .attr('class', `point-${key}`)
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.value))
        .attr('r', 5)
        .attr('fill', d3.schemeCategory10[index])
        .on('mouseover', (event, d) => {
          setTooltipContent(`${key}\n\nFecha: ${d.date.toDateString()}\nPrecio: ${d.value}`);
          setTooltipPosition({ x: event.pageX, y: event.pageY });
        })
        .on('mouseout', () => {
          setTooltipContent(null);
          setTooltipPosition(null);
        });
    });

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 100])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', ({ transform }) => {
        const newXScale = transform.rescaleX(xScale);
        gX.call(xAxis.scale(newXScale));

        svg.selectAll('path')
          .attr('d', (d, i) => lineGenerator(Object.values(data)[i] as DataPoint[]));

        svg.selectAll('circle')
          .attr('cx', (d, i, nodes) => {
            //const key = nodes[i].getAttribute('class')?.split('-')[1];
            return newXScale((d as DataPoint).date);
          });
      });

    svg.call(zoom);
  }, [data, height, width]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      {tooltipContent && tooltipPosition && (
        <div
          style={{
            position: 'absolute',
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '5px',
            pointerEvents: 'none',
            whiteSpace: 'pre-wrap'
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default LineChart;