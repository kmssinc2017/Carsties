"use client"
import { Button, Dropdown } from "flowbite-react"
import { DropdownDivider } from "flowbite-react/lib/esm/components/Dropdown/DropdownDivider"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai"
import { HiCog, HiUser } from "react-icons/hi2"

type Props = {
  user: Partial<User>
}
export default function UserActions({ user }: Props) {
  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item icon={HiUser}>
        <Link href="/">My Auctions</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy}>
        <Link href="/">Auction Won</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href="/">Sell my car</Link>
      </Dropdown.Item>
      <Dropdown.Item href="/session" icon={HiCog}>
        <Link href="/">Session(Dev only)</Link>
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
