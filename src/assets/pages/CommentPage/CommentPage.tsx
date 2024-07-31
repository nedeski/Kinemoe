import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./comment-page.css";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../../components/Header/Header";
import {
  CommentInterface,
  PostInterface,
} from "../../context/LogedInContext/LogedInContextInterfaces";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";

export const CommentPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostInterface>();
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [userInfo, setUserInfo] = useState<UserInterface>();
  const [commentContent, setCommentContent] = useState<string>();
  const [newComment, setNewComment] = useState<CommentInterface>();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [showNestedForm, setShowNestedForm] = useState(false);
  const [likesToggle, setLikesToggle] = useState(false);

  const postAPI = `http://localhost:5001/posts/${id}`;
  const commentsAPI = `http://localhost:5001/comments`;
  const usersAPI = `http://localhost:5001/users`;

  useEffect(() => {
    axios
      .get(postAPI)
      .then((res: any) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(usersAPI)
      .then((res: any) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

    const userObj = localStorage.getItem("user");
    if (userObj) {
      setUserInfo(JSON.parse(userObj));
    }
  }, []);

  useEffect(() => {
    axios
      .get(commentsAPI)
      .then((res: any) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [newComment, likesToggle]);

  const commentsHandler = (event: any, parId: string) => {
    event.preventDefault();
    const newId = uuidv4();
    if (userInfo && post && commentContent) {
      const newCommentObj: CommentInterface = {
        id: newId,
        authorId: userInfo.id,
        parentId: parId,
        likes: [],
        content: commentContent,
      };
      setNewComment(newCommentObj);
      axios
        .post(`http://localhost:5001/comments/`, newCommentObj)
        .then((res) => {
          if (res.status === 200) {
            setComments([...comments, newCommentObj]);
          }
        })
        .catch((err) => console.log(err));
      event.target.reset();
    }
  };

  const commentLikesHandler = (id: string) => {
    const currentComment = comments.find((comment) => comment.id === id);
    let checkToggle;
    if (currentComment && userInfo) {
      checkToggle = currentComment?.likes.includes(userInfo?.id);

      if (!checkToggle) {
        currentComment?.likes.push(userInfo?.id);
        const index = comments.indexOf(currentComment);
        comments.splice(index, 1, currentComment);
        axios
          .put(
            `http://localhost:5001/comments/${currentComment.id}`,
            currentComment
          )
          .then((res) => {
            if (res.status === 200) {
              setComments(comments);
            }
          })
          .catch((err) => console.log(err));
      } else {
        const likeIndex = currentComment.likes.indexOf(userInfo?.id);
        currentComment.likes.splice(likeIndex, 1);
        const index = comments.indexOf(currentComment);
        comments.splice(index, 1, currentComment);
        axios
          .put(
            `http://localhost:5001/comments/${currentComment.id}`,
            currentComment
          )
          .then((res) => {
            if (res.status === 200) {
              setComments(comments);
            }
          })
          .catch((err) => console.log(err));
      }
    }
    setLikesToggle(!likesToggle);
  };

  const postLikesHandler = (placeToAdd: any, placeToRemove: any) => {
    let checkToggle;
    let secondCheck;
    if (post && userInfo) {
      checkToggle = placeToAdd.includes(userInfo.id);
      secondCheck = placeToRemove.includes(userInfo.id);

      if (!checkToggle) {
        placeToAdd.push(userInfo?.id);
        if (secondCheck) {
          const index = placeToRemove.indexOf(userInfo.id);
          placeToRemove.splice(index, 1);
        }
        axios
          .put(`http://localhost:5001/posts/${post.id}`, post)
          .then((res) => {
            if (res.status === 200) {
              setPost(post);
            }
          })
          .catch((err) => console.log(err));
      } else {
        const likeIndex = placeToAdd.indexOf(userInfo?.id);
        placeToAdd.splice(likeIndex, 1);
        axios
          .put(`http://localhost:5001/posts/${post.id}`, post)
          .then((res) => {
            if (res.status === 200) {
              setPost(post);
            }
          })
          .catch((err) => console.log(err));
      }
    }
    setLikesToggle(!likesToggle);
  };

  return (
    <div className="commentPage">
      <Header />
      <div className="mainCommunity">
        <h2>Community/Post</h2>
        <p>
          <i>Main comment</i>
        </p>
        {post && (
          <>
            <div className="mainCommentContent">
              <div className="mainCommentContainer">
                <div className="mainCommentTitle">
                  <div className="imgAndTitle">
                    <img
                      className="smallProfileImg"
                      src={require(`../../images/ProfilePics/Profile PictureSmall.png`)}
                      alt=""
                    />
                    <Link
                      className="linkToProfile"
                      to={`/Profile/${post.autorId}`}
                    >
                      {users.map(
                        (user, key) =>
                          user.id === post.autorId && (
                            <i key={key}>
                              {user.username.split(" ")[0]}
                              <span>: </span>
                            </i>
                          )
                      )}
                    </Link>
                    {post.title}
                  </div>
                  <div className="likesAndDislikes">
                    <div className="likes">
                      <button
                        onClick={() =>
                          postLikesHandler(post.likes, post.dislikes)
                        }
                        className="likeAndDislikeBtns"
                      >
                        <img
                          className="smallProfileImg headerBtn "
                          src={require(`../../images/icons/like.png`)}
                          alt=""
                        />
                      </button>
                      {post.likes && <p>{post.likes.length}</p>}
                    </div>
                    <div className="dislikes">
                      <button
                        onClick={() =>
                          postLikesHandler(post.dislikes, post.likes)
                        }
                        className="likeAndDislikeBtns"
                      >
                        <img
                          className="smallProfileImg headerBtn"
                          src={require(`../../images/icons/dislike.png`)}
                          alt=""
                        />
                      </button>
                      {post.likes && <p>{post.dislikes.length}</p>}
                    </div>
                  </div>
                </div>
                <p className="postContent">{post.content}</p>
              </div>
            </div>
            <form
              onSubmit={(e) => commentsHandler(e, post.id)}
              className="commentsForm"
              action="submit"
            >
              <textarea
                className="commentsArea"
                onChange={(e) => setCommentContent(e.target.value)}
                rows={3}
                cols={80}
                placeholder="Leave a comment..."
              ></textarea>
              <button type="submit" className="button">
                Post Comment
              </button>
            </form>
          </>
        )}

        {comments.length > 0 && (
          <div className="commentSection">
            <p>
              <i>Comment Section</i>
            </p>
            <div className="commentsInner">
              {comments.map(
                (comment, key) =>
                  comment.parentId === post?.id && (
                    <div key={key}>
                      <div className="commentWrapper">
                        <div className="commentContent">
                          <img
                            className="smallProfileImg"
                            src={require(`../../images/ProfilePics/Profile PictureSmall.png`)}
                            alt=""
                          />
                          <div className="nameAndComment">
                            <Link
                              className="linkToProfile"
                              to={`/Profile/${comment.authorId}`}
                            >
                              {users.map(
                                (user, key) =>
                                  user.id === comment.authorId && (
                                    <i key={key}>
                                      {user.username.split(" ")[0]}
                                    </i>
                                  )
                              )}
                            </Link>
                            {comment.content}
                          </div>
                        </div>
                        <div className="commentAndLike">
                          <button
                            onClick={() => setShowNestedForm(!showNestedForm)}
                          >
                            <img
                              className="smallProfileImg"
                              src={require(`../../images/icons/bleckComment.png`)}
                              alt=""
                            />
                          </button>
                          <div className="likesNumAndBtn">
                            <button
                              onClick={() => commentLikesHandler(comment.id)}
                            >
                              <img
                                className="smalProfileImg headerBtn"
                                src={require(`../../images/icons/blackLike.png`)}
                                alt=""
                              />
                            </button>
                            <span className="likesSpan">
                              {comment.likes.length}
                            </span>
                          </div>
                        </div>
                      </div>
                      {comments.map(
                        (el, i) =>
                          el.parentId === comment.id && (
                            <div key={i} className="commentWrapper">
                              <div className="commentContent">
                                <img
                                  className="nestedCommentIcon"
                                  src={require(`../../images/nestedComment.png`)}
                                  alt=""
                                />
                                <img
                                  className="smallProfileImg"
                                  src={require(`../../images/ProfilePics/Profile PictureSmall.png`)}
                                  alt=""
                                />
                                <div className="nameAndComment">
                                  <Link
                                    className="linkToProfile"
                                    to={`/Profile/${el.authorId}`}
                                  >
                                    {users.map(
                                      (user, key) =>
                                        user.id === el.authorId && (
                                          <i key={key}>
                                            {user.username.split(" ")[0]}
                                          </i>
                                        )
                                    )}
                                  </Link>
                                  {el.content}
                                </div>
                              </div>
                              <div className="commentAndLike">
                                <button
                                  onClick={() =>
                                    setShowNestedForm(!showNestedForm)
                                  }
                                >
                                  <img
                                    className="smallProfileImg"
                                    src={require(`../../images/icons/bleckComment.png`)}
                                    alt=""
                                  />
                                </button>
                                <div className="likesNumAndBtn ">
                                  <button
                                    onClick={() => commentLikesHandler(el.id)}
                                  >
                                    <img
                                      className="smallProfileImg headerBtn"
                                      src={require(`../../images/icons/blackLike.png`)}
                                      alt=""
                                    />
                                  </button>
                                  <span className="likesSpan">
                                    {el.likes.length}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                      {showNestedForm && (
                        <form
                          onSubmit={(e) => commentsHandler(e, comment.id)}
                          className="commentsForm"
                          action="submit"
                        >
                          <textarea
                            className="commentsArea"
                            onChange={(e) => setCommentContent(e.target.value)}
                            rows={3}
                            cols={80}
                            placeholder="Leave a comment..."
                          ></textarea>
                          <button type="submit" className="button">
                            Post Comment
                          </button>
                        </form>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>

      <div className="friendsComments">
        <div className="friendsCommentInner">
          <span>
            <i>Friends Comments</i>
          </span>
          {comments.map(
            (comment) =>
              userInfo?.friends.includes(comment.authorId) && (
                <div className="lastComment">
                  <img
                    className="smallProfileImg"
                    src={require(`../../images/ProfilePics/Profile PictureSmall.png`)}
                    alt=""
                  />
                  <Link
                    className="linkToProfile"
                    to={`/Profile/${comment?.authorId}`}
                  >
                    {users?.map(
                      (user, key) =>
                        user.id === comment?.authorId && (
                          <span key={key}>
                            <i>{user.username.split(" ")[0]}:</i>
                          </span>
                        )
                    )}
                  </Link>
                  <p>{comment.content}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
