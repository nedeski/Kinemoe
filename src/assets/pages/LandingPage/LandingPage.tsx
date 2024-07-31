import { Link } from "react-router-dom";
import "./landing-page.css";
import { Scroll } from "../../components/Scroll/Scroll";
import { PricingOptions } from "../../components/PricingOptions/PricingOptions";

export const LandingPage = () => {
  return (
    <div className="landingPage">
      <section className="title-section">
        <div className="logo">
          <img
            className="logoImage"
            src={require(`../../images/logo-large.png`)}
            alt="logo"
          />
        </div>
        <h1>Explore, engage & express yourself</h1>
        <p className="subtitle">Watch, learn, collaborate beyound the screen</p>
        <Link className="button lendingBtn" to="/signIn">
          Sign up/Log in
        </Link>
      </section>
      <section className="banner-wrapper">
        <img
          className="landingBanner"
          src={require(`../../images/Frame147.png`)}
          alt="landing banner"
        />
        <Scroll />
      </section>
      <section className="rooms">
        <div className="room">
          <h4>Movie Room</h4>
          <img src={require(`../../images/Frame175.png`)} alt="" />
        </div>
        <div className="room">
          <h4>Kids Room</h4>
          <img src={require(`../../images/Kids.png`)} alt="" />
        </div>
        <div className="room">
          <h4>Doc. Room</h4>
          <img src={require(`../../images/Doc.png`)} alt="" />
        </div>
        <div className="room">
          <h4>Podcasts</h4>
          <img src={require(`../../images/Podcast.png`)} alt="" />
        </div>
        <div className="room">
          <h4>TV Series</h4>
          <img src={require(`../../images/Frame175.png`)} alt="" />
        </div>
      </section>
      <section className="artists">
        <h3>Meet the artists</h3>
        <div className="artistsContainer">
          <Link to="/LogIn" className="artistCard">
            <img src={require(`../../images/actors/igor.png`)} alt="artist" />
          </Link>
          <Link to="/LogIn" className="artistCard">
            <img src={require(`../../images/actors/rade.png`)} alt="artist" />
          </Link>
          <Link to="/LogIn" className="artistCard">
            <img src={require(`../../images/actors/toni.png`)} alt="artist" />
          </Link>
          <Link to="/LogIn" className="artistCard">
            <img src={require(`../../images/actors/sasko.png`)} alt="artist" />
          </Link>

          <Link to="/LogIn" className="artistCard">
            <img src={require(`../../images/actors/igor.png`)} alt="artist" />
          </Link>
          <Link to="/LogIn" className="artistCard">
            <img src={require(`../../images/actors/rade.png`)} alt="artist" />
          </Link>
          <Link to="/LogIn" className="artistCard">
            <img src={require(`../../images/actors/toni.png`)} alt="artist" />
          </Link>
          <Link to="/LogIn" className="artistCard">
            <img src={require(`../../images/actors/sasko.png`)} alt="artist" />
          </Link>
        </div>
      </section>
      <section className="latestMovieBanner">
        <img
          src={require(`../../images/familijaMarkovski.png`)}
          alt="latest movie banner"
        />
      </section>
      <section className="pricingOptions">
        <PricingOptions linkDirection={"/SignIn"} />
      </section>
      <footer className="landingFooter">
        <p>
          KINEMOE.MK &#169; <span>2024</span>{" "}
        </p>
        <img src={require(`../../images/logo-large.png`)} alt="" />
      </footer>
    </div>
  );
};
