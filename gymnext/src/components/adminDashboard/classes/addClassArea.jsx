//Yup is a JavaScript library that helps you define and validate data schemas. Think of it as a tool that ensures the data your forms receive is exactly as expected. Whether you need to check if an email is valid or if a password meets certain criteria, Yup has you covered.
import * as Yup from "yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegisterClassMutation } from "@/redux/features/apis/classApi";
import Image from "next/image";
import ErrorMsg from "@/components/common/error-msg";
import {  useSelector } from "react-redux";
// icons
import { PiBackpackFill } from "react-icons/pi";
import { BsCoin } from "react-icons/bs";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { TbZoomCodeFilled } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { FaUserShield } from "react-icons/fa";

// schema
const schema = Yup.object().shape({
  classname: Yup.string().required().label("classname"),
  code: Yup.string().required().label("code"),
 // classday: Yup.string().required().label("classday"),
  classlevel: Yup.string().required().label("classlevel"),
  session_time: Yup.number().required().label("session_time"),
  price: Yup.number().required().label("price"),
  trainer:Yup.string().required().label("trainer"),
  key_benefits: Yup.string().required().label("key_benefits"),
  expert_trainer:Yup.string().required().label("expert_trainer"),
  class_overview: Yup.string().required().label("class_overview"),
  why_matters: Yup.string().required().label("why_matters"),
  dateBegin: Yup.string().required().label("dateBegin"),
});


const AddClassArea = () => {

  // get user from store
    const { user } = useSelector((state) => state.auth);
  // to handle category image
     const [image, setImage] = useState();
     const [imagePreview, setImagePreview] = useState(); 

  // register category service to backend with redux-toolkit RTQ-query , to fecth data from backend
  const [registerClass, {}] = useRegisterClassMutation();
  const router = useRouter();
  const { redirect } = router.query;
  
  // react hook form
  const {register,handleSubmit,formState: { errors },reset} = useForm({
    resolver: yupResolver(schema),
  });

// function to handle status select component in form

 const ondaysOptionsChangeHandler = (e) => {setDay(e.target.value)};
  
 // get status data to status select form
    const daysOptions = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
// to handle status field
    const [day, setDay] = useState("");

// on submit
  const handleSubmit01 = async (data) => {

// validate for image item
if (!image) {      
    notifyError("Image Require ...!!, Please enter image ..!!");
    return;    
} 
    
    // data instance of FormData()
   const dataNew = new FormData();

    dataNew.append("classname", data.classname);
    dataNew.append("code", data.code);
    dataNew.append("classday", day);
    dataNew.append("classtime", data.classtime);
    dataNew.append("classlevel", data.classlevel);
    dataNew.append("session_time", data.session_time);
    dataNew.append("price", data.price);
    dataNew.append("trainer", data.trainer);
    dataNew.append("key_benefits", data.key_benefits);
    dataNew.append("expert_trainer", data.expert_trainer);
    dataNew.append("class_overview", data.class_overview);
    dataNew.append("why_matters", data.why_matters);
    dataNew.append("dateBegin", data.dateBegin);

    dataNew.append("image", image);
   

    // registerClass comes from - line 34 - const [registerClass, {}] = useRegisterClassMutation();

    registerClass(
        
        dataNew
      // you get the result from packApi - function useRegisterPackMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Register Class Failed");
      } else {
        notifySuccess(result?.data?.message);
        window.location.reload();
        //router.push(redirect || "/AdminDashboard");
      }
    });
    reset();
  };

// If user is not admin and is not logged, go login
 if (user?.isAdmin != 'true' || !user?.username) {
    router.push(redirect || "/login");
  }
// If user is not admin and is logged, go home
if (user?.isAdmin != 'false' && !user?.username) {
    router.push(redirect || "/");
  }
