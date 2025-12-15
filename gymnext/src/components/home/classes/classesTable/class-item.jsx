const BackendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
import Link from "next/link";
import Image from "next/image";
import { FaRegCircleCheck } from "react-icons/fa6";

const ClassItem = ({klass}) => {

    const { classday, classtime, classname, trainer } = klass || {};

   return (
         <>

 
  {/*<!-- Start Classes Pag Section -->*/}

<tr>
    <td >{klass.classday}</td>
    <td >{klass.classname}</td>
    <td >{klass.classtime}</td>
    <td >{klass.trainer}</td>
</tr>   
            
  {/*<!--- Ends my block --> */}


    


     </>
   

)
}

export default ClassItem;