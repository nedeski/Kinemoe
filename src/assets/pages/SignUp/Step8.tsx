import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

export const Step8 = () => {
  const { notifications, setNotifications } = useUserContext();

  return (
    <div className="loginContainer">
      <div className="stepsPopUpCenter">
        <div className="stepsInner">
          <div>
            <span className="stayInLoop">Stay in the loop! </span>
            <br />
            <h4 className="notificationTitleContainer">
              <span className="numberCircle">7</span>
              <span className="notificationTitle">
                Set your preferences for updates and announcements. loop!
              </span>
            </h4>
          </div>
          <form className="notificationForm">
            <div>
              <input
                onChange={(e) => setNotifications(e.target.value)}
                type="radio"
                className="squearRadio"
                name="notificationsOptions"
                value="Sign up for Email Notifications"
                checked={notifications === "Sign up for Email Notifications"}
              />
              <label>Sign up for Email Notifications</label>
            </div>
            <div>
              <input
                onChange={(e) => setNotifications(e.target.value)}
                type="radio"
                className="squearRadio"
                name="notificationsOptions"
                value="App Push Notifications"
                checked={notifications === "App Push Notifications"}
              />
              <label>App Push Notifications</label>
            </div>
            <div>
              <input
                onChange={(e) => setNotifications(e.target.value)}
                type="radio"
                className="squearRadio"
                name="notificationsOptions"
                value="No Notifications"
                checked={notifications === "No Notifications"}
              />
              <label>No Notifications</label>
            </div>
          </form>
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/step7">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link className="button nextBackBtn" to="/step9">
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
