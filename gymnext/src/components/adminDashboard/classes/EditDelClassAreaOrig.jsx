//"use client"; // cause don't need speed or user interaction
import  { useState }   from "react";
/*** service to get all classes *****/
import { useGetAllClassesQuery } from "../../../redux/features/apis/classApi";
import { useDeleteClassImageMutation } from "../../../redux/features/apis/classApi";
import { useUpdateClassMutation } from "../../../redux/features/apis/classApi";
import { useDeleteClassMutation } from "../../../redux/features/apis/classApi";
import Image from "next/image";
import Modal from "react-modal";
/*** service to get all categories, to use it in product form *****/
//import { GetAllClassesService } from "./getAllClassesService";
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
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbZoomCodeFilled } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { FaUserShield } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoImagesOutline } from "react-icons/io5";


const EditDelClassArea = () => {
  
  const router = useRouter();
  const BackendURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // local const handle with useState hook
  //const [classes, setClasses] = useState([]);
  const [selected, setSelected] = useState(null);
  // const to handle state update function

  const [updatedclassname, setUpdatedClassname] = useState("");
  const [updatedcode, setUpdatedCode] = useState("");
  const [updatedclassday, setUpdatedClassday] = useState("");
  const [updatedclasstime, setUpdatedClasstime] = useState("");
  const [updatedclasslevel, setUpdatedClasslevel] = useState("");
  const [updatedsession_time, setUpdatedSession_time] = useState(0);
  const [updatedprice, setUpdatedPrice] = useState(0);
  const [updatedtrainer, setUpdatedTrainer] = useState("");
  const [updatedkey_benefits, setUpdatedKey_benefits] = useState("");
  const [updatedexpert_trainer, setUpdatedExpert_trainer] = useState("");
  const [updatedclass_overview, setUpdatedClass_overview] = useState("");
  const [updatedwhy_matters, setUpdatedWhy_matters] = useState("");
  const [updateddateBegin, setUpdatedDateBegin] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();
  
  // Handle the case where it's not an array (e.g., set currentClass to an empty array)
  let currentClass = []; 
  
  const searchParams = useSearchParams();
  const [searchdata, setSearchdata] = useState("");

    // function to get all classes data from backend
  const { data:classes } = useGetAllClassesQuery();

  //**** vars to handle pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [classesPerPage] = useState(5);
  // vars to handle pagination
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  currentClass = classes?.data?.slice(indexOfFirstClass, indexOfLastClass);

 const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

if (classes?.data?.length > 0) { alert('classes?.data?.length: '+ classes?.data?.length)}
if (classes?.data?.length == null) { alert('classes?.data?.length: null')}

  // const to handle modal
  const [open, setOpen] = useState(false);
    // handle the pack update
  const [updateClass, {}] = useUpdateClassMutation();
    // handle the pack delete
  const [RDdeleteClass, {}] =  useDeleteClassMutation();
  // DElete image service to backend with redux-toolkit RTQ-query , to fecth data to backend
  const [DeleteImage, {}] = useDeleteClassImageMutation();
// function to handle days select component in form
 const ondaysOptionsChangeHandler = (e) => {setDay(e.target.value)};
  
 // get status data to status select form
    const daysOptions = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
// to handle status field
    const [day, setDay] = useState("");

// function to handle pack delete
// Delete product func
    const deleteClass = (klass) => {
   
     alert('Pack.id - editdelClass-area - line 104:'+klass.id);
     // alert('Pack._id - editdelPack-area - line 101:'+pack.image);
   
// function to delete the image in backend     
 const ImageDel = klass.image;   
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

    //DeleteClassService(klass._id);
    RDdeleteClass(klass.id).then((result) => {
      if (result?.error) {
        notifySuccess("Deleted Class Failed");
      } else {
        notifySuccess(result?.data?.message);
        //this will reload the page without doing SSR
       router.reload(window.location.pathname);
        //router.push(redirect || "/");
      }
    })

    // refresh page - after deleting class - It only reloaded the client and not the server.
    //window.location.reload();
    //this will reload the page without doing SSR
       router.reload(window.location.pathname);
  
  }; // end of delete product func block

   //update Class function
   const handleUpdate = async (e) => {
    
    e.preventDefault();

      //alert("Estoy en handleUpdate - editDelClass-area - line 149 - updatedclassname: "+updatedclassname);
      //alert("Estoy en handleUpdate - editDelProduct-area - line 150 - updatedcode: "+updatedcode);
    // validate for image item
    if (!image) {      
      notifyError("Image require ...!!, Please Enter image ..!!");
      return;    
      }

    // validate for status item
    if (!updatedclassday) {      
        notifyError("Class Day required ...!!, Please Select Class Day Item ..!!");
        return;
    }
// alert('selected._id - editdelClass-area - line 164:'+selected._id);
// alert('selected.image - editdelClass-area - line 165:'+selected.image);
   
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

    data.append("classname", updatedclassname);
    data.append("code", updatedcode);
    data.append("classday", updatedclassday);
    data.append("classtime", updatedclasstime);
    data.append("classlevel", updatedclasslevel);
    data.append("session_time", updatedsession_time);
    data.append("price", updatedprice);
    data.append("trainer", updatedtrainer);
    data.append("key_benefits", updatedkey_benefits);
    data.append("expert_trainer", updatedexpert_trainer);
    data.append("class_overview", updatedclass_overview);
    data.append(" why_matters", updatedwhy_matters);
    data.append("dateBegin", updateddateBegin);
    data.append("image", image);

   updateClass( {selected,data}
      // you get the result from classApi - function useUpdateClassMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Update Class Failed");
      } else {
        notifySuccess(result?.data?.message);
       //this will reload the page without doing SSR
       router.reload(window.location.pathname);
        
      }
    });
  }

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

     <h3 className="text-center" style={{marginBottom:40, marginTop:20}}>Edit/Delete Table Classes</h3>
   </div>

  <div style={{marginBottom:20}} >

  {/*************  table area block Begining ****************** */}
  <span>
  {/*** SearchData block ********/}
   <div className="table-responsive" style={{overflowY:'scroll',
                           maxHeight:'64vh', overflowX:'scroll'}}>
        <table className="table table-responsive" style={{borderRadius:10, overflowX:'scroll'}}>
          <thead className="table-dark" style={{position:'sticky', top:0}}>
            <tr>
              <th scope="col" className="text-center sftables" >#</th>
              <th scope="col" className="text-center sftables">Name</th>
              <th scope="col" className="text-center sftables">code</th>
              <th scope="col" className="text-center sftables">Image</th>
              <th scope="col" className="text-center sftables">Class Day</th>
              <th scope="col" className="text-center sftables">Class Time</th>
              <th scope="col" className="text-center sftables">Class Level</th>
              <th scope="col" className="text-center sftables">Session Time</th>
              <th scope="col" className="text-center sftables">Price</th>
              <th scope="col" className="text-center sftables">Trainer</th>
              <th scope="col" className="text-center sftables">Key Benefits</th>
              <th scope="col" className="text-center sftables">Actions</th>
            </tr>
          </thead>
          <tbody>

            {/***if there are products - show table */}
            {currentClass.filter((Class) => {
            if (searchdata == null) {
                return Class
            } else if (Class.code.toLowerCase().includes(searchdata.toLowerCase())) {
                return Class
            }
        }).map((Class, index) => (
              <tr key={Class.id}>
                <td className="text-center ">{index+1}</td>
                <td className="text-center ">{Class.classname}</td>
                <td className="text-center ">{Class.code}</td>
                <td className="text-center"><img src={`${BackendURL}`+Class?.image} height='70' width='60' style={{borderRadius:5}}/></td>
                <td className="text-center ">{Class.classday}</td>
                <td className="text-center ">{Class.classtime}</td>
                <td className="text-center ">{Class.classlevel}</td>
                <td className="text-center ">{Class.session_time}</td>
                <td className="text-center ">{Class.price}</td>
                <td className="text-center ">{Class.trainer}</td>
                <td className="text-center ">{Class.key_benefits}</td>

             
                <td className="text-center">
                  
                <button className="btn btn-primary m-2" onClick={() => { setOpen(true);      setUpdatedClassname(Class.classname);
                setUpdatedCode(Class.code);
                //setImage(Pack.imgURL);
                setUpdatedClassday(Class.classday);
                setUpdatedClasstime(Class.classtime);
                setUpdatedClasslevel(Class.classlevel);
                setUpdatedSession_time(Class.session_time);
                setUpdatedPrice(Class.price);
                setUpdatedTrainer(Class.trainer);
                setUpdatedKey_benefits(Class.key_benefits);
                setUpdatedExpert_trainer(Class.expert_trainer);
                setUpdatedClass_overview(Class.class_overview);
                setUpdatedWhy_matters(Class.why_matters);
                setUpdatedDateBegin(Class.dateBegin);
                setSelected(Class);
                }}>Edit</button>

                  <button className="btn btn-danger ms-2" onClick={() =>{setSelected(Class), deleteClass(Class)}}>Delete</button>
                </td>
              </tr>
            ))}
            
          </tbody>
         
        </table>
        <Pagination length={classes.length} classesPerPage={classesPerPage} handlePagination={handlePagination} currentPage={currentPage}/>
        { /**** bootstrap pagination ********/}
      <div className="Pagination">
        <PaginationControl
                  page={currentPage}
                  between={4}
                  total={classes.length}
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
    <h4 style={{textAlign:'center', marginBottom:40}}>Class - Update</h4>
