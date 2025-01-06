import React from "react";

import { UserData } from "@/components/Auth/EditUser/UserData";

// layouts
import RootLayout from "@/app/layout";
import ProfileLayout from "@/app/ProfileLayout";

export default function Profile() {
  return (
    <ProfileLayout>
      <h1 className="md:hidden mt-4 mb-6 text-2xl leading-140 font-pangram font-bold text-title">
        Особистий кабінет
      </h1>
      <div className="w-full md:max-w-[530px] mt-0 mx-auto">
        <UserData />
      </div>
    </ProfileLayout>
  );
}

Profile.getLayout = function getLayout(page: any) {
  return (
    <RootLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </RootLayout>
  );
};
