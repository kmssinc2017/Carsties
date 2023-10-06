import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { headers, cookies } from "next/headers"
import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  //We don't have access to the request object that is needed to pass down to the get token function, so we need workaround
  try {
    const session = await getSession()
    console.log({ session })
    if (!session) return null
    return session.user
  } catch (error) {
    return null
  }
}

export async function getTokenWorkAround() {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  } as NextApiRequest

  return await getToken({ req })
}
