
// RTK Query allows dynamically injecting endpoint definitions into an existing API service object. This enables splitting up endpoints into multiple files for maintainability, as well as lazy-loading endpoint definitions and associated code to trim down initial bundle sizes. This can be very beneficial for larger applications that may have many endpoints.
// RTK Query API - Redux toolkit
import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn } from "./authSlice";
import Cookies from "js-cookie";

//const BACKEND_BASE_URLBE = "http://localhost:7000/" 
const BACKEND_BASE_URLBE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// api.injectEndpoints accepts a collection of endpoint definitions (same as createApi), as well as an optional overrideExisting parameter.

export const authApi = apiSlice.injectEndpoints(
    
  {
  // If you inject an endpoint that already exists and don't explicitly specify overrideExisting: true, the endpoint will not be overridden. In development mode, you will get a warning about this if overrideExisting is set to false, and an error will be throw if set to 'throw'
  overrideExisting: true,
  endpoints: (builder) => ({
   
    // endpoints: a set of operations that we've defined for interacting with this server. Endpoints can be queries, which return data for caching, or mutations, which send an update to the server. The endpoints are defined using a callback function that accepts a builder parameter and returns an object containing endpoint definitions created with builder.query() and builder.mutation().
    
    registerUser: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/signup",
        //url: "http://localhost:7000/api/user/signup",
        url: `${BACKEND_BASE_URLBE}`+'api/auth/register', //Development mode
        method: "POST",
        body: data,
      }),
    }),
    // signUpProvider
    signUpProvider: builder.mutation({
      query: (token) => ({

        //url: `https://shofy-backend.vercel.app/api/user/register/${token}`,
        //url: `http://localhost:7000/api/user/register/${token}`,
        url: `${BACKEND_BASE_URLBE}`+'api/auth/register/'+`${token}`,   
        method: "POST",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              // query: (data) => ({ -- result.data, from backend data.token
              accessToken: result.data.data.token,
              // result (const result = await queryFulfilled; - line 46), query: (data) => ({ - line 35 - data.user from backend
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token, // taking this inf from backend
              user: result.data.data.user, // taking this inf from backend
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // login
    loginUser: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/login",
        //url: "http://localhost:7000/api/user/login",
        url: `${BACKEND_BASE_URLBE}`+'api/auth/login',

        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        
        try {
          const result = await queryFulfilled;
          
           /*alert("Estoy en authApi - line 85 - login- accessToken: "+ result?.data?.token);
           alert("Estoy en authApi - line 86 - login -user.fullName: "+ result?.data?.user?.username);
           alert("Estoy en authApi - line 87 - login -user.image: "+ result?.data?.user?.image);*/
          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result?.data?.token,
              user: result?.data?.user,
            }),
            { expires: 0.5 }
          );
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.token,
              user: result?.data?.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // get me
    getUser: builder.query({

      //query: () => "https://shofy-backend.vercel.app/api/user/me",
      //query: () => "https://localhost:7000/api/user/me",
      query: () => `${BACKEND_BASE_URLBE}`+'api/auth/me',
      

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // get all admin

   getAllAdmin:builder.query({   
    query: () => `${BACKEND_BASE_URLBE}`+'api/auth/getalladmin',
   }),
    // End of get all admin
    // confirmEmail
    confirmEmail: builder.query({
      //query: (token) => `https://shofy-backend.vercel.app/api/user/confirmEmail/${token}`,
      //query: (token) => `https://localhost:7000/api/user/confirmEmail/${token}`,
      query: (token) => `${BACKEND_BASE_URLBE}`+'api/auth/confirmEmail/'+`${token}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/forget-password",
        // url: "http://localhost:7000/api/user/forget-password",
        url: `${BACKEND_BASE_URLBE}`+'api/auth/forget-password',
        
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    confirmForgotPassword: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/confirm-forget-password",
        //url: "https://localhost:7000/api/user/confirm-forget-password",
        url: `${BACKEND_BASE_URLBE}`+'api/auth/confirm-forget-password',


        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    changePassword: builder.mutation({
      query: (data) => ({

        //url: "https://shofy-backend.vercel.app/api/user/change-password",
        //url: "http://localhost:7000/api/user/change-password",
        url: `${BACKEND_BASE_URLBE}`+'api/auth/change-password',
        
        
        method: "PATCH",
        body: data,
      }),
    }),
    // updateProfile password
    updateProfile: builder.mutation({
      query: ({ id, ...data }) => ({

        //url: `https://shofy-backend.vercel.app/api/user/update-user/${id}`,
        //url: `http://localhost:7000/api/user/update-user/${id}`,
        url: `${BACKEND_BASE_URLBE}`+'api/auth/update-user/'+`${id}`,
        
        method: "PUT",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          Cookies.set(
            "userInfo",
            JSON.stringify({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.token,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetAllAdminQuery,
  useConfirmEmailQuery,
  useResetPasswordMutation,
  useConfirmForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useSignUpProviderMutation,
} = authApi;