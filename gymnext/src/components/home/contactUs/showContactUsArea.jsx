
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";


const ShowContactUsArea = () => {

  

  return (

<>
	<section className="contact-section">
		<div className="container">
			<div className="row">
				<div className="col-lg-6">
					<div className="left-content">
						<div className="Information-box">
							<div className="icon">
								<IoLocationSharp size='25' style={{marginTop:'-0.3em'}}/>
							</div>
							<div className="address">
								<h4>Address</h4>
								<p>70 Washington Square South New York, <br/> NY 10012, United States</p>
							</div>
						</div>
						<div className="separetor">
							<span></span>
						</div>
						<div className="Information-box">
							<div className="icon">
								<FaPhoneVolume size='25'/>
							</div>
							<div className="address">
								<h4>Phone</h4>
								<p>Mobile: +(84) 546-6789 <br/> Hotline: +(84) 456-6789</p>
							</div>
						</div>
						<div className="separetor">
							<span></span>
						</div>
						<div className="Information-box">
							<div className="icon">
								<LuClock size='25' style={{marginTop:'-0.4em', marginLeft:'0.1em'}}/>
							</div>
							<div className="address">
								<h4>Open Hours</h4>
								<p>Monday-Friday: 9:00 - 22:00 <br/> Saturday-Sunday: 9:00 - 21:00</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-6">
					<div className="right-content">
						<h2 className="title">Have Any Other Question?</h2>
						<p>Feel free to reach out! Our team is here to help with any inquiries you may have. We're happy to assist!</p>
						<form className="contact-form" method="post" action="contact-handler.php">
							<input type="text" name="username" placeholder="Your Name"/>
							<input type="email" name="usermail" placeholder="Your Email"/>
							<input type="tel" name="userphone" placeholder="Phone Number"/>
							<textarea id="usermessage" name="usermessage" placeholder="Enter your messages"></textarea>
							
							<button type="submit">Submit Questions
							<i className="fa-solid fa-arrow-right">
							</i>
							</button>
						</form>
					

						
                    
					</div>
				</div>
			</div>
		</div>
	</section> 	{/**<!-- End Contact Section -->*/}
	
    </>
     
     
     )}

export default ShowContactUsArea;