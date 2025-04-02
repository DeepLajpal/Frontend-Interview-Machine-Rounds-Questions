import React from "react";
import Stopwatch from "./Stopwatch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero",
};
const page = () => {
  return <Stopwatch />;
};

export default page;
