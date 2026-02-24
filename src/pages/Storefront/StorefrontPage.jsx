import LatestArrivals from "../../components/LatestArrivals";
import Collections from "./components/Collections";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";

const StorefrontPage = () => {
  return (
    <>
      <HeroSection />
      <LatestArrivals />
      <Collections />
      <FeaturesSection />
    </>
  );
};

export default StorefrontPage;
