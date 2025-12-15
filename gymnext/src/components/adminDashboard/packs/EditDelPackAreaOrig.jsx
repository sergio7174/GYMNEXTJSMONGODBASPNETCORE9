"use client"; // cause don't need speed or user interaction

import  { useEffect, useState }   from "react";
import { useUpdatePackMutation } from "../../../redux/features/apis/packApi";
import { useDeletePackMutation } from "../../../redux/features/apis/packApi";
import Image from "next/image";
import Modal from "react-modal";
/*** service to get all categories, to use it in product form *****/
import { GetAllPacksService } from "./getAllPacksService";

import { useGetAllPacksQuery } from "@/redux/features/apis/packApi";

import { useDeletePackImageMutation } from "../../../redux/features/apis/packApi";
/** to build search component */
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
/*** Notify toast */
import { notifyError, notifySuccess } from "@/utils/toast";
/****Search area */
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Pagination from '@/components/common/Pagination';
import { PaginationControl } from 'react-bootstrap-pagination-control';

// icons
import { PiBackpackFill } from "react-icons/pi";
import { BsCoin } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { TbFileDescription } from "react-icons/tb";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbZoomCodeFilled } from "react-icons/tb";
import { IoImagesOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


const EditDelPackArea = () => {

  let currentPack = [];  
  const router = useRouter();
  const BackendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

     // local const handle with useState hook
  //const [packs, setPacks] = useState([]);
  const [selected, setSelected] = useState(null);
  
    // const to handle state update function

  const [updatednameplan, setUpdatedNamePlan] = useState("");
  const [updateddescription, setUpdatedDescription] = useState("");
  const [updatedtrialdays, setUpdatedTrialdays] = useState(0);
  const [updatedfeatures, setUpdatedFeatures] = useState("");
  const [updatedtimedays, setUpdatedTimedays] = useState(0);
  const [updatedcost, setUpdatedCost] = useState(0);
  const [updatedcode, setUpdatedCode] = useState("");
  const [updatedstatus, setUpdatedStatus] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  const searchParams = useSearchParams();
  const [searchdata, setSearchdata] = useState("");
  // function to get all staff data from backend
  const {data:packs,isError,isLoading,refetch} = useGetAllPacksQuery();

    //**** vars to handle pagination */

  const [currentPage, setCurrentPage] = useState(1);
  const [packsPerPage] = useState(5);
  
  
  // vars to handle pagination
  const indexOfLastPack = currentPage * packsPerPage;
  const indexOfFirstPack = indexOfLastPack - packsPerPage;
  //const currentPack = packs.slice(indexOfFirstPack, indexOfLastPack);
 
  currentPack = packs?.data?.slice(indexOfFirstPack, indexOfLastPack);

 const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

    // const to handle modal
  const [open, setOpen] = useState(false);

    // handle the pack update
  const [updatePack, {}] = useUpdatePackMutation();
 
    // handle the pack delete
  const [RDdeletePack, {}] =  useDeletePackMutation();

  // DElete image service to backend with redux-toolkit RTQ-query , to fecth data to backend
  const [DeleteImage, {}] = useDeletePackImageMutation();

// get status data to status select form

const statusOptions = [
  "active",
  "inactive"
];

// function to handle pack delete
// Delete pack func
    const deletePack = (pack) => {
   
     // alert('Pack._id - editdelPack-area - line 100:'+pack._id);
     // alert('Pack._id - editdelPack-area - line 101:'+pack.image);
   
// function to delete the image in backend     
 const ImageDel = pack.image;   
DeleteImage(
        
        ImageDel
        //ImagetoErase
  // you get the result from packApi - function useDeletePackImageMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Delete Image Failed");
      } else {
        notifySuccess(result?.data?.message);
      }
    });

    //DeletePackService(pack._id);
    RDdeletePack(pack._id).then((result) => {
      if (result?.error) {
        notifySuccess("Deleted Pack Failed");
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
  
  }; // end of delete pack func block



// function to handle status select component in form
const onstatusOptionsChangeHandler = (e) => {setUpdatedStatus(e.target.value)};

      // get all packs from backend
  //const GetAllpacks = async() => { GetAllPacksService(setPacks); };

 


   //update Pack function
   const handleUpdate = async (e) => {
    
    e.preventDefault();

      //alert("Estoy en handleUpdate - editDelPack-area - line 146 - updatednameplan: "+updatednameplan);
      //alert("Estoy en handleUpdate - editDelProduct-area - line 120 - updatedcode: "+updatedcode);


    // validate for image item
    if (!image) {      
      notifyError("Image require ...!!, please enter image ..!!");
      return;    
      }

    // validate for status item
    if (!updatedstatus) {      
        notifyError("Status require ...!!, please Select Status Item ..!!");
        return;
    }
// alert('selected._id - editdelPack-area - line 164:'+selected._id);
// alert('selected.image - editdelPack-area - line 165:'+selected.image);
   
// function to delete the image in backend     
 const ImageDel = selected.image;   
DeleteImage(
        
        ImageDel
        //ImagetoErase
      // you get the result from packApi - function useRegisterPackMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Delete Image Failed");
      } else {
        notifySuccess(result?.data?.message);
      }
    });



        // data instance of FormData()
    const data = new FormData();

    data.append("nameplan", updatednameplan);
    data.append("description", updateddescription);
    data.append("trialdays", updatedtrialdays);
    data.append("features", updatedfeatures);
    data.append("timedays", updatedtimedays);
    data.append("cost", updatedcost);
    data.append("code", updatedcode);
    data.append("status", updatedstatus);
    data.append("image", image);


   updatePack( {selected,data}
      // you get the result from authApi - function useUpdateProductMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Update Product Failed");
      } else {
        notifySuccess(result?.data?.message);
       //this will reload the page without doing SSR
       router.reload(window.location.pathname);
        
      }
    });

        GetAllpacks();
        // refresh page - after deleting Product - It only reloaded the client and not the server.
     //window.location.reload();
     //router.refresh();
  }
 

  useEffect(() => {
// function call GetAllPacks()
  //GetAllpacks();
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
        {/*<MDBIcon icon='search' />*/}
        <IoSearch size="20px" style={{color:'black'}}/>
      </MDBBtn>
    </MDBInputGroup>
   
    {/*****SEarch area End */} 

     <h3 className="text-center" style={{marginBottom:40, marginTop:20}}>Edit/Delete Table Packs</h3>
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
              <th scope="col" className="text-center sftables">Description</th>
              <th scope="col" className="text-center sftables">Image</th>
              <th scope="col" className="text-center sftables">Trial days</th>
              <th scope="col" className="text-center sftables">timedays</th>
              <th scope="col" className="text-center sftables">Cost</th>
              <th scope="col" className="text-center sftables">Code</th>
              <th scope="col" className="text-center sftables">Status</th>
              <th scope="col" className="text-center sftables">Actions</th>
            </tr>
          </thead>
          <tbody>

            {/***if there are products - show table */}
            {currentPack.filter((Pack) => {
            if (searchdata == null) {
                return Pack
            } else if (Pack.code.toLowerCase().includes(searchdata.toLowerCase())) {
                return Pack
            }
        }).map((Pack, index) => (
              <tr key={Pack._id}>
                <td className="text-center sftables">{index+1}</td>
                <td className="text-center sftables">{Pack.nameplan}</td>
                <td className="text-center sftables">{Pack.description}</td>
                <td className="text-center"><img src={`${BackendURL}`+Pack?.image} height='70' width='60' style={{borderRadius:5}}/></td>
                <td className="text-center sftables">{Pack.trialdays}</td>
                <td className="text-center sftables">{Pack.timedays}</td>
                <td className="text-center sftables">{Pack.cost}</td>
                <td className="text-center sftables">{Pack.code}</td>
                <td className="text-center sftables">{Pack.status}</td>
                <td className="text-center">
                  
                <button className="btn btn-primary m-2" onClick={() => { setOpen(true);      setUpdatedNamePlan(Pack.nameplan);
                setUpdatedDescription(Pack.description);
                setImage(Pack.imgURL);
                setUpdatedCode(Pack.code);
                setUpdatedTimedays(Pack.timedays);
                setUpdatedTrialdays(Pack.trialdays);
                setUpdatedCost(Pack.cost);
                setUpdatedStatus(Pack.status);
                setUpdatedFeatures(Pack.features);
                setSelected(Pack);
                }}>Edit</button>

                  <button className="btn btn-danger ms-2" onClick={() =>{setSelected(Pack), deletePack(Pack)}}>Delete</button>
                </td>
              </tr>
            ))}
            
          </tbody>
         
        </table>
        <Pagination length={packs.length} packsPerPage={packsPerPage} handlePagination={handlePagination} currentPage={currentPage}/>
        { /**** bootstrap pagination ********/}
      <div className="Pagination">
        <PaginationControl
                  page={currentPage}
                  between={4}
                  total={packs.length}
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
    <h4 style={{textAlign:'center', marginBottom:40}}>Pack - Update</h4>
</div>
   <form onSubmit={handleUpdate}>
    <div>

{/****Name and code block begining *****/}
<div className="AlignItemsForm" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>

<div className="mb-3 col-md-5">

<label for="nameplan" className="form-label">
     <PiBackpackFill  size="20px" style={{color:'black'}}/>&nbsp; 
        Pack Name: &nbsp; 
</label>
      <input 
      type="text" 
      name='nameplan' 
      className="form-control input" 
      value={updatednameplan} 
      onChange={(e) => setUpdatedNamePlan(e.target.value)} 
      style={{maxHeight:30, minWidth:'20vw'}}/>
</div>

 <div className="mb-3 col-md-5">
    
  <label for="code" className="form-label">
      <TbZoomCodeFilled size="20px" style={{color:'black'}}/> &nbsp;
       Code:
  </label>
    <input 
    type="text" 
    name='code' 
    className="form-control input" 
    value={updatedcode} onChange={(e) => setUpdatedCode(e.target.value)} 
    style={{maxHeight:30, minWidth:'10vw'}}/>
 </div>
</div>

 {/****Name and code block end *****/}

  {/****description and cost block begining *****/}
<div className="AlignItemsForm" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20}}>

