import mongoose from "mongoose";

const mouSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    areaOfCooperation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
  
      organizationResponsibilities: {
        type: String,
        required: true,
      },
      otherPartyResponsibilities: {
        type: String,
        required: true,
      },
   
    terms: {
      type: String,
      required: true,
    },
    signedPersonName: {
      type: String,
      required: true,
    },
    signedPersonPosition:{
      type:String,
      required:true,
    },
    signedPersonContact: {
      type: String,
     match:[/^\d{10}$/,"Phone number must be exactly 10 digits"],
      required: true,
    },
    signedPersonSignature: {
      type: String,
      required: true,
    },
    signedPersonSignatureDate: {
      type: Date,
      required: true,
    },
    otherPartyName: {
      type: String,
      required: false,
    },
    otherPartyPosition: {
      type: String,
      required: false,
    },
    otherPartyContact: {
      type: String,
      required: false,
    },
    otherPartySignature: {
      type: String,
      required: true,
    },
    otherPartySignatureDate: {
      type: Date,
      required: false,
    },
    confidentialityAgreement: {
      type: Boolean,
      required: true,
    },
    mouDocument:{
      type:String,
      required:false,
    }
  },
  { timeStamps: true }
);

const Mou = mongoose.model("Mou", mouSchema);
export default Mou;
