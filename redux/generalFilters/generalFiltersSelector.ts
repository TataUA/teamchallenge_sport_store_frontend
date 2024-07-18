import { IGeneralFiltersState } from "./generalFiltersSlice";

export const selectGeneralFilters = (state: { generalFilters: IGeneralFiltersState }) => state.generalFilters;
