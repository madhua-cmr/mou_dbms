import axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useEditMou = ({setIsLoading}) => {

const navigate=useNavigate();
    const editMou=async(mou)=>{
        try {
          setIsLoading(true);
             const res=await axios.put(`/api/mous/edit/${mou._id}`,mou,{withCredentials:true})
        const data=res.data;
        if(data.success){
            toast.success(data.message);
          navigate('/list')
        }else{
          toast.error(data.error);  
        }
    
} catch(error) {
  console.log(error.message);
  toast.error(error.message);
}finally{
  setIsLoading(false);
}
 
}
  return {editMou}
}

export default useEditMou
