import React, {useContext, useState} from 'react';
import styles from '../shared/styles';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import isLastMiantenance from '../shared/helpers/isLateMaintenance';
import {getLastMiantenances} from '../data/storage';

export default function MaintenanceRecords({navigation}) {
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);

  const {language} = useContext(SystemContext);

  const fd = language == 'en' ? 'row' : 'row-reverse';

  const [maintenances, setMaintenances] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getLastMiantenances();
      const carMaintenances = data[activeCar.id];
      setMaintenances(
        Object(carMaintenances).keys.map(key => carMaintenances[key]),
      );
    });
    return unsubscribe;
  }, [navigation]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'الصيانات المطلوبة',
      headerTitleStyle: styles.headerTitleStyle,
      headerTintColor: 'lightgrey',
      headerStyle: {
        backgroundColor: 'rebeccapurple',
      },
      //   headerRight: () => (
      //     <HeaderRightButton
      //       pressHnadler={rightButtonPress}
      //       iconName="md-add-outline"
      //     />
      //   ),
    });
  }, [navigation]);
  //   const rightButtonPress = () => {
  //     navigation.navigate('MaintenanceForm', {title: 'تسجيل صيانة'});
  //   };
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {maintenances
          .filter(m => isLastMiantenance(m, activeCar))
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
    </View>
  );
}
