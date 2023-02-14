import React from "react";
import { View } from "react-native";

import { TextType } from "../../../../types";
import Text from "../../../components/Text";
import PaddedContainer from "../../../components/PaddedContainer";
import Background from "../../../components/Background";
import styles from "../../../constants/Styles";
import PasswordForm from "../../../features/auth/PasswordForm";

const Password = () => {
  return (
    <Background>
      <PaddedContainer>
        <View style={[styles.maxSize, { paddingTop: "10%" }]}>
          <Text type={TextType.Heading} style={{ marginBottom: "10%" }}>
            What's your password?
          </Text>
          <PasswordForm />
        </View>
      </PaddedContainer>
    </Background>
  );
};

export default Password;