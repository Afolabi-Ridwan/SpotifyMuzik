import {create} from "zustand";

interface storeTypes {
    tracks: any;
    updateTrackLists: (tracks: any) => void;
}

export const useTracksStore = create<storeTypes>((set) => ({
    tracks: [],
    updateTrackLists: (trackLists) => {
        set({tracks: trackLists})
    },
    
}))