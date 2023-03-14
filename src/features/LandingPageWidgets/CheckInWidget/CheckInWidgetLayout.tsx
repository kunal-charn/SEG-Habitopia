import { ScrollView, View, Heading } from "native-base";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function CheckInWidgetLayout(props: Props) {
  const { children } = props;
  return (
    <View paddingLeft={6} paddingRight={6}>
      <Heading shadow={1}>Check in 📝</Heading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    </View>
  );
}

export default CheckInWidgetLayout;
