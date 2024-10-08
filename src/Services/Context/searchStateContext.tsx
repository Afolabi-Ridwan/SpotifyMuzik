import { createContext } from "react";

interface contextProps {
  searchState: boolean;
  updateSearchState: React.Dispatch<React.SetStateAction<boolean>>;
}

const context = {
  searchState: false,
  updateSearchState: () => {},
};

export const SearchStateContext = createContext<contextProps>(context);
