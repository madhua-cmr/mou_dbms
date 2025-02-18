import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useRecoilValue } from "recoil";
import { mouAtom } from "../atoms/mouAtom";
import { toast } from "react-toastify";
import useEditMou from "../hooks/useEditMou";

const EditMouPage = () => {
  const signedPersonSignatureRef = useRef();
  const otherPartySignatureRef = useRef();
  const { editMou } = useEditMou();
  const mou = useRecoilValue(mouAtom);
  const [registerValues, setRegisterValues] = useState(mou);
  useEffect(() => {
    if (mou.signedPersonSignature) {
      signedPersonSignatureRef.current?.fromDataURL(mou.signedPersonSignature);
    }
    if (mou.otherPartySignature) {
      otherPartySignatureRef.current?.fromDataURL(mou.otherPartySignature);
    }
    
  }, [mou]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "date") {
      setRegisterValues((prev) => ({
        ...prev,
        [name]: new Date(value).toISOString().split("T")[0],
      }));
    } else if (
      name === "signedPersonSignature" ||
      name === "otherPartySignature"
    ) {
      const signatureRef =
        name === "signedPersonSignature"
          ? signedPersonSignatureRef
          : otherPartySignatureRef;
      if (signatureRef.current) {
        const signature = signatureRef.current.toDataURL();
        setRegisterValues((prev) => ({
          ...prev,
          [name]: signature,
        }));
      }
    } else {
      setRegisterValues((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const validateForm = () => {
    for (const key in registerValues) {
      if (
        registerValues[key] === "" ||
        registerValues[key] === null ||
        registerValues[key] === false
      ) {
        toast.error(`Please fill in the ${key}`);
        return false;
      }
    }

    const phregex = /^\d{10}$/;
    if (!phregex.test(registerValues.signedPersonContact)) {
      toast.error("Signed Person Phno must be exactly 10 digits");
      return false;
    }
    if (!phregex.test(registerValues.otherPartyContact)) {
      toast.error("Other Party Phno must be exactly 10 digits");
      return false;
    }
 

    return true;
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    editMou(registerValues);
  };

  return (
    <section className="flex flex-col items-center justify-center bg-slate-100">
      <div className="  m-10 p-8 ring-1 w-1/2 max-lg:w-3/4 ring-slate-200 shadow-md rounded bg-white ">
        <h1>Edit Mou</h1>
        <div>
          <form action="submit" className="flex  flex-col gap-6">
            <div className="flex-1 flex flex-col gap-2 ">
              <h3>Organization Name</h3>
              <input
                onChange={handleChange}
                value={registerValues.organizationName}
                type="text"
                name="organizationName"
                id="orgname"
                className=" p-2 border border-slate-400 rounded hover:outline-none  outline-none "
              />
            </div>
            <div className=" flex-1 flex flex-col gap-2">
              <h3>Location</h3>
              <input
                onChange={handleChange}
                value={registerValues.location}
                type="text"
                name="location"
                id="place"
                placeholder="Chennai"
                className="p-2 border border-slate-400 rounded hover:outline-none  outline-none "
              />
            </div>

            <div className="flex gap-2 max-sm:flex-col flex-row">
              <div className="flex flex-1 flex-col gap-2">
                <h3>Area of Cooperation</h3>
                <select
                  name="areaOfCooperation"
                  onChange={handleChange}
                  value={registerValues.areaOfCooperation}
                  id="areaofcooperation"
                  className="p-2 border border-slate-400 rounded hover:outline-none  outline-none "
                >
                  <option value="">Select AOC</option>
                  <option value="job">Job</option>
                  <option value="internship">Internship</option>
                  <option value="workshop">workshop</option>
                  <option value="iv">Industrial Visit</option>
                </select>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <h3>Department</h3>
                <select
                  name="department"
                  onChange={handleChange}
                  value={registerValues.department}
                  className="p-2 border border-slate-400 rounded hover:outline-none  outline-none "
                  id="department"
                >
                  <option value="">Select Dept</option>
                  <option value="it">IT</option>
                  <option value="cse">CSE</option>
                  <option value="ece">ECE</option>
                  <option value="eee">EEE</option>
                  <option value="mech">Mech</option>
                  <option value="civil">Civil</option>
                  <option value="biotech">Biotech</option>
                </select>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <h3>Category</h3>
                <select
                  name="category"
                  id="category"
                  onChange={handleChange}
                  value={registerValues.category}
                  className="p-2 border border-slate-400 rounded"
                >
                  <option value="">Select Category</option>
                  <option value="">Select Category</option><option value="it">IT</option>
              <option value="industry">Industry</option>
              <option value="NGO">NGO</option>
              <option value="college">College</option>
              <option value="mnc">MNC</option>
                </select>
              </div>
            </div>

          
            <div className="flex flex-col gap-2">
              <h3>Purpose</h3>
              <textarea
                onChange={handleChange}
                value={registerValues.purpose}
                name="purpose"
                rows={10}
                id="purpose"
                className="p-2 border border-slate-400 rounded hover:outline-none  outline-none resize-none "
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <h3>Responsibilities (Organization)</h3>
              <textarea
                onChange={handleChange}
                value={registerValues.organizationResponsibilities}
                name="organizationResponsibilities"
                rows={4}
                id=" organizationResponsibilities"
                className="p-2 border border-slate-400 rounded hover:outline-none  outline-none resize-none "
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <h3>Responsibilities (Other Party)</h3>
              <textarea
                onChange={handleChange}
                value={registerValues.otherPartyResponsibilities}
                name="otherPartyResponsibilities"
                rows={4}
                id="otherPartyResponsibilities"
                className="p-2 border border-slate-400 rounded hover:outline-none  outline-none resize-none "
              ></textarea>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3>Terms</h3>
              <textarea
                onChange={handleChange}
                value={registerValues.terms}
                name="terms"
                id="terms"
                rows="4"
                className="p-2 border resize-none border-slate-400 rounded hover:outline-none outline-none"
              ></textarea>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3>Signed Person's Name</h3>
              <input
                onChange={handleChange}
                value={registerValues.signedPersonName}
                type="text"
                name="signedPersonName"
                className="p-2 border border-slate-400 rounded hover:outline-none outline-none"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3>Signed Person's Position</h3>
              <input
                onChange={handleChange}
                value={registerValues.signedPersonPosition}
                type="text"
                name="signedPersonPosition"
                className="p-2 border border-slate-400 rounded hover:outline-none outline-none"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3>Contact Number </h3>
              <input
                onChange={handleChange}
                value={registerValues.signedPersonContact}
                type="text"
                name="signedPersonContact"
                maxLength={10}
                className="p-2 border border-slate-400 rounded hover:outline-none outline-none"
                placeholder="0000000000"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3>Signed Person's Signature</h3>
              <SignatureCanvas
                onEnd={() =>
                  handleChange({
                    target: {
                      name: "signedPersonSignature",
                    },
                  })
                }
                ref={signedPersonSignatureRef}
                penColor="black"
                canvasProps={{
                  width: 400,
                  height: 200,
                  className: "signature-canvas",
                }}
              />
              <button
                type="button"
                className="p-1 text-white bg-blue-950 rounded hover:bg-blue-900 w-[80px]"
                onClick={() => signedPersonSignatureRef.current.clear()}
              >
                Clear
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h3>Signed Person's Signature Date</h3>
              <input
                onChange={handleChange}
                value={registerValues.signedPersonSignatureDate}
                type="date"
                name="signedPersonSignatureDate"
                className="p-2 border border-slate-400 rounded hover:outline-none outline-none"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3>Other Party's Name (optional)</h3>
              <input
                onChange={handleChange}
                value={registerValues.otherPartyName}
                type="text"
                name="otherPartyName"
                className="p-2 border border-slate-400 rounded hover:outline-none outline-none"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3>Other Party's Position (optional)</h3>
              <input
                onChange={handleChange}
                value={registerValues.otherPartyPosition}
                type="text"
                name="otherPartyPosition"
                className="p-2 border border-slate-400 rounded hover:outline-none outline-none"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3>OtherParty's Contact Number </h3>
              <input
                onChange={handleChange}
                value={registerValues.otherPartyContact}
                type="text"
                name="otherPartyContact"
                maxLength={10}
                className="p-2 border border-slate-400 rounded hover:outline-none outline-none"
                placeholder="0000000000"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3>Other Party's Signature</h3>
              <SignatureCanvas
                onEnd={() =>
                  handleChange({
                    target: {
                      name: "otherPartySignature",
                    },
                  })
                }
                ref={otherPartySignatureRef}
                penColor="black"
                canvasProps={{
                  width: 400,
                  height: 200,
                  className: "signature-canvas",
                }}
              />
              <button
                type="button"
                className="p-1 text-white bg-blue-950 rounded hover:bg-blue-900 w-[80px]"
                onClick={() => otherPartySignatureRef.current.clear()}
              >
                Clear
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3>Other Party's Signature Date (optional)</h3>
              <input
                onChange={handleChange}
                value={registerValues.otherPartySignatureDate}
                type="date"
                name="otherPartySignatureDate"
                className="p-2 border border-slate-400 rounded hover:outline-none outline-none"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label className="flex gap-3">
                <input
                  onChange={handleChange}
                  checked={registerValues.confidentialityAgreement}
                  type="checkbox"
                  name="confidentialityAgreement"
                />
                I agree to maintain confidentiality and not disclose sensitive
                information shared during the course of this MoU.
              </label>
            </div>

            <div className="flex gap-4 ">
              <button
                type="submit"
                onClick={handleEdit}
                className="p-2 border border-blue-400 bg-blue-600 text-white rounded hover:bg-blue-800 w-[150px]"
              >
                Edit
              </button>
              <button
                type="button"
                className="p-2   text-white bg-slate-900 rounded hover:bg-black w-[150px]"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditMouPage;
