import { useDispatch, useSelector } from "@app/hooks";
import Background from "@components/Background";
import PaddedContainer from "@components/PaddedContainer";
import StatusContainer from "@components/StatusContainer/StatusContainer";
import { fetchDetails } from "@features/chat/chatSlice";
import Header from "@features/chat/Header/Header";
import ParticipantsList from "@features/chat/ParticipantsList/ParticipantsList";
import Statistics from "@features/chat/Statistics/Statistics";
import { ScrollView } from "native-base";
import React, { useEffect } from "react";

type Props = {};

/**
 * @returns A react component that displays the details of a chat, including
 * the challenge name, description, statistics, and participants.
 */
const ChatDetailsScreen = (props: Props) => {
  const { currentChatId } = useSelector((state) => state.chats);

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.chats.fetchDetails);
  const { details } = useSelector((state) => state.chats);

  useEffect(() => {
    currentChatId && dispatch(fetchDetails(currentChatId));
  }, []);

  return (
    <Background>
      <ScrollView>
        <PaddedContainer>
          <StatusContainer loading={loading} error={error} data={details}>
            <Header
              name={details?.challengeName || "Error"}
              description={details?.description || "Error"}
            />
            <Statistics />
          </StatusContainer>
          <ParticipantsList />
        </PaddedContainer>
      </ScrollView>
    </Background>
  );
};

export default ChatDetailsScreen;
