import { Box, Card, Heading, Text } from "native-base";
import React from "react";
import { Statistic } from "../../../../types";

type Props = {
  statistic: Statistic;
};

const ProfileStatistic = (props: Props) => {
  const { statistic } = props;
  const { name, quantity } = statistic;

  return (
    <Box shadow="3" width="50%" padding={2}>
      <Card backgroundColor="blue.100">
        <Heading>{quantity}</Heading>
        <Text>{name}</Text>
      </Card>
    </Box>
  );
};

export default ProfileStatistic;
