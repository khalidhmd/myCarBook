import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../shared/styles';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import HeaderLeftButton from '../shared/components/HeaderLeftButton';
import HeaderRightButton from '../shared/components/HeaderRightButton';

export default function CarList({navigation}) {
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);
  const {cars} = useContext(CarContext);

  const {language} = useContext(SystemContext);

  const fd = language == 'en' ? 'row' : 'row-reverse';

  const handleItemPress = (navigation, car) => {
    setActiveCar({...car});
    navigation.navigate('CarView', {title: 'عرض بيانات سيارة', car});
  };

  const rightButtonPress = () => {
    navigation.navigate('CarForm', {mode: 'add', title: 'تسجيل سيارة جديدة'});
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'السيارات المسجلة',
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: {
        backgroundColor: 'rebeccapurple',
      },
      headerRight: () => (
        <HeaderRightButton
          pressHnadler={rightButtonPress}
          iconName="md-add-outline"
        />
      ),
      headerLeft: () => <HeaderLeftButton navigation={navigation} />,
    });
  }, [navigation]);

  return cars.length ? (
    <View style={styles.containerList}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cars.map(car => {
          const img = car.imgURL ? car.imgURL : 'sample.jpeg';
          return (
            <TouchableOpacity
              key={car.id}
              onPress={() => handleItemPress(navigation, car)}>
              <View style={[styles.deckCar, {flexDirection: fd}]}>
                <Text style={styles.titleList}>{car.name}</Text>
                <Image style={styles.imgList} source={{uri: 'file://' + img}} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  ) : null;
}
