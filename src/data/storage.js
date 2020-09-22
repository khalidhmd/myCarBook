import AsyncStorage from '@react-native-community/async-storage';
const USER_KEY = 'MY_CAR_BOOK:user';
const CARS_KEY = 'MY_CAR_BOOK:cars';
const KM_KEY = 'MY_CAR_BOOK:km';
const FUEL_KEY = 'MY_CAR_BOOK:fuel';

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

export async function saveKms(kms) {
  AsyncStorage.setItem(KM_KEY, JSON.stringify(kms));
}

export async function saveFuels(fuels) {
  AsyncStorage.setItem(FUEL_KEY, JSON.stringify(fuels));
}

export async function addKms(km) {
  const kms = await getKms();
  kms.push(km);
  await saveKms(kms);
}

export async function addFuel(fuel) {
  const fuels = await getFuels();
  fuels.push(fuel);
  await saveFuels(fuels);
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
