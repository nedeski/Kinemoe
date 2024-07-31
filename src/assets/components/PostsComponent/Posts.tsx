import { useState } from "react";
import { Link } from "react-router-dom";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";
import { PostInterface } from "../../context/LogedInContext/LogedInContextInterfaces";

interface postPropsInterface {
  posts: PostInterface[];
  users: UserInterface[];
}

export const Posts = ({ posts, users }: postPropsInterface) => {
  const [visibleItems, setVisibleItems] = useState<number>(3);
  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
  };

  return (
    <>
      <div className="postsAndComments">
        {posts.slice(0, visibleItems).map((post, key) => (
          <Link className="postComponent" key={key} to={`/Comment/${post?.id}`}>
            <div className="postContainer">
              <div className="imgAndTitle">
                <img
                  className="smallProfileImg"
                  src={require(`../../images/ProfilePics/Profile PictureSmall.png`)}
                  alt=""
                />
                <Link className="linkToProfile" to={`/Profile/${post.autorId}`}>
                  {users?.map(
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
                  <img
                    className="smallProfileImg "
                    src={require(`../../images/icons/like.png`)}
                    alt=""
                  />
                  {post.likes && <p>{post.likes.length}</p>}
                </div>
                <div className="dislikes">
                  <img
                    className="smallProfileImg"
                    src={require(`../../images/icons/dislike.png`)}
                    alt=""
                  />
                  {post.likes && <p>{post.dislikes.length}</p>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="showMoreBtnContainer">
        {visibleItems < posts.length && (
          <button className="button" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </div>
    </>
  );
};