<div className="mb-3 col-md-5">

 <label for="description" className="form-label">
      <TbFileDescription size="20px" style={{color:'black'}}/> &nbsp;
          Pack Description:
 </label>
  <input 
    type="text" 
    name='description' 
    className="form-control input" 
    value={updateddescription} 
    onChange={(e) => setUpdatedDescription(e.target.value)} 
    style={{maxHeight:30, minWidth:'25vw'}}/>
</div>

<div className="mb-3 col-md-4">

<label for="cost" className="form-label">
      <BsCoin  size="20px" style={{color:'black'}}/> &nbsp;
      Cost:
</label>
  <input 
    type="number" 
    name='cost' 
    className="form-control input" 
    placeholder='Enter Cost' 
    value={updatedcost} 
    onChange={(e) => setUpdatedCost(e.target.value)} 
    style={{maxHeight:30, maxWidth:'13vw'}}/>
</div>
</div>

 {/****Description and cost block end *****/}
  {/****trialdays, timedays, status block begining *****/}
  <div className="AlignItemsForm" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20}}>

<div className="mb-3 col-md-3">

<label for="trialdays" className="form-label">
  <RiCalendarScheduleFill size="20px" style={{color:'black'}}/>&nbsp;
    Trials days:
</label>
      <input 
      type="number" 
      name='trialdays' 
      className="form-control input" 
      placeholder='Enter new Trial Days' 
      value={updatedtrialdays} 
      onChange={(e) => setUpdatedTrialdays(e.target.value)} 
      style={{maxHeight:30, minWidth:'9vw'}} min="1"/>
