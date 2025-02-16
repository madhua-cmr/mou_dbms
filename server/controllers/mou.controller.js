import Mou from "../models/Mou.model.js";


export const addMou=async(req,res)=>{
 
    try {
     
      const mouData = req.body;
     
    
        if (!mouData) {
            return res.status(400).json({ error: "MoU data is required" });
          }
      
          // Ensure required fields exist
          if (!mouData.startDate || !mouData.endDate) {
            return res.status(400).json({ error: "Start and End dates are required" });
          }

      
        const newMou = new Mou({
          ...mouData,
          startDate: mouData.startDate ? new Date(mouData.startDate) : null,
          endDate: mouData.endDate ? new Date(mouData.endDate) : null,
          signedPersonSignatureDate: mouData.signedPersonSignatureDate ? new Date(mouData.signedPersonSignatureDate) : null,
          otherPartySignatureDate: mouData.otherPartySignatureDate ? new Date(mouData.otherPartySignatureDate) : null,
        
          });



        const savedMou = await newMou.save();
    

        return res.status(201).json({ success:true,message: "MoU added successfully", savedMou});
    
      } catch (error) {
     
        console.error(error);
        res.status(500).json({ success:false,error: "Error adding MoU", error: error.message });
      }
    };

  

    export const getAllMous=async(req,res)=>{
try {
    const mous=await Mou.find({});
    res.status(201).json(mous);
    
} catch (error) {
    console.log(error.message);
    res.status(500).json({error:"Internal server error"});
}
    }


    export const getParticularMou=async(req,res)=>{
        const {id}=req.params;
        
   try {
    const mou=await Mou.findById(id);
    return res.status(201).json(mou);

    
   } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);

   }
    }

    export const deleteMou=async(req,res)=>{
const mouId=req.params.id;
try {
  const existmou=await Mou.findByIdAndDelete(mouId);
  if(existmou){
    return res.status(200).json({message:"Mou deleted successfully",success:true});

  }
} catch (error) {
  console.log(error.message);
  res.status(500).json(error.message);
}

    }


    export const editMou=async(req,res)=>{
      const id=req.params.id;
      const mou=req.body;
      try {
        const updatedMou=await Mou.findByIdAndUpdate(id,mou,{
          new:true,
          runVaildators:true,
        })
       
        if(!updatedMou){
          return res.status(404).json({success:false,error:"Mou not found"});

        }
        return res.status(200).json({success:true,message:"Mou updated successfully"});

      } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,error:error.message});

      
      }
    }

    export const filterMous=async(req,res)=>{
      try {
        const {organizationName,location,areaOfCooperation,department,category,startDate,endDate}=req.query;
        let query={};

        if(organizationName)query.organizationName=new RegExp(organizationName,"i");//case insensitive
        if (location) query.location = new RegExp(location, "i");
        if (areaOfCooperation) query.areaOfCooperation = new RegExp(areaOfCooperation, "i");
        if (department) query.department = new RegExp(department, "i");
        if (category) query.category = new RegExp(category, "i");
        if (startDate && endDate) {
       
          query.startDate = {
              $gte: new Date(startDate), // MoUs starting on or after startDate
              $lte: new Date(endDate)    // MoUs starting on or before endDate
          };
      } else {
         
          if (startDate) {
              query.startDate = { $gte: new Date(startDate) };
          }
          
          
          if (endDate) {
              query.endDate = { $lte: new Date(endDate) };
          }
      }

      const filteredMous=await Mou.find(query);
      
        return res.status(200).json(filteredMous);
      } catch (error) {
        console.log("Error in filtermous controller",error.message)
        return res.status(500).json({message:"internal server error"})
      }
    }