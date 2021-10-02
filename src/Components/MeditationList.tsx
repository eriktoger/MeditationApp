import React, {useEffect, useState} from 'react';
import MeditationCard from './MeditationCard';
import {Meditation} from '../Interfaces';
import {getAllMeditations} from '../Services/meditation';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'native-base';

const MeditationList = () => {
  const [meditations, setMediations] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getAllMeditations().then((response = []) => {
      setMediations(response);
    });
  }, [isFocused]);

  return (
    <ScrollView persistentScrollbar>
      {meditations.map(meditation => (
        <MeditationCard meditation={meditation} key={meditation.id} />
      ))}
    </ScrollView>
  );
};

export default MeditationList;
