import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import "./profile-page.css";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ConectToolbar } from "../../components/ConectToolbar/ConectToolbar";
import { MovieInterface } from "../../components/SliderMovieItem/SliderMovieItem";
import {
  CommentInterface,
  PostInterface,
} from "../../context/LogedInContext/LogedInContextInterfaces";
import { PieChart } from "react-minimal-pie-chart";

export const ProfilePage = () => {
  const [users, setUsers] = useState<UserInterface[]>();
  const [profileUser, setProfileUser] = useState<UserInterface>();
  const [logedUser, setLogedUser] = useState<UserInterface>();
  const [movies, setMovies] = useState<MovieInterface[]>();
  const [posts, setPosts] = useState<PostInterface[]>();
  const [comments, setComments] = useState<CommentInterface[]>();
  const [chartTotal, setChartTotal] = useState<number>();

  const { id } = useParams();
  const usersAPI = `http://localhost:5001/users`;
  const moviesAPI = `http://localhost:5001/movies`;
  const postsAPI = `http://localhost:5001/posts`;
  const commentsAPI = `http://localhost:5001/comments`;

  useEffect(() => {
    axios
      .get(usersAPI)
      .then((res: any) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(moviesAPI)
      .then((res: any) => {
        setMovies(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(postsAPI)
      .then((res: any) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(commentsAPI)
      .then((res: any) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));

    const userObj = localStorage.getItem("user");
    if (userObj) {
      setLogedUser(JSON.parse(userObj));
    }
  }, []);

  useEffect(() => {
    if (users) {
      const thisUser = users.find((user) => user.id === id);
      setProfileUser(thisUser);
    }
  }, [users]);

  useEffect(() => {
    if (posts && comments) {
      const userPosts = posts.filter(
        (post) => post.autorId === profileUser?.id
      );
      const userComments = comments.filter(
        (comment) => comment.authorId === profileUser?.id
      );
      if (userPosts.length > userComments.length) {
        setChartTotal(userPosts.length + 1);
      } else {
        setChartTotal(userComments.length + 1);
      }
    }
  }, [comments]);

  const fallowAndAddFriendHandler = (
    plaseToAddOrRemove: string[] | undefined
  ) => {
    if (
      users &&
      plaseToAddOrRemove !== undefined &&
      logedUser &&
      profileUser &&
      logedUser.id !== profileUser.id
    ) {
      const checkToggle = plaseToAddOrRemove?.includes(profileUser.id);
      if (!checkToggle) {
        plaseToAddOrRemove?.push(profileUser.id);
        const index = users.findIndex((obj) => obj.id === logedUser.id);
        users.splice(index, 1, logedUser);
        axios
          .put(`http://localhost:5001/users/${logedUser.id}`, logedUser)
          .then((res) => {
            if (res.status === 200) {
              setLogedUser(logedUser);
              setUsers(users);
              localStorage.setItem("user", JSON.stringify(logedUser));
            }
          })
          .catch((err) => console.log(err));
      } else {
        const likeIndex = plaseToAddOrRemove?.indexOf(profileUser.id);
        plaseToAddOrRemove?.splice(likeIndex, 1);
        const index = users.findIndex((obj) => obj.id === logedUser.id);
        users.splice(index, 1, logedUser);
        axios
          .put(`http://localhost:5001/users/${logedUser.id}`, logedUser)
          .then((res) => {
            if (res.status === 200) {
              setLogedUser(logedUser);
              setUsers(users);
              localStorage.setItem("user", JSON.stringify(logedUser));
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <div className="profilePage">
      <Header />
      <div className="profieBanner">
        <img
          src={require(`../../images/ProfilePics/unsplash_2FEE6BR343k.png`)}
          alt=""
        />
      </div>
      {profileUser && (
        <div className="mainSection">
          <div className="userInfo">
            <div className="imageContainer">
              {profileUser.user_type === "Artist" && (
                <img
                  className="checkmark"
                  src={require(`../../images/ProfilePics/Main Checkmark.png`)}
                  alt=""
                />
              )}
              <img
                src={require(`../../images/ProfilePics/ProfilePictureBig.png`)}
                alt=""
              />
            </div>
            <div className="userInfoInner">
              <h3>{profileUser.username}</h3>
              <p>
                <i>{profileUser.interests[0]} Enjoyer</i>
              </p>
              <p>{profileUser.bio}</p>
              <h4>Badges:</h4>
              <div className="bangesContainer">
                <img
                  className="badgeImg"
                  src={require(`../../images/Profile-icons/Vector5.png`)}
                  alt=""
                />
                <img
                  className="badgeImg"
                  src={require(`../../images/Profile-icons/Vector6.png`)}
                  alt=""
                />
                <img
                  className="badgeImg"
                  src={require(`../../images/Profile-icons/Vector7.png`)}
                  alt=""
                />
                <img
                  className="badgeImg"
                  src={require(`../../images/Profile-icons/Group8.png`)}
                  alt=""
                />
                <hr />
              </div>
              <div className="charts">
                <div className="chart profileChart">
                  <PieChart
                    lineWidth={40}
                    label={({ dataEntry }) => dataEntry.value}
                    labelPosition={0}
                    labelStyle={{
                      fill: "#ffffff",
                    }}
                    totalValue={chartTotal}
                    data={[
                      {
                        title: "One",
                        value: Number(
                          comments?.filter(
                            (comment) => comment.authorId === profileUser.id
                          ).length
                        ),
                        color: "#519c3c",
                      },
                    ]}
                  />
                  <p>Comments</p>
                </div>
                <div className="chart profileChart">
                  <PieChart
                    lineWidth={40}
                    label={({ dataEntry }) => dataEntry.value}
                    labelPosition={0}
                    labelStyle={{
                      fill: "#ffffff",
                    }}
                    totalValue={chartTotal}
                    data={[
                      {
                        title: "One",
                        value: Number(
                          `${
                            posts?.filter(
                              (post) => post.autorId === profileUser.id
                            ).length
                          }`
                        ),
                        color: "#519c3c",
                      },
                    ]}
                  />
                  <p>Discussions</p>
                </div>
              </div>
            </div>
          </div>
          <div className="commentsAndMovies">
            <div className="toolbarWrapper">
              <ConectToolbar
                onHeartClickHandler={() =>
                  fallowAndAddFriendHandler(logedUser?.following)
                }
                onAddClickHandler={() =>
                  fallowAndAddFriendHandler(logedUser?.friends)
                }
                shareUrlProp={`locahlost:3000/Profile/${profileUser.id}`}
              />
            </div>
            <div className="comments">
              <h4>
                <span>Comments by </span>
                {profileUser.username.split(" ")[0]}
              </h4>
              <div className="commentsList">
                {posts?.map(
                  (post, key) =>
                    post.autorId === profileUser.id && (
                      <Link
                        className="postCardLink"
                        to={`/Comment/${post.id}`}
                        key={key}
                      >
                        <div className="postCard">
                          <div className="imgAndName">
                            <img
                              className="smallProfileImg"
                              src={require(`../../images/ProfilePics/Profile PictureSmall.png`)}
                              alt=""
                            />
                            <div className="authorName">
                              {profileUser.username.split(" ")[0]}
                            </div>
                          </div>
                          <div className="profileComment">{post.content}</div>
                        </div>
                      </Link>
                    )
                )}
              </div>
            </div>
            <div className="watcedMovies">
              <h4>
                <span>What </span>
                {profileUser.username.split(" ")[0]}
                <span> watched</span>
              </h4>

              <div className="watchList">
                {profileUser.watchList.length > 0 &&
                  movies?.map(
                    (movie, key) =>
                      profileUser.watchList.includes(movie.id) && (
                        <div className="movieCard" key={key}>
                          <img src={movie.poster} alt="" />
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
