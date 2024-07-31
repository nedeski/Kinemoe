import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./community-page.css";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useLogedInContext } from "../../context/LogedInContext/LogedInContext";
import {
  CommentInterface,
  PostInterface,
} from "../../context/LogedInContext/LogedInContextInterfaces";
import { v4 as uuidv4 } from "uuid";
import { MovieInterface } from "../../components/SliderMovieItem/SliderMovieItem";
import { PieChart } from "react-minimal-pie-chart";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";
import { Posts } from "../../components/PostsComponent/Posts";

export const CommunityPage = () => {
  const { posts, comments, setPosts, setComments } = useLogedInContext();
  const [discusionShow, setDiscusionShow] = useState(false);
  const [allMovies, setAllMovies] = useState<MovieInterface[]>();
  const [postTitle, setPostTitle] = useState<string>("");
  const [postText, setPostText] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>();
  const [showSeeBtn, setShowSeeBtn] = useState(false);
  const [post, setPost] = useState<PostInterface>();
  const [searchUrl, setSearchUrl] = useState();
  const [searchPosts, setSearchPosts] = useState<PostInterface[]>([]);
  const [chartTotal, setChartTotal] = useState<number>();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [lastComment, setLastComment] = useState<CommentInterface>();

  const moviesAPI = "http://localhost:5001/movies";
  const postsAPI = "http://localhost:5001/posts";
  const commentsAPI = "http://localhost:5001/comments";
  const usersAPI = "http://localhost:5001/users";

  useEffect(() => {
    axios
      .get(moviesAPI)
      .then((res: any) => {
        setAllMovies(res.data);
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
  }, []);

  const onSubmitHendler = (event: any) => {
    event.preventDefault();
    const newId = uuidv4();

    if (userInfo) {
      const newPostObj: PostInterface = {
        id: newId,
        movieId: selectedMovie,
        autorId: userInfo.id,
        title: postTitle,
        content: postText,
        likes: [],
        dislikes: [],
      };
      setPost(newPostObj);
      axios
        .post(`http://localhost:5001/posts/`, newPostObj)
        .then((res) => {
          if (res.status === 200) {
            setPosts([...posts, newPostObj]);
          }
        })
        .catch((err) => console.log(err));
      event.target.reset();
    }

    setShowSeeBtn(true);
  };

  useEffect(() => {
    let urlPosts = "http://localhost:5001/posts";
    if (searchUrl) {
      urlPosts += `?title_like=^${searchUrl}`;
    }
    axios
      .get(urlPosts)
      .then((res: any) => {
        setSearchPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [searchUrl]);

  useEffect(() => {
    if (posts.length > comments.length) {
      setChartTotal(posts.length + 1);
    } else {
      setChartTotal(comments.length + 1);
    }
    setLastComment(comments[comments.length - 1]);
  }, [comments]);

  return (
    <div className="communityPage">
      <Header />
      <div className="mainCommunity">
        <h2>Community</h2>
        <div className="searchAndDiscusion">
          <div className="searchBar">
            <button className="searchFormBtn filterBtn">
              <img src={require(`../../images/icons/Vector8.png`)} alt="" />
            </button>
            <form className="searchForm">
              <input
                onChange={(e: any) => setSearchUrl(e.target.value)}
                className="searchInput"
                type="text"
                name="search"
                placeholder="Search..."
              />
            </form>
          </div>
          <div className="discusionBtn">
            <button
              onClick={() => setDiscusionShow(true)}
              data-toggle="modal"
              data-target=".bd-example-modal"
              className="button discusionBtn mt-0"
            >
              Start a disscusion
            </button>
          </div>
          <Modal
            className="postModal"
            size="lg"
            show={discusionShow}
            onHide={() => setDiscusionShow(false)}
            aria-labelledby="example-modal-sizes-title"
          >
            <div
              onClick={() => setDiscusionShow(false)}
              className="closeModalBtn"
            >
              <img
                className="playBtnImg"
                src={require(`../../images/icons/close.png`)}
                alt="icon"
              />
            </div>
            <div className="postModalContainer">
              <h3>Movies comment</h3>
              <form
                onSubmit={(e) => onSubmitHendler(e)}
                className="postForm"
                action="submit"
              >
                <label>Please select a movie</label>
                <select
                  className="selectInput"
                  name="movieId"
                  form="movieSelector"
                  onChange={(e) => setSelectedMovie(e.target.value)}
                  value={selectedMovie}
                >
                  {allMovies?.map((movie, key) => (
                    <option key={key} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
                <input
                  className="selectInput"
                  type="text"
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Post title"
                ></input>
                <textarea
                  className="postArea"
                  onChange={(e) => setPostText(e.target.value)}
                  rows={8}
                  cols={80}
                  placeholder="Write your comment here..."
                ></textarea>
                <button className="button" type="submit">
                  Post comment
                </button>
              </form>
              {showSeeBtn && (
                <Link
                  type="submit"
                  to={`/Comment/${post?.id}`}
                  className="button"
                >
                  See comment
                </Link>
              )}
            </div>
          </Modal>
        </div>
        <Posts posts={searchPosts} users={users} />
      </div>
      <div className="sideCommunity">
        <div className="sideInner">
          <div className="chartSideContainer">
            <div className="chart">
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
                    value: Number(`${comments.length}`),
                    color: "#519c3c",
                  },
                ]}
              />
            </div>
            <span className="sidebarSpan">Comments</span>
          </div>
          <div className="chartSideContainer">
            <div className="chart">
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
                    value: Number(`${posts.length}`),
                    color: "#519c3c",
                  },
                ]}
              />
            </div>
            <span className="sidebarSpan">Discussions</span>
          </div>
          <div className="lastComments">
            <span className="sidebarSpan">
              <i>Last Comments</i>
            </span>
            <div className="lastComment">
              <img
                className="smallProfileImg"
                src={require(`../../images/ProfilePics/Profile PictureSmall.png`)}
                alt=""
              />
              <Link
                className="linkToProfile"
                to={`/Profile/${lastComment?.authorId}`}
              >
                {users?.map(
                  (user, key) =>
                    user.id === lastComment?.authorId && (
                      <span key={key}>
                        <i>{user.username.split(" ")[0]}:</i>
                      </span>
                    )
                )}
              </Link>
              <p>{lastComment && lastComment.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
