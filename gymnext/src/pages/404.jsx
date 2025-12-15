
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
// internal
import SEO from "@/components/seo/seo";
import TopBar from "../components/layout/headers/topbar";
import Footer from '../../src/components/layout/footers/footer.component';
import Wrapper from '../components/layout/wrapper';
import error from '../../public/assets/img/error/error.png';

const ErrorPage = () => {

    // get user from store
      const { user } = useSelector((state) => state.auth);

  return (
  <Wrapper>
   <SEO pageTitle="404" />
    <TopBar/>
      {/* 404 area start */}
      <section className="tp-error-area pt-110 pb-110">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="tp-error-content text-center">
                <div className="tp-error-thumb">
                  <Image src={error} alt="error img" />
                </div>

                <h3 className="tp-error-title">Oops! Page not found</h3>
                <p>
                  Whoops, this is embarrassing. Looks like the page you were
                  looking for was not found.
                </p>
              {/** If user is admin and is logged show go AdminDashboard **/}
                {(user?.isAdmin == 'true' && user?.fullName) ? 
                <Link href="/AdminDashboard" className="tp-error-btn">
                  Back to Home Admin
                </Link> :<div></div>}
                {/** If user is not logged in and there is not username **/}
                {(!user && !user?.fullName) ? 
                <Link href="/" className="tp-error-btn">
                  Back to Home
                </Link> :<div></div>}
                {(user?.isAdmin == 'false' && user && user?.fullName) ? 
                <Link href="/" className="tp-error-btn">
                  Back to Home
                </Link> :<div></div>}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 404 area end */}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ErrorPage;