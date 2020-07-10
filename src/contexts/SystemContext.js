import React, {useState, createContext, useEffect} from 'react';
import {NativeModules, Platform} from 'react-native';

export const SystemContext = createContext();

const SystemContextProvider = props => {
  const [language, setLanguage] = useState('');

  useEffect(() => {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    setLanguage(deviceLanguage.substring(0, 2));
  }, []);

  return (
    <SystemContext.Provider value={{language}}>
      {props.children}
    </SystemContext.Provider>
  );
};

export default SystemContextProvider;
