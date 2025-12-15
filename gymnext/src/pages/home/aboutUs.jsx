
const AboutUs = () => {

  

  return (

     <>
     
  {/*<!-- Start About  Section -->*/}

    <section className="about-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-xl-6">
                    <div className="about-left">
                        <div className="image">
                            <img src="/assets/images/about-img-1.png" alt="about01"/>
                        </div>
                        
                        <div className="text-box">
                            <div className="count">
                                <h3>20+</h3>
                                <p>Years</p>
                            </div>
                            <div className="text">
                                <p>Experience</p>
                            </div>
                        </div>
    
                        <div className="image-box">
                            <img src="assets/images/about-img-2.png" alt="about02"/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-xl-6">
                    <div className="about-right">
                        <div className="section-title">
                            <h4 className="subtitle"><span>About Us</span></h4>
                            <h1 className="title">Elevate Your Ultimate Fitness Journey</h1>
                        </div>
                        <p className="discription">Achieve your health goals with expert trainers, state-of-the-art equipment, and a supportive community designed to empower your fitness journey.</p>
                        <div className="list-box">
                         <div className="list">
                          <ul>
                          <li><i className="fa-solid fa-bolt"></i>
                                    <span style={{ fontSize:'1.3em', color:'black'}} >Personalized Workout Programs</span></li>
                                    <li><i className="fa-solid fa-bolt"></i><span style={{ fontSize:'1.3em', color:'black'}}>Complete Support Throughout</span></li>
                                    <li><i className="fa-solid fa-bolt"></i><span style={{ fontSize:'1.3em', color:'black'}}>Proven Results You Can Trust</span></li>
                                </ul>
                            </div>
                            <div className="video">
                                <a data-autoplay="true" data-vbtype="video" href="https://youtu.be/Et_3r2uugrY?si=q52f_-j68bErgxzO" className="venobox icon">
                                 <i className="fa fa-play"></i>
                                 <span className="cricle-1">
                                 </span>
                                 <span className="cricle-2">
                                 </span>
                                 <span className="cricle-3">
                                 </span>
                                </a>
                            </div>
                        </div>
                        <div className="button">
                            <a href="#" className="btn btn-danger">Get Started Today<i className="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    

    
    {/*<!-- End About  Section --> */}
   
     
     </>

  )


}


export default AboutUs;