import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum MessageEnum {
  TEXT = "TEXT",
  CHECKIN = "CHECKIN",
  VALIDATION = "VALIDATION"
}

export enum ChallengeStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  COMPLETED = "COMPLETED"
}



type EagerFollow = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Follow, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly followingUser?: User | null;
  readonly followedBy?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly followFollowingUserId?: string | null;
  readonly followFollowedById?: string | null;
}

type LazyFollow = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Follow, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly followingUser: AsyncItem<User | undefined>;
  readonly followedBy: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly followFollowingUserId?: string | null;
  readonly followFollowedById?: string | null;
}

export declare type Follow = LazyLoading extends LazyLoadingDisabled ? EagerFollow : LazyFollow

export declare const Follow: (new (init: ModelInit<Follow>) => Follow) & {
  copyOf(source: Follow, mutator: (draft: MutableModel<Follow>) => MutableModel<Follow> | void): Follow;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly biography?: string | null;
  readonly email?: string | null;
  readonly notifications?: boolean | null;
  readonly streakStart?: string | null;
  readonly Messages?: (Checkin | null)[] | null;
  readonly ChatRooms?: (UserChatRoom | null)[] | null;
  readonly Checkins?: (Checkin | null)[] | null;
  readonly challenges?: (ChallengeUser | null)[] | null;
  readonly validatedCheckIns?: (UserValidatedCheckIn | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly image?: string | null;
  readonly biography?: string | null;
  readonly email?: string | null;
  readonly notifications?: boolean | null;
  readonly streakStart?: string | null;
  readonly Messages: AsyncCollection<Checkin>;
  readonly ChatRooms: AsyncCollection<UserChatRoom>;
  readonly Checkins: AsyncCollection<Checkin>;
  readonly challenges: AsyncCollection<ChallengeUser>;
  readonly validatedCheckIns: AsyncCollection<UserValidatedCheckIn>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerCheckin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checkin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeStamp?: string | null;
  readonly userID: string;
  readonly chatroomID: string;
  readonly validationCount?: number | null;
  readonly isValidated?: boolean | null;
  readonly validatedBy?: (UserValidatedCheckIn | null)[] | null;
  readonly ChallengeType?: ChallengeType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly checkinChallengeTypeId?: string | null;
}

type LazyCheckin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Checkin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly timeStamp?: string | null;
  readonly userID: string;
  readonly chatroomID: string;
  readonly validationCount?: number | null;
  readonly isValidated?: boolean | null;
  readonly validatedBy: AsyncCollection<UserValidatedCheckIn>;
  readonly ChallengeType: AsyncItem<ChallengeType | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly checkinChallengeTypeId?: string | null;
}

export declare type Checkin = LazyLoading extends LazyLoadingDisabled ? EagerCheckin : LazyCheckin

export declare const Checkin: (new (init: ModelInit<Checkin>) => Checkin) & {
  copyOf(source: Checkin, mutator: (draft: MutableModel<Checkin>) => MutableModel<Checkin> | void): Checkin;
}

type EagerChallengeType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChallengeType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly active: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChallengeType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChallengeType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly active: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChallengeType = LazyLoading extends LazyLoadingDisabled ? EagerChallengeType : LazyChallengeType

export declare const ChallengeType: (new (init: ModelInit<ChallengeType>) => ChallengeType) & {
  copyOf(source: ChallengeType, mutator: (draft: MutableModel<ChallengeType>) => MutableModel<ChallengeType> | void): ChallengeType;
}

type EagerChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Messages?: (Checkin | null)[] | null;
  readonly users?: (UserChatRoom | null)[] | null;
  readonly Checkins?: (Checkin | null)[] | null;
  readonly LastMessage?: Message | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
}

type LazyChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Messages: AsyncCollection<Checkin>;
  readonly users: AsyncCollection<UserChatRoom>;
  readonly Checkins: AsyncCollection<Checkin>;
  readonly LastMessage: AsyncItem<Message | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly chatroomID: string;
  readonly userID: string;
  readonly messageType?: MessageEnum | keyof typeof MessageEnum | null;
  readonly getCheckin?: Checkin | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly messageGetCheckinId?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly chatroomID: string;
  readonly userID: string;
  readonly messageType?: MessageEnum | keyof typeof MessageEnum | null;
  readonly getCheckin: AsyncItem<Checkin | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly messageGetCheckinId?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerChallenge = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Challenge, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChallengeType: ChallengeType;
  readonly Users?: (ChallengeUser | null)[] | null;
  readonly status?: ChallengeStatusEnum | keyof typeof ChallengeStatusEnum | null;
  readonly started?: number | null;
  readonly ChatRoom?: ChatRoom | null;
  readonly userCount: number | 0;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly challengeChallengeTypeId: string;
  readonly challengeChatRoomId?: string | null;
}

