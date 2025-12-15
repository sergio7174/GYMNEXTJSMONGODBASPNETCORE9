import React from 'react';
import SEO from '@/components/seo/seo';
import Footer from '@/components/layout/footers/footer.component';
import AdminBreadcrumb from '../../../components/breadcrumb/admin-breadcrumb';
import AddClassArea from '@/components/adminDashboard/classes/addClassArea';
import TopBar from '@/components/layout/headers/topBar';
import AdminMenu from '@/components/layout/headers/adminmenu';


const ClassCreate = () => {
  return (
      <>
      <SEO pageTitle="Add Class" />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgb(51, 133, 226) 100%)',border:'5px double grey'}}>
      <TopBar/>
      <AdminMenu/>
      <AdminBreadcrumb title="Pack" subtitle="Add Class" center={true} />
      </div>
      <AddClassArea/>
      <Footer primary_style={true} />
    </>
  );
};

export default ClassCreate;