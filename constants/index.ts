import { SvgProps, headerNavItem } from "@/services/types";

export const headerNav: headerNavItem[] = [
  { href: "", name: "search" },
  { href: "/auth/profile", name: "user" },
  { href: "/cart", name: "cart" },
];

export const iconsData: SvgProps[] = [
  {
    path: "M21.7104 20.29L18.0004 16.61C19.4405 14.8144 20.1379 12.5353 19.9492 10.2413C19.7605 7.94733 18.7001 5.81281 16.9859 4.27667C15.2718 2.74053 13.0342 1.91954 10.7333 1.9825C8.43243 2.04546 6.24311 2.98759 4.61553 4.61517C2.98795 6.24275 2.04582 8.43207 1.98286 10.7329C1.9199 13.0338 2.7409 15.2714 4.27704 16.9855C5.81318 18.6997 7.94769 19.7601 10.2417 19.9488C12.5357 20.1375 14.8148 19.4401 16.6104 18L20.2904 21.68C20.3834 21.7738 20.494 21.8482 20.6158 21.8989C20.7377 21.9497 20.8684 21.9758 21.0004 21.9758C21.1324 21.9758 21.2631 21.9497 21.385 21.8989C21.5068 21.8482 21.6174 21.7738 21.7104 21.68C21.8906 21.4936 21.9914 21.2444 21.9914 20.985C21.9914 20.7257 21.8906 20.4765 21.7104 20.29ZM11.0004 18C9.61592 18 8.26255 17.5895 7.1114 16.8203C5.96026 16.0511 5.06305 14.9579 4.53324 13.6788C4.00342 12.3997 3.8648 10.9923 4.1349 9.63439C4.40499 8.27653 5.07168 7.02925 6.05065 6.05028C7.02961 5.07131 8.27689 4.40463 9.63476 4.13453C10.9926 3.86443 12.4001 4.00306 13.6792 4.53287C14.9583 5.06268 16.0515 5.95989 16.8207 7.11103C17.5899 8.26218 18.0004 9.61556 18.0004 11C18.0004 12.8565 17.2629 14.637 15.9501 15.9498C14.6374 17.2625 12.8569 18 11.0004 18Z",
    name: "search",
    viewBox: "0 0 24 24",
  },
  {
    path: "M15.7105 12.71C16.6909 11.9387 17.4065 10.8809 17.7577 9.68394C18.109 8.48697 18.0784 7.21027 17.6703 6.03147C17.2621 4.85267 16.4967 3.83039 15.4806 3.10686C14.4644 2.38332 13.2479 1.99451 12.0005 1.99451C10.753 1.99451 9.5366 2.38332 8.52041 3.10686C7.50423 3.83039 6.73883 4.85267 6.3307 6.03147C5.92257 7.21027 5.892 8.48697 6.24325 9.68394C6.59449 10.8809 7.31009 11.9387 8.29048 12.71C6.61056 13.383 5.14477 14.4994 4.04938 15.9399C2.95398 17.3805 2.27005 19.0913 2.07048 20.89C2.05604 21.0213 2.0676 21.1542 2.10451 21.2811C2.14142 21.4079 2.20295 21.5263 2.2856 21.6293C2.4525 21.8375 2.69527 21.9708 2.96049 22C3.2257 22.0292 3.49164 21.9518 3.69981 21.7849C3.90798 21.618 4.04131 21.3752 4.07049 21.11C4.29007 19.1552 5.22217 17.3498 6.6887 16.0388C8.15524 14.7278 10.0534 14.003 12.0205 14.003C13.9876 14.003 15.8857 14.7278 17.3523 16.0388C18.8188 17.3498 19.7509 19.1552 19.9705 21.11C19.9977 21.3557 20.1149 21.5827 20.2996 21.747C20.4843 21.9114 20.7233 22.0015 20.9705 22H21.0805C21.3426 21.9698 21.5822 21.8373 21.747 21.6313C21.9119 21.4252 21.9886 21.1624 21.9605 20.9C21.76 19.0962 21.0724 17.381 19.9713 15.9382C18.8703 14.4954 17.3974 13.3795 15.7105 12.71ZM12.0005 12C11.2094 12 10.436 11.7654 9.7782 11.3259C9.12041 10.8864 8.60772 10.2616 8.30497 9.53074C8.00222 8.79983 7.923 7.99557 8.07734 7.21964C8.23168 6.44372 8.61265 5.73099 9.17206 5.17158C9.73147 4.61217 10.4442 4.2312 11.2201 4.07686C11.996 3.92252 12.8003 4.00173 13.5312 4.30448C14.2621 4.60724 14.8868 5.11993 15.3264 5.77772C15.7659 6.43552 16.0005 7.20888 16.0005 8C16.0005 9.06087 15.5791 10.0783 14.8289 10.8284C14.0788 11.5786 13.0614 12 12.0005 12Z",
    name: "user",
    viewBox: "0 0 24 24",
  },
  {
    path: "M20 16H6C5.73478 16 5.48043 15.8946 5.29289 15.7071C5.10536 15.5196 5 15.2652 5 15C5 14.7348 5.10536 14.4804 5.29289 14.2929C5.48043 14.1054 5.73478 14 6 14H16.44C17.1087 14 17.7582 13.7767 18.2854 13.3654C18.8126 12.9542 19.1873 12.3786 19.35 11.73L21 5.24C21.0375 5.09241 21.0407 4.93821 21.0095 4.78917C20.9783 4.64013 20.9135 4.50018 20.82 4.38C20.7227 4.25673 20.5978 4.1581 20.4554 4.09208C20.3129 4.02606 20.1569 3.99452 20 4H5.76C5.55369 3.41645 5.17193 2.911 4.66707 2.55294C4.1622 2.19488 3.55894 2.00174 2.94 2H2C1.73478 2 1.48043 2.10536 1.29289 2.29289C1.10536 2.48043 1 2.73478 1 3C1 3.26522 1.10536 3.51957 1.29289 3.70711C1.48043 3.89464 1.73478 4 2 4H2.94C3.16843 3.99334 3.39226 4.06513 3.57421 4.20341C3.75615 4.34169 3.88525 4.53812 3.94 4.76L4 5.24L5.73 12C4.93435 12.0358 4.18551 12.3862 3.64822 12.9741C3.11093 13.5621 2.8292 14.3394 2.865 15.135C2.9008 15.9306 3.25121 16.6795 3.83914 17.2168C4.42707 17.7541 5.20435 18.0358 6 18H6.18C6.01554 18.4531 5.96269 18.9392 6.02593 19.4171C6.08917 19.895 6.26665 20.3506 6.54332 20.7454C6.81999 21.1401 7.18772 21.4624 7.61535 21.6849C8.04299 21.9074 8.51795 22.0235 9 22.0235C9.48205 22.0235 9.95701 21.9074 10.3846 21.6849C10.8123 21.4624 11.18 21.1401 11.4567 20.7454C11.7334 20.3506 11.9108 19.895 11.9741 19.4171C12.0373 18.9392 11.9845 18.4531 11.82 18H14.18C14.0155 18.4531 13.9627 18.9392 14.0259 19.4171C14.0892 19.895 14.2666 20.3506 14.5433 20.7454C14.82 21.1401 15.1877 21.4624 15.6154 21.6849C16.043 21.9074 16.5179 22.0235 17 22.0235C17.4821 22.0235 17.957 21.9074 18.3846 21.6849C18.8123 21.4624 19.18 21.1401 19.4567 20.7454C19.7334 20.3506 19.9108 19.895 19.9741 19.4171C20.0373 18.9392 19.9845 18.4531 19.82 18H20C20.2652 18 20.5196 17.8946 20.7071 17.7071C20.8946 17.5196 21 17.2652 21 17C21 16.7348 20.8946 16.4804 20.7071 16.2929C20.5196 16.1054 20.2652 16 20 16ZM18.72 6L17.41 11.24C17.3552 11.4619 17.2262 11.6583 17.0442 11.7966C16.8623 11.9349 16.6384 12.0067 16.41 12H7.78L6.28 6H18.72ZM9 20C8.80222 20 8.60888 19.9414 8.44443 19.8315C8.27998 19.7216 8.15181 19.5654 8.07612 19.3827C8.00043 19.2 7.98063 18.9989 8.01921 18.8049C8.0578 18.6109 8.15304 18.4327 8.29289 18.2929C8.43275 18.153 8.61093 18.0578 8.80491 18.0192C8.99889 17.9806 9.19996 18.0004 9.38268 18.0761C9.56541 18.1518 9.72159 18.28 9.83147 18.4444C9.94135 18.6089 10 18.8022 10 19C10 19.2652 9.89464 19.5196 9.70711 19.7071C9.51957 19.8946 9.26522 20 9 20ZM17 20C16.8022 20 16.6089 19.9414 16.4444 19.8315C16.28 19.7216 16.1518 19.5654 16.0761 19.3827C16.0004 19.2 15.9806 18.9989 16.0192 18.8049C16.0578 18.6109 16.153 18.4327 16.2929 18.2929C16.4327 18.153 16.6109 18.0578 16.8049 18.0192C16.9989 17.9806 17.2 18.0004 17.3827 18.0761C17.5654 18.1518 17.7216 18.28 17.8315 18.4444C17.9414 18.6089 18 18.8022 18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20Z",
    name: "cart",
    viewBox: "0 0 24 24",
  },
  {
    path: "M15 4.5H12V3.75C12 3.15326 11.7629 2.58097 11.341 2.15901C10.919 1.73705 10.3467 1.5 9.75 1.5H8.25C7.65326 1.5 7.08097 1.73705 6.65901 2.15901C6.23705 2.58097 6 3.15326 6 3.75V4.5H3C2.80109 4.5 2.61032 4.57902 2.46967 4.71967C2.32902 4.86032 2.25 5.05109 2.25 5.25C2.25 5.44891 2.32902 5.63968 2.46967 5.78033C2.61032 5.92098 2.80109 6 3 6H3.75V14.25C3.75 14.8467 3.98705 15.419 4.40901 15.841C4.83097 16.2629 5.40326 16.5 6 16.5H12C12.5967 16.5 13.169 16.2629 13.591 15.841C14.0129 15.419 14.25 14.8467 14.25 14.25V6H15C15.1989 6 15.3897 5.92098 15.5303 5.78033C15.671 5.63968 15.75 5.44891 15.75 5.25C15.75 5.05109 15.671 4.86032 15.5303 4.71967C15.3897 4.57902 15.1989 4.5 15 4.5ZM7.5 3.75C7.5 3.55109 7.57902 3.36032 7.71967 3.21967C7.86032 3.07902 8.05109 3 8.25 3H9.75C9.94891 3 10.1397 3.07902 10.2803 3.21967C10.421 3.36032 10.5 3.55109 10.5 3.75V4.5H7.5V3.75ZM12.75 14.25C12.75 14.4489 12.671 14.6397 12.5303 14.7803C12.3897 14.921 12.1989 15 12 15H6C5.80109 15 5.61032 14.921 5.46967 14.7803C5.32902 14.6397 5.25 14.4489 5.25 14.25V6H12.75V14.25Z",
    name: "delete",
    viewBox: "0 0 18 18",
  },
  {
    path: "M3.75 9H14.25",
    name: "minus",
    viewBox: "0 0 18 18",
  },
  {
    path: "M9 3.75V14.25 M3.75 9H14.25",
    name: "plus",
    viewBox: "0 0 18 18",
  },
];
