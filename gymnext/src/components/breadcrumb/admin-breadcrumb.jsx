import { TbBackslash } from "react-icons/tb";

const AdminBreadcrumb = ({
  title,
  subtitle,
  center = false,
  bg_clr = false,
}) => {
  return (
    
    <section
      className={`breadcrumb__area ${
        center ? "text-center" : ""
      } include-bg pt-95 pb-50`}
      style={{ backgroundColor: bg_clr && `#EFF1F5`}}
    >
      <div className="container breadcrumb-area">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <div className="breadcrumb__list">
                <span>
                  <a href="#" style={{fontSize:'0.6em'}}>AdminDashboard</a>
                </span>
                <TbBackslash style={{color:'white', marginTop:'-0.5em'}} size={25}/>
                <span style={{fontSize:'1.5em'}}>{subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
   </section>
 
  );
};

export default AdminBreadcrumb;