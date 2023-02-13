import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootParams = {
  Auth: undefined;
  Existing: undefined;
  Chat: undefined;
};

export type ProfileParams = {
  Home: undefined;
  ChatList: undefined;
  Welcome: undefined;
  Explore: undefined;
  Leaderboard: undefined;
  You: undefined;
};

export type AuthParams = {
  Welcome: undefined;
  SignUp: undefined;
  LogIn: undefined;
};

export type ChatParams = {
  Chats: undefined;
  IndividualChat: {
    id: string;
  };
};

export type IndividualChatScreenNavigationProp = NativeStackNavigationProp<
  ChatParams,
  "IndividualChat"
>;

export type LocalUser = {
  authToken: string;
  userId: string;
};

export type Challenge = {
  name: string;
  description: string;
  active: boolean;
};

export type Profile = {
  userId: number;
  name: string;
  biography: string;
  rankings: Array<object>;
  statistics: object;
  friends: undefined;
  friendStatus: undefined;
};

export type Statistic = {
  name: string;
  quantity: number;
};

export type Chat = {
  id: string;
  name: string;
  image: string;
  text: string;
  time: string;
};
