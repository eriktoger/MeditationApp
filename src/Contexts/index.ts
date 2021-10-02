import {createContext} from 'react';
export const NavigationContext = createContext({
  navigate: (route: string, params?: any) =>
    console.log(route, ' navigation disabled: ', params),
});
