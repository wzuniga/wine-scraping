import React, { useState, useEffect } from "react";


const HomePage: React.FC = () => {
  const [skus, setSkus] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkus = async () => {
      try {
        const response = await fetch('http://localhost:3003/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setSkus(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkus();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Product SKUs</h1>
      <ul>
        {skus.map((sku, index) => (
          <li key={index}>
            <a href={`http://localhost:4000/price-variation/${sku}`}>{sku}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
