import React, {useEffect} from 'react';
import {Box, Center, HStack, Icon, Select, Text} from 'native-base';
import CustomButton from '../CustomButton';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import {playSound} from '../../Sounds';

const SoundPicker = ({
  soundName,
  soundCounter,
  updateSoundName,
  incrementSoundCounter,
  decrementSoundCounter,
}: {
  soundName: string;
  soundCounter: number;
  updateSoundName: (newSoundName: string) => void;
  incrementSoundCounter: () => void;
  decrementSoundCounter: () => void;
}) => {
  const disableSoundCounter = soundName === '' || soundName === 'No_sound';
  useEffect(() => playSound('No_sound'), []);
  return (
    <HStack justifyContent={'center'} marginY={3}>
      <Select
        width={'60%'}
        placeholder="Choose Sound"
        selectedValue={soundName}
        onValueChange={updateSoundName}
        _item={{_text: {color: '#cccccc'}}}
        _selectedItem={{
          _text: {fontSize: 'xl', fontWeight: '900', color: '#cccccc'},
        }}
        dropdownIcon={
          <Icon
            as={FontAwsome5}
            paddingLeft={1}
            name={'caret-down'}
            color={'#cccccc'}
            borderRadius="full"
            size={6}
          />
        }>
        <Select.Item label="Zen Bell" value="zenBuddhistTempleBell" />
        <Select.Item label="Bell Bigger" value="templeBellBigger" />
        <Select.Item label="Bell Huge" value="templeBellHuge" />
        <Select.Item label="No sound" value="No_sound" />
      </Select>
      <Center>
        <Box
          backgroundColor={'rgba(0,0,0,0.6)'}
          borderRadius={'full'}
          paddingX={3}
          paddingY={1}
          margin={1}>
          <Text fontSize="xl" color={'#cccccc'}>
            {disableSoundCounter ? '0' : soundCounter?.toString()}
          </Text>
        </Box>
      </Center>
      <CustomButton
        onPress={incrementSoundCounter}
        iconName={'plus'}
        iconSize={3}
        paddings={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
        disabled={disableSoundCounter}
      />
      <CustomButton
        onPress={decrementSoundCounter}
        iconName={'minus'}
        iconSize={3}
        paddings={{
          paddingLeft: 12,
          paddingRight: 12,
        }}
        disabled={disableSoundCounter}
      />
    </HStack>
  );
};

export default SoundPicker;
