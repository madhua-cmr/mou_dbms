import axios from "axios";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

const RenewModal = ({isRenewModalOpen,setRenewModalOpen,mou}) => {
    const getValidDateString = (date) => {
        if (!date) return new Date().toISOString().split("T")[0];
        const parsedDate = new Date(date);
        return isNaN(parsedDate) ? new Date().toISOString().split("T")[0] : parsedDate.toISOString().split("T")[0];
      };
    
      const [newEndDate, setNewEndDate] = useState("");
    
      useEffect(() => {
        // Ensure newEndDate is set only when the modal opens with a valid mou
        if (mou?.endDate) {
          setNewEndDate(getValidDateString(mou?.endDate));
        } else {
          setNewEndDate(getValidDateString(null));
        }
      }, [mou]);
      const validateForm=()=>{
      if(new Date(newEndDate).setHours(0,0,0,0)<=new Date().setHours(0,0,0,0)){
        toast.error("New End Date Should be after today");
        return false;
      }
      return true;
      }
    const handleRenewMou=async()=>{
      
        try {
          if(!validateForm())return;
            const res=await axios.put(`http://localhost:5000/api/mous/edit/${mou?._id}`,{
                endDate:newEndDate
            },{withCredentials:true,
              headers:{
                "Content-Type":"application/json"
               },
            })
  const data=res.data;
  if(data.success){
    toast.success(data.message);
    setRenewModalOpen(false);
    return;
  }
  toast.error(data.error);

        } catch (error) {
            console.log(error);
            toast.error("UnAuthenticated user");
        }
    }
    if(!isRenewModalOpen)return;
  return (
  <section className="inset-0 fixed  flex justify-center items-center w-full h-full z-50 bg-slate-500  bg-opacity-50">
    
    <div className="w-1/4 bg-white flex flex-col p-8 rounded ">
    <div className="flex justify-end " ><MdCancel className="text-2xl cursor-pointer" onClick={()=>{setRenewModalOpen(false)}}/></div>
        <h2 className="text-center  text-blue-950">Renew Mou</h2>
        <div className="flex flex-col gap-6">
        <h3 className="font-normal ">End Date :</h3>
        <input type="date" onChange={(e)=>{
            const selectedDate=e.target.value;
            if(selectedDate){setNewEndDate(new Date(selectedDate).toISOString().split("T")[0])}}
    } value={newEndDate} className="outline-none hover:outline-none  ring-2 ring-slate-300 rounded p-3"/>
        <button className="px-2 bg-slate-950  p-2 rounded text-white my-4" onClick={handleRenewMou}>Renew</button>
        </div>
    </div>
  </section>
  )
}

export default RenewModal
