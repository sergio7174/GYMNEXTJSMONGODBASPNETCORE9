const BackendURL = process.env.NEXT_PUBLIC_API_BASE_URL;
import Link from "next/link";
import Image from "next/image";
import { FaRegCircleCheck } from "react-icons/fa6";

const classItem = ({klass}) => {

    const { id, image, name, field } = klass || {};

   return (
         <>
    {/*<!-- Start className Pag Section --> */}
<div className="col-lg-4 col-md-6" style={{minWidth:'20em', marginTop:'3em'}}>
  <div className="classes-box" style={{minHeight:'42em'}}>
	<Image src={`${BackendURL}`+klass?.image}  width={2000} height={2000} alt='Class'
   style={{minWidth:'17em', minHeight:'18em'}}/>
	<h4 className="heading">
    {klass?.classname}
  </h4>
	<p>
    {klass?.expert_trainer}
  </p>
    <p>
      {klass?.class_overview}
    </p>
                         
    {/*<!--<a [routerLink]="['/classNameDetails',classNamees._id]">Read More
                            <ng-icon name="bootstrapArrowRight" size="22px" id="right-arrow" style="padding-top: 0.4em;" />
                        </a>--> */}
    <button className="btn btn-danger"  >
                  {/*<Link href={{pathname:`/sales/sale-details/${pack._id}`,query:{id:(pack._id)}}} style={{textDecoration:'none'}}>*/}
    <Link href={{pathname:`/home/sales/sale-details/${id}`,query:{id:id}}} 
          style={{textDecoration:'none'}}>   
        <span style={{ color:'white', fontSize:'1.8em'}}>
          Read More
        </span>    
     </Link>
    </button> 
    </div>
   </div>  
{/* <!--- Ends my block --> */}
 
<br/>
<br/>
<br/>
<br/>
     </>
)
}

export default classItem;