// If user is admin and is logged show AdminDashboard
if (user?.isAdmin == 'true' && user?.username) {



return (
    <>

 <div className="window rounded-3">
  <div className="row smallDevices">
    {/*-- Columna para la imagen --*/}
    <div className="col-md-5 d-flex justify-content-center align-items-center" style={{margin: '2em'}}>
     <Image className="img-fluid rounded-3" src="/assets/images/about-img-1.png" alt="Gym_logo" width={2000} height={2000}/>
    </div>

     <div className="col-md-5 rounded-3" style={{marginLeft:'2em', minHeight:'90em'}}>
      <div className="logo text-center" >
       <div className="row nav_logo_texts" style={{ minHeight:'8em'}}>
        <div className="col-12" >
         <span className="nav_logo-name" style={{position:'relative',top:'15px',color:' #2b69dd', marginTop:'1em', marginBottom:'2em'}}>
            Gym Control
         </span> 
        </div>
        <br/>
        <div className="col-12">
         <Image src="/assets/img/logo/logo2.jpg" width={50} height={50} alt="Gym-logo"/>&nbsp;&nbsp;
          <span className="nav_logo-name"  style={{color:' #2b69dd'}}>
            Sergio Fitness
          </span>
          <span className="nav_logo-name"  style={{color:' #0b0a4b', fontSize:'1rem', position: 'relative', top:'-5px',left:'5px'}}>App</span>
        </div>
      </div>
    </div>

    <div className="formPack">
     <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
      <div>
       <h2 className="text-center nav_logo-name" style={{paddingTop:'-1em', color:' #2b69dd'}}>
        Create Class 
       </h2>
      </div>
    </div>
    <br/>
    <form onSubmit={handleSubmit(handleSubmit01)}> 

  {/** <!---- group classname, begin dat, day section ----------------------> ****/}  
  
  <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}} className="AlignItemsForm">  

   <div className="mb-3 col-md-4">
    <label for="classname" className="form-label">
     <PiBackpackFill  size="32px"/>&nbsp; 
        Class Name:
    </label>
            
     <input {...register("classname", { required: `Class Name is required!` })} 
     name="classname" 
     id="classname" 
     type="text" 
     placeholder="Class Name" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.classname?.message} />        
    </div>

 {/*-<!---- dateBegin section ---------------------->  -*/}                       
 <div className="mb-3 col-md-4">
    <label for="dateBegin" className="form-label">
      <RiCalendarScheduleFill size="32px"/> &nbsp;
      Begin Date:
    </label>
     <input {...register("dateBegin", { required: `Begin Date is required!` })} 
       name="dateBegin" 
       id="dateBegin" 
       type="date" 
       className="form-control input" 
       autocomplete="off" />
     <ErrorMsg msg={errors.dateBegin?.message} />
   </div>

 {/**---- Pack classday section ---------------------->**/}                       
 <div className="mb-3 col-md-3">
  <label for="classday" className="form-label">
    <RiCalendarScheduleFill size="32px"/> &nbsp;
    Class Day:
  </label>
   <select 
     id="day"
     style={{minHeight:38}}
     onChange={ondaysOptionsChangeHandler}>
        <option>Choose Day</option>
          {(daysOptions).map((option, index) => {return (
            <option key={index}>
              &nbsp;&nbsp;{option}
            </option>
            );
            })}
      </select>

       
 </div>  

</div> {/*--- End of section for group classname, begin dat, day section --*/}

{/**-<!---  section for hours , price, code  ---------->***/} 

<div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}} className="AlignItemsForm"> 

 
{/**-<!---  section for hours ---------->***/}
<div class="mb-3 col-md-4">
    <label for="classtime" className="form-label">
      <RiCalendarScheduleFill size="32px"/>&nbsp;
          hours/day,am-pm:
    </label>
      <input {...register("classtime", { required: `Class time is required!` })} 
        name="classtime" 
        id="classtime" 
        type="text" 
        placeholder="Class time" 
        className="form-control input" 
        autocomplete="off" />
     <ErrorMsg msg={errors.classtime?.message} />
</div>

{/***!---- section for price, --------------**********--*/}  
                  
<div className="mb-3 col-md-3">
    <label for="price" className="form-label">
      <BsCoin size="32px"/>&nbsp;
          Price:
    </label>
      <input {...register("price", { required: `Plan Trial Days is required!` })} 
     name="price" 
     id="price" 
     type="number" 
     placeholder="Price" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.price?.message} />
   </div>

{/**---- Class code section ------------------------*************-*/}                       
<div className="mb-3 col-md-3">
    <label for="code" className="form-label">
      <TbZoomCodeFilled size="32px"/> &nbsp; 
       Code:
    </label>
      <input {...register("code", { required: `Plan Trial Days is required!` })} 
     name="code" 
     id="code" 
     type="text" 
     placeholder="Enter Code" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.code?.message} />
   </div>

</div>


{/***---<!---- Class trainer, level, days section ---------------->*/}

<div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}} className="AlignItemsForm"> 

