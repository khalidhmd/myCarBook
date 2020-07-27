import React, {useState, createContext, useEffect} from 'react';
import {getCars, saveCars} from '../data/storage';

export const CarContext = createContext();

const CarContextProvider = props => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    (async function() {
      const data = await getCars();
      setCars(data);
    })();
  }, []);

  useEffect(() => {
    saveCars(cars);
  }, [cars]);

  const addCar = car => {
    setCars([...cars, car]);
  };

  const removeCar = id => {
    setCars(cars.filter(c => c.id !== id));
  };

  const updateCar = car => {
    setCars(cars.map(c => (c.id === car.id ? car : c)));
  };

  return (
    <CarContext.Provider value={{cars, addCar, removeCar, updateCar}}>
      {props.children}
    </CarContext.Provider>
  );
};

export default CarContextProvider;
