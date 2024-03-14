import { Entries } from "@definitions/index";

export enum EntriesActionTypes {
  POPULATE = "POPULATE",
  FILTER = "FILTER",
}

interface PopulateEntriesAction {
  type: EntriesActionTypes.POPULATE;
  payload: Entries[];
}

interface FilterEntriesAction {
  type: EntriesActionTypes.FILTER;
  payload: string;
}

export type EntriesState = {
  data: Entries[];
  filteredData: Entries[];
  filterValue: string;
  dataLength: number;
};

export type EntriesActions = PopulateEntriesAction | FilterEntriesAction;
export const entriesInitialState: EntriesState = {
  data: [],
  filteredData: [],
  dataLength: 0,
  filterValue: "",
};

const filteredData = (state: EntriesState, payload: string) =>
  state.data.filter((entry: Entries) => {
    return (
      entry["im:name"].label.toLowerCase().includes(payload.toLowerCase()) ||
      entry["im:artist"].label.toLowerCase().includes(payload.toLowerCase())
    );
  });

const entriesReducer = (state: EntriesState, action: EntriesActions) => {
  switch (action.type) {
    case "POPULATE":
      return {
        ...state,
        data: action.payload,
        dataLength: action.payload.length,
      };
    case "FILTER":
      return {
        ...state,
        filterValue: action.payload,
        dataLength: filteredData(state, action.payload).length,
        filteredData: filteredData(state, action.payload),
      };
    default:
      return state;
  }
};

export default entriesReducer;
