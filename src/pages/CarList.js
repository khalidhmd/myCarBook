import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../shared/styles';
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';

const handleItemPress = (navigation, car) => {
  navigation.push('CarView', {car, title: 'عرض بيانات سيارة'});
};

export default function CarList({navigation}) {
  const {cars} = useContext(CarContext);
  const {language} = useContext(SystemContext);

  const fd = language == 'en' ? 'row' : 'row-reverse';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'السيارات المسجلة',
      headerTitleStyle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'lightgrey',
        fontSize: 24,
      },
      headerStyle: {
        backgroundColor: 'rebeccapurple',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CarForm', {
              mode: 'add',
              title: 'تسجيل سيارة جديدة',
            })
          }>
          <Icon name="md-add-circle-sharp" size={42} color="white" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={42} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return cars.length ? (
    <View style={styles.containerList}>
      <ScrollView>
        {cars.map(car => {
          const img = car.imgURL ? car.imgURL : 'sample.jpeg';
          return (
            <TouchableOpacity
              key={car.id}
              onPress={() => handleItemPress(navigation, car)}>
              <Animated.View style={[styles.deckCar, {flexDirection: fd}]}>
                <Text style={styles.titleList}>{car.name}</Text>
                <Image style={styles.imgList} source={{uri: img}} />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  ) : null;
}
