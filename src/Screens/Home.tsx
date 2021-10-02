import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Center} from 'native-base';
import BackGround from '../Components/Background';
import MeditationList from '../Components/MeditationList';
import {NavigationContext} from '../Contexts';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Interfaces';
import CustomButton from '../Components/CustomButton';
import BottomBar from '../Components/BottomBar';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {
  const navigation = useNavigation<homeScreenProp>();

  return (
    // @ts-ignore
    <NavigationContext.Provider value={navigation}>
      <Center flex={6} marginTop={10}>
        <MeditationList />;
        <CustomButton
          onPress={() => navigation.navigate('Editor')}
          iconName={'plus'}
          paddings={{
            paddingLeft: 8,
            paddingRight: 4,
            paddingTop: 7,
            paddingBottom: 7,
          }}
        />
      </Center>
      <BottomBar>
        <CustomButton
          onPress={() => navigation.navigate('Settings')}
          iconName={'user-cog'}
        />
        <CustomButton
          onPress={() => navigation.navigate('Statistics')}
          iconName={'chart-bar'}
        />
      </BottomBar>
    </NavigationContext.Provider>
  );
};

const WithBackground = () => (
  <BackGround>
    <Home />
  </BackGround>
);

export default WithBackground;
