export interface propType {
  albums: any[];
  error: string | null;
  artistName: string;
}

export interface Album {
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
  album_type: string;
  release_date: string;
  id: string;
}

export interface mobileView{
  albums: any[]
}

export interface desktopView{
  albums: any[]
}

export interface errorProps {
  errorState: string | null;
  errorHandler: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface UiProps {
  resultHandler: null | any;
  errorState: string | null;
  errorHandler: React.Dispatch<React.SetStateAction<null | string>>;
  searchState: boolean
}

export interface playlistsProps{
  albums: any[],
  title: string;
  error: any
}