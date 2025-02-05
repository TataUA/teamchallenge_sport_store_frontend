import { HidePagePath } from "./types";

export const HIDE_PAGE_PATH: HidePagePath[] = [
  {
    path: "/cart",
  },
  {
    path: "/orders/success",
  },
  {
    path: "/auth/signup",
  },
  {
    path: "/auth/login",
  },
  {
    path: "/auth/reset_password/[token]",
  },
  {
    path: "/auth/confirming_letter",
  },
  {
    path: "/auth/confirmed_email/[activation_key]",
  },
];
