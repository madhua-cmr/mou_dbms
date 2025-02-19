import axios from "axios"
import { toast } from "react-toastify";
const useDelete = ({setDeleted}) => {
    
  const deleteMou=async(id)=>{
    try {
      const res=await axios.delete(`/api/mous/delete/${id}`,{
        withCredentials:true,
   headers:{
    "Content-Type":"application/json"
   },
      });
      const data=res.data;
      if(data.success){
        setDeleted((prev)=>!prev);
      toast.success(data.message);
      return;
      }
    if(!data.success){
        toast.error(data.error);
        return;
      }

    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }
  return {deleteMou}
}

export default useDelete
