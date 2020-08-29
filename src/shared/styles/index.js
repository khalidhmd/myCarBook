import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerList: {
    backgroundColor: 'whitesmoke',
    flex: 1,
  },
  titleList: {
    fontSize: 28,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  imgList: {
    width: 65,
    height: 65,
    borderRadius: 30,
  },
  imgForm: {
    marginTop: 5,
    width: 320,
    height: 180,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  deckCar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 4,
    backgroundColor: 'plum',
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    paddingVertical: 10,
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
    marginBottom: 10,
  },
  save: {
    fontSize: 20,
    color: 'rebeccapurple',
    fontFamily: 'Almarai-Bold',
  },
  buttonView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    borderRadius: 20,
    width: 100,
    paddingHorizontal: 10,
    includeFontPadding: false,
    justifyContent: 'space-between',
    borderColor: 'rebeccapurple',
    borderWidth: 2,
  },
  CreditsTitle: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  CreditsText: {
    fontSize: 20,
    textAlign: 'left',
  },
  headerTitleStyle: {
    alignSelf: 'center',
    color: 'lightgrey',
    fontSize: 24,
    fontFamily: 'Almarai-Regular',
  },
});
