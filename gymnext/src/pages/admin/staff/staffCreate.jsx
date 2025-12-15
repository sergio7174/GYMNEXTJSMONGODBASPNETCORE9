import React from 'react';
import SEO from '@/components/seo/seo';
import Footer from '@/components/layout/footers/footer.component';
import AdminBreadcrumb from '../../../components/breadcrumb/admin-breadcrumb';
import AddStaffArea from '@/components/adminDashboard/Staff/addStaffArea';
import TopBar from '@/components/layout/headers/topBar';
import AdminMenu from '@/components/layout/headers/adminmenu';


const StaffCreate = () => {
  return (
      <>
      <SEO pageTitle="Add Staff" />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgb(51, 133, 226) 100%)',border:'5px double grey'}}>
      <TopBar/>
      <AdminMenu/>
      <AdminBreadcrumb title="Staff" subtitle="Add Staff" center={true} />
      </div>
      <AddStaffArea/>
      <Footer primary_style={true} />
    </>
  );
};

export default StaffCreate;