import { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { NavLink,Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const Header = () => {
const user=JSON.parse(localStorage.getItem("user"));
const navigate=useNavigate();
const{setAuthScreen}=useContext(AppContext);
const handleLogout=async()=>{
  localStorage.removeItem("user");
  try{
  const res=await axios.post("http://localhost:5000/api/users/logout",{}, { withCredentials: true })
  const data=res.data;
  if(data.success){
    toast.success(data.message);
    navigate("/");
  }
}catch(error){
  console.log(error.message);
  toast.error(error.message);
}
}
  return (
   <section className="flex p-8 bg-blue-950 text-white justify-between">
    <Link to="/"><h1 >BIT MOU</h1></Link>
    <div className="flex gap-4 ">
      <NavLink to={"/"}className={({isActive})=>isActive?"text-blue-200 border-b-2 border-blue-400 font-semibold":"text-white hover:text-blue-200"}>Home</NavLink >
  
   {user&& <NavLink to={"/add"} className={({isActive})=>isActive?"text-blue-200 border-b-2 border-blue-400 font-semibold":"text-white hover:text-blue-200"} >Add Mou</NavLink >}
      <NavLink to={"/list"} className={({isActive})=>isActive?"text-blue-200 border-b-2 border-blue-400 font-semibold":"text-white hover:text-blue-200"}>Mou List</NavLink >
      
    </div>
    <div className="flex gap-8 text-[22px]">
      {!user&&<><button className="p-1 px-2 bg-slate-500 text-[16px] rounded" onClick={()=>{navigate("/auth");setAuthScreen("login")}}>Login</button><button className="p-1 px-2 bg-slate-500 text-[16px] rounded"  onClick={()=>{navigate("/auth");setAuthScreen("signup")}}>Signup</button></>}
  {user&& <><FaRegUserCircle/>
    <div onClick={()=>handleLogout()} className="cursor-pointer" ><MdLogout  /></div></>}
    </div>
   </section>
  )
}

export default Header
