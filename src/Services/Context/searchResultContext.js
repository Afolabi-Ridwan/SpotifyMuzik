import {create} from "zustand"

export const searchContext = create((set) => ({
    data: [],
    updateData: (data) => {
        set({data: data})
    },
}))