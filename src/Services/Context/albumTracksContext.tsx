import { createContext } from "react";

type contextProps = {
    tracks: any;
}

export const albumTracksContext = createContext<contextProps>({
    tracks: ""
})