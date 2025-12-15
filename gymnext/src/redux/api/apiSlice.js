
// RTK Query - Redux toolkit
// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
//const NEXT_PUBLIC_API_BASE_URL = 'https://shofy-backend.vercel.app';
//const NEXT_PUBLIC_API_BASE_URL = 'http://localhost:7000';
//process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:7000';


// Define our single API slice object
// Your application is expected to have only one createApi call in it.
export const apiSlice = createApi({
// The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
// baseQuery: a function that knows how to fetch data from the server. RTK Query includes 
// fetchBaseQuery, a small wrapper around the standard fetch() function that handles typical processing of HTTP requests and responses
  baseQuery: fetchBaseQuery({
// All of our requests will have URLs starting with 'http://localhost:3000'
    baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      try {
        const userInfo = Cookies.get('userInfo');
        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
      return headers;
    },
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({}),
  tagTypes: ["Products","Coupon","Product","RelatedProducts","UserOrder","UserOrders"]
});