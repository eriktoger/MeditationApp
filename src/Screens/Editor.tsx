import React, {useState, useRef} from 'react';
import {Center, FormControl, Input, ScrollView} from 'native-base';
import {Meditation, RootStackParamList, Timer} from '../Interfaces';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {deleteMeditation, saveMeditation} from '../Services/meditation';
import BackGround from '../Components/Background';
import uuid from 'react-native-uuid';
import CustomButton from '../Components/CustomButton';
import BottomBar from '../Components/BottomBar';
import {TimerInput} from '../Components/Editor';
import {ConfirmModal} from '../Components/Modals';

type editorScreenProp = StackNavigationProp<RootStackParamList, 'Editor'>;

const generateDefaultMeditation = () => ({
  id: uuid.v4(),
  name: '',
  timers: [
    {text: '', totalTime: 0, id: uuid.v4(), soundName: '', soundCounter: 1},
  ],
});

const Editor = ({
  route,
}: {
  route: RouteProp<{params: {meditation: Meditation}}, 'params'>;
}) => {
  const {id, name, timers} =
    route?.params?.meditation ?? generateDefaultMeditation();
  const [newName, setNewName] = useState(name ?? '');
  const [newTimers, setTimers] = useState(timers);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  const navigation = useNavigation<editorScreenProp>();
  const deleteTimer = (timerId: string) => {
    setChangesMade(true);
    setTimers(oldTimers => oldTimers.filter(timer => timer.id !== timerId));
  };

  const updateTimer = (timer: Timer) => {
    setChangesMade(true);
    setTimers(oldTimers => {
      const index = oldTimers.findIndex(({id: t_id}) => t_id === timer.id);
      oldTimers[index] = timer;
      return oldTimers;
    });
  };

  const addTimer = () => {
    setChangesMade(true);
    setTimers(oldTimers => [
      ...oldTimers,
      {
        text: '',
        totalTime: 0,
        id: uuid.v4().toString(),
        soundName: '',
        soundCounter: 1,
      },
    ]);
    //@ts-ignore
    scrollViewRef?.current?.scrollToEnd({
      animated: true,
    });
  };

  const scrollViewRef = useRef(null);

  return (
    <>
      <Center flex={5}>
        <FormControl isRequired isInvalid={!newName}>
          <Input
            onChangeText={text => {
              setChangesMade(true);
              text?.length < 25 && setNewName(text);
            }}
            value={newName}
            placeholder={'Name'}
            fontSize={22}
            margin={2}
            marginTop={10}
            minWidth={200}
          />
        </FormControl>
        <Center flex={3}>
          <ScrollView persistentScrollbar ref={scrollViewRef}>
            {newTimers.map((timer: Timer) => (
              <TimerInput
                key={timer.id}
                text={timer.text}
                totalTime={timer.totalTime}
                deleteTimer={deleteTimer}
                updateTimer={updateTimer}
                id={timer.id}
                soundName={timer.soundName}
                soundCounter={timer.soundCounter}
              />
            ))}
          </ScrollView>
        </Center>
        <CustomButton
          onPress={addTimer}
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
          disabled={!changesMade}
          onPress={async () => {
            const success = await saveMeditation({
              name: newName,
              id,
              timers: newTimers,
            });
            if (success) {
              setChangesMade(false);
            }
          }}
          iconName={'save'}
        />
        <CustomButton
          onPress={() => {
            if (changesMade) {
              setShowExitModal(true);
            } else {
              navigation.navigate('Home');
            }
          }}
          iconName={'home'}
        />
        <CustomButton
          onPress={() => setShowDeleteModal(true)}
          iconName={'trash'}
        />
      </BottomBar>
      <ConfirmModal
        headerText={'Confirm to delete'}
        showModal={showDeleteModal}
        onConfirm={async () => {
          const success = await deleteMeditation(id);
          if (success) {
            navigation.navigate('Home');
          }
        }}
        onClose={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
      />
      <ConfirmModal
        headerText={'Do you want to Save before exiting?'}
        showModal={showExitModal}
        onConfirm={async () => {
          const success = await saveMeditation({
            name: newName,
            id,
            timers: newTimers,
          });
          if (success) {
            navigation.navigate('Home');
          }
        }}
        onClose={() => setShowExitModal(false)}
        onCancel={() => {
          setShowExitModal(false);
          navigation.navigate('Home');
        }}
      />
    </>
  );
};

const WithBackground = ({
  route,
}: {
  route: RouteProp<{params: {meditation: Meditation}}, 'params'>;
}) => (
  <BackGround>
    <Editor route={route} />
  </BackGround>
);

export default WithBackground;
