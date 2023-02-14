import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { HoldMenuProvider } from 'react-native-hold-menu';
import { Home } from './src/screens/Home';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function App() {
  const { getItem, setItem } = useAsyncStorage("@contextmenu");

  async function handleShowTag() {

    try {
      const response = await getItem();
      const data = response ? JSON.parse(response) : [];

      setItem(JSON.stringify(data));

      console.log("app");

    } catch (error) {
      console.log(error);
    }
  }
  handleShowTag();

  return (
    <HoldMenuProvider theme='dark' iconComponent={Feather}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Home />
      <Toast />
    </HoldMenuProvider>
  );
}
