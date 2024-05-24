import { redirect } from "next/navigation";

export default function Profile() {
  const authenticate = 0;
  if (!authenticate) {
    redirect("/login");
  }
  return (
    <>
      <h1>Особистий кабінет</h1>
    </>
  );
}
