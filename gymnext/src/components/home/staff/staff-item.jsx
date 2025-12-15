const BackendURL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


const StaffItem = ({staff}) => {

    const { _id, image, name, field } = staff || {};

   return (
         <>
 {/*<!--- begins my block -->*/}
 <div className="team-section" >
  <div className="team-member">
    <div className="member-box" style={{margin:'1em', border:'0.3em double gray'}}>
     <div className="images">
      <img src={`${BackendURL}`+staff?.image}  width="45vmax" height="50vmax" alt='Staff'/>
     </div>
     <div className="bio">
      <h4 className="name">{staff?.name}</h4>
        <p>{staff?.field}</p>
        <ul className="social-icons">
         <li>
          <a href="#" className="twitter">
            <FaSquareTwitter size="26px" />
          </a>
        </li>
        <li>
         <a href="#" className="facebook">
          <FaFacebook size="26px" />
         </a>
        </li>
        <li>
         <a href="#">
          <FaSquareInstagram size="26px" />
         </a>
        </li>
        <li>
         <a href="#">
         <FaLinkedin size="26px" />
         </a>
        </li>
       </ul>
     </div>
    </div>
   </div>
   </div>         
  {/*<!--- Ends my block -->*/}
    </>
)
}

export default StaffItem;