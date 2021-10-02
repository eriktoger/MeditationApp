import React from 'react';
import {Input} from 'native-base';

const TimeField = ({
  setter,
  time,
}: {
  setter: (value: string) => void;
  time: number;
}) => (
  <Input
    textAlign={'center'}
    margin={1}
    fontSize={18}
    padding={4}
    borderRadius="full"
    keyboardType="numeric"
    onChangeText={value => setter(value)}
    value={time.toString()}
  />
);

export default TimeField;
