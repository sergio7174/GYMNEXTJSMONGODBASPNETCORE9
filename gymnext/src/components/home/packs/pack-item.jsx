import Link from "next/link";
import { FaRegCircleCheck } from "react-icons/fa6";


const PackItem = ({pack}) => {

    const BackendURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { id, image, cost, field } = pack || {};

    //alert("Im at PackItem - line 10: - id: "+id);
    
   return (
         <>
 {/*<!--- begins my block -->*/}
  <div className="team-member" >
   <div className="member-box" style={{margin:'1em', border:'0.3em double  gray', height:'35em', minWidth:'20em'}}>
    <div className="images" >
      <img src={`${BackendURL}`+pack?.image}  width="45vmax" height="50vmax" alt='Pack'/>
    </div>
  <div className="bio">         
    <div className="box-head">
      <h4 className="price-title" style={{color:'brown', fontWeight:'400'}}>{pack?.nameplan} Package
      </h4>
        <span className="price">$ {pack.cost}</span>&nbsp;
        <span className="validity" style={{ fontSize: '1em'}}>/Per Month</span>
    </div>
     <br/>
      <div className="box-body">
        <ul>
         <li style={{textAlign:'start'}}>
            <FaRegCircleCheck size="18px" style={{color: 'darkgreen'}} />
            &nbsp;&nbsp; {pack.description}
         </li>
         <li style={{textAlign:'start'}}>
          <FaRegCircleCheck size="18px" style={{color: 'darkgreen'}} />
            &nbsp;&nbsp;Time Days { pack.timedays}
          </li>     
            </ul>
               {/*<!-- <div className="button">
                  <a href="#" className="btn">Purchase Now 
                    <ng-icon name="bootstrapArrowRight" size="22px" id="right-arrow" style="padding-top: 0.4em;" />
                  
                  </a> 
                  
                </div>-->*/}
                <button className="btn btn-danger"  >
                  {/*<Link href={{pathname:`/sales/sale-details/${pack._id}`,query:{id:(pack._id)}}} style={{textDecoration:'none'}}>*/}
                  <Link href={{pathname:`/home/sales/sale-details/${id}`,query:{id}}} style={{textDecoration:'none'}}>   
                  <span style={{ color:'white', fontSize:'1.8em'}}>
                    Purchase Now
                  </span>
              
                  </Link>
                </button> 
            </div>
          </div>
        </div>
   </div>         
    </>
)
}

export default PackItem;