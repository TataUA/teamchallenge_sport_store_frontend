import React from "react";

import { ClientComponent } from "@/components/ClientComponent";
import { ConfirmedMessage } from "@/components/Auth/ConfirmEmail/ConfirmedMessage";

export default function Page() {
  return (
    <ClientComponent>
      <ConfirmedMessage />
    </ClientComponent>
  );
}
