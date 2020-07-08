import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const CarContext = createContext();

const CarContextProvider = props => {
  const [cars, setCars] = useState([
    {
      color: 'red',
      id: '29a51d88-a34c-45c9-aba4-dc1dbfad8ca7',
      km: 0,
      make: 'hiundai',
      model: 'verna',
      year: '2000',
    },
    {
      color: 'blue',
      id: '3c4db47b-e25a-4e5a-9867-d57c675c76af',
      km: 0,
      make: 'hiundai',
      model: 'elentra',
      year: '2000',
    },
    {
      color: 'green',
      id: '74c634e7-f8a8-47e9-89d3-15b7d4414e42',
      km: 0,
      make: 'fiat',
      model: 'uno',
      year: '2005',
    },
    {
      color: 'red',
      id: 'da3e72a4-bdb2-4f7a-8914-cb89096287ae',
      km: 0,
      make: 'Peugeux',
      model: '306',
      year: '2000',
    },
  ]);
  useEffect(() => {
    AsyncStorage.getItem('MY_CAR_BOOK:cars').then(data =>
      setCars(JSON.parse(data)),
    );
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
