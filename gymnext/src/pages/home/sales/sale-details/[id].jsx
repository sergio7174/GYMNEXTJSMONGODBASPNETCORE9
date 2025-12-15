import { useSearchParams } from 'next/navigation';
// internal
import SEO from '@/components/seo/seo';
import MainMenu from '../../../../components/layout/headers/mainmenu';
import Footer from '@/components/layout/footers/footer.component';
import TopBar from '../../../../components/layout/headers/topBar';
import ErrorMsg from '@/components/common/error-msg';
import { useGetPackQuery } from '@/redux/features/apis/packApi';
import CommonBreadcrumb from '../../../../components/breadcrumb/common-breadcrumb';
import SaleDetailsArea from '@/components/home/sales/sale-details-area';
import Loader from '@/components/loader/loader';
import {  useSelector } from "react-redux";
import { useRouter } from "next/router";


const SaleDetailsPage = ( ) => {

  // get user from store
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const { redirect } = router.query;

  // to get the name parameter from url
  const searchParams = useSearchParams();
  const PackId = searchParams.get('id');

  //alert("Im at[id] - line 27: - id: "+PackId);

  const { data: pack, isLoading, isError } = useGetPackQuery(PackId);
  // decide what to render
  let content = null;
  if (isLoading) {
    content = <Loader loading={isLoading}/>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  // If user is not admin and is not logged, go login
 if (user?.isAdmin != 'true' && !user?.username) {
    router.push(redirect || "/login")}
if (user?.username) {
  if (!isLoading && !isError && pack) {
    content = (
      <>
      
        <CommonBreadcrumb title='Sales Details' subtitle='Pack Bill' center={true} />
       
           <SaleDetailsArea pack={pack.data} />
        
      </>
    );
  }
  return (
    <>
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <div>
         <SEO pageTitle="Pack Sale Details" />
      </div>
      <div>
         <TopBar/>
        <MainMenu />
      </div>
      <div style={{marginBottom:'14em'}}>
        {content}
      </div>  
      <div>
        <Footer primary_style={true} />
      </div>
    </div>  
    </>
  );
}};

export default SaleDetailsPage;

