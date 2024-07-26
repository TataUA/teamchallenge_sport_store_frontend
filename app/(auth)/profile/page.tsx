import React from "react";
import { ClientComponent } from "@/components/ClientComponent";
import { PrivateRouteComponent } from "@/components/PrivateRouteComponent";
import { UserData } from "@/components/Auth/UserData";

export default function Profile() {
  return (
    <ClientComponent>
      <PrivateRouteComponent>
        <div className="container">
          <h1 className="mt-4 mb-6 text-2xl font-bold text-title">
            Особистий кабінет
          </h1>
          <UserData />
        </div>
      </PrivateRouteComponent>
    </ClientComponent>
  );
}
