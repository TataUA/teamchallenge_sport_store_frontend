'use client'

import { useSelector } from "react-redux"

// components
import UserInfo from "./UserInfo"

// store
import { selectUserData } from "@/redux/auth/authSelector"
import RegisterSection from "./RegisterSection"

const ContactsSection = () => {
  const user = useSelector(selectUserData);
  
  return (
    <div>
        <h3 
        className="text-[#1A1A1C] text-xl font-semibold mb-4 lg:text-2xl min-[2800px]:text-3xl"
      >
        Контактні дані
      </h3>
      {user ? <UserInfo user={user} /> : <RegisterSection />}
      </div>
  )
}

export default ContactsSection
