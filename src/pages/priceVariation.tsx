import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../components/lineChart/LineChart";
import { productInterface } from "@/database/mongo_interfaces/product";

interface DataPoint {
  date: Date;
  value: number;
}

const PriceVariationPage: React.FC = () => {
  const { sku } = useParams();
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [data, setData] = useState<Record<string, DataPoint[]>>({});
  const [result, setResult] = useState<productInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3003/products/product-information', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ skuId: sku })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const resultData: productInterface[] = await response.json();
        
        let formattedData: Record<string, DataPoint[]> = {cmrPrice: [], internetPrice: [], normalPrice: []}
        resultData.forEach(item => {
          item.prices.forEach(price => {
            //console.log(price.price)
            //console.log(price.price.map(p => parseFloat(p.replace(",", ""))))
            formattedData[price.type].push({
              date: new Date(item.createdAt),
              value: Math.min(...price.price.map(p => parseFloat(p.replace(",", ""))))
            })
          })
        })

        setData(formattedData);
        setResult(resultData);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchData();
  }, [sku]);

  return (
    <div>
      <h1>Evolución de precio</h1>
      {error && <p>Error: {error}</p>}
      <a href={`${result[0]?.url}`}>{result[0]?.displayName}</a>
      
      <LineChart data={data} width={windowWidth - 130} />
    </div>
  );
};

export default PriceVariationPage;
