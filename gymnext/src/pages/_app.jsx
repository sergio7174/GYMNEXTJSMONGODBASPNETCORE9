// src/pages/_app.js
import "@/styles/globals.css";
import '../styles/index.css';
import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import Wrapper from "../components/layout/wrapper";
import { useEffect } from "react";
 // app/layout.tsx
    export const metadata = {
      icons: {
        icon: '/favicon.png', // Path to your favicon in the public directory
      },
    };

if (typeof window !== "undefined") {
  //require("bootstrap/dist/js/bootstrap");
  require("bootstrap/dist/js/bootstrap.bundle");
}

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

export default function App({ Component, pageProps }) {

useEffect(() => {
  // to use bootstrap in nextjs
  require("bootstrap/dist/js/bootstrap.bundle");
}, []);

  return (
      
      <Provider store={store}>
    
        <Wrapper>
          <div id="root">
           
               <Component {...pageProps} />
         
          </div>
        </Wrapper>
  
     </Provider> 
    
  )
}
