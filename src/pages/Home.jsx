import React from "react";
import HomeHero from "../components/home/HomeHero";
import HomeServices from "../components/home/HomeServices";
import HomeStats from "../components/home/HomeStats";
import HomeTestimonials from "../components/home/HomeTestimonials";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      <HomeHero />
      <HomeServices />
      {/* <HomeStats /> */}
      <HomeTestimonials />
    </div>
  );
};

export default Home;
