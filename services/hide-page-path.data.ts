import { HidePagePath } from "./types";

export const HIDE_PAGE_PATH: HidePagePath[] = [
  {
    pathname: "cart",
    path: "/cart",
  },
  {
    pathname: "signup",
    path: "/auth/signup",
  },
  {
    pathname: "login",
    path: "/auth/login",
  },
  {
    pathname: "profile",
    path: "/auth/profile",
  },
  {
    pathname: "reset_password", //не ховає футер, треба доробити, скоріш за все через функцію, якщо ні то прибрати з типів
    path: "/reset_password/[token]",
  },
  {
    pathname: "confirming_letter",
    path: "/auth/confirming_letter",
  },
  {
    pathname: "confirmed_email", //не ховає футер, треба доробити, скоріш за все через функцію, якщо ні то прибрати з типів
    path: (activation_key: string) => `/auth/confirmed_email/${activation_key}`,
  },
];