type LazyChallenge = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Challenge, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ChallengeType: AsyncItem<ChallengeType>;
  readonly Users: AsyncCollection<ChallengeUser>;
  readonly status?: ChallengeStatusEnum | keyof typeof ChallengeStatusEnum | null;
  readonly started?: number | null;
  readonly ChatRoom: AsyncItem<ChatRoom | undefined>;
  readonly userCount: number | 0;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly challengeChallengeTypeId: string;
  readonly challengeChatRoomId?: string | null;
}

export declare type Challenge = LazyLoading extends LazyLoadingDisabled ? EagerChallenge : LazyChallenge

export declare const Challenge: (new (init: ModelInit<Challenge>) => Challenge) & {
  copyOf(source: Challenge, mutator: (draft: MutableModel<Challenge>) => MutableModel<Challenge> | void): Challenge;
}

type EagerLeaderboard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Leaderboard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly numberOfCheckins: number;
  readonly User: User;
  readonly ChallengeType?: ChallengeType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly leaderboardUserId: string;
  readonly leaderboardChallengeTypeId?: string | null;
}

type LazyLeaderboard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Leaderboard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly numberOfCheckins: number;
  readonly User: AsyncItem<User>;
  readonly ChallengeType: AsyncItem<ChallengeType | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly leaderboardUserId: string;
  readonly leaderboardChallengeTypeId?: string | null;
}

export declare type Leaderboard = LazyLoading extends LazyLoadingDisabled ? EagerLeaderboard : LazyLeaderboard

export declare const Leaderboard: (new (init: ModelInit<Leaderboard>) => Leaderboard) & {
  copyOf(source: Leaderboard, mutator: (draft: MutableModel<Leaderboard>) => MutableModel<Leaderboard> | void): Leaderboard;
}

type EagerUserChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly chatRoomId?: string | null;
  readonly user: User;
  readonly chatRoom: ChatRoom;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly chatRoomId?: string | null;
  readonly user: AsyncItem<User>;
  readonly chatRoom: AsyncItem<ChatRoom>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerUserChatRoom : LazyUserChatRoom

export declare const UserChatRoom: (new (init: ModelInit<UserChatRoom>) => UserChatRoom) & {
  copyOf(source: UserChatRoom, mutator: (draft: MutableModel<UserChatRoom>) => MutableModel<UserChatRoom> | void): UserChatRoom;
}

type EagerChallengeUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChallengeUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly challengeId?: string | null;
  readonly user: User;
  readonly challenge: Challenge;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyChallengeUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChallengeUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly challengeId?: string | null;
  readonly user: AsyncItem<User>;
  readonly challenge: AsyncItem<Challenge>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ChallengeUser = LazyLoading extends LazyLoadingDisabled ? EagerChallengeUser : LazyChallengeUser

export declare const ChallengeUser: (new (init: ModelInit<ChallengeUser>) => ChallengeUser) & {
  copyOf(source: ChallengeUser, mutator: (draft: MutableModel<ChallengeUser>) => MutableModel<ChallengeUser> | void): ChallengeUser;
}

type EagerUserValidatedCheckIn = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserValidatedCheckIn, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly checkinId?: string | null;
  readonly user: User;
  readonly checkin: Checkin;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserValidatedCheckIn = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserValidatedCheckIn, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly checkinId?: string | null;
  readonly user: AsyncItem<User>;
  readonly checkin: AsyncItem<Checkin>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserValidatedCheckIn = LazyLoading extends LazyLoadingDisabled ? EagerUserValidatedCheckIn : LazyUserValidatedCheckIn

export declare const UserValidatedCheckIn: (new (init: ModelInit<UserValidatedCheckIn>) => UserValidatedCheckIn) & {
  copyOf(source: UserValidatedCheckIn, mutator: (draft: MutableModel<UserValidatedCheckIn>) => MutableModel<UserValidatedCheckIn> | void): UserValidatedCheckIn;
}