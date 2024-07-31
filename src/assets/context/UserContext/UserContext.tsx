import { createContext, useContext } from "react";
import { UserContextInterface, UserInterface } from "./UserContextInterfaces";

const setUser = () => console.log("seted!");
const setEmail = () => console.log("seted!");
const setPassword = () => console.log("seted!");
const setConfirmedPassword = () => console.log("seted!");
const setBio = () => console.log("seted!");
const setUserType = () => console.log("seted!");
const setUsername = () => console.log("seted!");
const setInterests = () => console.log("seted!");
const setTutorial = () => console.log("seted!");
const setSubscriptionType = () => console.log("seted!");
const setCultures = () => console.log("seted!");
const setFavouriteCategories = () => console.log("seted!");
const setNotifications = () => console.log("seted!");
const setPrivacy = () => console.log("seted!");
const setLikedMovies = () => console.log("seted!");
const setWatchList = () => console.log("seted!");
const setLastWatchedMovies = () => console.log("seted!");
const setFollowing = () => console.log("seted!");
const setFriends = () => console.log("seted!");

const userContextState: UserContextInterface = {
  user: undefined as undefined,
  email: "" as string,
  password: "" as string,
  confirmedPassword: "" as string,
  bio: "" as string,
  user_type: "" as string,
  username: "" as string,
  interests: [] as string[],
  tutorial: false as boolean,
  subscription_type: "" as string,
  cultures: [] as string[],
  favouriteCategories: [] as string[],
  notifications: "" as string,
  privacy: "" as string,
  likedMovies: [],
  watchList: [],
  lastWatchedMovies: [],
  following: [],
  friends: [],

  setUser: setUser,
  setEmail: setEmail,
  setPassword: setPassword,
  setConfirmedPassword: setConfirmedPassword,
  setBio: setBio,
  setUserType: setUserType,
  setUsername: setUsername,
  setInterests: setInterests,
  setTutorial: setTutorial,
  setSubscriptionType: setSubscriptionType,
  setCultures: setCultures,
  setFavouriteCategories: setFavouriteCategories,
  setNotifications: setNotifications,
  setPrivacy: setPrivacy,
  setLikedMovies: setLikedMovies,
  setWatchList: setWatchList,
  setLastWatchedMovies: setLastWatchedMovies,
  setFollowing: setFollowing,
  setFriends: setFriends,
};

export const UserContext = createContext({
  user: undefined,
  email: "",
  password: "",
  confirmedPassword: "",
  bio: "",
  user_type: "",
  username: "",
  interests: [],
  tutorial: false,
  subscription_type: "",
  cultures: [],
  favouriteCategories: [],
  notifications: "",
  privacy: "",
  likedMovies: [],
  watchList: [],
  lastWatchedMovies: [],
  following: [],
  friends: [],
  setUser: () => {},
  setEmail: () => {},
  setPassword: () => {},
  setConfirmedPassword: () => {},
  setBio: () => {},
  setUserType: () => {},
  setUsername: () => {},
  setInterests: () => {},
  setTutorial: () => {},
  setSubscriptionType: () => {},
  setCultures: () => {},
  setFavouriteCategories: () => {},
  setNotifications: () => {},
  setPrivacy: () => {},
  setLikedMovies: () => {},
  setWatchList: () => {},
  setLastWatchedMovies: () => {},
  setFollowing: () => {},
  setFriends: () => {},
} as UserContextInterface);

export const useUserContext = () => useContext(UserContext);
