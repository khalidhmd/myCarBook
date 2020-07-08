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
              fontWeight: 'bold',
              fontSize: 24,
              backgroundColor: 'blue',
              color: 'lightgray',
              paddingHorizontal: 8,
              marginRight: 3,
              borderRadius: 5,
            }}>
            +
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
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
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  title: {
    fontSize: 30,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 25,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  deck: {
    padding: 5,
    marginTop: 2,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
