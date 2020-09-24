import React, {useState, useContext} from 'react';
import {maintenanceType} from '../data/models';
import styles from '../shared/styles';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {SystemContext} from '../contexts/SystemContext';
import HeaderRightButton from '../shared/components/HeaderRightButton';
import {addType, updateType} from '../data/storage';

export default function TypeForm({route, navigation}) {
  const type = route.params.mode === 'add' ? {} : route.params.type;
  const [name, setName] = useState(type.name);
  const [kmRate, setKmRate] = useState(type.kmRate || 50000);
  const [timeRate, setTimeRate] = useState(type.timeRate || 6);
  const [id, setId] = useState(type.id);
  const {language} = useContext(SystemContext);
  const fd = language == 'en' ? 'row-reverse' : 'row';

  navigation.setOptions({
    title: route.params.title,
    headerTitleStyle: styles.headerTitleStyle,
    headerTintColor: 'whitesmoke',
    headerStyle: {
      backgroundColor: 'rebeccapurple',
    },
    headerRight: () => (
      <HeaderRightButton
        pressHnadler={
          route.params.mode === 'add'
            ? () => {
                handleAdd(name, kmRate, timeRate);
              }
            : () => {
                handleUpdate({
                  name,
                  kmRate,
                  timeRate,
                  id,
                });
              }
        }
        iconName="checkmark-outline"
      />
    ),
  });

  const handleAdd = async (name, kmRate, timeRate) => {
    if (
      name == '' ||
      kmRate == '' ||
      timeRate == '' ||
      name == null ||
      kmRate == null ||
      timeRate == null
    ) {
      Alert.alert('خطأ', 'يرجى اكمال البيانات');
      return;
    }

    const type = new maintenanceType(
      name,
      parseInt(kmRate),
      parseInt(timeRate),
    );
    await addType(type);
    navigation.navigate('TypeList');
  };

  const handleUpdate = async type => {
    await updateType(type);
    navigation.popToTop();
    navigation.navigate('TypeView', {type});
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
      keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <View style={styles.container}>
          <TouchableOpacity />
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>نوع الصيانة</Text>
            <TextInput
              style={styles.text}
              placeholder="نوع الصيانة"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>معدل كم</Text>
            <TextInput
              style={styles.text}
              placeholder="معدل كم"
              value={String(kmRate)}
              onChangeText={text => setKmRate(parseInt(text))}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.subForm, {flexDirection: fd}]}>
            <Text style={styles.title}>المعدل الزمني</Text>
            <TextInput
              style={styles.text}
              placeholder="المدة بالشهور"
              value={String(timeRate)}
              onChangeText={text => setTimeRate(parseInt(text))}
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
