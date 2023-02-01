import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider, Button, Center } from "native-base";
import store from "./src/app/store";
import { Provider } from "react-redux";
import WelcomeScreen from "./src/screens/WelcomeScreen";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <StatusBar />
          <WelcomeScreen />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </Provider>
  );
}