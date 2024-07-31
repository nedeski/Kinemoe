import { useEffect, useState } from "react";
import {
  UserChild,
  UserContextInterface,
  UserInterface,
} from "./UserContextInterfaces";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: UserChild) => {
  const [user, setUser] = useState<UserInterface>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [user_type, setUserType] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [tutorial, setTutorial] = useState<boolean>(false);
  const [subscriptionType, setSubscriptionType] = useState<string>("");
  const [cultures, setCultures] = useState<string[]>([]);
  const [favouriteCategories, setFavouriteCategories] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("");
  const [likedMovies, setLikedMovies] = useState<string[]>([]);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [lastWatchedMovies, setLastWatchedMovies] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user !== null) {
      setUser(JSON.parse(user));
    } else {
      user = null;
    }
  }, []);

  const userValue: UserContextInterface = {
    user: user,
    email: email,
    password: password,
    confirmedPassword: confirmedPassword,
    bio: bio,
    user_type: user_type,
    username: username,
    interests: interests,
    tutorial: tutorial,
    subscription_type: subscriptionType,
    cultures: cultures,
    favouriteCategories: favouriteCategories,
    notifications: notifications,
    privacy: privacy,
    likedMovies: likedMovies,
    watchList: watchList,
    lastWatchedMovies: lastWatchedMovies,
    following: following,
    friends: friends,
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

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};
