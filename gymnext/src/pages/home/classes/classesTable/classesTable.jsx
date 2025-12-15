import SEO from '@/components/seo/seo';
import Footer from '@/components/layout/footers/footer.component';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import ClassesTableArea from '@/components/home/classes/classesTable/ShowclassesTableArea';
import TopBar from '@/components/layout/headers/topBar';
import MainMenu from '@/components/layout/headers/mainmenu';


const ClassesTable = () => {
  return (
      <>
      <SEO pageTitle="Classes Table" />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgb(51, 133, 226) 100%)',border:'5px double grey'}}>
      <TopBar/>
      <MainMenu/>
      <CommonBreadcrumb title="Class" subtitle="Classes Table" center={true} />
      </div>
      <ClassesTableArea/>
      <Footer primary_style={true} />
    </>
  );
};

export default ClassesTable;