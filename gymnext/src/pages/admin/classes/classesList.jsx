import React from 'react';
import SEO from '@/components/seo/seo';
import Footer from '@/components/layout/footers/footer.component';
import AdminBreadcrumb from '../../../components/breadcrumb/admin-breadcrumb';
import EditDelClassArea from '@/components/adminDashboard/classes/EditDelClassArea';
import TopBar from '@/components/layout/headers/topBar';
import AdminMenu from '@/components/layout/headers/adminmenu';


const ClassesList = () => {
  return (
      <>
      <SEO pageTitle="Staffs List" />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgb(51, 133, 226) 100%)',border:'5px double grey'}}>
      <TopBar/>
      <AdminMenu/>
      <AdminBreadcrumb title="Staff" subtitle="Edit - Delete Trainer" center={true} />
      </div>
      <EditDelClassArea/>
      <Footer primary_style={true} />
    </>
  );
};

export default ClassesList;