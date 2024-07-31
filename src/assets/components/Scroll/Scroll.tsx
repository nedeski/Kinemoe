import React, { useState, useEffect } from "react";

export const Scroll: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust this value as needed to control when the element appears
      if (scrollPosition > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div style={{ opacity: 1, transition: "opacity 0.8s ease-in-out" }}>
          <div className="icons">
            <div className="icon">
              <img src={require(`../../images/icons/Group26.png`)} alt="" />
              <p>Streaming Platform</p>
            </div>
            <div className="icon">
              <img src={require(`../../images/icons/Group27.png`)} alt="" />
              <p>Community hub for artists</p>
            </div>
            <div className="icon">
              <img src={require(`../../images/icons/Group28.png`)} alt="" />
              <p>Platform for sharing culture</p>
            </div>
            <div className="icon">
              <img src={require(`../../images/icons/Group29.png`)} alt="" />
              <p>Social business mode</p>
            </div>
            <div className="icon">
              <img src={require(`../../images/icons/Group30.png`)} alt="" />
              <p>Support for emerging talent</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
