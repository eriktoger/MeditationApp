import AsyncStorage from '@react-native-async-storage/async-storage';
import {Meditation} from '../Interfaces';

export const saveMeditation = async (newMeditation: Meditation) => {
  try {
    const response = await AsyncStorage.getItem('meditations');
    if (!response) {
      const firstMeditation = JSON.stringify({
        [newMeditation.id]: newMeditation,
      });
      await AsyncStorage.setItem('meditations', firstMeditation);
    } else {
      const meditations = JSON.parse(response);
      meditations[newMeditation.id] = newMeditation;
      await AsyncStorage.setItem('meditations', JSON.stringify(meditations));
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getMeditation = async (key: string) => {
  try {
    const response = await AsyncStorage.getItem('meditations');
    const meditations = await JSON.parse(response ?? '{}');
    return meditations[key];
  } catch (e) {
    // saving error
  }
};

export const getAllMeditations = async () => {
  try {
    const response = await AsyncStorage.getItem('meditations');
    const meditations = await JSON.parse(response ?? '{}');
    return Object.values(meditations).map(value => value);
  } catch (e) {
    console.log(e);
  }
};

export const deleteMeditation = async (id: string) => {
  try {
    const response = await AsyncStorage.getItem('meditations');
    const meditations = await JSON.parse(response ?? '{}');
    delete meditations[id];
    await AsyncStorage.setItem('meditations', JSON.stringify(meditations));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
