import SEO from "@/components/seo/seo";
import Wrapper from "../components/layout/wrapper";
import MainMenu from "../components/layout/headers/mainmenu";
import TopBar from "../components/layout/headers/topbar";
import Footer from "../components/layout/footers/footer.component";
import Intro from "@/components/home/intro/intro";
import LastNews from "@/components/home/latestnews/latestnews";
import AboutUs from "./home/aboutUs";
import WhyChooseUs from "./home/whyChooseUs";
import WorkProcess from "./home/workProcess";


export default function Home() {
  return (
    <>
  <Wrapper>
      <SEO pageTitle='Home'/>
      <TopBar/>
      <MainMenu/>
      <Intro/>
      <AboutUs/>
      <WhyChooseUs/>
      <LastNews/>
      <WorkProcess/>
     <Footer/>
  </Wrapper>
   </>
  )
}
