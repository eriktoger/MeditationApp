import React, {useState} from 'react';
import {Box, HStack, Input} from 'native-base';
import {Timer} from '../../Interfaces';
import {playSound} from '../../Sounds';
import {TimeField, SoundPicker} from '.';
import CustomButton from '../CustomButton';

const isNumeric = (value: number) => /^-?\d+$/.test(value.toString());

const TimerInput = ({
  text = '',
  totalTime = 0,
  id,
  soundName,
  soundCounter,
  deleteTimer,
  updateTimer,
}: {
  text?: string;
  totalTime?: number;
  id: string;
  soundName: string;
  soundCounter: number;
  deleteTimer: (timer: string) => void;
  updateTimer: (timer: Timer) => void;
}) => {
  const [newText, setNewText] = useState(text ?? '');
  const hour = Math.floor(totalTime / 3600);
  const minutes = Math.floor(totalTime / 60) % 60;
  const seconds = totalTime % 60;
  const [newHours, setNewHours] = useState(hour);
  const [newMinutes, setNewMinutes] = useState(minutes);
  const [newSeconds, setNewSeconds] = useState(seconds);
  const [newSoundName, setNewSoundName] = useState(soundName);
  const [newSoundCounter, setNewSoundCounter] = useState(soundCounter);
  const newMeditation = {
    id,
    text: newText,
    totalTime: newHours * 3600 + newMinutes * 60 + newSeconds,
    soundName: newSoundName,
    soundCounter: newSoundCounter,
  };

  const parseHours = (value: string) => {
    const number = parseInt(value, 10);
    if (isNumeric(number)) {
      const newTime = Math.min(59, number);
      setNewHours(newTime);
      const newTotalTime = newTime * 3600 + newMinutes * 60 + newSeconds;
      updateTimer({
        ...newMeditation,
        totalTime: newTotalTime,
      });
    } else {
      setNewHours(0);
    }
  };

  const parseMinutes = (value: string) => {
    const number = parseInt(value, 10);
    if (isNumeric(number)) {
      const newTime = Math.min(59, number);
      setNewMinutes(newTime);
      const newTotalTime = newHours * 3600 + newTime * 60 + newSeconds;
      updateTimer({
        ...newMeditation,
        totalTime: newTotalTime,
      });
    } else {
      setNewMinutes(0);
    }
  };

  const parseSeconds = (value: string) => {
    const number = parseInt(value, 10);
    if (isNumeric(number)) {
      const newTime = Math.min(59, number);
      setNewSeconds(newTime);
      const newTotalTime = newHours * 3600 + newMinutes * 60 + newTime;
      updateTimer({
        ...newMeditation,
        totalTime: newTotalTime,
      });
    } else {
      setNewSeconds(0);
    }
  };

  const updateSoundName = (value: string) => {
    playSound(value);
    setNewSoundName(value);
    updateTimer({...newMeditation, soundName: value});
  };

  const incrementSoundCounter = () => {
    setNewSoundCounter(oldValue => oldValue + 1);
    updateTimer({...newMeditation, soundCounter: newSoundCounter + 1});
  };

  const decrementSoundCounter = () => {
    setNewSoundCounter(oldValue => Math.max(oldValue - 1, 1));
    updateTimer({
      ...newMeditation,
      soundCounter: Math.max(newSoundCounter - 1, 1),
    });
  };

  return (
    <Box border={1} borderWidth={3} margin={1} borderRadius={15}>
      <Input
        onChangeText={value => {
          setNewText(value);
          updateTimer({...newMeditation, text: value});
        }}
        value={newText}
        margin={2}
        padding={2}
        placeholder={'Session text'}
      />
      <HStack justifyContent={'center'}>
        <TimeField setter={parseHours} time={newHours} />
        <TimeField setter={parseMinutes} time={newMinutes} />
        <TimeField setter={parseSeconds} time={newSeconds} />
        <CustomButton
          onPress={() => deleteTimer(id)}
          iconName={'trash'}
          iconSize={7}
        />
      </HStack>
      <SoundPicker
        soundName={newSoundName}
        soundCounter={newSoundCounter}
        updateSoundName={updateSoundName}
        incrementSoundCounter={incrementSoundCounter}
        decrementSoundCounter={decrementSoundCounter}
      />
    </Box>
  );
};

export default TimerInput;
