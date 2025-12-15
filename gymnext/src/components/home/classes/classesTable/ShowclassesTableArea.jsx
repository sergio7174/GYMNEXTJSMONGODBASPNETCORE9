"use client"; 

import  { useState }   from "react";
/*** service to get all classes *****/
import { useGetAllClassesQuery } from "@/redux/features/apis/classApi";
/** to build search component */
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
/*** Notify toast */
import ErrorMsg from "@/components/common/error-msg";
import ClassItem from "./class-item";

/****Search area */
import { useSearchParams } from "next/navigation";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { IoSearch } from "react-icons/io5";

const ShowClassesTableArea = () => {

const BackendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// const to handle state search function
  const searchParams = useSearchParams();
  const [searchdata, setSearchdata] = useState("");

// function to get all classes data from backend
const {data:classes,isError,isLoading,refetch} = useGetAllClassesQuery();
    
// vars to handle pagination
    
    const [currentPage, setCurrentPage] = useState(1);
    const [classesPerPage] = useState(5);
    const indexOfLastClass = currentPage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClass = classes?.data?.slice(indexOfFirstClass, indexOfLastClass);

  // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (classes?.data?.length === 0) {
    content = <ErrorMsg msg="No Classes found!" />;
    
  }
  if (classes?.data?.length > 0) {
      
     content = currentClass.filter((klass) => {
      // here it is the function to search the products
      // if it is empty, returns all list
        if (searchdata == null) {
                return {klass}
              // if search data is not empty return product filtered with search data string  
            } else if (klass.code.toLowerCase().includes(searchdata.toLowerCase())) {
                return klass
            }
        }).map((klass,index) => (   
      <div key={index} >
        {/*<ClassItem klass={klass}/>*/}
   <table>    
   <tr style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>     
    <div style={{textAlign:'center'}}>
      <td >{klass.classday}</td>
    </div>
    <div style={{textAlign:'center'}}>
       <td >{klass.classname}</td>
    </div>
    <div style={{textAlign:'center'}}>
      <td >{klass.classtime}</td>
    </div>
    <div style={{textAlign:'center'}}>
      <td >{klass.trainer}</td>
    </div>
     <div style={{textAlign:'center'}}>
      <td >{klass.code}</td>
    </div>
    </tr>
    </table> 
      </div>
    
    ))}

return (
    <section class="class-schedule-section">
		<div class="container">

            {/*****Search area beging */}  
   <div style={{margin:'4em'}}>
     <MDBInputGroup>
      <MDBInput
         placeholder="Search Item By Code"
         onChange={(e) =>{setSearchdata(e.target.value)}}
         defaultValue={searchParams?.searchTerm?.toString()}
        name="searchTerm"
         />
      <MDBBtn rippleColor='dark'>
        <IoSearch size="20px" />
      </MDBBtn>
    </MDBInputGroup>
  </div>
   
{/*****Search area End */} 


<table>
 <tr style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
	<th style={{textAlign:'center'}}>Day</th>
	<th style={{textAlign:'center'}}>Class Name</th>
	<th style={{textAlign:'center'}}>Class Time</th>
	<th style={{textAlign:'center'}}>Trainer Name</th>
    <th style={{textAlign:'center'}}>Code</th>
</tr>
       

</table> 


 {content}
   
    
  </div>
  <PaginationControl
            page={currentPage}
            between={5}
            total={classes?.data?.length}
            limit={8}
            changePage={(currentPage) => { setCurrentPage(currentPage)}}
        ellipsis={1}/> 
 </section>
    


)}



export default ShowClassesTableArea;