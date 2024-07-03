

import React from "react";
import { PrivateRouteComponent } from "@/components/PrivateRouteComponent";
import { ClientComponent } from "@/components/ClientComponent";

export default function Profile() {
  return (
    <ClientComponent>
      <PrivateRouteComponent>
        <h1>Особистий кабінет</h1>
      </PrivateRouteComponent>
    </ClientComponent>
  );
}