</div>
   <form onSubmit={handleUpdate}>
    <div>

{/** <!---- group classname, begin dat, day section ----------------------> ****/}  
<div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between', marginBottom:20}} className="AlignItemsForm"> 

{/** <!---- group classname section ----------------------> ****/}  
   <div className="mb-3 col-md-4">
    <label for="classname" className="form-label">
     <PiBackpackFill  size="32px"/>&nbsp; 
        Class Name:
    </label>
      <input 
      type="text" 
      name='classname' 
      className="form-control input" 
      value={updatedclassname} 
      onChange={(e) => setUpdatedClassname(e.target.value)} 
      style={{maxHeight:30, minWidth:'20vw'}}/>
</div>
{/** <!---- group begin date section ----------------------> ****/}
 
 <div className="mb-3 col-md-4">
     <label for="dateBegin" className="form-label">
       <RiCalendarScheduleFill size="32px"/> &nbsp;
       Begin Date:
     </label>
    <input 
    type="text" 
    name='dateBegin' 
    className="form-control input" 
    value={updateddateBegin} onChange={(e) => setUpdatedDateBegin(e.target.value)} 
    style={{maxHeight:30, minWidth:'10vw'}}/>
 </div>
{/** <!---- group day section ----------------------> ****/}

<div className="mb-3 col-md-3">
  <label for="classday" className="form-label">
    <RiCalendarScheduleFill size="32px"/> &nbsp;
    Class Day:
  </label>
    <input 
    type="text" 
    name='classday' 
    className="form-control input" 
    value={updatedclassday} onChange={(e) => setUpdatedClassday(e.target.value)} 
    style={{maxHeight:30, minWidth:'10vw'}}/>
 </div>

