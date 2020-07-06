import AsyncStorage from '@react-native-community/async-storage';
const USER_KEY = 'MY_CAR_BOOK:user';
const CARS_KEY = 'MY_CAR_BOOK:cars';

export async function getUser() {
  try {
    const result = await AsyncStorage.getItem(USER_KEY);

    if (!!result && result[0] === '{') {
      const user = JSON.parse(result);
      return user;
    }

    return {name: '', mobile: '', passwd: ''};
  } catch (e) {
    console.log('error' + e);
  }
}

export async function saveUser(user) {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.log('error' + e);
  }
}

export async function deleteUser() {
  try {
    await AsyncStorage.setItem(USER_KEY, '');
  } catch (e) {
    console.log('error' + e);
  }
}

export async function getCars() {
  try {
    const result = await AsyncStorage.getItem(CARS_KEY);

    if (!!result && result[0] === '[') {
      const cars = JSON.parse(result);
      return cars;
    }
    return [];
  } catch (e) {
    console.log('error' + e);
  }
}

export async function saveCars(cars) {
  try {
    await AsyncStorage.setItem(CARS_KEY, JSON.stringify(cars));
  } catch (e) {
    console.log('error' + e);
  }
}

export async function addCar(car) {
  const cars = await getCars();
  cars.push(car);
  await saveCars(cars);
}

export async function deleteCar(id) {
  let cars = await getCars();
  cars = cars.filter(car => car.id !== id);
  await saveCars(cars);
}

export async function updateCar(car) {
  let cars = await getCars();
  console.log(cars);
  cars = cars.map(c => (c.id !== car.id ? c : car));
  console.log(cars);
  await saveCars(cars);
}
