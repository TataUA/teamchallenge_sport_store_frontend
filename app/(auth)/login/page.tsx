import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <h1>Авторизація</h1>
      <p>Увійдіть або зареєструйтесь щоб продовжити</p>
      <Link href="/signup">Зареєструватись</Link>
    </>
  );
}
