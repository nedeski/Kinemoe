import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

export const favCategoriesBtns = [
  "Action",
  "Comedy",
  "Drama",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Documentary",
];
export const Step7 = () => {
  const { favouriteCategories, setFavouriteCategories } = useUserContext();

  const toggleCategories = (favCategory: string) => {
    const checkToggle = favouriteCategories.includes(favCategory);
    if (!checkToggle) {
      setFavouriteCategories([...favouriteCategories, favCategory]);
    } else {
      const index = favouriteCategories.indexOf(favCategory);
      favouriteCategories.splice(index, 1);
      setFavouriteCategories([...favouriteCategories]);
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
              <span className="numberCircle">6</span>
              <span className="culturesTitle">Content Recommendations</span>
            </h4>
            <div className="interestsButtons">
              {favCategoriesBtns.map((el: string, key: number) => (
                <button
                  onClick={(e: any) => toggleCategories(e.target.innerText)}
                  key={key}
                  className={`transparentBtn ${
                    favouriteCategories.includes(el) && "buttonClicked"
                  }`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/step6">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link className="button nextBackBtn" to="/step8">
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
