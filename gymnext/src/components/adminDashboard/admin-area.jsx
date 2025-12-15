import React from "react";
import AdminMenu from "../layout/headers/adminmenu";
import AdminBreadcrumb from "../breadcrumb/admin-breadcrumb";
import IntroAdmin from "./intro/introadmin";
import Footer from "../layout/footers/footer.component";


const AdminArea = () => {

  return (

    <>
        <section  style={{ height:'121vh',width:'100%' ,background: 'linear-gradient(139deg, rgba(22,103,184,1) 2%, rgba(9,83,121,1) 11%, rgba(0,193,255,0.9191876579733456) 58%)', }} >
        
        <div>
           <AdminMenu />
        </div>
        <div>
          <AdminBreadcrumb title="AdminDashboard" subtitle="" center={true} />
        </div>
        <div>
          <IntroAdmin/>
        </div>
        <div>
          <Footer/>
        </div>
        
      </section>
    </>
  );
};

export default AdminArea;