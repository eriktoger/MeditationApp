import React from 'react';
import {Box, Button, Center, Text, useTheme} from 'native-base';
import {anonymousLogin, facebookLogin, googleLogin} from '../Services/login';
import {Icon} from 'native-base';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import BackGround from '../Components/Background';

const LoginButton = ({
  onPress,
  iconName,
  text,
}: {
  onPress: () => void;
  iconName: string;
  text: string;
}) => (
  <Button
    colorScheme="seeThrough"
    onPress={onPress}
    startIcon={<Icon as={FontAwsome} name={iconName} color="#cccccc" />}
    justifyContent="flex-start"
    borderRadius={15}>
    <Text color={'white'} bold={true} fontSize={'md'}>
      {text}
    </Text>
  </Button>
);

const Login = () => {
  const {colors} = useTheme();
  return (
    <Center flex={1}>
      <Box borderRadius={15} backgroundColor={colors.primary['500']} margin={5}>
        <Text bold fontSize={20} margin={5} color="white">
          Choose a login method
        </Text>
      </Box>

      <Button.Group direction={'column'} size="lg">
        <LoginButton onPress={googleLogin} iconName="google" text="Google" />
        <LoginButton
          onPress={facebookLogin}
          iconName="facebook"
          text="Facebook"
        />
        <LoginButton
          onPress={anonymousLogin}
          iconName="user-secret"
          text="Anonymous"
        />
      </Button.Group>
    </Center>
  );
};

const WithBackground = () => (
  <BackGround>
    <Login />
  </BackGround>
);

export default WithBackground;
