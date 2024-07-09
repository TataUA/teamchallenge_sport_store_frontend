import React from "react";
import { ClientComponent } from "@/components/ClientComponent";
import { PrivateRouteComponent } from "@/components/PrivateRouteComponent";

export default function Profile() {
  return (
    <ClientComponent>
      <PrivateRouteComponent>
        <h1>Особистий кабінет</h1>
      </PrivateRouteComponent>
    </ClientComponent>
  );
}
