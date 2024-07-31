export interface UserInterface {
  id: string;
  email: string;
  password: string;
  confirmedPassword?: string;
  bio: string;
  user_type: string;
  username: string;
  interests: string[];
  tutorial: boolean;
  subscription_type: string;
  cultures: string[];
  favouriteCategories: string[];
  notifications: string;
  privacy: string;
  likedMovies: string[];
  watchList: string[];
  lastWatchedMovies: string[];
  following: string[];
  friends: string[];
}

export interface UserContextInterface {
  user: undefined | UserInterface;
  email: string;
  password: string;
  confirmedPassword?: string;
  bio: string;
  user_type: string;
  username: string;
  interests: string[];
  tutorial: boolean;
  subscription_type: string;
  cultures: string[];
  favouriteCategories: string[];
  notifications: string;
  privacy: string;
  likedMovies: string[];
  watchList: string[];
  lastWatchedMovies: string[];
  following: string[];
  friends: string[];
  setUser: (user: UserInterface) => void;
  setPassword: (password: string) => void;
  setConfirmedPassword: (password: string) => void;
  setEmail: (email: string) => void;
  setBio: (bio: string) => void;
  setUserType: (type: string) => void;
  setUsername: (username: string) => void;
  setInterests: (interests: string[]) => void;
  setTutorial: (tutorial: boolean) => void;
  setSubscriptionType: (subscription_type: string) => void;
  setCultures: (cultures: string[]) => void;
  setFavouriteCategories: (favouriteCategories: string[]) => void;
  setNotifications: (notifications: string) => void;
  setPrivacy: (privacy: string) => void;
  setLikedMovies: (likedMovies: string[]) => void;
  setWatchList: (likedMovies: string[]) => void;
  setLastWatchedMovies: (lastWatchedMovies: string[]) => void;
  setFollowing: (following: string[]) => void;
  setFriends: (friends: string[]) => void;
}

export interface UserChild {
  children: React.ReactNode;
}
