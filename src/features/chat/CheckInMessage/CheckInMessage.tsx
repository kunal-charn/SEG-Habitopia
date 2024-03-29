import { Pressable, View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Message } from "types";
import { useSelector } from "@app/hooks";
import { useDispatch } from "../../../app/hooks";
import { validateCheckIn } from "../chatSlice";
import moment from "moment";
import { Toast } from "react-native-toast-message/lib/src/Toast";

/**
 * A check-in message that can be validated when pressed
 *
 * @param props - The properties passed to the component.
 * @returns - The check-in message component.
 */
const CheckInMessage = (message: Message) => {
  const { user } = useSelector((store) => store.auth);
  function isMessage() {
    return message.userID === user?.userId;
  }
  const dispatch = useDispatch();

  const validatingCheckIn = () => {
    if (!isMessage()) {
      dispatch(validateCheckIn(message.id || ""));
    } else {
      Toast.show({
        type: "error",
        text1: "Nice try! Can't validate yourself",
      });
    }
  };

  return (
    <Pressable onPress={validatingCheckIn}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: message.isValidated ? "#33FF71" : "#FF3633",
          },
        ]}
      >
        <Text>{message.userName}</Text>
        <Text>{message.text}</Text>
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
        {isMessage() ? (
          <Text style={styles.count}>
            You have {message.validationCount} validations
          </Text>
        ) : (
          <Text>
            Tap to validate, current validations: {message.validationCount}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 20,
  },

  time: {
    color: "black",
    alignSelf: "flex-end",
  },

  count: {
    color: "black",
    alignSelf: "flex-start",
  },
});

export default CheckInMessage;
