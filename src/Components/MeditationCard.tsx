import React from 'react';
import {Box, Button, Center, HStack, Icon, Text} from 'native-base';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import {Meditation} from '../Interfaces';
import {NavigationContext} from '../Contexts';
import {getTimeFromSeconds} from '../helpers';

const MeditationCard = ({meditation}: {meditation: Meditation}) => {
  const totalTime = meditation.timers.reduce(
    (sum, timer) => (sum += timer.totalTime),
    0,
  );
  const [hour, min, sec] = getTimeFromSeconds(totalTime);
  return (
    <NavigationContext.Consumer>
      {navigation => (
        <HStack>
          <Button
            colorScheme="seeThrough"
            paddingX={2}
            width={200}
            marginY={1}
            borderLeftRadius={15}
            borderRadius={0}
            height={90}
            justifyContent="flex-start"
            onPress={() =>
              navigation.navigate('MeditationTimer', {meditation})
            }>
            <Text
              numberOfLines={1}
              color={'white'}
              bold={true}
              fontSize={20}
              paddingTop={2}>
              {meditation.name}
            </Text>
            <HStack marginTop={3}>
              <Icon
                backgroundColor={'black'}
                as={FontAwsome5}
                borderRadius="full"
                name={'clock'}
                color={'#cccccc'}
                marginBottom={5}
                size={8}
              />
              <Box
                _text={{color: 'white', bold: true, fontSize: 18}}
                paddingLeft={2}
                paddingTop={1}>
                {`${hour}:${min}:${sec}`}
              </Box>
            </HStack>
          </Button>

          <Button
            borderRightRadius={15}
            borderLeftRadius={0}
            height={90}
            marginY={1}
            width={50}
            onPress={() => navigation.navigate('Editor', {meditation})}>
            <Center flex={1}>
              <Icon as={FontAwsome5} name={'pen'} color={'white'} size={8} />
            </Center>
          </Button>
        </HStack>
      )}
    </NavigationContext.Consumer>
  );
};

export default MeditationCard;
