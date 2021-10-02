import React from 'react';
import {Center, extendTheme, NativeBaseProvider} from 'native-base';

import {ImageBackground, StyleSheet} from 'react-native';

const firstImage = require('../../images/soderasen1.jpg');

const BackGround: React.FC = ({children}) => {
  const theme = extendTheme({
    colors: {
      // Add new color
      seeThrough: {500: 'rgba(0, 0, 0, 0.6)', 700: 'rgba(0, 0, 0, 0.8)'},
      //change Primary
      primary: {500: '#0a96c4', 700: '#055b78'},
    },
    components: {
      Input: {
        baseStyle: {backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#cccccc'},
        defaultProps: {},
        variants: {},
        sizes: {},
      },
      ModalContent: {
        baseStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      ModalHeader: {
        baseStyle: {
          _text: {color: '#cccccc'},
        },
      },
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <ImageBackground
        source={firstImage}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Center flex={1}>{children}</Center>
      </ImageBackground>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});

export default BackGround;
