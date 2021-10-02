import React from 'react';
import {Button, Icon} from 'native-base';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';

const CustomButton = ({
  onPress,
  iconName,
  paddings = {},
  iconSize = 10,
  disabled = false,
}: {
  onPress: () => void;
  iconName: string;
  paddings?: object;
  iconSize?: number;
  disabled?: boolean;
}) => {
  return (
    <Button
      colorScheme="seeThrough"
      borderRadius={15}
      margin={1}
      onPress={onPress}
      disabled={disabled}
      startIcon={
        <Icon
          as={FontAwsome5}
          name={iconName}
          color={'#cccccc'}
          borderRadius="full"
          size={iconSize}
        />
      }
      style={paddings}
    />
  );
};

export default CustomButton;
