import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { HoldMenuProvider } from 'react-native-hold-menu';
import { Home } from './src/screens/Home';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function App() {

  return (
    <HoldMenuProvider theme='dark' iconComponent={Feather}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Home />
      <Toast />
    </HoldMenuProvider>
  );
}
