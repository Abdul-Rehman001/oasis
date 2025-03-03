import About from "@/components/about/About";
import siteConfig from "../config/site-config";
import React from "react";

export default function page() {
  return (
    <>
      <About data={siteConfig.homepage.about} />/
    </>
  );
}
