'use client'

import { currentUser } from "@/services/api"

const fetchUserAction = async () => {

  const data = await currentUser()

  return data
}

export default fetchUserAction
