import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { ImTwitter } from "react-icons/im";
import { IoMdMailUnread } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoMailUnreadOutline } from "react-icons/io5";


const Footer = () => {

     return (
    <>
    
<footer class="footer-section">
    <div class="container">
        <div class="footer-content">
            <div class="discription">
                <Image src="/assets/images/site-logo.png" alt="footer" width={200} height={200}/>
               
                <p>Achieve your health goals with expert trainers, state-of-the-art equipment, and a supportive community</p>
                <ul>
                    <li class="title">Follow Us:</li>
                    <li>
                        <a href="#"><FaFacebook size="30px"/></a>
                     </li>
                    <li>
                        <a href="#"><ImTwitter size="30px"/></a>
                    </li>
                    <li>
                        <a href="#"><RiInstagramFill size="30px"/></a>
                    </li>
                    <li>
                        <a href="#"><BsLinkedin size="30px" /></a>
                    </li>
                </ul>
            </div>
            <div class="contact">
                <h3>Contact</h3>
                <ul>
                    
                    <li><IoMdMailUnread size={20}/>&nbsp;&nbsp;
                      <a href="mailto:fitcoredemo@example.com">
                        &nbsp;&nbsp;fitcoredemo&#64;example.com
                      </a>
                    </li>
                    <li>
                        <FaPhoneVolume size={20}/>&nbsp;&nbsp;
                        <a href="tel:56712345678901">
                            &nbsp;&nbsp;+ (567) 1234-567-8901
                        </a>
                    </li>
                    <li>
                        <FaLocationDot size={20}/>
                        &nbsp;&nbsp;293 Harrison St, San Francisco, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CA 94103, United States
                    </li>
                </ul>
            </div>
            <div class="letter">
                <h3>Newsletter</h3>
                <p>Subscribe today and unlock 20% off your first class package.</p>
                <form action="#" method="post">
                    <div class="mail">
                        <input type="email" placeholder="Enter your Email"/>
                        <button type="submit" >
                            <IoMailUnreadOutline  size="26px" style={{color: 'brown', backgroundColor: 'azure'}} class="rounded-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <p class="end-text">All Right Reserved © FitCore 2025</p>
    </div>
</footer>
    
    
    </>
    )
}

export default Footer;