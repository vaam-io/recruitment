import React, { useEffect, useState, ReactElement } from 'react';

/**
 * API ENDPOINTS: 
 * 
 * /api/fruits => { fruits: { apples?: { brand: 'Pirom Parom'}, bananas?: { brand: "Chicken Eata'"} }}
 * /api/bananas => { numberOfBananas: 42 }}
 * /api/apples => { numberOfApple: 1337 }}
 * 
 */

export default function Fruits(): ReactElement {
  const [bananas, setBananas] = useState();
  const [apples, setApples] = useState();

  useEffect(() => {
    const fetchFruits = async () => {
      const response = await fetch(`/api/fruits`); 
      const json = await response.json();
      setBananas(json.fruits.bananas);
      setApples(json.fruits.apples);
    };
    fetchFruits();
  });

  if (bananas) {
    return <Bananas brand={bananas.brand} />;
  }

  if (apples) {
    return <Apples brand={apples.brand} />;
  }
}

let isBananasFetched = false;

function Bananas(props: any): ReactElement {
  const brand = props.brand;
  const [numberOfBananas, setNumberOfBananas] = useState(0);

  useEffect(() => {
    if (isBananasFetched) {
      return;
    }
    isBananasFetched = true;

    const fetchBananas = async () => {
      const response = await fetch(`/api/bananas`);
      const json = await response.json();
      setNumberOfBananas(json.numberOfBananas);
    };
    fetchBananas();
  });

  return (
    <div>
      I have {numberOfBananas} bananas of the {brand} brand.
    </div>
  );
}

let isApplesFetched = false;

function Apples(props: any): ReactElement {
  const brand = props.brand;
  const [numberOfApples, setNumberOfApples] = useState(0);

  useEffect(() => {
    if (isApplesFetched) {
      return;
    }
    isApplesFetched = true;

    const fetchApples = async () => {
      const response = await fetch(`/api/apples`);
      const json = await response.json();
      setNumberOfApples(json.numberOfApples);
    };
    fetchApples();
  });

  return (
    <div>
      We have {numberOfApples} apples of the {brand} brand.
    </div>
  );
}
