import React, {useContext, useState} from 'react';
import styles from '../shared/styles';
import {Text, View, ScrollView, Image} from 'react-native';
import {SystemContext} from '../contexts/SystemContext';
import {ActiveCarContext} from '../contexts/ActiveCarContext';
import {getKms} from '../data/storage';

export default function KmRecords({navigation}) {
  const {setActiveCar, activeCar} = useContext(ActiveCarContext);

  const {language} = useContext(SystemContext);

  const fd = language == 'en' ? 'row' : 'row-reverse';
  // const kms = await getKms();

  const [kms, setKms] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getKms();
      setKms(data);
    });

    return unsubscribe;
  }, [navigation]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'بيان وقود',
      headerTitleStyle: styles.headerTitleStyle,
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
            style={styles.imgForm}
            source={{uri: 'file://' + activeCar.imgURL}}
          />
          <Text>{activeCar.name}</Text>
        </View>
      ) : null}
      {kms.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {kms.map(km => {
            return (
              <View key={km.id}>
                <View
                  style={[
                    styles.subForm,
                    {flexDirection: 'row-reverse', borderBottomColor: 'white'},
                  ]}>
                  <Text style={styles.title}>التاريخ</Text>
                  <Text style={styles.title}>{km.date}</Text>
                </View>
                <View style={[styles.subForm, {flexDirection: 'row-reverse'}]}>
                  <Text style={styles.title}>العداد</Text>
                  <Text style={styles.title}>{km.km}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );
}
