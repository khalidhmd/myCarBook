import React, {useState, useContext} from 'react';
import {Car} from '../data/models';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';
import ImagePicker from 'react-native-image-picker';

export default function CarForm({route, navigation}) {
  const {addCar, updateCar} = useContext(CarContext);

  const car = route.params.car || {};
  console.log(car);
  const [name, setName] = useState(car.name);
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year || 2000);
  const [color, setColor] = useState(car.color);
  const [km, setKm] = useState(car.km || 0);
  const [id, setId] = useState(car.id);
  const [imgURL, setImgURL] = useState(car.imgURL);

  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerTitleStyle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'lightgrey',
        fontSize: 24,
      },
      headerTintColor: 'lightgrey',
      headerStyle: {
        backgroundColor: 'rebeccapurple',
      },
    });
  }, [navigation]);

  const imageGalleryLaunch = async () => {
    const g = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (!g) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          return;
        }
      } catch (err) {
        console.warn(err);
      }
    }
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        setImgURL(res.uri);
        console.log(imgURL);
      }
    });
  };
  const handleAdd = (name, make, model, imgURL, y, color, k) => {
    if (
      name == '' ||
      make == '' ||
      model == '' ||
      y == '' ||
      y == 0 ||
      color == '' ||
      k == '' ||
      name == null ||
      make == null ||
      model == null ||
      y == null ||
      color == null ||
      k == null ||
      k == 0
    ) {
      Alert.alert('خطأ', 'يرجى اكمال البيانات');
      return;
    }
    const year = parseInt(y);
    const km = parseInt(k);
    const car = new Car(name, make, model, imgURL, year, color, km);
    addCar(car);

    navigation.pop();
  };

  const handleUpdate = car => {
    updateCar(car);
    navigation.pop();
    navigation.navigate('CarView', {car});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={imageGalleryLaunch}>
            <Image style={styles.imgForm} source={{uri: imgURL}} />
          </TouchableOpacity>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>اسم المركبة</Text>
            <TextInput
              style={styles.text}
              placeholder="اسم المركبة"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>الماركة</Text>
            <TextInput
              style={styles.text}
              placeholder="الماركة"
              value={make}
              onChangeText={text => setMake(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>الموديل</Text>
            <TextInput
              style={styles.text}
              placeholder="الموديل"
              value={model}
              onChangeText={text => setModel(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>سنة الصنع</Text>
            <TextInput
              style={styles.text}
              placeholder="سنة الصنع"
              value={String(year)}
              onChangeText={text => setYear(text)}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>اللون</Text>
            <TextInput
              style={styles.text}
              placeholder="اللون"
              value={color}
              onChangeText={text => setColor(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>قراءة العداد</Text>
            <TextInput
              style={styles.text}
              placeholder="قراءة العداد"
              value={String(km)}
              onChangeText={text => setKm(text)}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.buttonContainer, {flexDirection: fd}]}>
            {route.params.mode === 'add' ? (
              <TouchableOpacity
                onPress={() =>
                  handleAdd(name, make, model, imgURL, year, color, km)
                }>
                <View>
                  <Text style={[styles.save]}>حفظ</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleUpdate({name, make, model, imgURL, year, color, km, id})
                }>
                <View>
                  <Text style={styles.save}>حفظ</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
