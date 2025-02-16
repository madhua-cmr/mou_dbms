import instagram from "../assets/icons/instagram.svg"
import a from "../assets/icons/a.svg"
import b from "../assets/icons/b.svg";
import c from "../assets/icons/c.svg";
import d from "../assets/icons/d.svg";
import bit from "../assets/bitbg.png";
import map from "../assets/icons/map.svg"
const Footer = () => {
  return (
<footer className="flex mt-16 flex-row max-md:flex-col max-md:gap-8 max-md:justify-center justify-between pb-40 pt-10 px-10 bg-black text-white rounded-t-2xl mx-4 gap-4">
<div>
    <div className="w-[120px] "><img src={bit} alt=""  /></div>
</div>
<div className="w-[200px] flex gap-2 flex-col items-center ">
  
    <h2>Address</h2>
    <div className="flex gap-2 items-start">
    <img src={map} alt="" width={25}/>
   <address >
   Alathukombai - Post,
Sathyamangalam - 638 401,
Erode District, Tamil Nadu, India.
   </address>
   </div>
   </div>
<div className="flex flex-col gap-2">
   <h3>Contact us</h3>
  
   <div className="flex gap-2 ">
   <img src={a} alt="Instagram" width="35"/>
   <p> +91 4295 226000</p>
   </div>
   <div className="flex gap-2">
   <img src={d} alt="Instagram" width="25"/>
    <p>stayahead@bitsathy.ac.in</p>
   </div>
</div>
<div>
    <h3>Follow us on </h3>
    <div className="flex  gap-2">
    <img src={instagram} alt="Instagram" width="25"/>
   
    <img src={b} alt="Instagram" width="25"/>
    <img src={c} alt="Instagram" width="25"/>
   
    </div>
</div>
</footer>
  )
}

export default Footer

