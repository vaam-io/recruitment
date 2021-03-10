import React, { useEffect, useRef, useState, ReactElement } from 'react';

/**
 * API ENDPOINTS: 
 * 
 * /api/fruits => { fruits: { apples?: { brand: 'Pirom Parom'}, bananas?: { brand: "Chicken Eata'"} }}
 * /api/bananas => { numberOfBananas: 42 }}
 * /api/apples => { numberOfApple: 1337 }}
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

  return Object.items(fruits).map(([typeOfFruit, { brand }]) => (
    <Fruit key={typeOfFruit} type={typeOfFruit} brand={brand} apiQuantityKey={`numberOf${typeOfFruit[0].toUpperCase()}${typeOfFruit.substr(1)}s`} />
  ));
}

function Fruit({type, brand, apiQuantityKey}: {type: 'apple' | 'banana', brand: string, apiQuantityKey: string}): ReactElement {
  const [quantity, setQuantity] = useState(0);
  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) {
      return;
    }
    isFetched.current = true;

    const doFetch = async () => {
      const response = await fetch(`/api/${type}`); // Extra points for mentioning that this fetch could be aborted with AbortController in a cleanup function.
      const json = await response.json();
      setQuantity(json[apiQuantityKey]); // Slightly less extra points for dealing with not setting this if the component has been unmounted since the fetch was initiated. 
    };
    doFetch();
  }, [type, apiQuantityKey]);

  return (
    <div>
      We have {quantity} {type}s of the {brand} brand.
    </div>
  );
}

// Extra points for mentioning loading behavior, like a spinner or skeleton elements. 