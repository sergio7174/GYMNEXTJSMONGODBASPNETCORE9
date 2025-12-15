"use client"; // cause don't need speed or user interaction

import  { useEffect, useState }   from "react";

import { useGetAllPacksQuery } from "@/redux/features/apis/packApi";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
/*** Notify toast */
import ErrorMsg from "@/components/common/error-msg";
import PackItem from "./pack-item";

/****Search area */
import { useSearchParams } from "next/navigation";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { IoSearch } from "react-icons/io5";

const PackListArea = () => {

const BackendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
let currentPack = [];

// const to handle state search function
  const searchParams = useSearchParams();
  const [searchdata, setSearchdata] = useState("");

// function to get all staff data from backend
const {data:packs,isError,isLoading,refetch} = useGetAllPacksQuery();
    
// vars to handle pagination
    
    const [currentPage, setCurrentPage] = useState(1);
    const [packsPerPage] = useState(8);
    const indexOfLastPack = currentPage * packsPerPage;
    const indexOfFirstPack = indexOfLastPack - packsPerPage;
    currentPack = packs?.data?.slice(indexOfFirstPack, indexOfLastPack);

  // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (packs?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
    
  }
  if (packs?.data?.length > 0) {
    //const product_items = products.data;

   
     content = currentPack.filter((pack) => {
      // here it is the function to search the products
      // if it is empty, returns all list
        if (searchdata == null) {
                return {pack}
              // if search data is not empty return product filtered with search data string  
            } else if (pack.nameplan.toLowerCase().includes(searchdata.toLowerCase())) {
                return pack
            }
        }).map((pack,index) => (   
      <div key={index} className="col-xl-3 col-lg-3 col-sm-6">
      
        <PackItem pack={pack}/>
      </div>
    
    ))}


    
return (
<section className="team-section trainers-section" style={{marginTop:'2em'}}>
  <div className="container">
  
     
          {/*****Search area beging */}  

     <MDBInputGroup>
      <MDBInput
         placeholder="Search Item By Name"
         onChange={(e) =>{setSearchdata(e.target.value)}}
         defaultValue={searchParams?.searchTerm?.toString()}
        name="searchTerm"
         />
      <MDBBtn rippleColor='dark'>
        <IoSearch size="20px" />
      </MDBBtn>
    </MDBInputGroup>
   
    {/*****SEarch area End */} 

    <div className="row" style={{marginBottom:'4em'}}>
          {content}
    </div>
        <PaginationControl
            page={currentPage}
            between={8}
            total={packs?.length}
            limit={8}
            changePage={(currentPage) => { setCurrentPage(currentPage)}}
        ellipsis={1}/>


      </div>
  

 </section>

)}



export default PackListArea;