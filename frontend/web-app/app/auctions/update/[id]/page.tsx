import Heading from "@/app/components/Heading"
import React from "react"
import AuctionForm from "../../AuctionForm"
import { getDetailedViewData } from "@/app/actions/auctionActions"

export default async function Update({ params }: { params: { id: string } }) {
  const data = await getDetailedViewData(params.id)
  return (
    <div className="mx-auto shadow-lg p-10 bg-white rounded-lg max-w-[75%]">
      <Heading
        title="Update your auction"
        subTitle="Please update the details of your car"
      />
      <AuctionForm auction={data} />
    </div>
  )
}
