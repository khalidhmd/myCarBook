import React, {useContext, useState} from 'react';
import styles from '../shared/styles';
import {Text, View, ScrollView, Image} from 'react-native';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {getFuels} from '../data/storage';
import HeaderRightButton from '../shared/components/HeaderRightButton';

export default function FuelRecords({navigation}) {
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);

  const {language} = useContext(SystemContext);

  const fd = language == 'en' ? 'row' : 'row-reverse';

  const [fuels, setFuels] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      async () => {
        const data = await getFuels();
        setFuels(data.filter(fuel => fuel.carId == activeCar.id));
      },
      [fuels],
    );

    return unsubscribe;
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'بيان وقود',
      headerTintColor: 'lightgrey',
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
    });
  }, [navigation]);
  const rightButtonPress = () => {
    navigation.navigate('FuelForm', {title: 'تسجيل وقود'});
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
      {fuels.filter(fuel => fuel.carId == activeCar.id).length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {fuels.map(fuel => {
            return (
              <View key={fuel.id}>
                <View
                  style={[
                    styles.subForm,
                    {
                      flexDirection: 'row-reverse',
                      borderBottomColor: 'white',
                    },
                  ]}>
                  <Text style={styles.title}>التاريخ</Text>
                  <Text style={styles.title}>{fuel.date}</Text>
                </View>
                <View
                  style={[
                    styles.subForm,
                    {
                      flexDirection: 'row-reverse',
                      borderBottomColor: 'white',
                    },
                  ]}>
                  <Text style={styles.title}>العداد</Text>
                  <Text style={styles.title}>{fuel.km}</Text>
                </View>
                <View
                  style={[
                    styles.subForm,
                    {
                      flexDirection: 'row-reverse',
                      borderBottomColor: 'white',
                    },
                  ]}>
                  <Text style={styles.title}>الكمية</Text>
                  <Text style={styles.title}>{fuel.quantity}</Text>
                </View>
                <View style={[styles.subForm, {flexDirection: 'row-reverse'}]}>
                  <Text style={styles.title}>الثمن</Text>
                  <Text style={styles.title}>{fuel.cost}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Text style={styles.titleList}>لا توجد بيانات مسجلة</Text>
      )}
    </View>
  );
}
