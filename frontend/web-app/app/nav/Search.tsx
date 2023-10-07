"use client"
import { useParamsStore } from "@/hooks/useParamsStore"
import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useRouter, usePathname } from "next/navigation"

export default function Search() {
  const router = useRouter()
  const pathName = usePathname()
  const setParams = useParamsStore((state) => state.setParams)
  const setSearchValue = useParamsStore((state) => state.setSearchValue)
  const searchValue = useParamsStore((state) => state.searchValue)

  function onChange(event: any) {
    setSearchValue(event.target.value)
  }

  function search() {
    if (pathName !== "/") router.push("/")
    setParams({ searchTerm: searchValue })
  }

  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shaddow-sm">
      <input
        type="text"
        placeholder="Search for car by make modal or color"
        name="search"
        id="search"
        onKeyDown={(e: any) => {
          if (e.key === "Enter") search()
        }}
        value={searchValue}
        onChange={onChange}
        className="
        flex-grow
        pl-5
        bg-transparent
        focus:outline-none
        border-transparent
        focus:border-transparent
        focus:ring-0
        text-sm
        text-gray-600
        "
      />

      <button
        onClick={(e: any) => {
          if (e.key === "Enter") search()
        }}
      >
        <FaSearch
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  )
}