</div> {/*** group classname, begin dat, day section end Block */} 


{/**-<!---  section for hours , price, code  ---------->***/} 

<div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between', marginBottom:20}} className="AlignItemsForm"> 

{/**-<!---  section for hours ---------->***/}
<div class="mb-3 col-md-4">
    <label for="classtime" className="form-label">
      <RiCalendarScheduleFill size="32px"/>&nbsp;
          hours/day,am-pm:
    </label>
  <input 
    type="text" 
    name='classtime' 
    className="form-control input" 
    value={updatedclasstime} 
    onChange={(e) => setUpdatedClasstime(e.target.value)} 
    style={{maxHeight:30, minWidth:'12vw'}}/>
</div>

{/***!---- section for price, --------------**********--*/}  
                  
<div className="mb-3 col-md-3">
    <label for="price" className="form-label">
      <BsCoin size="32px"/>&nbsp;
          Price:
    </label>
  <input 
    type="number" 
    name='price' 
    className="form-control input" 
    value={updatedprice} 
    onChange={(e) => setUpdatedPrice(e.target.value)} 
    style={{maxHeight:30, maxWidth:'8vw'}}/>
</div>

{/**---- Class code section ------------------------*************-*/}                       
<div className="mb-3 col-md-3">
    <label for="code" className="form-label">
      <TbZoomCodeFilled size="32px"/> &nbsp; 
       Code:
    </label>
 <input 
    type="text" 
    name='code' 
    className="form-control input" 
    value={updatedcode} 
    onChange={(e) => setUpdatedCode(e.target.value)} 
    style={{maxHeight:30, maxWidth:'8vw'}}/>
