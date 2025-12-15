import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
//import Menus from "./header-com/menus";
// come back to top when you are at the botton of page 
import useSticky from "@/hooks/use-sticky";

const AdminMenu = () => {

  const { sticky } = useSticky();
   
     return (
    <>
  {/***-- Begining of the NavBar Block  **/}

  <nav className="navbar navbar-expand-lg sticky-top" style={{background: 'rgb(21, 128, 170)', height: '4em', width:'101.1%', marginLeft:'-1em' }}>
    
    <div className="container-fluid" style={{width:'80em'}}>
         
      <a className="navbar-brand " href="#">
        <Image src="/assets/img/logo/logo03.png" alt="Bootstrap" width={250} height={250}/>
      </a>
      <a className="navbar-brand mx-1 custom-fitness " href="#" id="fitness" style={{marginRight: '2em'}}>Sergio Fitness</a>

       
       <button className="navbar-toggler buttonToggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" style={{margin:'1em'}}>
         <span className="navbar-toggler-icon" id="buttonToggler"></span>
       </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
           
       <ul className="menuItems navbar-nav me-auto">
    
{/** OPtion Packs -----------------------------------------------------**/}

   {/**--- 1 Th Menu option -----------**/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'white', marginLeft:'-0.3em'}} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" >
       Packs
    </a>

    <ul className='dropdown-menu' style={{boxShadow: '0.6em black', 
        background: 'rgb(175, 171, 167)'}}>
    <li>
      <Link href='/admin/packs/packCreate' style={{color: 'black'}} className="dropdown-item">
          <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Pack New</span>
      </Link>
    </li>
    <li>
      <Link href='/admin/packs/packsList' className="dropdown-item"> 
        <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Packs List</span>
      </Link>
    </li>

    </ul>

  </li> 
               {/**--- 1 th Menu option end block-----------*/}
{/**--- OPtion classes ------------------------------------------------**/}
  {/**--- 2 Th Menu option -----------**/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'white'}} className="nav-link dropdown-toggle" href="#" role="button"
           data-bs-toggle="dropdown" >
      Staff
    </a>

    <ul className='dropdown-menu' style={{boxShadow: '0.6em black', 
        background: 'rgb(175, 171, 167)'}}>
    <li>
      <Link href='/admin/staff/staffCreate'  className="dropdown-item">
          <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Staff New</span>
      </Link>
    </li>
    <li>
      <Link href='/admin/staff/staffsList' className="dropdown-item"> 
        <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Staff List</span>
      </Link>
    </li>

    </ul>

  </li> 
               {/**--- 2 Th Menu option end block-----------*/}

    {/**--- OPtion members 3 th option-----------------------------------------*/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'white'}} className="nav-link dropdown-toggle" href="#" role="button"
           data-bs-toggle="dropdown" >
      Members
    </a>

    <ul className='dropdown-menu' style={{boxShadow: '0.6em black', 
        background: 'rgb(175, 171, 167)'}}>
    <li>
      <Link href='/admin/members/membersList' className="dropdown-item">
          <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Membs List</span>
      </Link>
    </li>
    </ul>
  </li> 

  
  {/**--- OPtion Reports ----------------------------------------*/}
  {/**--- 4 Th Menu option -----------*/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'antiquewhite'}} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" >
    Categories
    </a>
       <ul className="dropdown-menu" style={{boxShadow: '0.6em black', background: 'rgb(175, 171, 167)'}}>
        <li>
           <Link href='/categoryCreate' className="dropdown-item">
             <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Categ New</span>
           </Link>
        </li>
        <li>
          <Link href='/categoryList' className="dropdown-item">
            <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Categ List</span>
           </Link>
        </li>

        </ul>
      </li> 
    {/**--- 4 Th Menu option end block-----------**********************/}

      {/**--- OPtion purchases -----------------------------------------*/}
   

    {/***--- 5 Th Menu option -----------**/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'antiquewhite'}} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" >
      Users
    </a>


    <ul className="dropdown-menu" style={{boxShadow: '0.6em black', background: 'rgb(175, 171, 167)'}}>
    <li>
      <Link href='/usersCreate' className="dropdown-item">
            <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Users New</span>
      </Link>

    </li>
    <li>

      <Link href='/usersList' style={{color: 'black'}} className="dropdown-item">
            <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Users List</span>
      </Link>
      
    </li>

    </ul>
  </li> 
{/**--- 5 Th Menu option end block-----------**/}
  {/***--- 6 Th Menu option -----------**/}
  <li className="nav-item dropdown mx-3">
    <a style={{color: 'antiquewhite'}} className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" >
      Classes
    </a>


    <ul className="dropdown-menu" style={{boxShadow: '0.6em black', background: 'rgb(175, 171, 167)'}}>
    <li>
      <Link href='/admin/classes/classCreate' className="dropdown-item">
            <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Classes New</span>
      </Link>

    </li>
    <li>

      <Link href='/admin/classes/classesList' style={{color: 'black'}} className="dropdown-item">
            <span style={{color: 'black', fontSize:'1.1em', marginTop:'-0.5em', marginLeft:'-0.3em'}}>Classes List</span>
      </Link>
      
    </li>

    </ul>
  </li> 
{/**--- 6 Th Menu option end block-----------**/}
  
  
         </ul>   
        
        </div>
    </div>      
    </nav> 
  
   
    
    </>
     )

}

export default AdminMenu;