{/***---<!---- Class trainer section ---------------->*/}

<div className="mb-3 col-md-3">
    <label for="trainer" className="form-label">
      <FaUserShield size="32px"/> &nbsp;
       Trainer:
    </label>
      <input {...register("trainer", { required: `Class Trainer is required!` })} 
     name="trainer" 
     id="trainer" 
     type="text" 
     placeholder="Class Trainer" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.trainer?.message} />
   </div>


{/***---<!---- Class level section ---------------->*/}                      
<div className="mb-3 col-md-3">
    <label for="classlevel" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Class level:
    </label>
     <input {...register("classlevel", { required: `Class level is required!` })} 
     name="classlevel" 
     id="classlevel" 
     type="text" 
     placeholder="Class Level" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.classlevel?.message} />
   </div>

  {/***---<!---- Class days (session_time) section ---------------->*/}                     
<div className="mb-3 col-md-3">
    <label for="session_time" className="form-label">
      <RiCalendarScheduleFill size="32px"/> &nbsp; 
          # Days:
    </label>
     <input {...register("session_time", { required: `Class days session are required!` })} 
     name="session_time" 
     id="session_time" 
     type="number" 
     placeholder="Session time in days" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.session_time?.message} />
    </div>
   </div> {/***** End of Class trainer, level, days section */}

   {/*<!---- Class key_benefits section ---------------->**********/}

   <div className="mb-3 col-md-12 AlignItemsForm">
    <label for="key_benefits" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Key Benefits:
    </label>
     <input {...register("key_benefits", { required: `Class Key Benefits are required!` })} 
     name="key_benefits" 
     id="key_benefits" 
     type="text" 
     placeholder="Key Benefits" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.key_benefits?.message} />
    </div>{/**** end of key_benefits section */}

{/*<!---- Class expert_trainer section ---------------->**********/}

   <div className="mb-3 col-md-12 AlignItemsForm">
    <label for="expert_trainer" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Expert Trainer:
    </label>
     <input {...register("expert_trainer", { required: `Class Key Benefits are required!` })} 
     name="expert_trainer" 
     id="expert_trainer" 
     type="text" 
     placeholder="Expert Trainer" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.expert_trainer?.message} />
    </div>{/**** end of expert_trainer section */}

  {/*<!---- Class class_overview section ---------------->**********/}

   <div className="mb-3 col-md-12 AlignItemsForm">
    <label for="class_overview" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Class Overview:
    </label>
     <input {...register("class_overview", { required: `Class overview is required!` })} 
     name="class_overview" 
     id="class_overview" 
     type="text" 
     placeholder="Class Overview" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.class_overview?.message} />
    </div>{/**** end of class_overview section */}

{/*<!---- Class why_matters section ---------------->**********/}

   <div className="mb-3 col-md-12 AlignItemsForm">
    <label for="why_matters" className="form-label">
      <GrNotes size="32px"/> &nbsp; 
          Why Matters:
    </label>
     <input {...register("why_matters", { required: `Why Matters is required!` })} 
     name="why_matters" 
     id="why_matters" 
     type="text" 
     placeholder="Why Matters" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.why_matters?.message} />
    </div>{/**** end of why_matters section */}


   {/*------ Pack Image Section -------------------------**********/}
    <div className="mb-3">
     <label for="image" className="control-label" style={{color: 'aliceblue', fontWeight:'bold'}}>
        Add Class Picture:
    </label>
     <input classNameName='file-upload-input' type="file" name="image"
                id="" accept='.jpg, .jpeg, .png'
                onChange={event => {
                    const image = event.target.files[0];
                    setImage(image);
                    setImagePreview(URL.createObjectURL(event.target.files[0]))
                }}
                placeholder='Image'>
    </input>
    <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'white', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray', width:'8vw', height:'12vh'}} className="AlignItemsForm">
             
           <img src={imagePreview} style={{width:'8vw', height:'11vh'}}/>
        </div>
    </div>   


  {/*------ End Of Class Image Section ------------------*/}
<div className="text-center">
  <button type="submit" className="btn btn-primary w-100 mt-3 btnPack" id="btnpack" > 
    Create Pack
  </button>
  </div>
  <br/>
  <br/>
  <br/>
     </form>
     </div>
    </div>
   </div>
  </div>

{/**** my new addClassArea block end ******************/}

</>
  );
}}
export default AddClassArea;