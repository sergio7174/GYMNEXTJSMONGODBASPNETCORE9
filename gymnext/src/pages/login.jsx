import React from 'react';
import SEO from '@/components/seo/seo';
import Footer from '../../src/components/layout/footers/footer.component';
import Wrapper from '../components/layout/wrapper';
import LoginArea from '@/components/login-register/login-area';
import MainMenu from "../components/layout/headers/mainmenu";
import TopBar from "../components/layout/headers/topbar";

const LoginPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <TopBar/>
      <MainMenu/>
      <LoginArea/>
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default LoginPage;