import React, { useEffect, useRef, useState, ReactElement } from 'react';

/**
 * API ENDPOINTS:
 *
 * /api/fruits => { fruits: { apples?: { brand: 'Pirom Parom', quantity: 1337}, bananas?: { brand: "Chicken Eata'", quantity: 42} }}
 *
 */

export default function Fruits(): ReactElement {
  const [fruits, setFruits] = useState();

  useEffect(() => {
    const fetchFruits = async () => {
      const response = await fetch(`/api/fruits`);
      const json = await response.json();
      setFruits(json.fruits);
    };
    fetchFruits();
  });

  return Object.items(fruits).map(([typeOfFruit, brandAndQuantity]) => ( // Extra points for mentioning loading behavior, like a spinner or skeleton elements. 
    <Fruit key={typeOfFruit} type={typeOfFruit} {...brandAndQuantity} />
  ));
}

function Fruit({type, brand, quantity}: {type: 'apple' | 'banana', brand: string, quantity: number}): ReactElement {
  return (
    <div>
      We have {quantity} {type}s of the {brand} brand.
    </div>
  );
}