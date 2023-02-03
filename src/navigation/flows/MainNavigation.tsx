import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../screens/Home";
import Explore from "../../screens/Explore";
import Leaderboard from "../../screens/Leaderboard";
import Profile from "../../screens/Profile";
import ChatList from "../../screens/Chat/ChatList";
import Chat from "../../screens/Chat/Chat";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chat" component={Chat}/>
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="You" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
