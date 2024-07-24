import { ISearchState } from "./searchSlice";

export const selectSearch = (state: { search: ISearchState }) => state.search
