// This file basically send HTTP request and get response from BE
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



// Set up hearder to include token everytime send request
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token"); // get token from local storage

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    }
});


// Create api => send request and update local storage from with data from be
export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery,
    endpoints: (builder) => ({
        // user
        signup: builder.mutation({
            query:({name, email, password, isOwner}) => ({
                url: '/users/signup',
                method: 'POST',
                body: {name, email, password, isOwner},
            }),

            // Transform data from server before return to client
            transformResponse: (response) => {
                console.log(response)
                 const {token, user} = response;  // extract token token, 

                localStorage.setItem('token', token); // save token to localstorage
                return user;
                
            },
        }),

        login: builder.mutation({
            query: ({ email, password }) => ({
              url: '/users/login',
              method: 'POST',
              body: { email, password },
            }),
            // transforms the response from the server before returning it to the client
            transformResponse: (response) => {
            
            const {token, user } = response;        
            localStorage.setItem('token', token);
      
            return user;
            },
        }),


        // property
        createProperty: builder.mutation({
            query:({property, userId}) => ({
                url: "/properties",
                body: {property, userId},
                method: "POST",

            }),
        }),

        deleteProperty: builder.mutation({
            query:({ propertyId, userId }) => ({
                url: `/properties/${propertyId}`,
                body: {userId},
                method: "DELETE",
            }),
        }),

        // add or remove from favorite
        addRemoveFavorite: builder.mutation({
            query: (favoriteInfo) => ({
                url: "/properties/add-remove-favorite",
                body: favoriteInfo,
                method: "POST",
            }),
        }),

        // send create appointment request  (appointment # property => not use propertySlice)
        createAppointment: builder.mutation({
            query: ({clientId, ownerId, propertyId, date}) => ({  
                url: "/appointments",
                method: "POST",
                body: {clientId, ownerId, propertyId, date},
            }),
        }),

        deleteAppointment: builder.mutation({
            query:({ appointmentId, userId }) => ({
                url: `/appointments/${appointmentId}`,
                body: {userId},
                method: "DELETE",
            }),
        }),

        createMessage: builder.mutation({
            query: ({clientMessage, ownerId}) => ({  
                url: "/users/message",
                method: "POST",
                body: {clientMessage, ownerId},
            }),
        }),

    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useCreatePropertyMutation,
    useDeletePropertyMutation,
    useAddRemoveFavoriteMutation,
    useCreateAppointmentMutation,
    useCreateMessageMutation,
    useDeleteAppointmentMutation,
}  = appApi;

export default appApi;