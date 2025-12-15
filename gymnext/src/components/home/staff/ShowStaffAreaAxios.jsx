"use client"; // cause don't need speed or user interaction

import  { useEffect, useState }   from "react";
/*** service to get all categories, to use it in product form *****/
//import { GetAllStaffsService } from "./getAllStaffService";
/** to build search component */
import { GetAllStaffsService } from "@/components/adminDashboard/staff/getAllStaffService";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
/*** Notify toast */
import ErrorMsg from "@/components/common/error-msg";


import StaffItem from "./staff-item";

/****Search area */
import { useSearchParams } from "next/navigation";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { IoSearch } from "react-icons/io5";

const ShowStaffArea = () => {

const BackendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// local const handle with useState hook

 const [staffs, setStaffs] = useState([]);

// const to handle state search function
  const searchParams = useSearchParams();
  const [searchdata, setSearchdata] = useState("");

// function to get all staff data from backend
//const {Staffs,isError,isLoading,refetch} = useGetAllStaffsQuery();
    
// vars to handle pagination
    
    const [currentPage, setCurrentPage] = useState(1);
    const [staffsPerPage] = useState(8);
    
    const indexOfLastStaff = currentPage * staffsPerPage;
    const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
    const currentStaff = staffs?.slice(indexOfFirstStaff, indexOfLastStaff);

// get all Staffs from backend
  const GetAllStaffs =  () => { GetAllStaffsService(setStaffs); };

  // refetch when active value change
  useEffect(() => {
    GetAllStaffs();

  },[]
);
  // decide what to render
  let content = null;

  /*if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }*/
  if (staffs?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (staffs?.length > 0) {
    //const product_items = products.data;

   
     content = currentStaff.filter((staff) => {
      // here it is the function to search the products
      // if it is empty, returns all list
        if (searchdata == null) {
                return staff
              // if search data is not empty return product filtered with search data string  
            } else if (staff.name.toLowerCase().includes(searchdata.toLowerCase())) {
                return staff
            }
        }).map((staff,i) => (   
      <div key={i} className="col-xl-3 col-lg-3 col-sm-6">
      
        <StaffItem staff={staff}/>
      </div>
    
    ))}
return (
<section class="team-section trainers-section" style={{marginTop:'5em'}}>
  <div class="container">
    <div class="row">
     
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

    <div className="row">
       
          {content}
    </div>
        <PaginationControl
            page={currentPage}
            between={8}
            total={staffs?.length}
            limit={8}
            changePage={(currentPage) => { setCurrentPage(currentPage)}}
        ellipsis={1}/>


      </div>
    </div>

 </section>

)}



export default ShowStaffArea;