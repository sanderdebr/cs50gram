import React from "react";
import { useAuth } from "../firebase/context";

const Home = () => {
  const { user } = useAuth();

  return user ? "user logged in" : "not logged in";
};
export default Home;
