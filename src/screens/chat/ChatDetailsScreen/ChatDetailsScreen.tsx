import { useDispatch, useSelector } from "@app/hooks";
import PaddedContainer from "@components/PaddedContainer";
import StatusContainer from "@components/StatusContainer/StatusContainer";
import { fetchDetails } from "@features/chat/chatSlice";
import Header from "@features/chat/Header/Header";
import ParticipantsList from "@features/chat/ParticipantsList/ParticipantsList";
import Statistics from "@features/chat/Statistics/Statistics";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Box } from "native-base";
import React, { useEffect } from "react";
import { RootParams } from "types";

type Props = {};

const ChatDetailsScreen = (props: Props) => {
  const { currentChatId } = useSelector((state) => state.chats);

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.chats.fetchDetails);
  const { details } = useSelector((state) => state.chats);

  useEffect(() => {
    currentChatId && dispatch(fetchDetails(currentChatId));
  }, []);

  return (
    <Box backgroundColor={"black"}>
      <PaddedContainer>
        <StatusContainer loading={loading} error={error} data={details}>
          <Header
            name={details?.challengeName || "Erro"}
            description={details?.description || "Error"}
          />
          <Statistics />
          <ParticipantsList />
        </StatusContainer>
      </PaddedContainer>
    </Box>
  );
};

export default ChatDetailsScreen;
