import React, {useState, useEffect, useRef} from 'react';
import {Box, Center, Icon, HStack, Text, ITextProps} from 'native-base';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import {getTimeFromSeconds} from '../helpers';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Meditation, RootStackParamList, Timer} from '../Interfaces';
import {RouteProp} from '@react-navigation/native';
import {getSound} from '../Sounds';
import BottomBar from '../Components/BottomBar';
import CustomButton from '../Components/CustomButton';
import BackGround from '../Components/Background';

type timerScreenProp = StackNavigationProp<
  RootStackParamList,
  'MeditationTimer'
>;

const TimeBox = ({
  time,
  primary = false,
}: {
  time: string;
  primary?: boolean;
}) => {
  return (
    <>
      <Box
        margin={1}
        _text={{
          color: '#cccccc',
          bold: true,
          fontSize: primary ? 40 : 20,
        }}
        backgroundColor={'rgba(0,0,0,0.6)'}
        padding={3}
        borderRadius="full">
        {time}
      </Box>
    </>
  );
};

const startSound = (
  timer: Timer,
  soundRef: React.MutableRefObject<any>,
  timerRef: React.MutableRefObject<any>,
) => {
  const newSound = getSound(timer?.soundName);
  let soundCounter = timer?.soundCounter;

  if (newSound) {
    soundRef.current?.stop();
    soundRef.current = newSound;

    const playingSounds = (counter: number) => {
      soundRef.current.setPan(1);
      soundRef.current.play();
      soundCounter--;
      if (soundCounter > 0) {
        timerRef.current = setTimeout(
          () => playingSounds(counter),
          soundRef.current.getDuration() * 1000,
        );
      }
    };

    playingSounds(soundCounter);
  }
};

const TextBox = ({
  text,
  height,
  fontSize = 'xl',
}: {
  text: string;
  height: number;
  fontSize?: ITextProps['fontSize'];
}) => {
  return (
    <Box height={height}>
      <Box
        backgroundColor={text ? 'rgba(0,0,0,0.6)' : ''}
        borderRadius={15}
        paddingX={3}
        paddingY={1}>
        <Text fontSize={fontSize} color={'#cccccc'}>
          {text}
        </Text>
      </Box>
    </Box>
  );
};

const MeditationTimer = ({
  route,
}: {
  route: RouteProp<{params: {meditation: Meditation}}, 'params'>;
}) => {
  const navigation = useNavigation<timerScreenProp>();
  const {meditation} = route.params;
  const totalTime = meditation.timers.reduce(
    (sum, timer) => (sum += timer.totalTime),
    0,
  );
  const [seconds, setSeconds] = useState(totalTime);
  const [index, setIndex] = useState(0);
  const [subSeconds, setSubSeconds] = useState(meditation.timers[0].totalTime);
  const [paused, setPaused] = useState(true);
  const resetState = () => {
    setSeconds(totalTime);
    setIndex(0);
    setSubSeconds(meditation.timers[0].totalTime);
    setPaused(true);
  };
  const firstSound = getSound(meditation.timers[0].soundName);
  const soundRef = useRef(firstSound);
  const timerRef = useRef();
  const [hour, min, sec] = getTimeFromSeconds(seconds);
  const [subHour, subMin, subSec] = getTimeFromSeconds(subSeconds);
  const iconName = paused ? 'play-circle' : 'pause-circle';
  const text = meditation.timers[index]?.text ?? 'Meditation Complete';
  const sessionText = `${Math.min(index + 1, meditation.timers.length)} / ${
    meditation.timers.length
  }`;

  useEffect(() => {
    const timer = setInterval(async () => {
      if (!paused && seconds > 0) {
        setSeconds(count => count - 1);
        setSubSeconds(count => count - 1);
        if (subSeconds === 1) {
          startSound(meditation.timers[index], soundRef, timerRef);
          setSubSeconds(meditation.timers[index + 1]?.totalTime ?? 0);
          setIndex(i => i + 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [index, meditation.timers, paused, seconds, subSeconds]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timerRef.current && clearInterval(timerRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      soundRef.current?.stop();
    };
  }, []);
  return (
    <>
      <Center flex={6}>
        <TextBox text={meditation.name} height={50} />
        <Icon
          backgroundColor={'rgba(0,0,0,0.6)'}
          as={FontAwsome5}
          borderRadius="full"
          name={iconName}
          color={'#cccccc'}
          size={20}
          marginBottom={5}
          onPress={() => {
            if (soundRef.current && !paused) {
              soundRef.current?.stop();
              soundRef.current.pause();
              if (timerRef.current) {
                clearTimeout(timerRef.current);
              }
            }
            setPaused(p => !p);
          }}
          disabled={seconds === 0}
        />
        <HStack space={2} marginBottom={2}>
          <TimeBox primary time={subHour} />
          <TimeBox primary time={subMin} />
          <TimeBox primary time={subSec} />
        </HStack>
        <TextBox text={text} height={50} />
      </Center>
      <BottomBar>
        <CustomButton iconName={'home'} onPress={() => navigation.goBack()} />
        <Center>
          <HStack>
            <TimeBox time={hour} />
            <TimeBox time={min} />
            <TimeBox time={sec} />
          </HStack>
          <TextBox height={10} text={sessionText} fontSize={'md'} />
        </Center>
        <CustomButton iconName={'undo'} onPress={() => resetState()} />
      </BottomBar>
    </>
  );
};

const WithBackground = ({
  route,
}: {
  route: RouteProp<{params: {meditation: Meditation}}, 'params'>;
}) => (
  <BackGround>
    <MeditationTimer route={route} />
  </BackGround>
);

export default WithBackground;
