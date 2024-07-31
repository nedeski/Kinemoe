import { Link } from "react-router-dom";
import { PricingOptions } from "../../components/PricingOptions/PricingOptions";

export const Step4 = () => {
  return (
    <div className="loginContainer">
      <div className="stepsPopUp">
        <div className="stepsInner">
          <h4 className="pricingTitle">
            <span className="numberCircle">3</span> How do you wish to engage
            with Kinemoe?
          </h4>
          <PricingOptions linkDirection={"/Step5"} />
          <div className="nextAndPrevBtnContainer">
            <Link className="button nextBackBtn" to="/step3">
              <img
                className="arrow"
                src={require(`../../images/icons/arrow-left.png`)}
                alt="icon"
              />
              <span>Back</span>
            </Link>
            <Link className="button nextBackBtn" to="/step5">
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
