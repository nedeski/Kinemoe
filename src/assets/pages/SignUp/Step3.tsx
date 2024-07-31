import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

export const Step3 = () => {
  const { tutorial, setTutorial } = useUserContext();

  return (
    <div className="loginContainer">
      <div className="stepsPopUpCenter">
        <div className="stepsInner">
          <h4>
            <span className="numberCircle">2</span> How do you wish to engage
            with Kinemoe?
          </h4>
          <div className="engagePage">
            <div className="engageButtons">
              <button
                onClick={() => setTutorial(true)}
                className={`transparentBtn engageBtn ${
                  tutorial && "buttonClicked"
                }`}
              >
                <img
                  src={require(`../../images/icons/mingcute_eye-line.png`)}
                  alt="icon"
                />
                Show me around
              </button>
              <button
                onClick={() => setTutorial(false)}
                className={`transparentBtn engageBtn ${
                  !tutorial && "buttonClicked"
                }`}
              >
                <img
                  src={require(`../../images/icons/material-symbols_diversity-4-outline.png`)}
                  alt="icon"
                />
                Dive right in and explore
              </button>
            </div>
          </div>
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/step2">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link className="button nextBackBtn" to="/step4">
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
