import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
//import Menus from "./header-com/menus";
// come back to top when you are at the botton of page 
import useSticky from "@/hooks/use-sticky";

const MainMenu = () => {
   
     return (
    <>
    <div style={{display: 'flex', flexDirection: 'row', 'justifyContent': 'center', flexWrap: 'wrap' , background: 'rgb(60, 136, 167)' }}  id="main-container" >

  {/***-- Begining of the NavBar Block  **/}

  <nav className="navbar navbar-expand-lg" style={{background: 'rgb(60, 136, 167)', height: '4em', width:'100%' }}>
    
    <div className="container-fluid" style={{width:'80em'}}>
         
      <a className="navbar-brand " href="#">
        <Image src="/assets/img/logo/logo03.png" alt="Bootstrap" width={250} height={250}/>
      </a>
      <a className="navbar-brand mx-1 custom-fitness " href="/" id="fitness" style={{marginRight: '2em'}}>Sergio Fitness</a>

       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
        
         <span className="navbar-toggler-icon"></span>
       </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
           
       <ul className="menuItems navbar-nav me-auto">
    
{/** OPtion Packs -----------------------------------------------------**/}

    <li className="nav-item mx-3">
       <Link href='/home/packs/packsList' style={{color: 'white'}} className="nav-link fw-semibold">
            Packs
       </Link>
    </li>
{/**--- OPtion classes ------------------------------------------------**/}
  {/**--- 2 Th Menu option -----------**/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'white'}} className="nav-link dropdown-toggle" href="#" role="button"
           data-bs-toggle="dropdown" >
      Classes
    </a>

    <ul className='dropdown-menu' style={{boxShadow: '0.6em black', 
        background: 'rgb(175, 171, 167)'}}>
    <li>
      <Link href='/home/classes/classesList/classesList' style={{color: 'black'}} className="dropdown-item">
          <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Classes List</span>
      </Link>
    </li>
    <li>
      <Link href='/home/classes/classesTable/classesTable' className="dropdown-item"> 
        <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Classes Table</span>
      </Link>
    </li>

    </ul>

  </li> 
               {/**--- 2 Th Menu option end block-----------*/}

        {/**--- OPtion purchases -----------------------------------------*/}
        <li className="nav-item mx-3">
            <Link href='/home/contactUs' style={{color: 'black'}} className="nav-link fw-semibold">Contact Us
       </Link>
        </li>

  
  {/**--- OPtion Reports ----------------------------------------*/}
  {/**--- 4 Th Menu option -----------*/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'antiquewhite'}} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" >
    Pages
    </a>
       <ul className="dropdown-menu" style={{boxShadow: '0.6em black', background: 'rgb(175, 171, 167)'}}>
        <li>
           <Link href='/home/packs/packsList' className="dropdown-item">
             <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Our Plans</span>
           </Link>
        </li>
        <li>
          <Link href='/home/staff/staffsList' className="dropdown-item">
            <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Trainers</span>
           </Link>
        </li>

        </ul>
      </li> 
    {/**--- 4 Th Menu option end block-----------**********************/}

      {/**--- OPtion purchases -----------------------------------------*/}
   

    {/***--- 5 Th Menu option -----------**/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'antiquewhite'}} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" >
      Members
    </a>


    <ul className="dropdown-menu" style={{boxShadow: '0.6em black', background: 'rgb(175, 171, 167)'}}>
    <li>
      <Link href='/home/memberStatus' className="dropdown-item">
            <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Status</span>
      </Link>

    </li>
    <li>

      <Link href='/profile' style={{color: 'black'}} className="dropdown-item">
            <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Profile</span>
      </Link>
      
    </li>

    </ul>
  </li> 
{/**--- 5 Th Menu option end block-----------**/}
  
  
  
         </ul>   
        
        </div>
    </div>      
    </nav> 
    </div> 
    
    </>
     )

}

export default MainMenu;