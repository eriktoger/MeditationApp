import React from 'react';

import {Box, Center, HStack} from 'native-base';

const BottomBar: React.FC = ({children}) => (
  <Center flex={1}>
    <Box flex={1}>
      <HStack>{children}</HStack>
    </Box>
  </Center>
);

export default BottomBar;
