import { useDispatch, useSelector } from "@app/hooks";
import { Button } from "native-base";
import React, { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { followUser } from "../profileSlice";

const FollowButton = () => {
  // get profile and request status from redux
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile?.profile);
  const { followUser: requestStatus } = useSelector((state) => state.profile);
  const { loading } = requestStatus;
  
  // function to handle follow/unfollow
  const handleFollow = async () => {
    if (!profile?.following) {
      // if not following, follow
      await dispatch(followUser(profile?.userId || ""));
    } else {
      Toast.show({
        type: "error",
        text1: "Already following!",
      });
    }
  };

  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  // if profile.following changes, show message to user
  useEffect(() => {
    if (profile && didMount) {
      if (profile.following == true) {
        Toast.show({
          type: "success",
          text1: "Followed user! ✅",
          text2: `You are now following ${profile.name}`,
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Unfollowed user! ✅",
          text2: `You are now no longer following ${profile.name}`,
        });
      }
    }
  }, [profile?.following]);

  const followButtonText = profile?.following ? "Following" : "Follow";

  return (
    <Button isLoading={loading} onPress={handleFollow} testID="follow-button">
      {followButtonText}
    </Button>
  );
};

export default FollowButton;
