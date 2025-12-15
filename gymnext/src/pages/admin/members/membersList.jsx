import SEO from '@/components/seo/seo';
import Footer from '@/components/layout/footers/footer.component';
import AdminBreadcrumb from '../../../components/breadcrumb/admin-breadcrumb';
import ListMembersArea from '@/components/adminDashboard/members/ListMembersArea';
import TopBar from '@/components/layout/headers/topBar';
import AdminMenu from '@/components/layout/headers/adminmenu';


const MembersList = () => {
  return (
      <>
      <SEO pageTitle="Packets List" />
      <div style={{background:'radial-gradient(circle, rgba(170,163,166,1) 0%, rgb(51, 133, 226) 100%)',border:'5px double grey'}}>
      <TopBar/>
      <AdminMenu/>
      <AdminBreadcrumb title="Members" subtitle="Members List" center={true} />
      </div>
      <ListMembersArea/>
      <Footer primary_style={true} />
    </>
  );
};

export default MembersList;