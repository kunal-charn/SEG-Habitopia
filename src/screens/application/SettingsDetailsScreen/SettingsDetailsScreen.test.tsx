// React
import React from "react";

// React Native Testing Library
import { render, screen } from "@testing-library/react-native";

// Redux
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

// Native Base
import { NativeBaseProvider } from "native-base";

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Habitopia
import SettingsDetailsScreen from "@screens/application/SettingsDetailsScreen";
import { SettingsState } from "@features/settings/settingsSlice";

it("Renders correctly.", () => {
  const MOCK_SETTINGS_STATE: SettingsState = {
    settings: {
      email: "",
      password: "",
      notifications: false,
      name: "",
      biography: "",
    },
    fetchSettings: {
      loading: false,
      error: "",
    },
    setSettings: {
      loading: false,
      error: "",
    },
  };

  const MOCK_STORE = configureStore([thunk])({
    settings: MOCK_SETTINGS_STATE,
  });

  const Stack = createNativeStackNavigator();

  render(
    <NativeBaseProvider>
      <Provider store={MOCK_STORE}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SettingsDetailsScreen"
              component={SettingsDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );

  expect(screen.toJSON()).toMatchSnapshot();
});