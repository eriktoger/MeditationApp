import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Editor,
  Login,
  Home,
  Settings,
  Statistics,
  MeditationTimer,
} from './src/Screens';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {RootStackParamList} from './src/Interfaces';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [currentUser, setCurrentUser] =
    useState<FirebaseAuthTypes.User | null>();

  const getCurrentUser = () => {
    const user = auth().currentUser;
    setCurrentUser(user);
  };

  useEffect(() => {
    getCurrentUser();
    const subscriber = auth().onAuthStateChanged(getCurrentUser);
    return subscriber;
  }, []);

  if (!currentUser) {
    return <Login />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Editor" component={Editor} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Statistics" component={Statistics} />
        <Stack.Screen name="MeditationTimer" component={MeditationTimer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
