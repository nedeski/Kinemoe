import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

const interestsBtns = [
  "Cinema",
  "Visual Arts",
  "Dance",
  "Teatre",
  "Music",
  "Literature",
  "More Options",
];

export const Step2 = () => {
  const { interests, setInterests } = useUserContext();

  const toggleInterests = (e: any) => {
    const checkToggle = interests.includes(e.target.innerText);
    if (!checkToggle) {
      setInterests([...interests, e.target.innerText]);
    } else {
      const index = interests.indexOf(e.target.innerText);
      interests.splice(index, 1);
      setInterests([...interests]);
    }
  };

  return (
    <div className="loginContainer">
      <div className="stepsPopUpCenter">
        <div className="stepsInner">
          <h4>
            <span className="numberCircle">1</span> Tell us what moves you.
            Select your interests to tailor your Kinemoe universe
          </h4>
          <div className="interestsButtons">
            {interestsBtns.map((el: string, key: number) => (
              <button
                onClick={(e: any) => toggleInterests(e)}
                key={key}
                className={`transparentBtn ${
                  interests.includes(el) && "buttonClicked"
                }`}
              >
                {el}
              </button>
            ))}
          </div>
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/step1">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link className="button nextBackBtn" to="/step3">
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
