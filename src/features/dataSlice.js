import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objectId: 101,
  apiData: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, apiData: action.payload };
    },
    incrementId: (state) => {
      return { ...state, objectId: state.objectId + 1 };
    },
    decrementId: (state) => {
      return { ...state, objectId: state.objectId - 1 };
    },
    enterId: (state, action) => {
      return { ...state, objectId: action.payload };
    },
    clearData: () => {
      return initialState;
    },
  },
});

export const { setData, incrementId, decrementId, enterId, clearData } =
  dataSlice.actions;

export default dataSlice.reducer;

export const fetchData = () => {
  const dataThunk = async (dispatch, getState) => {
    const state = getState();
    console.log(state);
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`
    );
    const resData = await response.json();
    dispatch(setData(resData));
  };
  return dataThunk;
};
