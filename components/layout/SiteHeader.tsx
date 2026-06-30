"use client";

import { useState } from "react";
import TopBanner from "./Banner/TopBanner";
import TopNavbar from "./Navbar/TopNavbar";

const SiteHeader = () => {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <>
      {/* Fixed header: banner + navbar stacked together */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {bannerVisible && (
          <TopBanner onClose={() => setBannerVisible(false)} />
        )}
        <TopNavbar />
      </div>

      {/* Spacer that matches the total fixed header height */}
      <div
        style={{ height: bannerVisible ? "calc(40px + 60px)" : "60px" }}
      />
    </>
  );
};

export default SiteHeader;
