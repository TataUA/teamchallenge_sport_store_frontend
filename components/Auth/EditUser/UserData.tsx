"use client";
import React, { useState } from "react";

import { useSelector } from "react-redux";

import { selectIsRefreshing } from "@/redux/auth/authSelector";
import { Loader } from "@/components/Loader";
import { UserDataSave } from "@/components/Auth/EditUser/UserDataSave";
import { UserDataEdit } from "@/components/Auth/EditUser/UserDataEdit";

export const UserData = ({ editModeOpened=false }: { editModeOpened?: boolean}) => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const [editData, setEditData] = useState(editModeOpened);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  return (
    <>
      {isRefreshing && <Loader />}

      {editData ? (
        <UserDataEdit
          setEditData={setEditData}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      ) : (
        <UserDataSave
          setEditData={setEditData}
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      )}
    </>
  );
};
