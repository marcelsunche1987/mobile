import { Navigation } from './src/navigation/Navigation';
import React from 'react';
import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthenticatedContext';
import { Provider as PaperProvider } from 'react-native-paper';
import SorensonTheme from './src/theme';

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={SorensonTheme}>
        <Navigation />
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
