import Heading from "@/app/components/Heading"
import React from "react"
import AuctionForm from "../AuctionForm"

export default function Create() {
  return (
    <div className="mx-auto shadow-lg p-10 bg-white rounded-lg max-w-[75%]">
      <Heading title="Sell your Car!" subTitle="Please enter the details of your car." />
      <AuctionForm />
    </div>
  )
}
