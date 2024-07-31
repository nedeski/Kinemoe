import { createContext, useContext } from "react";
import {
  CommentInterface,
  LogedInContextInterface,
  PostInterface,
  WatchCommentInterface,
} from "./LogedInContextInterfaces";

const setPosts = () => console.log("updated");
const setComments = () => console.log("updated");
const setWatchComments = () => console.log("updated");
const logedInContextState: LogedInContextInterface = {
  posts: [] as PostInterface[],
  comments: [] as CommentInterface[],
  watchComments: [] as WatchCommentInterface[],
  setPosts: setPosts,
  setComments: setComments,
  setWatchComments: setWatchComments,
};

export const LogedInContext = createContext({
  posts: [],
  comments: [],
  watchComments: [],
  setPosts: () => {},
  setComments: () => {},
  setWatchComments: () => {},
} as LogedInContextInterface);

export const useLogedInContext = () => useContext(LogedInContext);
