import { Link } from "react-router-dom";
import "./header.css";
import { useEffect, useState } from "react";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";
import { useUserContext } from "../../context/UserContext/UserContext";

export const Header = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInterface>();
  const { setUser } = useUserContext();

  useEffect(() => {
    const userObj = localStorage.getItem("user");

    if (userObj) {
      setUserInfo(JSON.parse(userObj));
    }
  }, []);

  const searchModalToggle = () => {
    if (toggleModal) {
      setToggleModal(false);
    } else {
      setToggleModal(true);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser({
      id: "",
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
    });
  };

  return (
    <header className="header">
      <Link className="headerBtn" to={`/Profile/${userInfo?.id}`}>
        <img
          className="headerBtnIcon"
          src={require(`../../images/Header-icons/User.png`)}
          alt=""
        />
        <p className="headerBtnText">User</p>
      </Link>

      <div className="navigation">
        <Link className="headerBtn" to="/Home">
          <img
            className="headerBtnIcon"
            src={require(`../../images/Header-icons/Home.png`)}
            alt=""
          />
          <p className="headerBtnText">Home</p>
        </Link>
        <div className="headerBtn roomsBtn">
          <img
            className=" headerBtnIcon"
            onClick={searchModalToggle}
            src={require(`../../images/Header-icons/Vector.png`)}
            alt=""
          />
          <p className="headerBtnText">Rooms</p>
        </div>

        <Link className="headerBtn" to="/Community">
          <img
            className=" headerBtnIcon"
            src={require(`../../images/Header-icons/wpf_chat.png`)}
            alt=""
          />
          <p className="headerBtnText">Community</p>
        </Link>
        <Link className="headerBtn" to="/Movies">
          <img
            className=" headerBtnIcon"
            src={require(`../../images/Header-icons/bx_camera-movie.png`)}
            alt=""
          />
          <p className="headerBtnText">Movie hall</p>
        </Link>
      </div>
      <div
        onClick={() => setSettingsModal(!settingsModal)}
        className="settings headerBtn"
      >
        <img
          className="headerBtnIcon"
          src={require(`../../images/Header-icons/Settings.png`)}
          alt=""
        />
        <p className="headerBtnText">Settings</p>
      </div>

      {toggleModal && (
        <div className="headerModal">
          <Link className="headerBtn" to="/Movies">
            <img src={require(`../../images/Header-icons/Movies.png`)} alt="" />
            <p className="headerBtnTextBlack">Movies</p>
          </Link>
          <Link className="headerBtn" to="/">
            <img src={require(`../../images/Header-icons/Series.png`)} alt="" />
            <p className="headerBtnTextBlack">Series</p>
          </Link>
          <Link className="headerBtn" to="/">
            <img
              src={require(`../../images/Header-icons/Podcasts.png`)}
              alt=""
            />
            <p className="headerBtnTextBlack">Podcasts</p>
          </Link>
          <Link className="headerBtn" to="/">
            <img src={require(`../../images/Header-icons/Kids.png`)} alt="" />
            <p className="headerBtnTextBlack">Kids</p>
          </Link>
        </div>
      )}

      {settingsModal && (
        <div className="settingsModal">
          <div className="headerBtn">
            <img
              onClick={logoutHandler}
              src={require(`../../images/Header-icons/logout.jpg`)}
              alt=""
            />
            <p className="headerBtnTextBlack">Log out</p>
          </div>
        </div>
      )}
    </header>
  );
};
