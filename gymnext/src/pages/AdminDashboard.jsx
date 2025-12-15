import React from 'react';
import SEO from '@/components/seo/seo';

/**CommonBreadcrumb - titles and sub-titles every page */

import AdminArea from '@/components/adminDashboard/admin-area';
import { useRouter } from "next/router";
import {  useSelector } from "react-redux";
import TopBar from '@/components/layout/headers/topBar';

const AdminDashboard = () => {

  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const { redirect } = router.query;

 // If user is not admin and is not logged, go login
 if (user?.isAdmin != 'true' || !user?.username) {
    router.push(redirect || "/login");
  }
// If user is not admin and is logged, go home
if (user?.isAdmin != 'false' && !user?.username) {
    router.push(redirect || "/");
  }
// If user is admin and is logged show AdminDashboard
if (user?.isAdmin == 'true' && user?.username) {

  return (
               
        <>
      <SEO pageTitle="AdminDashboard" />
    
      <TopBar/>  
      <AdminArea />
      
    
    </> 
  );
};

}

export default AdminDashboard;