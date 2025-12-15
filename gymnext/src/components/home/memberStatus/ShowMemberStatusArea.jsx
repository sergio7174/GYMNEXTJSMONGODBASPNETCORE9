import { useDispatch, useSelector } from "react-redux";
/*** service to get member data *****/
import { useGetMemberQuery } from "@/redux/features/apis/memberApi";
import { useGetPackByCodeQuery } from "@/redux/features/apis/packApi";
import ErrorMsg from "@/components/common/error-msg";
import { useRouter } from "next/router";
import Image from "next/image";
import  { useState }   from "react";


  const ShowMemberStatusArea = () => {

  // to handle member Data to backend
 
  const BackendURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const { redirect } = router.query;
    // you can get the user from the store , because in login.form, you set it, using the useLoginUserMutation(),
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;
  const UserName = user?.username;
  

// function to get member data from backend
const {data:member,isError,isLoading,refetch} = useGetMemberQuery(email);
// pack code to get Pack image from backend
// const to get the code of the pack from member data to handle page rendering
const codePack = member?.data?.code;
alert("Im in showMemberStatusArea line 30 - codePack: " + codePack);

//if ( codePack ) { setMemberFound(1); }
//alert("Im in showMemberStatusArea line 33 - memberFound: " + memberFound);


// function to get pack data from backend

const {data:pack } = useGetPackByCodeQuery(codePack);
                       

  // calc daysleft section
  // vars to handle daysleft
const currentDate = new Date();
const today = (currentDate).getTime();  

  //const Finish_day= new Date(member?.data[0]?.finishAt).getTime();
  const Finish_day= new Date(member?.data?.finishAt).getTime();
  //alert("Im in showMemberStatusArea line 48 - member?.data?.finishAt: " + member?.data?.finishAt);
  const minisecondsLeft= [(Finish_day - today)];
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = minisecondsLeft/millisecondsPerDay
  const daysLeft_mathFloor = Math.floor(daysLeft);

 
  const isPositive = daysLeft_mathFloor > 0;
  const colorClass = isPositive ? 'text-success' : 'text-danger';

  //const memberStatus = member?.data[0]?.status;
  const memberStatus = member?.data?.status;

 //alert('Im at topbar - line 11 - email: '+user?.email);
 //alert('Im at topbar - line 12 - user?.fullName: '+user?.fullName);
//alert('Im at topbar - line 35 - UserName: '+UserName);
//alert('Im in showMemberStatusArea line 54 - email: '+user?.email)

// If user is not admin and is not logged, go login
 if (user?.isAdmin != 'true' && !user?.username) {
    router.push(redirect || "/login");
  }

 // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (member?.data?.length === 0) {
    content = <ErrorMsg msg="No Member found!" />;
    
  }
  //if (member?.data?.length > 0) {
  if (codePack) {
  return (
     <>
     
     {/**<!-- Start className Details  Section -->**/}
     
     <div className="container mt-4" style={{height: '40em', marginBottom:'2em'}}>
      <div className="window rounded-3">
       <div className="row" style={{display:'flex', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
         {/***<!-- Columna para la imagen --> */}
       
        <div className="col-md-5" style={{margin:'2em', maxWidth:'85%', minHeight:'100%'}}>            
          <img className="img-fluid rounded-3" src={`${BackendURL}`+pack?.data?.image}  style={{margin:'1em',  }} height={3000} width={3000} alt="Gym_logo"/>
       </div>
     
       <div className="col-md-5 rounded-3" style={{marginLeft:'2em'}}>
        <div className="logo text-center">
         <div className="row nav_logo_texts">
          <div className="col-12">
           <span className="nav_logo-name" style={{position: 'relative', top:'15px', color:' #2b69dd;'}}>Gym Control
           </span>                  
          </div>
           <div className="col-12">
             <img src="/assets/img/logo/logo2.jpg" width="50em" alt="Gym-logo"/>&nbsp;&nbsp;
             <span className="nav_logo-name"  style={{color:' #2b69dd'}}>Sergio Fitness</span>
             <span className="nav_logo-name"  style={{color:' #0b0a4b', fontSize:'1rem', position: 'relative',top:'-5px',left:'5px'}}>App</span>
           </div>
          </div>
         </div>
         <div className="form">
          <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
           <div>
             <h2 className="text-center nav_logo-name" style={{paddingTop:'-1em',color:' #2b69dd'}}>User Status 
             </h2>
           </div>
         </div>
         <br/>
        
     
       {/**<!---- Username and Email section -------------------->   **/}                   
     
        <h4>Username: {user?.username}</h4>
        <h4>Email: {user?.email}</h4>
        <h4>Pack Name: {member?.data?.nameplan}</h4>
        <h4>Time Days: {member?.data?.timedays}</h4>
        <h4>Price: {member?.data?.cost} $</h4>
        <h4 >Days Left:<em className={`p-2 ${colorClass}`}>{daysLeft_mathFloor}</em></h4>
        <h5 >Status: <em className={`p-2 ${colorClass}`}> {memberStatus}</em></h5>

         <br/>
     
     <div className="mb-3">
      <label for="image" className="control-label" style={{color:'aliceblue', fontWeight:'bold'}}>Member Picture:
      </label>
            
         <div className="file-custom"  >
             {/*<!-- ensures that the image is only displayed when a file has been selected and the preview is ready.-->*/}
           <Image  src={`${BackendURL}`+member?.data?.imageUser} style={{margin:'1em', height:'10em', width:'8em'}} height={1000} width={2000} alt="User Image"/>
         </div>
     
     </div>                        
     {/*<!------ End Of Pack Image SEction ------------------>*/}
     
       <br/>
       <br/>
       <br/>
   
         </div>
        </div>
       
       </div> {/** End of className="row" */}
     
      </div> {/*** end of "window rounded-3" */}
     </div>
       <br/>
       <br/>
       <br/>
     
     </>


  )}

}


export default ShowMemberStatusArea;