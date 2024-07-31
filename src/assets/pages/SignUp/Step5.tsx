import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";

export const Step5 = () => {
  const {
    username,
    password,
    bio,
    setUsername,
    setPassword,
    setConfirmedPassword,
    setBio,
  } = useUserContext();

  const [checkedPassword, setCheckedPassword] = useState(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [userAlert, setUserAlert] = useState(false);

  const usersAPI = "http://localhost:5001/users";

  useEffect(() => {
    axios
      .get(usersAPI)
      .then((res: any) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const usernameHandler = (e: any) => {
    setUsername(e.target.value);

    const exsistingUser = users.find(
      (user: UserInterface) => user.username === e.target.value
    );
    exsistingUser ? setUserAlert(true) : setUserAlert(false);
  };

  const checkPassword = (inputPassword: string) => {
    if (inputPassword === password) {
      setCheckedPassword(true);
      setConfirmedPassword(inputPassword);
    } else {
      setCheckedPassword(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="stepsPopUpCenter">
        <div className="stepsInner">
          <h4>
            <span className="numberCircle">4</span>
            <span className="setupProfileTitle">Setup profile</span>
          </h4>
          <div className="setumProfileInner">
            <img
              src={require(`../../images/ProfilePicture.png`)}
              alt="profilePicture"
            />
            <form className="formRelative" action="submit">
              <input
                onChange={(e) => usernameHandler(e)}
                type="text"
                placeholder="Username"
                value={username}
              />
              {userAlert && (
                <p className="validAlert">
                  There is an existing account with this username
                </p>
              )}
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                value={password}
              />
              <input
                className={`
                ${checkedPassword ? "inputBorderGreen" : "inputBorderRed"}`}
                onChange={(e) => checkPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
              />
              <textarea
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell us about yourself..."
                value={bio}
              ></textarea>
            </form>
          </div>
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/step4">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link className="button nextBackBtn" to="/step6">
              <span>Next</span>
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-right.png`)}
                alt="icon"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
