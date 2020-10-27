import React, {useContext, useState} from 'react';
import styles from '../shared/styles';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {CarContext} from '../contexts/CarContext';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import HeaderLeftButton from '../shared/components/HeaderLeftButton';
import HeaderRightButton from '../shared/components/HeaderRightButton';
import getLateMaintenanceCount from '../shared/helpers/getLateMaintenance';
import {getLastMiantenances} from '../data/storage';

export default function CarList({navigation}) {
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);
  const {cars} = useContext(CarContext);
  const {language} = useContext(SystemContext);
  const [lastMaintenances, setLastMaintenances] = useState({});
  const fd = language == 'en' ? 'row' : 'row-reverse';

  const handleItemPress = (navigation, car) => {
    setActiveCar({...car});
    navigation.navigate('CarView', {title: 'عرض بيانات سيارة', car});
  };

  const rightButtonPress = () => {
    navigation.navigate('CarForm', {mode: 'add', title: 'تسجيل سيارة جديدة'});
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getLastMiantenances();
      setLastMaintenances(data);
    });

    return unsubscribe;
  }, [navigation]);
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
            <View
              key={car.id}
              style={[
                styles.deckCar,
                {flexDirection: fd, justifyContent: 'space-between'},
              ]}>
              <View>
                {getLateMaintenanceCount(lastMaintenances[car.id], car) ? (
                  <TouchableOpacity>
                    <Text style={styles.carListBadge}>
                      {getLateMaintenanceCount(lastMaintenances[car.id], car)}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={{flexDirection: fd, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => handleItemPress(navigation, car)}>
                  <Text style={styles.titleList}>{car.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleItemPress(navigation, car)}>
                  <Image
                    style={styles.imgList}
                    source={{uri: 'file://' + img}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  ) : (
    <Text style={styles.titleList}>لا توجد سيارات مسجلة</Text>
  );
}
