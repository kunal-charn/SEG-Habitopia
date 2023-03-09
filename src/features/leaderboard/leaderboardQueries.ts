import { DataStore, SortDirection, Auth } from "aws-amplify";
import { Leaderboard, User, Checkin } from "../../models";
import { getUserFromDatabasebyID } from "@app/util";

/**
 * Subscribes to the checkin model 
 * updates the leaderboard model when the user checks in
 */
const updateLeaderboard = DataStore.observe(Checkin).subscribe({
  next: async (msg) => {
    if (msg.opType === "INSERT") {
      const checkin = msg.element as Checkin;
      const { userID, checkinChallengeTypeId } = checkin;
      const currentUserID = (await Auth.currentAuthenticatedUser()).attributes.sub;
      const user = await getUserFromDatabasebyID(userID);
      if (currentUserID === userID) {
        const leaderboardEntry = await fetchLeaderboardByUserIDAndChallengeType(
          userID,
          checkinChallengeTypeId as string
        );
        const currentCheckins = leaderboardEntry?.numberOfCheckins ?? 0;
        const newCheckins = currentCheckins + 1;
        if (currentCheckins === 0) {
          await DataStore.save(
            new Leaderboard({
              leaderboardUserId: userID,
              numberOfCheckins: newCheckins,
              leaderboardChallengeTypeId: checkinChallengeTypeId as string,
              User: user,
            })
          );
        } else {
          await DataStore.save(
            Leaderboard.copyOf(leaderboardEntry, (updated) => {
              updated.numberOfCheckins = newCheckins;
            })
          );
        }
      }
    }
  },
  error: (err) => console.error(err),
});

/**
 * returns the leaderboard values for a given challenge type and page as a key value pair of name and number of checkins
 * @param challengeType a string representing the challenge type
 * @param page a number representing the page of the leaderboard
 * @returns key value pair of name and number of checkins
 */
export const fetchLeaderboardData = async (
  challengeType: string,
  page: number
) => {
  const data = await DataStore.query(
    Leaderboard,
    (entry) => entry.ChallengeType.name.eq(challengeType),
    {
      page: page as number,
      limit: 10,
      sort: (entry) => entry.numberOfCheckins(SortDirection.DESCENDING),
    }
  );
  const leaderboard = data.map((entry) => {
    return {
      id: entry.leaderboardUserId,
      checkins: entry.numberOfCheckins,
    };
  });
  const result = await Promise.all(
    leaderboard.map(async (entry) => {
      const user = await DataStore.query(User, entry.id);
      return {
        name: user?.name,
        checkins: entry.checkins,
      };
    })
  );
  const serializableResult = [
    ...result.map((item) => {
      return { checkins: item.checkins, name: item.name };
    }),
  ];
  return serializableResult;
};

/**
 * fetches the leaderboard entry for a given user and challenge type
 * @param userID id of the user
 * @param challengeType name of the challenge type
 * @returns leaderboard entry
 */
export const fetchLeaderboardByUserIDAndChallengeType = async (
  userID: string,
  challengeType: string
) => {
  const [leaderboardEntry] = await DataStore.query(Leaderboard, (entry) =>
    entry.and((entry) => [
      entry.leaderboardUserId.eq(userID),
      entry.ChallengeType.name.eq(challengeType),
    ])
  );
  return leaderboardEntry;
};