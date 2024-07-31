import { useState } from "react";
import {
  CommentInterface,
  LogedInChild,
  LogedInContextInterface,
  PostInterface,
  WatchCommentInterface,
} from "./LogedInContextInterfaces";
import { LogedInContext } from "./LogedInContext";

export const LogedInProvider = ({ children }: LogedInChild) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [watchComments, setWatchComments] = useState<WatchCommentInterface[]>(
    []
  );

  const logedInValue: LogedInContextInterface = {
    posts: posts,
    comments: comments,
    watchComments: watchComments,
    setPosts: setPosts,
    setComments: setComments,
    setWatchComments: setWatchComments,
  };

  return (
    <LogedInContext.Provider value={logedInValue}>
      {children}
    </LogedInContext.Provider>
  );
};
