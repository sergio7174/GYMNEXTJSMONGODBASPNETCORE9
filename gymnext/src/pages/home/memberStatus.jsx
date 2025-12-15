
// internal
import SEO from "@/components/seo/seo";
import TopBar from "@/components/layout/headers/topBar";
import MainMenu from "@/components/layout/headers/mainmenu";
import Footer from "@/components/layout/footers/footer.component";
import ShowMemberStatusArea from "@/components/home/memberStatus/ShowMemberStatusArea";


const memberStatus = () => {

  

  return (
               
        <>
      <SEO pageTitle="Member Status" />
      <TopBar/>  
      <MainMenu/>
      <ShowMemberStatusArea/>
      <Footer/>
    
    </> 
  )
  
  ;}

export default memberStatus;