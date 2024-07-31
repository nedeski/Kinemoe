import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";
import axios from "axios";
import { UserInterface } from "../../context/UserContext/UserContextInterfaces";
import { useEffect, useState } from "react";
import { signInWithGooglePopup } from "../../lib/firebase";

export const SignUp = () => {
  const { email, password, setEmail, setPassword } = useUserContext();
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [emailAlert, setEmailAlert] = useState(false);

  const usersAPI = "http://localhost:5001/users";

  useEffect(() => {
    axios
      .get(usersAPI)
      .then((res: any) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
    const exsistingEmail = users.find(
      (user: UserInterface) => user.email === e.target.value
    );
    exsistingEmail ? setEmailAlert(true) : setEmailAlert(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGooglePopup();
      if (result.user.email) setEmail(result.user.email);
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
            <h3>Create your account</h3>
            <button onClick={handleGoogleLogin} className="signUpBtn relative">
              <img
                className="absoliteLogo"
                src={require(`../../images/icons/flat-color-icons_google.png`)}
                alt="icon"
              />
              <span>Sign up with Google</span>
            </button>
            <button className="signUpBtn relative">
              <img
                className="absoliteLogo"
                src={require(`../../images/icons/logos_facebook.png`)}
                alt="icon"
              />
              <span>Sign up with Facebook</span>
            </button>
            <button className="signUpBtn relative">
              <img
                className="absoliteLogo"
                src={require(`../../images/icons/apple-logo.png`)}
                alt="icon"
              />
              <span>Sign up with Apple</span>
            </button>
            <p className="or">
              <span>or</span>
            </p>
            <form className="formRelative" action="submit">
              <input
                onChange={(e) => emailHandler(e)}
                type="email"
                placeholder="Email"
                value={email}
                required
              />

              {emailAlert && (
                <p className="validAlert">
                  There is an existing account associated with this email
                </p>
              )}

              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                value={password}
                required
              />
              <br />
              <Link
                className="registerBtn"
                to={
                  email !== "" &&
                  email.includes("@") &&
                  password !== "" &&
                  !emailAlert
                    ? "/Step1"
                    : "/SignUp"
                }
              >
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
