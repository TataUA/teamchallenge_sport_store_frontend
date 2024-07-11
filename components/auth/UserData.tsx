"use client";

import React, { useState } from "react";
import { UserDataSave } from "./UserDataSave";
import { UserDataEdit } from "./UserDataEdit";

export const UserData = () => {
  const [editData, setEditData] = useState(false);

  return editData ? (
    <UserDataEdit setEditData={setEditData} />
  ) : (
    <UserDataSave setEditData={setEditData} />
  );
};
