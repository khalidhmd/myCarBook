import React, {useContext, useState} from 'react';
import styles from '../shared/styles';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {getTypes} from '../data/storage';
import {SystemContext} from '../contexts/SystemContext';
import HeaderLeftButton from '../shared/components/HeaderLeftButton';
import HeaderRightButton from '../shared/components/HeaderRightButton';

export default function TypeList({navigation, route}) {
  const {language} = useContext(SystemContext);
  const [types, setTypes] = useState([]);
  const fd = language == 'en' ? 'row' : 'row-reverse';
  const handleItemPress = type => {
    navigation.navigate('TypeView', {title: 'بيانات نوع صيانة', type, types});
  };

  const rightButtonPress = () => {
    navigation.navigate('TypeForm', {
      mode: 'add',
      title: 'تسجيل نوع صيانة',
    });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const types = await getTypes();
      setTypes([...types]);
    });

    return unsubscribe;
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'أنواع الصيانات',
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

  return types.length ? (
    <View style={styles.containerList}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {types.map(type => {
          return (
            <TouchableOpacity
              key={type.id}
              onPress={() => handleItemPress(type)}>
              <View style={[styles.deckCar, {flexDirection: fd}]}>
                <Text style={styles.titleList}>{type.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  ) : (
    <Text style={styles.titleList}>لا توجد بيانات مسجلة</Text>
  );
}
