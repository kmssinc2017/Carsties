"use client"
import React, { useEffect, useState } from "react"
import AuctionCard from "./AuctionCard"
import AppPagination from "../components/AppPagination"
import { Auction, PagedResult } from "@/types"
import { getData } from "../actions/auctionActions"
import Filters from "./Filters"
import qs from "query-string"
import { Actions, State, useParamsStore } from "@/hooks/useParamsStore"
import { State as auctionStore, useAuctionStore } from "@/hooks/useAuctionStore"
import { shallow } from "zustand/shallow"
import EmptyFilter from "../components/EmptyFilter"

export default function Listing() {
  const [loading, setLoading] = useState(true)
  const params = useParamsStore(
    (state: State) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }),
    shallow
  )

  const data = useAuctionStore(
    (state: auctionStore) => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }),
    shallow
  )

  const setData = useAuctionStore((state) => state.setData)

  const setParams = useParamsStore((state: Actions) => state.setParams)
  const url = qs.stringifyUrl({ url: "", query: params })

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber })
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [url])

  if (loading) return <h3>Loading...</h3>
  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data?.auctions.map((auction: Auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
          <div className="flex justify-center">
            <AppPagination
              pageChanged={setPageNumber}
              currentPage={params.pageNumber}
              pageCount={data?.pageCount}
            />
          </div>
        </>
      )}
    </>
  )
}
