"use client"; // cause don't need speed or user interaction

import  { useEffect, useState }   from "react";
import { useUpdateStaffMutation } from "../../../redux/features/apis/staffApi";
import { useDeleteStaffMutation } from "../../../redux/features/apis/staffApi";
import Image from "next/image";
import Modal from "react-modal";
/*** service to get all categories, to use it in product form *****/
import { GetAllStaffsService } from "./getAllStaffService";
import { useDeleteStaffImageMutation } from "../../../redux/features/apis/staffApi";
/** to build search component */
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
/*** Notify toast */
import { notifyError, notifySuccess } from "@/utils/toast";
import ErrorMsg from "@/components/common/error-msg";
/****Search area */
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Pagination from '@/components/common/Pagination';
import { PaginationControl } from 'react-bootstrap-pagination-control';

// icons
import { MdManageHistory } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { PiMapPinArea } from "react-icons/pi";
import { FaAddressCard } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { PiBackpackFill } from "react-icons/pi";
import { IoImagesOutline } from "react-icons/io5";


const EditDelStaffArea = () => {

    const router = useRouter();
    const BackendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

     // local const handle with useState hook
  const [staffs, setStaffs] = useState([]);
  const [selected, setSelected] = useState(null);
  
    // const to handle state update function

  const [updatedname, setUpdatedName] = useState("");
  const [updatedemail, setUpdatedEmail] = useState("");
  const [updatedage, setUpdatedAge] = useState(0);
  const [updatedid_card, setUpdatedId_Card] = useState("");
  const [updatedphone, setUpdatedPhone] = useState("");
  const [updatedaddress, setUpdatedAddress] = useState("");
  const [updatedgender, setUpdatedGender] = useState("");
  const [updatedfield, setUpdatedField] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

    const searchParams = useSearchParams();
    const [searchdata, setSearchdata] = useState("");

    //**** vars to handle pagination */

  const [currentPage, setCurrentPage] = useState(1);
  const [staffsPerPage] = useState(5);
  

  // vars to handle pagination
   const indexOfLastStaff = currentPage * staffsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
  const currentStaff = staffs.slice(indexOfFirstStaff, indexOfLastStaff);
                    
 const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

    // const to handle modal

    const [open, setOpen] = useState(false);

    // handle the Staff update
  const [updateStaff, {}] = useUpdateStaffMutation();
 
    // handle the Staff delete
  const [RDdeleteStaff, {}] =  useDeleteStaffMutation();

  // DElete image service to backend with redux-toolkit RTQ-query , to fetch data to backend
  const [DeleteImage, {}] = useDeleteStaffImageMutation();

 // get gender data to status select form
    const genderOptions = ['male', 'female'];

 // function to handle gender select component in form
 const ongenderOptionsChangeHandler = (e) => {setGender(e.target.value)};

// function to handle Staff delete
// Delete product func
    const deleteStaff = (Staff) => {
   
     // alert('Staff._id - editdelStaff-area - line 100:'+Staff._id);
     // alert('Staff._id - editdelStaff-area - line 101:'+Staff.image);
   
// function to delete the image in backend     
 const ImageDel = Staff.image;   
DeleteImage(
        
        ImageDel
        //ImagetoErase
  // you get the result from StaffApi - function useDeleteStaffImageMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Delete Image Failed");
      } else {
        notifySuccess(result?.data?.message);
      }
    });

    //DeleteStaffService(Staff._id);
    RDdeleteStaff(Staff._id).then((result) => {
      if (result?.error) {
        notifySuccess("Deleted Staff Failed");
      } else {
        notifySuccess(result?.data?.message);
        //this will reload the page without doing SSR
       router.reload(window.location.pathname);
        //router.push(redirect || "/");
      }
    })

    // refresh page - after deleting category - It only reloaded the client and not the server.
    //window.location.reload();
    //this will reload the page without doing SSR
       router.reload(window.location.pathname);
  
  }; // end of delete product func block

      // get all Staffs from backend
  const GetAllStaffs =  () => { GetAllStaffsService(setStaffs); };

   //update Staff function
   const handleUpdate = async (e) => {
    
    e.preventDefault();

      //alert("Estoy en handleUpdate - editDelStaff-area - line 146 - updatednameplan: "+updatednameplan);
      //alert("Estoy en handleUpdate - editDelProduct-area - line 120 - updatedcode: "+updatedcode);


        // validate for image item
              if (!image) {      
                 notifyError("Image require ...!!, Please Enter Image ..!!");
                 return;    
              }

      // validate for gender item
              if (!gender) {      
                 notifyError("Gender require ...!!, Please Select Gender Item ..!!");
                 return;
          
              }
// alert('selected._id - editdelStaff-area - line 164:'+selected._id);
// alert('selected.image - editdelStaff-area - line 165:'+selected.image);
   
// function to delete the image in backend     
 const ImageDel = selected.image;   
DeleteImage(
        
        ImageDel
        //ImagetoErase
      // you get the result from StaffApi - function useRegisterStaffMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Delete Image Failed");
      } else {
        notifySuccess(result?.data?.message);
      }
    });



        // data instance of FormData()
    const data = new FormData();

    data.append("name", updatedname);
    data.append("email", updatedemail);
    data.append("age", updatedage);
    data.append("id_card", updatedid_card);
    data.append("phone", updatedphone);
    data.append("address", updatedaddress);
    data.append("gender", updatedgender);
    data.append("field", updatedfield);
    data.append("gender", updatedgender);
    data.append("image", image);

   updateStaff( {selected,data}
      // you get the result from authApi - function useUpdateProductMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Update Staff Failed");
      } else {
        notifySuccess(result?.data?.message);
       //this will reload the page without doing SSR
       router.reload(window.location.pathname);
        
      }
    });

        GetAllStaffs();
        // refresh page - after deleting Staff - It only reloaded the client and not the server.
     //window.location.reload();
     //router.refresh();
  }
 

  useEffect(() => {
// function call GetAllStaffs()
  GetAllStaffs();
  setImage(null);
  setImagePreview(null);
  }, []);

  return (
    <>
  <div style={{display:'flex', flexDirection:'row', justifyContent:'center',border:'5px double grey', height:'121vh',background: 'linear-gradient(139deg, rgba(22,103,184,1) 2%, rgba(9,83,121,1) 11%, rgba(0,193,255,0.9191876579733456) 58%)'}}>

 {/*** CENTER RECTANGULO STYLES */}
 <div style={{width:'80vw', border:'3px double gray', height:'100vh',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', background:'radial-gradient(circle, rgba(219,215,217,1) 0%, rgba(155,197,246,1) 100%)', marginTop:30,borderRadius:20, boxShadow: '10px 10px'}}>

<div className="container d-flex flex-column justify-content-center align-content-center" style={{marginTop:'3em'}}>
   <div style={{margin:'3em'}}>
   {/*****Search area beging */}  

     <MDBInputGroup>
      <MDBInput
         placeholder="Search Product Item By Code"
         onChange={(e) =>{setSearchdata(e.target.value)}}
         defaultValue={searchParams?.searchTerm?.toString()}
        name="searchTerm"
         />
      <MDBBtn rippleColor='dark'>
        <IoSearch size="20px" style={{color:'black'}}/>
      </MDBBtn>
    </MDBInputGroup>
   
    {/*****SEarch area End */} 

     <h3 className="text-center" style={{marginBottom:40, marginTop:20}}>Edit/Delete Table Staffs</h3>
   </div>

  <div style={{marginBottom:20}} >

  {/*************  table area block Begining ****************** */}
  <span>
  {/*** SearchData block ********/}
   <div className="table-responsive" style={{overflowY:'scroll',
                           maxHeight:'64vh', overflowX:'scroll'}}>
        <table className="table table-responsive" style={{borderRadius:10}}>
          <thead className="table-dark" style={{position:'sticky', top:0}}>
            <tr>
              <th scope="col" className="text-center sftables" >#</th>
              <th scope="col" className="text-center sftables">Name</th>
              <th scope="col" className="text-center sftables">Email</th>
              <th scope="col" className="text-center sftables">Image</th>
              <th scope="col" className="text-center sftables">Age</th>
              <th scope="col" className="text-center sftables">Id card#</th>
              <th scope="col" className="text-center sftables">Phone</th>
              <th scope="col" className="text-center sftables">Address</th>
              <th scope="col" className="text-center sftables">Gender</th>
              <th scope="col" className="text-center sftables">Field</th>
              <th scope="col" className="text-center sftables">Actions</th>
            </tr>
          </thead>
          <tbody>

            {/***if there are products - show table */}
            {currentStaff.filter((Staff) => {
            if (searchdata == null) {
                return Staff
            } else if (Staff.code.toLowerCase().includes(searchdata.toLowerCase())) {
                return Staff
            }
        }).map((Staff, index) => (
              <tr key={Staff._id}>
                <td className="text-center sftables">{index+1}</td>
                <td className="text-center sftables">{Staff.name}</td>
                <td className="text-center sftables">{Staff.email}</td>
                <td className="text-center"><img src={`${BackendURL}`+Staff?.image} height='70' width='60' style={{borderRadius:5}}/></td>
                <td className="text-center sftables">{Staff.age}</td>
                <td className="text-center sftables">{Staff.id_card}</td>
                <td className="text-center sftables">{Staff.phone}</td>
                <td className="text-center sftables">{Staff.address}</td>
                <td className="text-center sftables">{Staff.gender}</td>
                <td className="text-center sftables">{Staff.field}</td>
                <td className="text-center">
                  
                <button className="btn btn-primary m-2" onClick={() => { setOpen(true);      setUpdatedName(Staff.name);
                setUpdatedEmail(Staff.email);
                setImage(Staff.image);
                setUpdatedAge(Staff.age);
                setUpdatedId_Card(Staff.id_card);
                setUpdatedPhone(Staff.phone);
                setUpdatedAddress(Staff.address);
                setUpdatedGender(Staff.gender);
                setUpdatedField(Staff.field);
                setSelected(Staff);
                }}>Edit</button>

                  <button className="btn btn-danger ms-2" onClick={() =>{setSelected(Staff), deleteStaff(Staff)}}>Delete</button>
                </td>
              </tr>
            ))}
            
          </tbody>
         
        </table>
        <Pagination length={staffs.length} staffsPerPage={staffsPerPage} handlePagination={handlePagination} currentPage={currentPage}/>
        { /**** bootstrap pagination ********/}
      <div className="Pagination">
        <PaginationControl
                  page={currentPage}
                  between={4}
                  total={staffs.length}
                  limit={5}
                  changePage={(currentPage) => { setCurrentPage(currentPage)}}
    ellipsis={1} />
    <br/>
    <br/>
  </div>
  </div>
                                  
  </span>
</div>

{/************************************************************** */}

<Modal isOpen={open}>

<div style={{marginTop:'7em'}}>
  
 <div style={{width:'70vw', border:'3px double gray', minHeight:'105vh',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', alignContent:'center', background:'radial-gradient(circle, rgba(219,215,217,1) 0%, rgba(155,197,246,1) 100%)',  borderRadius:20, boxShadow: '10px 10px', marginTop:'2em'}}>

   <div className="col-12" style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
  <Image src="/assets/img/logo/logo2.jpg" width={50} height={50} alt="Gym-logo"/>&nbsp;&nbsp;
   <span className="nav_logo-name"  style={{color:' #2b69dd'}}>
     Sergio Fitness
   </span>
   <span className="nav_logo-name"  style={{color:' #0b0a4b', fontSize:'1rem', position: 'relative', top:'-5px',left:'5px'}}>
      App
   </span>
  </div>
 {/*** CENTER RECTANGULO STYLES */}
  
<div>
    <h4 style={{textAlign:'center', marginBottom:40}}>Staff - Update</h4>
</div>
   <form onSubmit={handleUpdate}>
    <div>

{/****Name and age block begining *****/}
<div className="AlignItemsForm" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>

<div className="mb-3 col-md-5">

<label for="name" className="form-label">
     <PiBackpackFill  size="20px" style={{color:'black'}}/>&nbsp; 
        Staff Name: &nbsp; 
</label>
      <input 
      type="text" 
      name='name' 
      className="form-control input" 
      value={updatedname} 
      onChange={(e) => setUpdatedName(e.target.value)} 
      style={{maxHeight:30, minWidth:'20vw'}}/>
</div>

 <div className="mb-3 col-md-5">
    
  <label for="age" className="form-label">
        <MdManageHistory size="32px"/> &nbsp;
        Age:
      </label>
    <input 
    type="text" 
    name='age' 
    className="form-control input" 
    value={updatedage} onChange={(e) => setUpdatedAge(e.target.value)} 
    style={{maxHeight:30, minWidth:'10vw'}}/>
 </div>
{/**---- Staff id_card section ---------------------->**/}                       
                      
 <div className="mb-3 col-md-3">
    <label for="id_card" className="form-label">
      <MdManageHistory size="32px"/> &nbsp;
      Id card #:
    </label>
     <input
     name="id_card" 
     id="id_card"
     value={updatedid_card} 
     onChange={(e) => setUpdatedId_Card(e.target.value)} 
     type="text" 
     placeholder="Id card#" 
     className="form-control input" 
     autocomplete="off" />
    
   </div>

</div> {/*--- End of section for name, age, id_card --*/}

 {/****Name and age block end *****/}

{/**---- Staff email section --------------------*****/}
<div className="mb-3">
    <label for="email" className="form-label">
      <MdOutlineMarkEmailUnread size="32px"/> &nbsp;
          Email:
    </label>
  <input 
    type="text" 
    name='email' 
    className="form-control input" 
    value={updatedemail} 
    onChange={(e) => setUpdatedEmail(e.target.value)} 
    style={{maxHeight:30, minWidth:'25vw'}}/>
</div>

{/***!---- Staff phone, gender, field section --------------**********--*/}  

<div style={{display:'flex',flexDirection:'row', flexWrap:'wrap'}}> 

{/**---- Staff phone section ------------------------*************-*/}
<div className="mb-3 col-md-4">

<label for="phone" className="form-label">
      <BsTelephoneInboundFill size="32px"/>&nbsp;
          Phone:
    </label>
  <input 
    type="text" 
    name='phone' 
    className="form-control input" 
    placeholder='Enter Phone' 
    value={updatedphone} 
    onChange={(e) => setUpdatedPhone(e.target.value)} 
    style={{maxHeight:30, maxWidth:'13vw'}}/>
</div>

{/**---- Staff gender section ------------------------*************-*/}
<div className="mb-3 col-md-4" style={{marginLeft:'1em'}}>
  <label for="gender" className="form-label">
    <GrStatusGood size="32px"/>&nbsp;
    Gender:
  </label>
   <select 
     id="gender"
     className="input form-control"
     onChange={ongenderOptionsChangeHandler}>
        <option>Choose Gender</option>
          {(genderOptions).map((option, index) => {return (
            <option key={index}>
              {option}
            </option>
            );
            })}
      </select>
   </div>

{/***---- Staff field section -------------------------*/} 

<div className="mb-3 col-md-3">
  
<label for="field" className="form-label">
      <PiMapPinArea size="32px"/> &nbsp;
       Field:
</label>
      <input 
      type="text" 
      name='field' 
      className="form-control input" 
      value={updatedfield} 
      onChange={(e) => setUpdatedField(e.target.value)} 
      style={{maxHeight:30, maxWidth:'13vw'}} min='1'/>
      
</div>
</div>  {/**!-- End of this line in view form -->*/}
{/*<!---- Staff address section ----------------*/}

<div className="mb-3 col-md-3">
   
 <label for="address" className="form-label">
      <FaAddressCard size="32px"/> &nbsp; 
          Address:
    </label>&nbsp;
              
              <input 
      type="text" 
      name='address' 
      className="form-control input" 
      value={updatedaddress} 
      onChange={(e) => setUpdatedAddress(e.target.value)} 
      style={{maxHeight:30, maxWidth:'13vw'}} min='1'/>
      
</div>

 <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20,}}>
             
<div className="mb-3 col-md-4">

      <label for="code" className="form-label">
            <IoImagesOutline size="20px" style={{color:'black'}}/>&nbsp;
             Staff Image:
      </label>      

           <input className='file-upload-input' type="file" name="image"
               id="" accept='.jpg, .jpeg, .png'
               onChange={event => {
                   const image = event.target.files[0];
                   setImage(image);
                   setImagePreview(URL.createObjectURL(event.target.files[0]))
               }}
               placeholder='Image'>
           </input>
           </div>

           <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'white', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray', width:'8vw', height:'12vh'}}>
           <div> 
            <img src={imagePreview} style={{width:'8vw', height:'11vh'}}/>
          </div>
        </div>
      </div>
           
            {/****image  block End *****/}


</div>   
      <button type="submit" className="btn btn-primary" >Submit</button>
       &nbsp;&nbsp;&nbsp;
      <button onClick={() => setOpen(false)} type="submit" className="btn btn-primary">
        Close Modal
      </button>          
      </form>
     </div>
    </div>              
</Modal>
 </div> 
</div>
</div>
  </>

)}

export default EditDelStaffArea;