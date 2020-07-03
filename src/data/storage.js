import AsyncStorage from '@react-native-community/async-storage';
const USER_KEY = 'MY_CAR_BOOK:user';

export async function getUser() {
  try {
    const user = JSON.parse(await AsyncStorage.getItem('MY_CAR_BOOK:user'));
    if (!!user && user !== {}) return user;
    return {name: '', mobile: '', passwd: ''};
  } catch (e) {
    // console.log('error' + e);
  }
}

export async function setUser(user) {
  try {
    await AsyncStorage.setItem('MY_CAR_BOOK:user', JSON.stringify(user));
  } catch (e) {
    // console.log('error' + e);
  }
}
