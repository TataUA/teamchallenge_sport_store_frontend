import { HidePagePath } from "./types";

export const HIDE_PAGE_PATH: HidePagePath[] = [
  {
    pathname: "cart",
    path: "/cart",
  },
  {
    pathname: "signup",
    path: "/signup",
  },
  {
    pathname: "login",
    path: "/login",
  },
  {
    pathname: "profile",
    path: "/profile",
  },
  {
    pathname: "reset_password",
    path: "/reset_password/[token]",
  },
];
