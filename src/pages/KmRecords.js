import React, {useContext, useState} from 'react';
import styles from '../shared/styles';
import {Text, View, ScrollView, Image} from 'react-native';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {getKms} from '../data/storage';
import HeaderRightButton from '../shared/components/HeaderRightButton';

export default function KmRecords({navigation}) {
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);

  const {language} = useContext(SystemContext);

  const fd = language == 'en' ? 'row' : 'row-reverse';

  const [kms, setKms] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getKms();
      setKms(data.filter(km => km.carId == activeCar.id));
    });

    return unsubscribe;
  }, [navigation]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'بيان كيلومتر',
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
    navigation.navigate('KmForm', {title: 'تسجيل عداد كم'});
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
      {kms.filter(km => km.carId == activeCar.id).length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {kms
            .filter(km => km.carId == activeCar.id)
            .map(km => {
              return (
                <View key={km.id}>
                  <View
                    style={[
                      styles.subForm,
                      {
                        flexDirection: 'row-reverse',
                        borderBottomColor: 'white',
                      },
                    ]}>
                    <Text style={styles.title}>التاريخ</Text>
                    <Text style={styles.title}>{km.date}</Text>
                  </View>
                  <View
                    style={[styles.subForm, {flexDirection: 'row-reverse'}]}>
                    <Text style={styles.title}>العداد</Text>
                    <Text style={styles.title}>{km.km}</Text>
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
