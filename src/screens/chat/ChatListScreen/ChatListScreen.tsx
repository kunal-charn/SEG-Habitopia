import React, { useEffect } from "react";
import { FlatList } from "react-native";
import ChatItem from "../../../features/chat/ChatItem";
import { useDispatch, useSelector } from "../../../app/hooks";
import { fetchChats } from "../../../features/chat/chatSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatParams } from "types";

type Props = {};

const ChatListScreen = (props: Props) => {
  const { chats, fetchChats: requestStatus } = useSelector(
    (state) => state.chats
  );

  const { error, loading } = requestStatus;
  const navigation = useNavigation<NativeStackNavigationProp<ChatParams>>();

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(fetchChats());
    });
  }, [navigation]);

  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => (
        <ChatItem
          id={item.id}
          name={item.name}
          image={item.image}
          text={item.text}
          time={item.time}
        />
      )}
    />
  );
};

export default ChatListScreen;