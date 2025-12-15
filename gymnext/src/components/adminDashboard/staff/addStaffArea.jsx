//Yup is a JavaScript library that helps you define and validate data schemas. Think of it as a tool that ensures the data your forms receive is exactly as expected. Whether you need to check if an email is valid or if a password meets certain criteria, Yup has you covered.
import * as Yup from "yup";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegisterStaffMutation } from "@/redux/features/apis/staffApi";
import Image from "next/image";
import ErrorMsg from "@/components/common/error-msg";
import {  useSelector } from "react-redux";
// icons
import { FaUserPlus } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { PiMapPinArea } from "react-icons/pi";
import { FaAddressCard } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";


// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  age: Yup.number().required().label("Age"),
  id_card: Yup.string().required().label("Id_card"),
  phone: Yup.string().required().label("Phone"),
  address: Yup.string().required().label("Address"),
  field: Yup.string().required().label("Field"),
});

const AddStaffArea = () => {

  // get user from store
    const { user } = useSelector((state) => state.auth);
  // get status data to status select form
    const genderOptions = ['male', 'female'];
  // to handle status field
    const [gender, setGender] = useState(null);
  // to handle category image
     const [image, setImage] = useState();
     const [imagePreview, setImagePreview] = useState(); 

  // register category service to backend with redux-toolkit RTQ-query , to fetch data from backend
  const [registerStaff, {}] = useRegisterStaffMutation();
  const router = useRouter();
  const { redirect } = router.query;
  
  // react hook form
  const {register,handleSubmit,formState: { errors },reset} = useForm({
    resolver: yupResolver(schema),
  });

 // function to handle gender select component in form

 const ongenderOptionsChangeHandler = (e) => {setGender(e.target.value)};

// on submit
  const handleSubmit01 = async (data) => {

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
    
    // data instance of FormData()
   const dataNew = new FormData();

    dataNew.append("name", data.name);
    dataNew.append("email", data.email);
    dataNew.append("age", data.age);
    dataNew.append("id_card", data.id_card);
    dataNew.append("phone", data.phone);
    dataNew.append("gender", gender);
    dataNew.append("address", data.address);
    dataNew.append("field", data.field);
    dataNew.append("image", image);
    
    
    // registerStaff comes from - line 47 - const [registerStaff, {}] = useRegisterStaffMutation();

    alert("Im in handleSubmit01 - line 87 - registerStaff")
    registerStaff(
        
        dataNew
      // you get the result from StaffkApi - function useRegisterStaffkMutation(), mutation for post request
    ).then((result) => {
      if (result?.error) {
        notifyError("Register Staff Failed");
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
     <div className="col-md-5 rounded-3" style={{marginLeft:'2em'}}>
      <div className="logo text-center" >
       <div className="row nav_logo_texts" style={{ minHeight:'8em'}}>
        <div className="col-12">
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

    <div className="formStaffk">
     <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
      <div>
       <h2 className="text-center nav_logo-name" style={{paddingTop:'-1em', color:' #2b69dd'}}>
        Create Staff 
       </h2>
      </div>
    </div>
    <br/>
    <form onSubmit={handleSubmit(handleSubmit01)}> 

  {/**---- Staffk nameplan section ----------------------****************/}  
  <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>  

   <div className="mb-3 col-md-5">
    <label for="name" className="form-label">
     <FaUserPlus  size="32px"/>&nbsp; 
        Name:
    </label>
            
     <input {...register("name", { required: `Name is required!` })} 
     name="name" 
     id="name" 
     type="text" 
     placeholder="Name" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.name?.message} />        
    </div>

 {/*---- Staff age section ----------------------*/}                       
 <div className="mb-3 col-md-3">
    <label for="age" className="form-label">
      <MdManageHistory size="32px"/> &nbsp;
      Age:
    </label>
     <input {...register("age", { required: `Age is required!` })} 
     name="age" 
     id="age" 
     type="number" 
     placeholder="Age" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.age?.message} />
   </div>

 {/**---- Staff id_card section ---------------------->**/}                       
                      
 <div className="mb-3 col-md-3">
    <label for="id_card" className="form-label">
      <MdManageHistory size="32px"/> &nbsp;
      Id card #:
    </label>
     <input {...register("id_card", { required: `Id Card# is required!` })} 
     name="id_card" 
     id="id_card" 
     type="text" 
     placeholder="Id card#" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.id_card?.message} />
   </div>

</div> {/*--- End of section for name, age, id_card --*/}

{/**---- Staff email section --------------------*****/}                      
<div className="mb-3">
    <label for="email" className="form-label">
      <MdOutlineMarkEmailUnread size="32px"/> &nbsp;
          Email:
    </label>
      <input {...register("email", { required: `Email is required!` })} 
     name="email" 
     id="email" 
     type="text" 
     placeholder="Email" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.email?.message} />
   </div>

{/***!---- Staff phone, gender, field section --------------**********--*/}  

<div style={{display:'flex',flexDirection:'row', flexWrap:'wrap'}}>                  
<div className="mb-3 col-md-4">
    <label for="phone" className="form-label">
      <BsTelephoneInboundFill size="32px"/>&nbsp;
          Phone:
    </label>
      <input {...register("phone", { required: `Phone is required!` })} 
     name="phone" 
     id="phone" 
     type="text" 
     placeholder="Phone" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.phone?.message} />
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
      <ErrorMsg msg={errors.gender?.message}/>
      </select>
   </div>


{/***---- Staff field section -------------------------*/}                     
<div className="mb-3 col-md-3" style={{marginLeft:'1em'}}>
    <label for="field" className="form-label">
      <PiMapPinArea size="32px"/> &nbsp;
       Field:
    </label>
      <input {...register("field", { required: `Plan Trial Days is required!` })} 
     name="field" 
     id="field" 
     type="text" 
     placeholder="Field" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.field?.message} />
   </div>
</div>  {/**!-- End of this line in view form -->*/}
{/*<!---- Staff address section ----------------*/}                      
<div className="mb-3">
    <label for="address" className="form-label">
      <FaAddressCard size="32px"/> &nbsp; 
          Address:
    </label>
     <input {...register("address", { required: `Address are required!` })} 
     name="address" 
     id="address" 
     type="text" 
     placeholder="Address" 
     className="form-control input" 
     autocomplete="off" />
     <ErrorMsg msg={errors.address?.message} />
   </div>
   {/*------ Staff Image Section -------------------------**********/}
    <div className="mb-3">
     <label for="image" className="control-label" style={{color: 'aliceblue', fontWeight:'bold'}}>
        Add Picture:
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
    <div style={{marginBottom:10, display:'flex', flexDirection:'row', backgroundColor:'white', borderRadius:6,color:'#FFBF00', fontWeight:'bold', border:'3px double gray', width:'8vw', height:'12vh'}}>
             
           <img src={imagePreview} style={{width:'8vw', height:'11vh'}}/>
        </div>
    </div>                        
  {/*------ End Of Staff Image SEction ------------------*/}
<div className="text-center">
  <button type="submit" className="btn btn-primary w-100 mt-3 btnStaff" id="btnStaff" > 
    Create Staff
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

{/**** my new addStaffArea block end ******************/}

</>
  );
}}
export default AddStaffArea;