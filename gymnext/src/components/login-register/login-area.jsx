import React from "react";
import Link from "next/link";
// internal
import LoginForm from "../forms/login-form";
//import GoogleSignUp from "./google-sign-up";

const LoginArea = () => {

  return (
    <>
      <section className="tp-login-area pb-140 p-relative z-index-1 fix"  style=
         {{background:"#ACEEFF"}}>
       <div className="container">
        <div className="row justify-content-center">
          <div className="tp-login-wrapper"  style={{background:"#F0F8FF", margin:'2em', width:'70em'}}>

           <div className="tp-login-top text-center mb-30"  style={{margin:'2em'}}>
            <h3 className="tp-login-title" style={{paddingTop:'2em'}}>Login to Gym Aplication.</h3>
            <p style={{color:'crimson', fontWeight: 'bold'}}>
              Don’t have an account?{" "}
            <span>
             <Link href="/register">Create a free account</Link>
            </span>
            </p>
             <div className="tp-login-mail text-center mb-40">
               <p>
                 or Sign in with <a href="#">Email</a>
                </p>
              </div>
           </div>

            <div className="tp-login-option" style={{ marginBottom:'2em'}}>
             <div className="tp-login-social mb-10 d-flex flex-wrap align-items-center justify-content-center">
              <div className="tp-login-option-item has-google">
              {/* <GoogleSignUp/> */}
              </div>
             </div>
             
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
      
      </section>
    </>
  );
};

export default LoginArea;