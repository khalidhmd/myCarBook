import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const CarContext = createContext();

const CarContextProvider = props => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('MY_CAR_BOOK:cars').then(data => {
      if (!data || data == 'null') {
        setCars([]);
      } else {
        setCars(JSON.parse(data));
      }
    });
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('MY_CAR_BOOK:cars', JSON.stringify(cars));
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
