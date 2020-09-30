import React, {useContext, useState} from 'react';
import styles from '../shared/styles';
import {Text, View, ScrollView, Image} from 'react-native';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {getMaintenances} from '../data/storage';

export default function KmRecords({navigation}) {
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);

  const {language} = useContext(SystemContext);

  const fd = language == 'en' ? 'row' : 'row-reverse';

  const [maintenances, setMaintenances] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getMaintenances();
      setMaintenances(data);
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
    });
  }, [navigation]);

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
      {maintenances.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {maintenances
            .filter(m => m.carId == activeCar.id)
            .map(m => {
              return (
                <View key={m.id}>
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
              );
            })}
        </ScrollView>
      ) : null}
    </View>
  );
}
