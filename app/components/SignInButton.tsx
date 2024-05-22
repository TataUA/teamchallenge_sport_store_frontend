import React from "react";
import Link from "next/link";
//import dynamic from "next/dynamic";
import Image from "next/image";
import user from "@/public/icons/user.svg";

// const RegisterFormModal = dynamic(() => import("./RegisterFormModal"), {
//   ssr: false,
// });

export default function SignInButton() {
  //const [show, setShow] = useState(false);

  return (
    <>
      <Link href="/profile">
        <Image src={user} alt="Icon user" className="w-10 h-10" />
      </Link>
      {/* <RegisterFormModal
        onSubmit={console.log} //change
        show={show}
        onClose={() => setShow(false)}
      /> */}
    </>
  );
}
