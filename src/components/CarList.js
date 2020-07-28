import React, {useContext} from 'react';

import {
  StyleSheet,
  Text,
  Animated,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {CarContext} from '../contexts/CarContext';

const handlePress = (navigation, car) => {
  navigation.push('CarView', {car, title: 'عرض بيانات سيارة'});
};

export default function CarList({navigation}) {
  const {cars} = useContext(CarContext);

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
  });
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CarForm', {
              mode: 'add',
              title: 'إضافة سيارة جديدة',
            })
          }>
          <Text
            style={{
              fontSize: 34,
              backgroundColor: 'whitesmoke',
              color: 'rebeccapurple',
              paddingHorizontal: 12,
              marginRight: 6,
              borderRadius: 22,
            }}>
            +
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => handlePress(navigation, item)}>
              <Animated.View style={[styles.deck]}>
                <Text style={styles.title}>{item.make}</Text>
                <Text style={styles.text}>{item.model}</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    flex: 1,
  },
  title: {
    fontSize: 28,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  deck: {
    padding: 5,
    marginTop: 4,
    backgroundColor: 'plum',
    marginHorizontal: 4,
    borderRadius: 8,
  },
});