</div>   

</div> {/***** section for hours , price, code end block */}

 {/***---<!---- Class trainer, level, days section ---------------->*/}
<div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between', marginBottom:20}} className="AlignItemsForm"> 

{/***---<!---- Class trainer section ---------------->*/}

<div className="mb-3 col-md-3">
    <label for="trainer" className="form-label">
      <FaUserShield size="32px"/> &nbsp;
       Trainer:
    </label>
      <input 
      type="text" 
      name='trainer' 
      className="form-control input" 
      value={updatedtrainer} 
      onChange={(e) => setUpdatedTrainer(e.target.value)} 
      style={{maxHeight:30, minWidth:'9vw'}}/>
</div>

{/***---<!---- Class level section ---------------->*/}
<div className="mb-3 col-md-3">
    <label for="classlevel" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Class level:
    </label>
      <input 
      type="text" 
      name='classlevel' 
      className="form-control input" 
      value={updatedclasslevel} 
      onChange={(e) => setUpdatedClasslevel(e.target.value)} 
      style={{maxHeight:30, maxWidth:'6vw'}}/>
      
</div>

{/***---<!---- Class days section ---------------->*/}

<div className="mb-3 col-md-3">
    <label for="session_time" className="form-label">
      <RiCalendarScheduleFill size="32px"/> &nbsp; 
          # Days:
    </label>&nbsp;
              
    <input 
      type="number" 
      name='session_time' 
      className="form-control input" 
      value={updatedsession_time} 
      onChange={(e) => setUpdatedSession_time(e.target.value)} 
      style={{maxHeight:30, maxWidth:'6vw'}}/>
      
 </div>
</div> {/**** Class trainer, level, days section end block */}

 {/*<!---- Class key_benefits section ---------------->**********/}

<div className="mb-3 col-md-12 AlignItemsForm">
    <label for="key_benefits" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Key Benefits:
    </label>
      <input 
        type="text" 
        name='key_benefits' 
        className="form-control input"  
        value={updatedkey_benefits} 
        onChange={(e) => setUpdatedKey_benefits(e.target.value)} 
        style={{maxHeight:30, minWidth:'40vw'}}/>
</div>


   <div className="mb-3 col-md-12 AlignItemsForm">
    <label for="expert_trainer" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Expert Trainer:
    </label>
    <input 
        type="text" 
        name='expert_trainer' 
        className="form-control input"  
        value={updatedexpert_trainer} 
        onChange={(e) => setUpdatedExpert_trainer(e.target.value)} 
        style={{maxHeight:30, minWidth:'40vw'}}/>
</div>

  {/*<!---- Class class_overview section ---------------->**********/}

   <div className="mb-3 col-md-12 AlignItemsForm">
    <label for="class_overview" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Class Overview:
    </label>
    <input 
        type="text" 
        name='class_overview' 
        className="form-control input"  
        value={updatedclass_overview} 
        onChange={(e) => setUpdatedClass_overview(e.target.value)} 
        style={{maxHeight:30, minWidth:'40vw'}}/>
</div>
  
{/*<!---- Class why_matters section ---------------->**********/}

   <div className="mb-3 col-md-12 AlignItemsForm">
    <label for="why_matters" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Why Matters:
    </label>
    <input 
        type="text" 
        name='why_matters' 
        className="form-control input"  
        value={updatedwhy_matters} 
        onChange={(e) => setUpdatedWhy_matters(e.target.value)} 
        style={{maxHeight:30, minWidth:'40vw'}}/>
</div>
 
 {/**** Image block */}
 <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap', marginBottom:20,}}>

<div className="mb-3 col-md-4">

      <label for="code" className="form-label">
            <IoImagesOutline size="20px" style={{color:'black'}}/>&nbsp;
             Class Image:
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

export default EditDelClassArea;