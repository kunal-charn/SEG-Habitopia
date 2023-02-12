import { VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Challenge } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import StatusContainer from "../../../components/StatusContainer/StatusContainer";
import ChallengeBox from "../ChallengeBox/ChallengeBox";
import ChallengeModal from "../ChallengeModal/ChallengeModal";
import { fetchChallenges } from "../challengesSlice";

type Props = {};

const ChallengeBoxes = (props: Props) => {
  const { challenges, loading, error } = useAppSelector(
    (state) => state.challenges
  );
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const allChallenges = [
    {
      name: "Sleep",
      description: "Study everyday for a minimum of 5 hours or u not sigma lol",
      active: true,
      color: "cornflowerblue",
      image: "https://media.tenor.com/qr1kVztk6uwAAAAM/sleepy-bed-time.gif",
    },
    {
      name: "Food",
      description: "Sleep earlier or u not sigma lol",
      active: true,
      color: "limegreen",
      image:
        "https://blog.bareminerals.com/wp-content/uploads/2019/07/BareBlog_CleanMealPlans_animation-2.gif",
    },
    {
      name: "Fitness",
      description: "jim or u not sigma lol",
      active: false,
      color: "black",
      image:
        "https://media.tenor.com/7WEoh2-8BxsAAAAC/free-weights-dumbbell.gif",
    },
    {
      name: "Sleep",
      description: "Study everyday for a minimum of 5 hours or u not sigma lol",
      active: true,
      color: "cornflowerblue",
      image: "https://media.tenor.com/qr1kVztk6uwAAAAM/sleepy-bed-time.gif",
    },
    {
      name: "Food",
      description: "Sleep earlier or u not sigma lol",
      active: true,
      color: "limegreen",
      image:
        "https://blog.bareminerals.com/wp-content/uploads/2019/07/BareBlog_CleanMealPlans_animation-2.gif",
    },
    {
      name: "Fitness",
      description: "jim or u not sigma lol",
      active: false,
      color: "black",
      image:
        "https://media.tenor.com/7WEoh2-8BxsAAAAC/free-weights-dumbbell.gif",
    },
  ]; // useAppSelector((state) => state.challenges.challenges); BACKEND_PLACEHOLDER

  useEffect(() => {
    dispatch(fetchChallenges());
  });

  return (
    <StatusContainer loading={loading} error={error} data={allChallenges}>
      <VStack space={3} width={"100%"}>
        {allChallenges.map((entry, index) => (
          <>
            <ChallengeBox
              name={entry.name}
              onGoing={entry.active}
              color={entry.color}
              image={entry.image}
              onPress={() => setModalVisible(true)}
              key={index}
            />
            <ChallengeModal />
          </>
        ))}
      </VStack>
    </StatusContainer>
  );
};

export default ChallengeBoxes;
