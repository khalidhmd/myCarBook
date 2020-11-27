import React, {useContext, useState} from 'react';
import styles from '../shared/styles';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {getMaintenances} from '../data/storage';
import HeaderRightButton from '../shared/components/HeaderRightButton';

export default function MaintenanceRecords({navigation}) {
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);

  const {language} = useContext(SystemContext);

  const fd = language == 'en' ? 'row' : 'row-reverse';

  const [maintenances, setMaintenances] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getMaintenances();
      setMaintenances(data.filter(m => m.carId == activeCar.id));
    });
    return unsubscribe;
  }, [navigation]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'بيان صيانات',
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: 'lightgrey',
      headerStyle: {
        backgroundColor: 'rebeccapurple',
      },
      headerRight: () => (
        <HeaderRightButton
          pressHnadler={rightButtonPress}
          iconName="md-add-outline"
        />
      ),
    });
  }, [navigation]);
  const rightButtonPress = () => {
    navigation.navigate('MaintenanceForm', {title: 'تسجيل صيانة'});
  };
  const handleItemPress = maintenance => {
    navigation.navigate('MaintenanceView', {
      title: 'عرض عملية صيانة',
      maintenance,
    });
  };
  return (
    <View style={styles.containerList}>
      {!!activeCar.imgURL ? (
        <View>
          <Image
            style={[styles.imgForm, {alignSelf: 'center'}]}
            source={{uri: 'file://' + activeCar.imgURL}}
          />
          <Text style={{alignSelf: 'center', fontSize: 36}}>
            {activeCar.name}
          </Text>
        </View>
      ) : null}
      {maintenances.filter(m => m.carId == activeCar.id).length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {maintenances
            .filter(m => m.carId == activeCar.id)
            .map(m => {
              return (
                <TouchableOpacity key={m.id} onPress={() => handleItemPress(m)}>
                  <View>
                    <View
                      style={[
                        styles.subForm,
                        {
                          flexDirection: 'row-reverse',
                          borderBottomColor: 'white',
                        },
                      ]}>
                      <Text style={styles.title}>التاريخ</Text>
                      <Text style={styles.title}>{m.date}</Text>
                    </View>
                    <View
                      style={[styles.subForm, {flexDirection: 'row-reverse'}]}>
                      <Text style={styles.title}>الصيانة</Text>
                      <Text style={styles.title}>{m.typeName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      ) : (
        <Text style={styles.titleList}>لا توجد بيانات مسجلة</Text>
      )}
    </View>
  );
}
