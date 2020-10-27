import React from "react";
import SearchBox from "./SearchBox";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <h1>Where are you off to Next?</h1>
      <br />
      <h2>
        Find the <span style={{ color: "#f2bf5d" }}>perfect</span> match
      </h2>
      <SearchBox />
    </div>
  );
};

export default LandingPage;
