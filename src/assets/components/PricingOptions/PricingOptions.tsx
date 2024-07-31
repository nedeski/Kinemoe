import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

interface LinkDirectionInterface {
  linkDirection: string;
}

export const PricingOptions = ({ linkDirection }: LinkDirectionInterface) => {
  const { setSubscriptionType } = useUserContext();
  return (
    <div className="pricingContainer">
      <div className="pricingCard choice">
        <h5>Watch with ads</h5>
        <p>Free</p>
        <ul>
          <li>Acces to a wisit library</li>
          <li>Unlimited streamings</li>
          <li>Multiple devices</li>
          <li>No subsription Fee</li>
        </ul>
        <Link
          onClick={() => setSubscriptionType("Watch with ads")}
          className="button pricingBtn"
          to={linkDirection}
        >
          Register
        </Link>
      </div>
      <div className="pricingCard relative">
        <div className="redBg">
          <h6 className="optimalChoice">Optimal choice</h6>
        </div>

        <div className="innerCard">
          <h5>Pay to watch</h5>
          <p>499den./month</p>
          <ul>
            <li>Acces to a wisit library</li>
            <li>Unlimited streamings</li>
            <li>Multiple devices</li>
            <li>Watch without ads</li>
            <li>Offline Viewing</li>
          </ul>
          <Link
            onClick={() => setSubscriptionType("Pay to watchs")}
            className="button pricingBtn"
            to={linkDirection}
          >
            Register
          </Link>
        </div>
      </div>
      <div className="pricingCard choice">
        <h5>Engage and receive points</h5>
        <p>Watch with points</p>
        <ul>
          <li>Earn points when you engage</li>
          <li>Claim rewards with earned points</li>
          <li>No subsription Fee</li>
        </ul>
        <Link
          onClick={() => setSubscriptionType("Watch with points")}
          className="button pricingBtn"
          to={linkDirection}
        >
          Register
        </Link>
      </div>
    </div>
  );
};
