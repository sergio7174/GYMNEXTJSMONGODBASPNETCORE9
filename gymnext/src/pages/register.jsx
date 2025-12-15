import React from 'react';
import SEO from '@/components/seo/seo';
import MainMenu from "../components/layout/headers/mainmenu";
import TopBar from "../components/layout/headers/topbar";
import Footer from '../../src/components/layout/footers/footer.component';
import Wrapper from '../../src/components/layout/wrapper';
import RegisterArea from '@/components/login-register/register-area';

const RegisterPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <TopBar/>
      <MainMenu/>
      <RegisterArea />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default RegisterPage;