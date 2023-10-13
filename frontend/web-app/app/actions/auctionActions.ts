"use server"
import { Auction, Bid, PagedResult } from "@/types"
import { fetchWarpper as fetchWrapper } from "@/lib/fetchWrapper"
import { FieldValues } from "react-hook-form"
import { revalidatePath } from "next/cache"

export async function getData(query: string): Promise<PagedResult<Auction>> {
  return await fetchWrapper.get(`search${query}`)
}

export async function updateAuctionTest() {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  }
  const id: string = "!e3427462-ba22-4e09-90ac-02a758c3b767"
  return await fetchWrapper.put(`auctions/${id}`, data)
}

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post("auctions", data)
}

export async function updateAuction(data: FieldValues, id: string) {
  return await fetchWrapper.put(`auctions/${id}`, data)
}

export async function getDetailedViewData(id: string): Promise<Auction> {
  const res = await fetchWrapper.get(`auctions/${id}`)
  revalidatePath(`/auctions/${id}`)
  return res
}

export async function deleteAuction(id: string) {
  return await fetchWrapper.del(`auctions/${id}`)
}

export async function getBidsForAuction(id: string): Promise<Bid[]> {
  return await fetchWrapper.get(`bids/${id}`)
}
