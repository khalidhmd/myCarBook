import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerList: {
    backgroundColor: 'whitesmoke',
    flex: 1,
  },
  titleList: {
    fontSize: 28,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textList: {
    fontSize: 24,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  deckCar: {
    padding: 10,
    marginTop: 4,
    backgroundColor: 'plum',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subForm: {
    width: '95%',
    marginBottom: 5,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    width: 140,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    textAlign: 'right',
    width: 180,
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    width: '95%',
    justifyContent: 'space-evenly',
  },
  save: {
    marginTop: 15,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: 80,
    color: 'white',
    backgroundColor: 'darkblue',
    borderRadius: 7,
    paddingVertical: 5,
  },
});