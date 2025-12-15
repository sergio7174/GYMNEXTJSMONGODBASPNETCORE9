import React from 'react';
import SEO from '@/components/seo/seo';
import Footer from '@/components/layout/footers/footer.component';
import CommonBreadcrumb from '../../../components/breadcrumb/common-breadcrumb';
import ShowStaffArea from '@/components/home/staff/ShowStaffArea';
import TopBar from '@/components/layout/headers/topBar';
import MainMenu from '@/components/layout/headers/mainmenu';


const HomeStaffList = () => {
  return (
      <>
      <SEO pageTitle="Staffs List" />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgb(51, 133, 226) 100%)',border:'5px double grey'}}>
      <TopBar/>
      <MainMenu/>
      < CommonBreadcrumb title="Staff" subtitle="Trainers List" center={true} />
      </div>
      <ShowStaffArea/>
      <Footer primary_style={true} />
    </>
  );
};

export default HomeStaffList;