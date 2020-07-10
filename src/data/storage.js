import AsyncStorage from '@react-native-community/async-storage';
const USER_KEY = 'MY_CAR_BOOK:user';
const CARS_KEY = 'MY_CAR_BOOK:cars';
const KM_KEY = 'MY_CAR_BOOK:km';

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

export async function addKms(km) {
  const kms = await getKms();
  cars.push(km);
  await saveCars(kms);
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
