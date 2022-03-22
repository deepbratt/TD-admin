import { createSlice } from '@reduxjs/toolkit';

export interface IInitialState {
  filters: any;
  // {
  // province: [];
  // city: [];
  // registrationCity: [];
  // make: [];
  // model: [];
  // transmission: [];
  // assembly: [];
  // engineType: [];
  // color: [];
  // bodyType: [];
  // pictureAvailability: boolean;
  // videoAvailability: boolean;
  // sellerType: [];
  // adType: [];
  // sort: string;
  // condition: string;
  // price: number[];
  // modelYear: number[];
  // milage: number[];
  // engineCapacity: number[];
  // };
}

const initialState: IInitialState = {
  filters: {
    province: [],
    city: [],
    registrationCity: [],
    make: [],
    model: [],
    transmission: [],
    assembly: [],
    engineType: [],
    bodyColor: [],
    bodyType: [],
    sellerType: [],
    sort: "",
    condition: "",
    keyword: "",
    price: ["", ""],
    modelYear: ["", ""],
    milage: ["", ""],
    engineCapacity: ["", ""],
    adType: "",
  },
};

const carFiltersSlice = createSlice({
  name: 'carFilters',
  initialState,
  reducers: {
    setFilter: (state, actions) => {
      state.filters[actions.payload.name] = actions.payload.value;
    },
    setArrayFilter: (state, actions) => {
      state.filters[actions.payload.name] = [
        ...state.filters[actions.payload.name],
        actions.payload.value
      ];
    },
    setFilters: (state, actions) => {
      Object.entries(actions.payload).map(([keys, values]: any) => {
        state.filters[keys] = values;
      });
    },
    removeArrayFilter: (state, actions) => {
      state.filters[actions.payload.name] = state.filters[
        actions.payload.name
      ].filter((item: string) => item !== actions.payload.value);
    },
    removeFilter: (state, actions) => {
      state.filters[actions.payload.name] = actions.payload.value;
    },
    resetFilters: (state) => {
      state.filters = {
        province: [],
        city: [],
        registrationCity: [],
        make: [],
        model: [],
        transmission: [],
        assembly: [],
        engineType: [],
        bodyColor: [],
        bodyType: [],
        sellerType: [],
        adType: "",
        sort: "",
        condition: "",
        keyword: "",
        price: ["", ""],
        modelYear: ["", ""],
        milage: ["", ""],
        engineCapacity: ["", ""],
      };
    }
  }
});

export const {
  setFilter,
  setArrayFilter,
  setFilters,
  removeFilter,
  removeArrayFilter,
  resetFilters
} = carFiltersSlice.actions;

export default carFiltersSlice.reducer;
