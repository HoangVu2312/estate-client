// This file use data from appApi to update redux store

import { createSlice } from "@reduxjs/toolkit";
import appApi from "../service/appApi";


const initialState = null;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            return initialState
        },
    },

    // update redux store using data from server
    extraReducers: (builder) => {
        // '_' is current state (not use), payload is data from back-end
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appApi.endpoints.login.matchFulfilled, (_, {payload}) => payload);
        builder.addMatcher(appApi.endpoints.addRemoveFavorite.matchFulfilled, (_, {payload}) => payload);
    },

});

export const {logout} = userSlice.actions;
export default userSlice.reducer;