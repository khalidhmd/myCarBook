import AsyncStorage from '@react-native-community/async-storage';
const USER_KEY = 'MY_CAR_BOOK:user';
const CARS_KEY = 'MY_CAR_BOOK:cars';
const KM_KEY = 'MY_CAR_BOOK:km';
const FUEL_KEY = 'MY_CAR_BOOK:fuel';
const TYPE_KEY = 'MY_CAR_BOOK:type';
const MAINTENANCE_KEY = 'MY_CAR_BOOK:maintenance';
const LAST_MAINTENANCES_KEY = 'MY_CAR_BOOK:last_maintenance';

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
  try {
    AsyncStorage.setItem(CARS_KEY, JSON.stringify(cars));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCar(id) {
  try {
    let cars = await getCars();
    cars = cars.filter(car => car.id !== id);
    await saveCars(cars);
  } catch (error) {
    console.log(error);
  }
}

export async function updateCar(car) {
  try {
    let cars = await getCars();
    cars = cars.map(c => (c.id !== car.id ? c : car));
    await saveCars(cars);
  } catch (error) {
    console.log(error);
  }
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
  try {
    AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
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
  try {
    AsyncStorage.setItem(KM_KEY, JSON.stringify(kms));
  } catch (error) {
    console.log(error);
  }
}

export async function addKms(km) {
  try {
    const kms = await getKms();
    kms.push(km);
    await saveKms(kms);
  } catch (error) {
    console.log(error);
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

export async function saveFuels(fuels) {
  try {
    AsyncStorage.setItem(FUEL_KEY, JSON.stringify(fuels));
  } catch (error) {
    console.log(error);
  }
}

export async function addFuel(fuel) {
  try {
    const fuels = await getFuels();
    fuels.push(fuel);
    await saveFuels(fuels);
  } catch (error) {
    console.log(error);
  }
}

export async function getTypes() {
  try {
    const result = await AsyncStorage.getItem(TYPE_KEY);

    if (!!result && result[0] === '[') {
      const types = JSON.parse(result);
      return types;
    }
    return data.map(item => ({...item, id: uuid.v4()}));
  } catch (e) {
    console.log('error' + e);
  }
}

export async function saveTypes(types) {
  try {
    AsyncStorage.setItem(TYPE_KEY, JSON.stringify(types));
  } catch (error) {
    console.log(error);
  }
}

export async function addType(type) {
  try {
    const types = await getTypes();
    types.push(type);
    await saveTypes(types);
  } catch (error) {
    console.log(error);
  }
}

export async function updateType(type) {
  try {
    let types = await getTypes();
    types = types.map(t => (t.id !== type.id ? t : type));
    await saveTypes(types);
  } catch (error) {
    console.log(error);
  }
}

export async function removeType(id) {
  try {
    let types = await getTypes();
    types = types.filter(t => t.id !== id);
    await saveTypes(types);
  } catch (error) {
    console.log(error);
  }
}

export async function getMaintenances() {
  try {
    const result = await AsyncStorage.getItem(MAINTENANCE_KEY);
    if (!!result && result[0] === '[') {
      const maintenances = JSON.parse(result);
      return maintenances;
    }
    return [];
  } catch (e) {
    console.log('error' + e);
  }
}

export async function saveMaintenances(maintenances) {
  try {
    AsyncStorage.setItem(MAINTENANCE_KEY, JSON.stringify(maintenances));
  } catch (error) {
    console.log(error);
  }
}

export async function addMaintenance(maintenance) {
  try {
    const maintenances = await getMaintenances();
    maintenances.push(maintenance);
    await saveMaintenances(maintenances);
    await saveLastMaintenance(maintenance); // update or save last maintenance
  } catch (error) {
    console.log(error);
  }
}

export async function removeMaintenance(id) {
  try {
    let maintenances = await getMaintenances();
    maintenances = maintenances.filter(m => m.id !== id);
    await saveMaintenances(maintenances);
  } catch (error) {
    console.log(error);
  }
}

export async function getLastMiantenances() {
  try {
    const data = await AsyncStorage.getItem(LAST_MAINTENANCES_KEY);
    if (!data || data == 'null') {
      return {};
    } else {
      return JSON.parse(data);
    }
  } catch (e) {
    console.log('error: ', e);
  }
}

async function saveLastMaintenance(lastMaintenance) {
  try {
    const lastMaintenances = await getLastMiantenances();
    lastMaintenances[lastMaintenance.carId][
      lastMaintenance.typeName
    ] = lastMaintenance;
    AsyncStorage.setItem(
      LAST_MAINTENANCES_KEY,
      JSON.stringify(lastMaintenances),
    );
  } catch (e) {
    console.log('error: ', e);
  }
}

export async function addLastMaintenanceEntry(car) {
  try {
    const lastMaintenances = await getLastMiantenances();
    lastMaintenances[car.id] = {};
    AsyncStorage.setItem(
      LAST_MAINTENANCES_KEY,
      JSON.stringify(lastMaintenances),
    );
  } catch (e) {
    console.log('error: ', e);
  }
}
