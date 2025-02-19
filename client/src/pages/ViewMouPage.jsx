import { useRecoilState } from "recoil"
import download from "../assets/icons/download.png"
import { mouAtom } from "../atoms/mouAtom"
import {jsPDF} from "jspdf"
import { FcFile } from "react-icons/fc";
const ViewMouPage = () => {
  const [mou]=useRecoilState(mouAtom);

const handleDownload=()=>{

    const doc = new jsPDF();
  
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height;
    let currentY = margin; 
    const lineHeight = 6; 
    const fontSize = 12; 
  
    // Set the font and size
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
  
    // Title of the MoU
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Memorandum of Understanding", margin, currentY);
    currentY += lineHeight * 2;
  
    // Date of MoU
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date(mou?.startDate).toISOString().split("T")[0]}`, margin, currentY);
    currentY += lineHeight;
  
    // Organization Name
    doc.text(`Organization Name: ${mou?.organizationName}`, margin, currentY);
    currentY += lineHeight;
  
    // Location
    doc.text(`Location: ${mou?.location}`, margin, currentY);
    currentY += lineHeight;
  
    // Signed by (Organization)
    doc.text(`Signed by: ${mou?.otherPartyName}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Position: ${mou?.otherPartyPosition}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Contact Number: ${mou?.otherPartyContact}`, margin, currentY);
    currentY += lineHeight;
  
    // Purpose of the MoU
    doc.text("1. Purpose:", margin, currentY);
    currentY += lineHeight;
    const purpose = mou?.purpose || "No purpose provided";
    const purposeLines = doc.splitTextToSize(purpose, 180); // Wrap text
    purposeLines.forEach((line) => {
      if (currentY + lineHeight > pageHeight - margin) {
        doc.addPage(); // Add a new page if space is running out
        currentY = margin; // Reset Y position for new page
      }
      doc.text(line, margin, currentY);
      currentY += lineHeight;
    });
  
    // Area of Cooperation
    doc.text("2. Area of Cooperation:", margin, currentY);
    currentY += lineHeight;
    const areaOfCooperation = mou?.areaOfCooperation || "No details provided";
    const areaOfCooperationLines = doc.splitTextToSize(areaOfCooperation, 180);
    areaOfCooperationLines.forEach((line) => {
      if (currentY + lineHeight > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineHeight;
    });
  
    // Department
    doc.text("3. Department:", margin, currentY);
    currentY += lineHeight;
    const department = mou?.department || "No department specified";
    const departmentLines = doc.splitTextToSize(department, 180);
    departmentLines.forEach((line) => {
      if (currentY + lineHeight > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineHeight;
    });
  
    // Category
    doc.text("4. Category:", margin, currentY);
    currentY += lineHeight;
    const category = mou?.category || "No category specified";
    const categoryLines = doc.splitTextToSize(category, 180);
    categoryLines.forEach((line) => {
      if (currentY + lineHeight > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineHeight;
    });
  
    // Duration
    doc.text("5. Duration of Agreement:", margin, currentY);
    currentY += lineHeight;
    const duration = `From ${new Date(mou?.startDate).toISOString().split("T")[0]} to ${new Date(mou?.endDate).toISOString().split("T")[0]}`;
    doc.text(duration, margin, currentY);
    currentY += lineHeight;
  
    // Terms and Responsibilities
    doc.text("6. Terms and Conditions:", margin, currentY);
    currentY += lineHeight;
    doc.text("   1. Responsibilities of Bannari Amman Institute of Technology", margin, currentY);
    currentY += lineHeight;
    const responsibilities = mou?.organizationResponsibilities || "No responsibilities provided";
    const responsibilitiesLines = doc.splitTextToSize(responsibilities, 180);
    responsibilitiesLines.forEach((line) => {
      if (currentY + lineHeight > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineHeight;
    });
  
    doc.text(`   2. Responsibilities of ${mou?.organizationName}`, margin, currentY);
    currentY += lineHeight;
    const otherResponsibilities = mou?.otherPartyResponsibilities || "No responsibilities provided";
    const otherResponsibilitiesLines = doc.splitTextToSize(otherResponsibilities, 180);
    otherResponsibilitiesLines.forEach((line) => {
      if (currentY + lineHeight > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineHeight;
    });
  
    doc.text("   3. Any Specific Terms:", margin, currentY);
    currentY += lineHeight;
    const terms = mou?.terms || "No specific terms provided";
    const termsLines = doc.splitTextToSize(terms, 180);
    termsLines.forEach((line) => {
      if (currentY + lineHeight > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
      doc.text(line, margin, currentY);
      currentY += lineHeight;
    });
  
    // Confidentiality
    doc.text("7. Confidentiality:", margin, currentY);
    currentY += lineHeight;
    doc.text("Both parties agree to maintain confidentiality regarding any sensitive information exchanged.", margin, currentY);
    currentY += lineHeight;
  
    // Signatures section
    doc.text("8. Signatures:", margin, currentY);
    currentY += lineHeight;
  
    // Bannari Amman Institute of Technology Signature
    doc.text(`Signed by: ${mou?.signedPersonName}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Position: ${mou?.signedPersonPosition}`, margin, currentY);
    currentY += lineHeight;
    // Add Signature Image of Bannari Amman Institute of Technology
    doc.addImage(mou?.signedPersonSignature, "PNG", margin, currentY, 40, 20); // Image inserted here (width: 40, height: 20)
    currentY += 30; // Space after image
    
    // Other Party Signature
    doc.text(`Signed by: ${mou?.otherPartyName}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Position: ${mou?.otherPartyPosition}`, margin, currentY);
    currentY += lineHeight;
    // Add Signature Image of the Other Party
    doc.addImage(mou?.otherPartySignature, "PNG", margin, currentY, 40, 20); // Image inserted here (width: 40, height: 20)
    currentY += 30; // Space after image
  
    // Download PDF
    doc.save(`MoU_${mou?.organizationName}.pdf`);
  };
  return (
 <section className="bg-slate-100 flex items-center flex-col justify-center py-8">
 <div className="flex  px-16 py-2 w-5/6 lg:w-1/2 justify-end"> <div className="w-10 cursor-pointer" onClick={handleDownload}><img src={download} alt="" /></div></div>

  <div className="rounded-2xl bg-white py-10 p-8 w-5/6 lg:w-1/2">
  <h1 className="text-center my-4">Memorandum of Understanding</h1>
  <h3>This Memorandum of Understanding (MoU) is made on this day,<span>  {new Date(mou?.startDate).toISOString().split("T")[0]}</span></h3>
  <h3>between</h3>
  <h2 className="my-2"><strong>Organization Name:</strong>{mou?.organizationName}</h2>
  <h2 className="my-2"><strong>Location: </strong>{mou?.location}
  </h2>
  <h2 className="my-2"><strong>Signed by:</strong>{mou.otherPartyName}</h2>
  <h2 className="my-2"><strong>Contact Number: </strong>{mou.otherPartyContact}</h2>
  <h2 className="mt-3">1. Purpose:</h2>
 <p>{mou.purpose}</p>

 <h2 className="mt-3">2. Area of Cooperation:</h2>
 <p>The parties agree to work together in the following fields:</p>
<p><span>{mou.areaOfCooperation}</span></p>
 

<h2 className="mt-3">3. Department:</h2>
 <p>The MoU will primarily involve the following departments:</p>
<p><span>{mou.department}</span></p>

<h2 className="mt-3">4. Category:</h2>
 <p>The cooperation is categorized under:</p>
<p><span>{mou.category}</span></p>

<h2 className="mt-3">5. Duration of Agreement:</h2>
 <p>The MoU is effective from <span> {mou.startDate}</span> to <span>{mou.endDate}</span> .</p>

<h2 className="mt-3">6. Terms and Conditions:</h2>
 <h2 className="mt-2">1.Responsibilities of <span>Bannari Amman Institute of technology</span></h2>
 <p>{mou.organizationResponsibilities}</p>

 <h2 className="mt-2" >2.Responsibilities of <span>{mou.organizationName}</span></h2>
 <p>{mou.otherPartyResponsibilities}.
 </p>

 <h2 className="mt-2">3.Any Specific Terms:</h2>
 <p>{mou.terms}</p>

 <h2 className="mt-3">7. Confidentiality:</h2>
 <p>Both parties agree to maintain confidentiality regarding any sensitive information that may be exchanged during the course of this MoU.</p>

 <h2 className="mt-3">8. Signatures:</h2>
 <p>By signing below, both parties affirm their understanding and agreement to the terms outlined in this MoU.</p>

 <hr className="my-8"/>

 <div>
  <h2 className="mt-2">Bannari Amman Institute of technology</h2>
  <h3 className="mt-3 flex gap-2 ">Signature: <img src={mou.signedPersonSignature} alt="" className="w-20"/></h3>
  <h3>Name: {mou.signedPersonName}</h3>
  <h3>Position: {mou.signedPersonPosition}</h3>
  <h3>Date:{new Date(mou.signedPersonSignatureDate).toISOString().split("T")[0]}</h3>
 </div>
 <div className="mt-3">
  <h2>{mou.organizationName}</h2>
  <h3 className="mt-3 flex gap-2">Signature: <img src={mou.otherPartySignature} alt="" className="w-20" /></h3>
  <h3>Name: {mou.otherPartyName}</h3>
  <h3>Position: {mou.otherPartyPosition}</h3>
  <h3>Date: {new Date(mou.otherPartySignatureDate).toISOString().split("T")[0]}</h3>
 </div>
  </div>
 </section>
  )
}

export default ViewMouPage
