import  { useEffect, useState } from "react";

export default function BackToTop(value) {

  const [myResult, setMyResult] = useState(null); // Initialize with a default value
   
useEffect((value) => {
   
  let result = document.querySelector(value);
    
   //alert('result: '+result);
   
   setMyResult(result)
  }, []);


    //const result = document.querySelector({value});
    if (myResult) {
      document.addEventListener("scroll", () => {
        if (
          window.scrollY > 200
        ) {
          result.classList.add('back-to-top-btn-show')
        } else {
          result.classList.remove('back-to-top-btn-show')
        }
      });
      result.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }