
import { BsSortUp } from "react-icons/bs";
import view from "../assets/icons/view.svg";
import deleteIcon from "../assets/icons/delete.svg"
import edit from "../assets/icons/edit.svg";
import { FaFilter } from "react-icons/fa";
import renew from "../assets/icons/renew.svg";
import FilterModal from "../components/FilterModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { mouAtom } from "../atoms/mouAtom";
import { BsSortDownAlt } from "react-icons/bs";
import useDelete from "../hooks/useDeleteMou";
import RenewModal from "../components/RenewModal";
import axios from "axios";
const ListsMou = () => {
  const user=JSON.parse(localStorage.getItem("user"));
  const[mous,setMous]=useState([]);
  const [filters, setFilters] = useState(null); 
  const[showFilterModal,setShowFilterModal]=useState(false);
  const[renewMou,setRenewMou]=useState(null);

  const[order,setOrder]=useState("asc");
const setMou=useSetRecoilState(mouAtom);
  const navigate=useNavigate();
  const {deleteMou}=useDelete()
  const[renewModalOpen,setRenewModalOpen]=useState(false);

  const fetchMous=async(appliedFilters={})=>{  //default value
    try {
      const res=await axios.get("/api/mous/filter",{params:appliedFilters});
      //Axios automatically converts the appliedFilters object into query parameters in the URL. 
      ///api/mous/filter?organizationName=ABC&location=NewYork&startDate=2023-01-01
      console.log('Response Data:', res.data);
      
      
      setMous(res.data);
    } catch (error) {
      console.log("Error fetching mous",error.message)
    }
  }


  const handleResetFilters=()=>{
    setFilters(null);
    fetchMous({});
  }

  useEffect(()=>{
fetchMous(filters);
  },[filters]);


  const handleSort=()=>{
    if(order=="asc"){
      setMous(mous.sort((a,b)=>new Date(b.endDate)-new Date(a.endDate)));

    }
    else{
      setMous(mous.sort((a,b)=>new Date(a.endDate)-new Date(b.endDate)))
    }
  }


  const handledelete=(mouId)=>{
if(window.confirm("Are you sure you want to delete this mou?")){
deleteMou(mouId);
}
}



  const handleViewMou=async({mouId})=>{
    try {
      console.log(mouId)
      const res=await fetch(`/api/mous/view/${mouId}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
       
      });
      const data=await res.json();
setMou(data);
    
      navigate("/view");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const handleEditMou=async({mouId})=>{
    try {
      console.log(mouId)
      const res=await fetch(`/api/mous/view/${mouId}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
       
      });
      const data=await res.json();
setMou(data);
   console.log(data)
     
      
      navigate("/edit");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

useEffect(()=>{
fetchMous({});
console.log(mous)
},[mous])

return(

 <section className="p-16 bg-white">
  <div className="flex justify-end mb-10 gap-4"> 
    
  <RenewModal isRenewModalOpen={renewModalOpen} setRenewModalOpen={setRenewModalOpen} mou={renewMou} />

    <button onClick={()=>setShowFilterModal(true)} className="rounded items-center cursor-pointer border p-2 shadow-sm flex gap-2">
    <FaFilter />
  <p>Filter</p>
    </button>

{showFilterModal&&(
    <FilterModal onApplyFilters={(newFilters)=>setFilters(newFilters)} onResetFilters={handleResetFilters} onClose={()=>setShowFilterModal(false)}/>
)}


    <button className="rounded items-center  cursor-pointer border p-2 shadow-sm flex gap-2" onClick={()=>{setOrder((prev)=>(prev==="asc"?"desc":"asc"));handleSort()}}>
    {order==="asc"?<BsSortDownAlt />:
    <BsSortUp />}
  <p>Sort</p>
    </button>
  </div>
  <div className=" ">
    <div className={`grid max-md:grid-cols-4 gap-4 text-center max-lg:grid-cols-8 ${user?"grid-cols-14":"grid-cols-11"} justify-items-center mb-2`}>
    <div>Organization</div>
    <div>Location</div>
    <div>Signed Person</div>
    <div>Contact</div>
    <div>Area of cooperation</div>
    <div>Department</div>
    <div>Category</div>
    <div>Start Date</div>
    <div>End Date</div>
    <div > <p>Status</p></div>
    <div>View</div>
    {user&&<><div>Edit</div>
   
    <div>Delete</div>
    
    </>}
    </div>
    
      {mous.length===0?(
        <div className="flex flex-col gap-4 items-center justify-center mt-10"><p>No mous based on your filter.</p><button className="p-1 bg-gray-700 text-white rounded hover:bg-black w-[130px]" onClick={handleResetFilters}>Reset Filters</button></div>
      ):(<div>
       { mous.length > 0 ? (
      mous.map((mou) => (
        <div key={mou._id} className={`grid max-md:grid-cols-4 gap-4 text-center max-lg:grid-cols-8 ${user ? "grid-cols-14" : "grid-cols-11"} justify-items-center mb-2`}>
          <p>{mou.organizationName}</p>
          <p>{mou.location}</p>
          <p>{mou.otherPartyName}</p>
          <p>{mou.otherPartyContact}</p>
          <p>{mou.areaOfCooperation}</p>
          <p>{mou.department}</p>
          <p>{mou.category}</p>
          <p>{new Date(mou.startDate).toISOString().split("T")[0]}</p>
          <p>{new Date(mou.endDate).toISOString().split("T")[0]}</p>
          <div>
            {new Date(mou.endDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) ? (
              <p className="bg-green-400 px-2 rounded text-center border border-green-500 text-green-900">active</p>
            ) : (
              <p className="bg-red-400 px-2 rounded text-center border border-red-700 text-red-900">expired</p>
            )}
          </div>
          <p><img src={view} alt="" width={30} onClick={() => handleViewMou({ mouId: mou._id })} className="cursor-pointer" /></p>
          {user && <p><img src={edit} alt="" width={28} onClick={() => handleEditMou({ mouId: mou._id })} className="cursor-pointer" /></p>}
          {user && <p><img src={deleteIcon} alt="" width={25} onClick={() => handledelete(mou._id)} className="cursor-pointer" /></p>}
          {new Date(mou.endDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) ? <p><img src={renew} alt="" width={28} onClick={() => { setRenewModalOpen(true); setRenewMou(mou) }} className="cursor-pointer" /></p> : <p></p>}
        </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
   
  </div>  )}
  </div>
 </section>
  )
}

export default ListsMou
