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
            The splash screen photo is downloaded from unsplash.com. Thanks to
            Samara Doole for sharing the photo on Unsplash.
          </Text>
          <Text
            style={[styles.CreditsText, {color: 'blue'}]}
            onPress={() => Linking.openURL('https://unsplash.com/')}>
            www.unsplash.com
          </Text>
          <Text
            style={[styles.CreditsText, {color: 'blue'}]}
            onPress={() =>
              Linking.openURL(
                'https://unsplash.com/@samaradoole?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
              )
            }>
            Samara Doole
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
