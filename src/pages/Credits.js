import React from 'react';
import styles from '../shared/styles';
import {Text, View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function CreditsView({navigation}) {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={42} color="white" />
      </TouchableOpacity>
    ),
    title: 'Credits',
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            width: '95%',
            marginBottom: 5,
            paddingVertical: 10,
            borderBottomWidth: 1,
          }}>
          <Text style={styles.CreditsTitle}>Application Icon</Text>
          <Text style={styles.CreditsText}>
            Application icon is downloaded form flaticon.com. Thanks for
            allowing us use this icon.
          </Text>
          <Text
            style={[styles.CreditsText, {color: 'blue'}]}
            onPress={() => Linking.openURL('https://www.flaticon.com/')}>
            www.flaticon.com
          </Text>
        </View>

        <View
          style={{
            width: '95%',
            marginBottom: 5,
            paddingVertical: 10,
            borderBottomWidth: 1,
          }}>
          <Text style={styles.CreditsTitle}>Splash Screen Photo</Text>
          <Text style={styles.CreditsText}>
            The splash screen photo is downloaded from Pexels. Thanks to Tim
            Mossholder for sharing the photo on Pexels.
          </Text>
          <Text
            style={[styles.CreditsText, {color: 'blue'}]}
            onPress={() => Linking.openURL('https://www.pexels.com/')}>
            www.pexels.com
          </Text>
          <Text
            style={[styles.CreditsText, {color: 'blue'}]}
            onPress={() =>
              Linking.openURL('https://www.pexels.com/@timmossholder')
            }>
            Tim Mossholder
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
