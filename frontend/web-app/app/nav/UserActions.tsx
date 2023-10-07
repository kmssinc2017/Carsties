"use client"
import { Dropdown } from "flowbite-react"
import { DropdownDivider } from "flowbite-react/lib/esm/components/Dropdown/DropdownDivider"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai"
import { HiCog, HiUser } from "react-icons/hi2"
import { useParamsStore } from "@/hooks/useParamsStore"

type Props = {
  user: User
}
export default function UserActions({ user }: Props) {
  // We need access to the path name and the router to determine where the user is. If the user is in the listing page
  // no need to take action. If the user is in another page, we need to bring the user back to the main page.

  const router = useRouter()
  const pathName = usePathname()
  const setParams = useParamsStore((state) => state.setParams)

  function setWinner() {
    setParams({ winner: user.username, seller: undefined })
    if (pathName !== "/") router.push("/")
  }

  function setSeller() {
    setParams({ seller: user.username, winner: undefined })
    if (pathName !== "/") router.push("/")
  }

  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item onClick={setSeller} icon={HiUser}>
        {" "}
        My Auctions
      </Dropdown.Item>
      <Dropdown.Item onClick={setWinner} icon={AiFillTrophy}>
        Auction Won
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/auctions/create">Sell my car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session(Dev only)</Link>
      </Dropdown.Item>
      <DropdownDivider />
      <Dropdown.Item
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </Dropdown.Item>
    </Dropdown>
  )
}
