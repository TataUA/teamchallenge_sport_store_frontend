"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsRefreshing } from "@/redux/auth/authSelector";
import { Loader } from "../Loader";
import { UserDataSave } from "./UserDataSave";
import { UserDataEdit } from "./UserDataEdit";

export const UserData = () => {
  const isRefreshing = useSelector(selectIsRefreshing);
  const [editData, setEditData] = useState(false);
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
