// storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para almacenar datos
export const storeData = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.error(`Failed to save the data with key ${key} to the storage`, e);
  }
};

// Función para recuperar datos
export const getData = async (key: string) => {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    return stringValue != null ? JSON.parse(stringValue) : null;
  } catch (e) {
    console.error(`Failed to fetch the data with key ${key} from the storage`, e);
  }
};
