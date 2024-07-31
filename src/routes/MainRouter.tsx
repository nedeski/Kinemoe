import { useEffect, useState } from "react";
import { useUserContext } from "../assets/context/UserContext/UserContext";
import { AuthorizedRoutes } from "./authorized-routes/AuthorizedRoutes";
import { NonAuthorizedRoutes } from "./non-authorized-routes/NonAuthorizedRoutes";
import { UserInterface } from "../assets/context/UserContext/UserContextInterfaces";

export const MainRouter = () => {
  const { user } = useUserContext();
  const userObj = localStorage.getItem("user");

  if (userObj) {
    return <AuthorizedRoutes />;
  } else {
    return <NonAuthorizedRoutes />;
  }
};
