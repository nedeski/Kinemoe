import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const privacyBtns = ["My Friends", "Public", "Only Me"];

export const Step9 = () => {
  const {
    email,
    password,
    bio,
    user_type,
    username,
    interests,
    tutorial,
    subscription_type,
    cultures,
    favouriteCategories,
    notifications,
    likedMovies,
    watchList,
    privacy,
    lastWatchedMovies: lastWatchedMovies,
    following: following,
    friends: friends,
    setPrivacy,
    setUser,
  } = useUserContext();

  const setUserHandler = () => {
    const newUser: UserInterface = {
      id: uuidv4(),
      email: email,
      password: password,
      bio: bio,
      user_type: user_type,
      username: username,
      interests: interests,
      tutorial: tutorial,
      subscription_type: subscription_type,
      cultures: cultures,
      favouriteCategories: favouriteCategories,
      notifications: notifications,
      privacy: privacy,
      likedMovies: likedMovies,
      watchList: watchList,
      lastWatchedMovies: lastWatchedMovies,
      following: following,
      friends: friends,
    };

    if (
      email !== "" &&
      password !== "" &&
      bio !== "" &&
      user_type !== "" &&
      username !== "" &&
      subscription_type !== "" &&
      notifications !== "" &&
      privacy !== ""
    ) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      axios
        .post(`http://localhost:5001/users/`, newUser)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert(
        "Please go back and fill all the requerd fields to create your profile."
      );
    }
  };

  return (
    <div className="loginContainer">
      <div className="stepsPopUpCenter">
        <div className="stepsInner">
          <div>
            <img
              className="profileImg"
              src={require(`../../images/profileImg.png`)}
              alt="profileImg"
            />
            <p>Nickname</p>
          </div>
          <div>
            <h4 className="culturesTitleContainer">
              <span className="numberCircle">8</span>
              <span className="culturesTitle">
                Select your privacy settings
              </span>
            </h4>
            <p className="culturesSubtitle">
              <i>Choose who sees your profile</i>
            </p>
            <div className="privacyButtons">
              {privacyBtns.map((el: string, key: number) => (
                <button
                  onClick={(e: any) => setPrivacy(e.target.innerText)}
                  key={key}
                  className={`transparentBtn ${
                    privacy.includes(el) && "buttonClicked"
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/step8">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link
              onClick={setUserHandler}
              className="button nextBackBtn"
              to="/Home"
            >
              <span>Set my profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
