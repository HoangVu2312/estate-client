import { createSlice } from "@reduxjs/toolkit";
import appApi from "../service/appApi";


const initialState = [];

export const propertySlice =  createSlice({
    name: "properties",
    initialState,
    reducers: {
        // data fetched in Home page => update redux state
        updateProperties: (_, action) => {
            return action.payload;
        },
    },

    // handle api-requests
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createProperty.matchFulfilled, (_, { payload }) => payload );
        builder.addMatcher(appApi.endpoints.deleteProperty.matchFulfilled, (_, { payload }) => payload );
        //builder.addMatcher(appApi.endpoints.createAppointment.matchFulfilled, (_, { payload }) => payload );
    },
});

export const {updateProperties} = propertySlice.actions;
export default propertySlice.reducer;