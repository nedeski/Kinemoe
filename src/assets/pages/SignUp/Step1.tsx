import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";
import { useState } from "react";

export const Step1 = () => {
  const { user_type, setUserType } = useUserContext();

  return (
    <div className="loginContainer">
      <div className="stepsPopUpCenter">
        <div className="stepsInner">
          <h3>Join as a viewer or artist:</h3>
          <form className="radioForm">
            <div
              className={`radioContainer ${
                user_type === "Artist" && "activeBorder"
              }`}
            >
              <img
                className="radioIcon"
                src={require(`../../images/icons/ArtistIcon.png`)}
                alt="icon"
              />
              <input
                className="radioBtn"
                type="radio"
                id="artist"
                name="profileType"
                value="Artist"
                onChange={(e) => setUserType(e.target.value)}
                checked={user_type === "Artist"}
              />
              <br />
              <label>Sign up as Artist</label>
            </div>
            <div
              className={`radioContainer ${
                user_type === "Viewer" && "activeBorder"
              }`}
            >
              <img
                className="radioIcon"
                src={require(`../../images/icons/user-bag.png`)}
                alt="icon"
              />
              <input
                className="radioBtn"
                type="radio"
                id="viewer"
                name="profileType"
                value="Viewer"
                onChange={(e) => setUserType(e.target.value)}
                checked={user_type === "Viewer"}
              />
              <br />
              <label>Sign up as Viewer</label>
            </div>
          </form>
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/signUp">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link className="button nextBackBtn" to="/step2">
              <span>Next</span>
              <img
                className="arrow "
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
