
// internal
import SEO from "@/components/seo/seo";
import TopBar from "@/components/layout/headers/topBar";
import MainMenu from "@/components/layout/headers/mainmenu";
import Footer from "@/components/layout/footers/footer.component";
import ShowContactUsArea from "@/components/home/contactUs/showContactUsArea";


const ContactUs = () => {

  

  return (
               
        <>
      <SEO pageTitle="Contact Us" />
      <TopBar/>  
      <MainMenu/>
      <ShowContactUsArea/>
      <Footer/>
    
    </> 
  )
  
  ;}

export default ContactUs;