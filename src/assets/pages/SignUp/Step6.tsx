import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";
const culturesBtns = [
  "Macedonian",
  "Balkan",
  "European",
  "Mediteranian",
  "Global",
];
export const Step6 = () => {
  const { cultures, setCultures } = useUserContext();

  const toggleCultures = (culture: string) => {
    const checkToggle = cultures.includes(culture);
    if (!checkToggle) {
      setCultures([...cultures, culture]);
    } else {
      const index = cultures.indexOf(culture);
      cultures.splice(index, 1);
      setCultures([...cultures]);
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
              alt="icon"
            />
            <p>Nickname</p>
          </div>
          <div>
            <h4 className="culturesTitleContainer">
              <span className="numberCircle">5</span>{" "}
              <span className="culturesTitle">
                Which cultures resonate with you?
              </span>
            </h4>
            <p className="culturesSubtitle">
              <i>Your choices help us curate content just for you</i>
            </p>
            <div className="culturesButtons">
              {culturesBtns.map((el: string, key: number) => (
                <button
                  onClick={(e: any) => toggleCultures(e.target.innerText)}
                  key={key}
                  className={`transparentBtn ${
                    cultures.includes(el) && "buttonClicked"
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/step5">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link className="button nextBackBtn" to="/step7">
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
