import { createContext } from "react";

interface contextProps{
    barsToggleState: boolean,
    setBarsToggleState: React.Dispatch<React.SetStateAction<boolean>>,
}

const context = {
    barsToggleState: false,
    setBarsToggleState: () => {},
}

 export const BarsToggleContext = createContext<contextProps>(context);