// create a state for the application. This is the state where we're going to save the parameters for the request's query string.

import { create } from "zustand"

// The state will holds the pagenumber, pagesize, pagecount, and searchTerm
export type State = {
  pageNumber: number
  pageSize: number
  pageCount: number
  searchTerm: string
  searchValue: string
  orderBy: string
  filterBy: string
  seller?: string
  winner?: string
}

// These are the actions that we'll support within the state. We'll call this action to update the state.
// The keyword partial make each property within the states optional without having to mark each property as optional.
export type Actions = {
  setParams: (params: Partial<State>) => void
  reset: () => void
  setSearchValue: (value: string) => void
}

// This is the initial state that we'll start with.
const initialState: State = {
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  searchTerm: "",
  searchValue: "",
  orderBy: "",
  filterBy: "live",
  seller: undefined,
  winner: undefined,
}

// We'll export the state and actions. Because it's expecting state and actions, we need to provide all methods and properties
// for state and actions. Make sure the create is imported from Zustand; otherwise, it will create an issue.
export const useParamsStore = create<State & Actions>()((set) => ({
  ...initialState,
  setParams: (newParams: Partial<State>) => {
    set((state) => {
      if (newParams.pageNumber) {
        return {
          ...state,
          pageNumber: newParams.pageNumber,
        }
      } else {
        return { ...state, ...newParams, pageNumber: 1 }
      }
    })
  },
  reset: () => set(initialState),
  setSearchValue: (value: string) => {
    set({ searchValue: value })
  },
}))
