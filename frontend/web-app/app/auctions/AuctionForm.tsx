"use client"
import { Button } from "flowbite-react"
import React, { useEffect } from "react"
import { FieldValues, useForm } from "react-hook-form"
import Input from "../components/Input"
import DateInput from "../components/DateInput"
import { createAuction, updateAuction } from "../actions/auctionActions"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Auction } from "@/types"

type Props = {
  auction?: Auction
}
// We are using react-hook-form www.react-hook-form.com/get-started
// We are also using react-datepicker to allow the user to pick a date and time. react-datepicker does not install type automatically
// therefore, you must install @type/react-datepicker as well.
export default function AuctionForm({ auction }: Props) {
  const router = useRouter()
  const pathName = usePathname()
  const {
    handleSubmit,
    setFocus,
    control,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onTouched", // The form will show validation on touched.
  })

  useEffect(() => {
    if (auction) {
      const { make, model, color, year, mileage } = auction
      reset({ make, model, color, year, mileage })
    }
    setFocus("make")
  }, [setFocus])

  // This what react-hool will hold, so we'll get access to them via this properties.
  async function onSubmit(data: FieldValues) {
    try {
      let id = ""
      let res
      if (pathName === "/auctions/create") {
        res = await createAuction(data)
        id = res.id
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id)
          id = auction.id
        }
      }

      if (res.error) {
        throw res.error
      }

      router.push(`/auctions/details/!${id}`)
    } catch (error: any) {
      toast.error(error.status + "  " + error.message)
    }
  }
  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          type="number"
          rules={{ required: "Year is required" }}
        />
        <Input
          label="Mileage"
          name="mileage"
          control={control}
          type="number"
          rules={{ required: "Mileage is required" }}
        />
      </div>
      {pathName === "/auctions/create" && (
        <>
          <Input
            label="Image Url"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (Enter 0 if not reserve)"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: "Reserve price is required" }}
            />
            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              control={control}
              dateFormat="dd MMMM yyyy h:mm a"
              showTimeSelect
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}
      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          outline
          color="success"
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
