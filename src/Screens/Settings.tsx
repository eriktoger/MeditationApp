import React from 'react';
import {Box, Center, Icon, NativeBaseProvider} from 'native-base';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Interfaces';
import {useNavigation} from '@react-navigation/native';
type settingsScreenProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const Settings = () => {
  const navigation = useNavigation<settingsScreenProp>();
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Box> Settings!</Box>
        <Icon
          margin={2}
          backgroundColor={'rgba(0,0,0,0.6)'}
          as={FontAwsome5}
          name={'sign-out-alt'}
          color={'#cccccc'}
          borderRadius="full"
          size={12}
          onPress={() => auth().signOut()}
        />
        <Icon
          margin={2}
          backgroundColor={'rgba(0,0,0,0.6)'}
          as={FontAwsome5}
          name={'arrow-left'}
          color={'#cccccc'}
          borderRadius="full"
          size={12}
          onPress={() => navigation.goBack()}
        />
      </Center>
    </NativeBaseProvider>
  );
};

export default Settings;
