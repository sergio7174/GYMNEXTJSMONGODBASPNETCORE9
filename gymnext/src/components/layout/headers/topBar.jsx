import { useDispatch, useSelector } from "react-redux";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { ImTwitter } from "react-icons/im";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/router";

  const TopBar = () => {


  const router = useRouter();
  // handle logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push('/')
  }  

    const handleLogin = () => {
    router.push('/login')
  }  
   const dispatch = useDispatch();
   
  // you can get the user from the store , because in login.form, you set it, using the useLoginUserMutation(),
  const { user } = useSelector((state) => state.auth);

  const IsAdmin = user?.isAdmin;
 /*alert('Im at topbar - line 33 - userInfo?.email: '+user?.email);
 alert('Im at topbar - line 34 - userInfo?.IsAdmin: '+user?.isAdmin);
 alert('Im at topbar - line 35 - userInfo?.fullName: '+user?.username);*/
 const UserName = user?.username;
//alert('Im at topbar - line 35 - UserName: '+UserName);

 

  return (

  <header id="header" className="header sticky-top" >
       
    {/**---- All group div ------------------------------------------**/}  
    <div className="topbar d-flex align-items-center justify-content-around flex-wrap">
      {/**---- Gym logo image Block -----------------------------------*/}
              <div className="showlogo" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: '2em'}}>
                  <div className="navbar-brand" style={{fontSize: 'x-large', marginTop: '-0.3em'}}>
                    <em style={{color: 'white'}} id="shopping">Gym Action</em>
              </div>             
    </div>   
     {/**--- If there is not an User - show the Login button section --*/}
        <div>
         { !user ? 
          <div className="Buttonlogin">
            <button className="btn btn-secondary" onClick={handleLogin}>
              Login/SignUp
            </button>        
          </div>
            :<div></div>}
        </div>
    

     {/*** If it is an User - shows Log Out Button */}
     <div> 
      { UserName ? 
        <div style={{marginTop: '-0.9em'}}> 
          <button  onClick={handleLogout} className="btn btn-danger" >
            Log Out
          </button>
        </div>
          : <div></div>}
       </div>

      {/*** If it is Admin - shows wellcome Admin */}   
            { IsAdmin ? 
               <div>
                 <div className="admin" style={{color:'white', marginTop: '-0.7em', marginLeft: '2em', fontSize: '1.2em', fontWeight:400}}>
                  Wellcome: {UserName}</div>
               </div>
         :<div></div>}

      { !IsAdmin ? 
               <div>
                 <div className="admin" style={{color:'white', marginTop: '-0.7em', marginLeft: '2em', fontSize: '1.2em', fontWeight:400}}>
                  Wellcome: {UserName}</div>
               </div>
         :<div></div>}

      <div className="social-links d-none d-md-flex align-items-center" id="social-links">
                <a href="#" className="twitter"><ImTwitter size="36px"/></a>
                <a href="#" className="facebook"><FaFacebook size="36px"/></a>
                <a href="#" className="instagram"><RiInstagramFill size="36px"/></a>
                <a href="#" className="linkedin"><BsLinkedin size="36px" /></a>
      </div>
   </div>
</header>  
  
  )
}

export default TopBar;