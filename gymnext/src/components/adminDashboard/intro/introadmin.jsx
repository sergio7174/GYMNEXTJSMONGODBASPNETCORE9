import Image from "next/image";
import { useSelector } from "react-redux";
import { FaUserCog } from "react-icons/fa";

const IntroAdmin = () => {

      // Get the user from the store redux   
      const { user } = useSelector((state) => state.auth);

        return (

    <>
        
        <section id="hero" style={{display: 'flex', flexDirection: 'column'}}  className="hero section light-background">   
    
        {/*<!---- Welcome - image section --> */}   
         <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'baseline', alignItems:'center' ,marginLeft: '5em', marginTop:'13em'}} className="welcomeImage" >
            <div className="welcome" data-aos="fade-down" data-aos-delay="100" >
              <div style={{display: 'flex', flexDirection:'row', justifyContent:'center'}}>
                <div style={{marginTop: '0.2em'}}>
                   <FaUserCog size="64px"/> 
                </div>
                <div>
                  <h4 style={{textAlign: 'center', marginTop: '1em'}} ><em style={{color: 'rgb(10, 107, 163)', fontSize: '20px'}}>: </em>{user?.fullName} </h4>
                </div>  
             </div>
    
              <h2>WELCOME TO </h2>
              <h2>GYM Sergio Fitness</h2>
              <p>ADMINISTRATOR DASHBOARD</p>
            </div>{/*-- End Welcome --*/}
    
            <div style={{marginLeft: '5em', marginTop:'-2em'}} >  
             
                <Image src="/assets/images/homeadmin/homeadmin-frontpg01.jpg" data-aos="fade-in" className="imageI img-fluid" alt="Nothing Found" style={{borderRadius: '20px'}} width={2000} height={800}/>
              </div>
        </div>
        {/*---- End Welcome - image section --*/}   
    
        {/*---- Why Choose Electronic Shop section ------------*/}    
        <div className="content row gy-4">
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
                <h3>What Can You Do as Admin in GYM Sergio Fitness?</h3>
                <p>
                  Product Management: Add, edit, or remove products, manage inventory, and set pricing.
                  Order Management: Process and track customer orders, manage returns and refunds, and handle customer inquiries related to orders.
                  Payment Processing: Set up and manage payment gateways, monitor transactions, and ensure secure payment processing.
                </p>
                <div className="text-center">
                  <a href="#about" className="more-btn"><span>Learn More</span> <i className="bi bi-chevron-right"></i></a>
                </div>
              </div>
            </div>{/**-- End Why Box --*/}
    
            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="d-flex flex-column justify-content-center">
                <div className="row gy-4">
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay="300">
                      <div style={{marginTop: '0.2em'}}>
                        <ng-icon name="bootstrapPersonFillGear" size="32px" />
                     </div>
                      <h4>User Management</h4>
                      <h6 style={{color:'black', fontWeight:'bold'}}>
                        User Registration and Authentication: Approve or deny user registrations, manage user roles (admin, editor, user), and handle password resets.
                        User Profiles: Edit user profiles and manage user information.
                        Access Control: Set permissions for different user roles to access specific areas or features of the website.</h6>
                    </div>
                  </div>{/*-- End Icon Box --*/}
    
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay="400">
                        <ng-icon name="bootstrapPeopleFill" size="32px" />
                      <h4>Community Engagement</h4>
                      <h6 style={{color: 'black', fontWeight: 'bold'}}>Moderation: Monitor user-generated content such as comments, reviews, or forum posts, and moderate as necessary.
                        Communication: Send newsletters, updates, or notifications to users about new content, features, or promotions.
                        Feedback Management: Collect and manage user feedback to improve the website and user experience.</h6>
                    </div>
                  </div>{/*<!-- End Icon Box -->*/}
    
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay="500">
                        
                        <ng-icon name="bootstrapBatteryCharging" size="32px" />
    
                      <h4>Technical Maintenance </h4>
                      <h6 style={{color: 'black', fontWeight: 'bold'}}> Website Updates: Regularly update the website’s software, plugins, and themes to ensure security and performance.
                        Bug Fixing: Identify and resolve technical issues or bugs that may arise on the website.
                        Performance Optimization: Optimize website performance through caching, image optimization, and other techniques.</h6>
                    </div>
                  </div>{/**-- End Icon Box --*/}
    
                </div>
              </div>
            </div>
          </div>{/*-- End  Content--*/}
     {/*---- End Why Choose Medilab? section ------------*/} 
    </section>
    </>
)}

export default IntroAdmin;