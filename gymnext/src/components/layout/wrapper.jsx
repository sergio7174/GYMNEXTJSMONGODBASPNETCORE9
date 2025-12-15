import React from "react";
// show messages 
import { ToastContainer } from "react-toastify";
// internal
import BackToTopCom from "@/components/common/back-to-top";
import useAuthCheck from "@/hooks/use-auth-check";
import Loader from "@/components/loader/loader";


  const Wrapper = ({ children }) => {
  const authChecked = useAuthCheck();

  

  return !authChecked ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Loader spinner="fade" loading={!authChecked} />
    </div>
  ) : (
 
    <div id="wrapper">
       
     
         {children}
      <BackToTopCom/>
      <ToastContainer />
     
    </div>

  );
};

export default Wrapper;