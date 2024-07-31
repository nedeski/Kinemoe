export interface PostInterface {
  id: string;
  movieId: string;
  autorId: string;
  title: string;
  content: string;
  likes: string[];
  dislikes: string[];
}

export interface CommentInterface {
  id: string;
  authorId: string;
  parentId: string;
  likes: string[];
  content: string;
}

export interface WatchCommentInterface {
  id: string;
  authorId: string;
  authorUsername: string;
  movieId: string;
  time: number;
  content: string;
}

export interface LogedInContextInterface {
  posts: PostInterface[];
  comments: CommentInterface[];
  watchComments: WatchCommentInterface[];
  setPosts: (posts: PostInterface[]) => void;
  setComments: (comments: CommentInterface[]) => void;
  setWatchComments: (watchcomments: WatchCommentInterface[]) => void;
}

export interface LogedInChild {
  children: React.ReactNode;
}
