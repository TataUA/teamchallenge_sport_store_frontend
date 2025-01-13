import React from "react";

import { UserData } from "@/components/Auth/EditUser/UserData";

// layouts
import RootLayout from "@/app/layout";
import ProfileLayout from "@/app/ProfileLayout";

export default function Profile() {
  return (
    <ProfileLayout>
      <h1 className="md:hidden mt-4 mb-6 text-2xl leading-140 font-pangram font-bold text-title">
        Мої данні
      </h1>
      <div className="w-full mt-[30px] md:max-w-[530px] mx-auto">
        <UserData editModeOpened />
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
