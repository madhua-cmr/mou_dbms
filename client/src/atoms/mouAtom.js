import {atom} from "recoil";

const getStoredMou=()=>{
    if(typeof window !=="undefined"){
  return JSON.parse(localStorage.getItem("selectedMou"))||null;
    }
}
export const mouAtom=atom({
    key:'mouAtom',
    default:getStoredMou(),
    effects_UNSTABLE:[
        ({onSet})=>{
            if(typeof window !=="undefined"){
                onSet((newValue)=>{
                    localStorage.setItem("selectedMou",JSON.stringify(newValue));
                })
            }
        }
    ]

})