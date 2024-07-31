import { Link } from "react-router-dom";
import "./sign-in.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";
import { signInWithGooglePopup } from "../../lib/firebase";
import { useUserContext } from "../../context/UserContext/UserContext";

export const SignIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [users, setUsers] = useState<UserInterface[]>();
  const { setUser } = useUserContext();
  const usersAPI = "http://localhost:5001/users/";

  useEffect(() => {
    axios
      .get(usersAPI)
      .then((res: any) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSumbmitHandler = () => {
    if (users) {
      const corectUser = users.find((user) => user.email === email);
      if (corectUser && corectUser.password === password) {
        localStorage.setItem("user", JSON.stringify(corectUser));
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGooglePopup();
      if (users && result.user.email) {
        const corectUser = users.find(
          (user) => user.email === result.user.email
        );
        if (corectUser) {
          localStorage.setItem("user", JSON.stringify(corectUser));
          setUser(corectUser);
        }
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return (
    <div className="loginContainer">
      <div className="popUp">
        <div className="sidePicture">
          <div className="logoInner">
            <img
              className="kinemoeLogo"
              src={require(`../../images/KINEMOE.png`)}
              alt="logo"
            />
          </div>
        </div>
        <div className="logInFormContainer">
          <div className="formInner">
            <h3>Welcome!</h3>
            <p className="joinUs">Join us!</p>
            <form onSubmit={onSumbmitHandler} action="submit">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
              <br />
              <button>Log in</button>
            </form>
            <p className="or">
              <span>or</span>
            </p>
            <button onClick={handleGoogleLogin} className="signUpBtn relative">
              <img
                className="absoliteLogo"
                src={require(`../../images/icons/flat-color-icons_google.png`)}
                alt=""
              />
              <span>Log in with Google</span>
            </button>
            <button className="signUpBtn relative">
              <img
                className="absoliteLogo"
                src={require(`../../images/icons/logos_facebook.png`)}
                alt=""
              />
              <span>Log in with Facebook</span>
            </button>
            <button className="signUpBtn relative">
              <img
                className="absoliteLogo"
                src={require(`../../images/icons/apple-logo.png`)}
                alt=""
              />
              <span>Log in with Apple</span>
            </button>
            <br />
            <Link className="newAccount" to="/signUp">
              <i>Create a new account</i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