</div>
<div className="mb-3 col-md-3">
  
<label for="trialdays" className="form-label">
    <RiCalendarScheduleFill size="20px" style={{color:'black'}}/>&nbsp;
    Time days:
</label>
      <input 
      type="number" 
      name='timedays' 
      className="form-control input" 
      value={updatedtimedays} 
      onChange={(e) => setUpdatedTimedays(e.target.value)} 
      style={{maxHeight:30, maxWidth:'13vw'}} min='1'/>
      
</div>

 {/*********** status input option bock begining  ****************/}

<div className="mb-3 col-md-3">
   
<label for status  className="form-label">
  <GrStatusGood size="20px" style={{color:'black'}}/>&nbsp;
  Status:
</label>&nbsp;
              
              <select onChange={onstatusOptionsChangeHandler}>
                <option>Choose Status</option>
                 
                {(statusOptions).map((option, index) => {
                    return (
                        
                        <option key={index}>
                            &nbsp;&nbsp;{option}
                        </option>
                    );
                })}
              </select>
  </div>
{/*********** status input option block end   ****************/}



</div>
 {/****trialdays, timedays, features block end *****/}

{/**** features begining block */}

 <div className="AlignItemsForm" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20}}>

<div className="mb-3 col-md-4">
      <label for="code" className="form-label">
            <TbZoomCodeFilled size="20px" style={{color:'black'}}/>&nbsp;
             Features:
      </label>
      <input 
        type="text" 
        name='code' 
        className="form-control input" 
        placeholder='Enter Brand' 
        value={updatedfeatures} 
        onChange={(e) => setUpdatedFeatures(e.target.value)} 
        style={{maxHeight:30, minWidth:'40vw'}}/>
</div>
</div>

{/**** features block end***** */}
 
 <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20,}}>
             
             {/*<div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'grey', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray', width:'35vw'}}>*/}

<div className="mb-3 col-md-4">

      <label for="code" className="form-label">
            <IoImagesOutline size="20px" style={{color:'black'}}/>&nbsp;
             Pack Image:
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

export default EditDelPackArea;