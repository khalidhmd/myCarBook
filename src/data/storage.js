import AsyncStorage from '@react-native-community/async-storage';
const USER_KEY = 'MY_CAR_BOOK:user';
const CARS_KEY = 'MY_CAR_BOOK:cars';
const KM_KEY = 'MY_CAR_BOOK:km';
const FUEL_KEY = 'MY_CAR_BOOK:fuel';
const TYPE_KEY = 'MY_CAR_BOOK:type';
import data from '../../assets/maintenanceTypes.json';
var uuid = require('react-native-uuid');

export async function getCars() {
  try {
    const data = await AsyncStorage.getItem(CARS_KEY);

    if (!data || data == 'null') {
      return [];
    } else {
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('error: ', e);
  }
}

export async function saveCars(cars) {
  AsyncStorage.setItem(CARS_KEY, JSON.stringify(cars));
}

export async function deleteCar(id) {
  let cars = await getCars();
  cars = cars.filter(car => car.id !== id);
  await saveCars(cars);
}

export async function updateCar(car) {
  let cars = await getCars();

  cars = cars.map(c => (c.id !== car.id ? c : car));

  await saveCars(cars);
}

export async function getUser() {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);

    if (!data || data == 'null') {
      return {};
    } else {
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('error: ', e);
  }
}

export async function saveUser(user) {
  AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getKms() {
  try {
    const result = await AsyncStorage.getItem(KM_KEY);

    if (!!result && result[0] === '[') {
      const kms = JSON.parse(result);
      return kms;
    }
    return [];
  } catch (e) {
    console.log('error' + e);
  }
}

export async function saveKms(kms) {
  AsyncStorage.setItem(KM_KEY, JSON.stringify(kms));
}

export async function addKms(km) {
  const kms = await getKms();
  kms.push(km);
  await saveKms(kms);
}

export async function getFuels() {
  try {
    const result = await AsyncStorage.getItem(FUEL_KEY);

    if (!!result && result[0] === '[') {
      const fuels = JSON.parse(result);
      return fuels;
    }
    return [];
  } catch (e) {
    console.log('error' + e);
  }
}

export async function saveFuels(fuels) {
  AsyncStorage.setItem(FUEL_KEY, JSON.stringify(fuels));
}

export async function addFuel(fuel) {
  const fuels = await getFuels();
  fuels.push(fuel);
  await saveFuels(fuels);
}

export async function getTypes() {
  try {
    const result = await AsyncStorage.getItem(TYPE_KEY);

    if (!!result && result[0] === '[') {
      const types = JSON.parse(result);
      return types;
    }
    console.log('Here');
    return data.map(item => ({...item, id: uuid.v4()}));
  } catch (e) {
    console.log('error' + e);
  }
}

export async function saveTypes(types) {
  AsyncStorage.setItem(TYPE_KEY, JSON.stringify(types));
}

export async function addType(type) {
  const types = await getTypes();
  types.push(type);
  await saveTypes(types);
}

export async function updateType(type) {
  let types = await getTypes();
  types = types.map(t => (t.id !== type.id ? t : type));
  await saveTypes(types);
}

export async function removeType(id) {
  let types = await getTypes();
  types = types.filter(t => t.id !== id);
  await saveTypes(types);
}
