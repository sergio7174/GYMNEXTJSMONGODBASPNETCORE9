// RTK Query allows dynamically injecting endpoint definitions into an existing API service object. This enables splitting up endpoints into multiple files for maintainability, as well as lazy-loading endpoint definitions and associated code to trim down initial bundle sizes. This can be very beneficial for larger applications that may have many endpoints.
// RTK Query API - Redux toolkit
import { apiSlice } from "@/redux/api/apiSlice";

//const BACKEND_BASE_URLBE = "http://localhost:7000/" 
const BACKEND_BASE_URLBE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// api.injectEndpoints accepts a collection of endpoint definitions (same as createApi), as well as an optional overrideExisting parameter.

export const packApi = apiSlice.injectEndpoints(
    
  {
  // If you inject an endpoint that already exists and don't explicitly specify overrideExisting: true, the endpoint will not be overridden. In development mode, you will get a warning about this if overrideExisting is set to false, and an error will be throw if set to 'throw'
  overrideExisting: true,
  endpoints: (builder) => ({
   
    // endpoints: a set of operations that we've defined for interacting with this server. Endpoints can be queries, which return data for caching, or mutations, which send an update to the server. The endpoints are defined using a callback function that accepts a builder parameter and returns an object containing endpoint definitions created with builder.query() and builder.mutation().
    
    registerPack: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/signup",
        //url: "http://localhost:7000/api/user/signup",
        url: `${BACKEND_BASE_URLBE}`+'api/packs/create', //Development mode
        method: "POST",
        body: data,
      }),
    }),
    // erase Image
    deletePackImage: builder.mutation({
      query: (data) => ({
        
        //url: "https://shofy-backend.vercel.app/api/user/signup",
        //url: "http://localhost:7000/api/user/signup",
        url: `${BACKEND_BASE_URLBE}`+'api/packs/DeleteImage', //Development mode
        method: "POST",
        body: data,
      }),  
    }),

    // get single pack
    getPack: builder.query({
     // query: (id) => `https://shofy-backend.vercel.app/api/product/single-product/${id}`,
      query: (id) => `${BACKEND_BASE_URLBE}api/packs/get-single-pack/${id}`,
      
    }),
    // get single pack by code
    getPackByCode: builder.query({
    // query: (id) => `https://shofy-backend.vercel.app/api/product/single-product/${id}`,
    query: (code) => `${BACKEND_BASE_URLBE}api/packs/get-single-packbycode?code=${encodeURIComponent(code)}`,
    }),
    // get all packs

   getAllPacks:builder.query({   
    query: () => `${BACKEND_BASE_URLBE}`+'api/packs/listAll',
   }),
    // End of get all packs
    
    // update Product endPoint
    updatePack: builder.mutation({
      query: ({ selected, data }) => ({
               
        // url: "https://shofy-backend.vercel.app/api/category/add",
        url: `${BACKEND_BASE_URLBE}api/packs/update-pack/${selected.id}`,
        method: "PUT",
        body: data,
      }),
    }),
 // delete Pack endpoint
     deletePack: builder.mutation({
      query: ( id ) => ({
               
        // url: "https://shofy-backend.vercel.app/api/category/add",
          url: `${BACKEND_BASE_URLBE}api/packs/delete-pack/${id}`,
          method: "DELETE",
        
      }),
        invalidatesTags: (result, error, arg) => [{ type: 'Item', id: arg }],
      }),// End of delete pack
  
  }),



}); // end of packApi

export const {
  useDeletePackImageMutation,
  useDeletePackMutation,
  useRegisterPackMutation,
  useGetAllPacksQuery,
  useGetPackByCodeQuery,
  useGetPackQuery,
  useUpdatePackMutation,
  
} = packApi;