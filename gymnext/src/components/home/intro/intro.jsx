import React from "react";
import Image from "next/image";


const intro = () => {
  
    return (
   
   <div style={{display:'flex', flexDirection:'row', justifyContent:'center',    
      alignItems:'center', flexWrap: 'wrap', backgroundColor:'#adb5bd'}}  >    
    
    <div id="page1" class="py-5 col-lg-6 text-center text-white" >
        <h1 class="display-3" style={{color:'black', marginTop:'1em'}}>SWEAT. SMILE. REPEAT.</h1>
        <h2 class="my-element">WELCOME TO <span>SERGIO FITNESS</span></h2>
        <p>Fitness is not <span>30%</span> Gym and <span>70%</span> Diet. It is <span>100%</span> dedication to your Gym and Diet.</p>
    </div>

   <div>  
      <Image src="/assets/images/class-pag-9.png" alt="Gym" data-aos="fade-in" class="img-fluid rounded-5 col-lg-6 imageIntro" style={{height: '35em', marginTop: '2em', marginRight: '2em', marginLeft:'2em', marginBottom:'2em', width:'35em'}} width={3000} height={4000} />
  </div>

</div>

   
  );
};

export default intro;