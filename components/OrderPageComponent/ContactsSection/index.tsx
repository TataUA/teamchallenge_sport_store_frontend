'use client'

import { useSelector } from "react-redux"

// components
import UserInfo from "./UserInfo"

// store
import { selectUserData } from "@/redux/auth/authSelector"

const ContactsSection = ({children}:{children: any}) => {
  const user = useSelector(selectUserData);
  
  return (
    <div>
        <h3 
        className="text-[#1A1A1C] text-xl font-semibold mb-4 lg:text-2xl min-[2800px]:text-3xl"
      >
        Контактні дані
      </h3>
      {user ? <UserInfo user={user} /> : <>{children}</>}
      </div>
  )
}

export default ContactsSection
