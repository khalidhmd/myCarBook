import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CarForm from '../components/CarForm';
import CarView from '../components/CarView';
import CarList from '../components/CarList';
import {TouchableOpacity, Text} from 'react-native';
const Stack = createStackNavigator();

export default function CarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CarList"
        component={CarList}
        options={{
          title: 'السيارات المسجلة',
          headerTitleStyle: {
            alignSelf: 'center',
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="CarView"
        component={CarView}
        // options={{
        //   title: 'بيانات سيارة',
        //   headerTitleStyle: {textAlign: 'center', flex: 1},
        // }}
        // options={{
        //   headerTitle: () => (
        //     <View Style={{width: '100%'}}>
        //       <Text Style={{textAlign: 'center'}}>بيانات سيارة</Text>
        //     </View>
        //   ),
        // }}
      />
      <Stack.Screen name="CarForm" component={CarForm} />
    </Stack.Navigator>
  );
}
