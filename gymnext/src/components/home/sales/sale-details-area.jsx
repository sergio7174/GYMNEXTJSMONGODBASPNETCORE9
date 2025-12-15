
//Yup is a JavaScript library that helps you define and validate data schemas. Think of it as a tool that ensures the data your forms receive is exactly as expected. Whether you need to check if an email is valid or if a password meets certain criteria, Yup has you covered.
import * as Yup from "yup";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import ErrorMsg from "@/components/common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegisterMemberMutation } from "@/redux/features/apis/memberApi";
import { useSelector } from "react-redux";
/***Icons *****/
import { IoPersonCircleSharp } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import Image from "next/image";
import Cookies from "js-cookie";


// schema
const schema = Yup.object().shape({
  client_CI: Yup.string().required().label("client_CI"),
  phone: Yup.string().required().label("phone"),
});


const SaleDetailsArea = ({pack}) => {

    // get user from store
    const { user } = useSelector((state) => state.auth);
    const BackendURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { id, image, nameplan, field } = pack || {};  

    // react hook form
  const {register,handleSubmit,formState: { errors },reset} = useForm({
    resolver: yupResolver(schema),
  });

  // register member service to backend with redux-toolkit RTQ-query , to fecth data from backend
    const [registerMember, {}] = useRegisterMemberMutation();
    const router = useRouter();
    const { redirect } = router.query;

 // to handle member Data to backend
     const [Namemember, setNameMember] = useState(user.username);
     const [Email, setemail] = useState(user.email);
     const [ImageUser, setImageUser] = useState(user.image);
     
  //alert("Im in SaleDetailsArea line 48 - username: " + user.username);

// on submit
  const handleSubmit01 = async (data, user) => {

      const Client_CI = data.client_CI;
      const Phone = data.phone;
      const Nameplan = pack.nameplan;
      const Timedays = pack.timedays;
      const Cost = pack.cost;
      const Code = pack.code;
      const Status = 'true';
      
      
      registerMember(
          
          {Namemember, Client_CI, Email,Phone, Nameplan, Timedays, Cost, Code, Status, ImageUser}
          //dataNew
        // you get the result from memberApi - function useRegisterMemberMutation(), mutation for post request
      ).then((result) => {
        if (result?.error) {
          notifyError("Register Member Failed: User Already Exist .... ");
          router.push(redirect || "/");
        } else {
          notifySuccess(result?.data?.messagemExist) ||  notifySuccess("Register Member Successfully");
          window.location.reload();
          //router.push(redirect || "/AdminDashboard");
        }
      });
     

  }

    

return (

 <>
{/**<!-- Start className Details  Section -->**/}

<div className="container mt-4" style={{height: '40em', marginBottom:'2em'}}>
 <div className="window rounded-3">
  <div className="row" style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
    {/***<!-- Columna para la imagen --> */}
  
   <div className="col-md-5" style={{margin:'2em', maxWidth:'85%', minHeight:'100%'}}>      
     <Image className="img-fluid rounded-3" src={`${BackendURL}`+image}  style={{margin:'1em',  }} height={3000} width={3000} alt="Gym_logo"/>
  </div>

  <div className="col-md-5 rounded-3" style={{marginLeft:'2em'}}>
   <div className="logo text-center">
    <div className="row nav_logo_texts">
     <div className="col-12">
      <span className="nav_logo-name" style={{position: 'relative', top:'15px', color:' #2b69dd;'}}>Gym Control
      </span>                  
     </div>
      <div className="col-12">
        <img src="/assets/logo/logo2.jpg" width="50em" alt="Gym-logo"/>&nbsp;&nbsp;
        <span className="nav_logo-name"  style={{color:' #2b69dd'}}>Sergio Fitness</span>
        <span className="nav_logo-name"  style={{color:' #0b0a4b', fontSize:'1rem', position: 'relative',top:'-5px',left:'5px'}}>App</span>
      </div>
     </div>
    </div>
    <div className="form">
     <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
      <div>
        <h2 className="text-center nav_logo-name" style={{paddingTop:'-1em',color:' #2b69dd'}}>Create Bill 
        </h2>
      </div>
    </div>
    <br/>
   <form onSubmit={handleSubmit(handleSubmit01)}> 

  {/**<!---- Username and Email section -------------------->   **/}                   

   <h4>Username: {user?.fullName}</h4>
   <h4>Email: {user?.email}</h4>
   <h4>Pack Name: {pack?.nameplan}</h4>
   <h4>Time Days: {pack?.timedays}</h4>
   <h4>Price: {pack?.cost}</h4>
    <br/>

  {/***<!----client_CI section ------------------------->**/}                       
        <div className="mb-3">
          <label for="name" className="form-label">
            
            <IoPersonCircleSharp  size="32px"/> &nbsp; 
            Client CI:
          </label>
           <input {...register("client_CI", { required: `client CI is required!` })} 
             name="client_CI" 
             id="client_CI" 
             type="text" 
             placeholder="Client CI" 
             className="form-control input" 
             autocomplete="off"
             style={{maxHeight:30, minWidth:'70%'}}/>
          <ErrorMsg msg={errors.client_CI?.message} />        
       </div>
  

 {/*<!----Phone section ------------------------->*/}                       
<div className="mb-3">
    <label for="phone" className="form-label">
      <FiPhoneCall size="32px"/> &nbsp;  
      Phone #:
    </label>
     <input {...register("phone", { required: `client CI is required!` })} 
             name="phone" 
             id="phone" 
             type="text" 
             placeholder="Phone" 
             className="form-control input" 
             autocomplete="off"
             style={{maxHeight:30, minWidth:'70%'}} />
          <ErrorMsg msg={errors.phone?.message} />   
   </div>
{/*<!------ Pack Image Section ------------------------->*/}
        
<div className="mb-3">
 <label for="image" className="control-label" style={{color:'aliceblue', fontWeight:'bold'}}>Member Picture:
 </label>
       
    <div className="file-custom"  >
        {/*<!-- ensures that the image is only displayed when a file has been selected and the preview is ready.-->*/}
       <Image  src={`${BackendURL}`+user?.image} style={{margin:'1em', height:'10em', width:'8em'}} height={1000} width={2000} alt="Gym_logo"/>
    </div>

</div>                        
{/*<!------ End Of Pack Image SEction ------------------>*/}
 <div className="text-center">
   <button type="submit" className="btn btn-primary w-100 mt-3 btnLogin" id="btnLogin">
     Create Member
   </button>
 </div>
  <br/>
  <br/>
  <br/>
    </form>
    </div>
   </div>
  
  </div> {/** End of className="row" */}

 </div> {/*** end of "window rounded-3" */}
</div>
  <br/>
  <br/>
  <br/>

  </>
        )



}

export default SaleDetailsArea;