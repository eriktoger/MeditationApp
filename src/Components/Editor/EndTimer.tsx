import {Box, Center, Input, Text} from 'native-base';
import React from 'react';
import {SoundPicker} from '.';
import {Timer} from '../../Interfaces';
import {playSound} from '../../Sounds';

const EndTimer = ({
  timer,
  updateTimer,
}: {
  timer: Timer;
  updateTimer: React.Dispatch<React.SetStateAction<Timer>>;
}) => {
  const {text, soundName, soundCounter} = timer;

  const updateSoundName = (newSoundName: string) => {
    playSound(newSoundName);
    updateTimer((oldTimer: Timer) => ({
      ...oldTimer,
      soundName: newSoundName,
    }));
  };

  const incrementSoundCounter = () =>
    updateTimer((oldTimer: Timer) => ({
      ...oldTimer,
      soundCounter: soundCounter + 1,
    }));

  const decrementSoundCounter = () =>
    updateTimer((oldTimer: Timer) => ({
      ...oldTimer,
      soundCounter: soundCounter - 1,
    }));

  return (
    <Box border={1} borderWidth={3} margin={1} borderRadius={15}>
      <Center marginY={2}>
        <Box backgroundColor={'rgba(0, 0, 0, 0.6)'} borderRadius={15}>
          <Text
            numberOfLines={1}
            color={'white'}
            bold={true}
            fontSize={20}
            marginX={3}>
            Ending sound
          </Text>
        </Box>
      </Center>
      <Input
        onChangeText={newText =>
          updateTimer((oldTimer: Timer) => ({...oldTimer, text: newText}))
        }
        value={text}
        margin={2}
        padding={2}
        placeholder={'Ending text'}
      />
      <SoundPicker
        soundName={soundName}
        soundCounter={soundCounter}
        updateSoundName={updateSoundName}
        incrementSoundCounter={incrementSoundCounter}
        decrementSoundCounter={decrementSoundCounter}
      />
    </Box>
  );
};

export default EndTimer;
