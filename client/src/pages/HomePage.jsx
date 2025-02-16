import home from '../assets/home.jpg'
import about from "../assets/about.jpg"
import add from "../assets/add.png"
import edit from "../assets/edit.png"
import renewal from "../assets/renewal.png"
import download from "../assets/file.png"
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const navigate=useNavigate();
  return (
    <>
    <section className='bg-white lg:mx-16  rounded p-4 lg:p-8'>
  <section className='flex  gap-4  items-center  '>
   
  <div className='flex-[50%]  gap-4 p-8 flex flex-col'>  <h1 className='text-2xl'>Simplify Your MoU Management</h1>
    <p>Create, Sign, and Track MoUs Effortlessly. Say goodbye to paperwork!</p>
    <button className='bg-slate-900 w-[200px] text-white rounded-full p-2 ' onClick={()=>navigate("/list")}>See Mous</button></div>
    <div className='flex-[50%]  h-[620px] flex items-center '>
      <img src={home} alt="" className='rounded object-cover w-full h-full' />
     </div>
  
  </section>
  <section id='aboutus' className='bg-white my-16 lg:mx-16 rounded p-4 lg:p-8 '>

  
  <div className='  gap-6 p-8 flex  my-4 '> 

  <div className='flex items-center flex-1 '><img src={about} alt="" className='rounded-tr-full rounded-bl-full w-full h-full object-cover'/></div>
  <div className='flex-1'>
  <h1 className='mb-8'>About us</h1>
  <h1 className=' mb-4'>Empowering Seamless MoU Management</h1>
  <p className='text-justify'>At BIT MOU, we revolutionize the way Memorandums of Understanding (MoUs) are created, managed, and tracked. Our platform ensures efficiency, security, and transparency, enabling organizations to streamline their documentation processes effortlessly.</p></div></div>
</section>

<section id="services" name="services" className=' text-center flex gap-8 flex-col bg-white my-16 lg:mx-16 rounded  lg:p-8 '>
  <h1>Your One-Stop Solution for Smart MoU Management!</h1>

  <div className='flex  gap-4  '>
    <div className='rounded ring-1 bg-white ring-slate-300 p-4 flex items-center flex-col gap-2'>
      <img src={add} alt="" className='w-[70px]'/>
      <h2>Add New MoU</h2>
      <p>Easily create and register new MoUs with smart templates.</p>
     
    </div>
    <div className='rounded ring-1  bg-white ring-slate-300 p-4 flex items-center flex-col gap-2'>
      <img src={edit} alt=""  className='w-[70px]'/>
      <h2>Edit Existing MoU</h2>
      <p>Make changes to existing MoUs with seamless editing options.</p>
     
    </div>
    <div className='rounded ring-1  bg-white ring-slate-300 p-4 flex items-center flex-col gap-2'>
      <img src={renewal} alt="" className='w-[70px]' />
      <h2>Renew MoU</h2>
      <p>Get alerts and renew MoUs before they expire effortlessly</p>
     
    </div>
    <div className='rounded ring-1  bg-white ring-slate-300 p-4 flex items-center flex-col gap-2'>
      <img src={download} alt="" className='w-[70px]'/>
      <h2>Download MoU</h2>
      <p>Access and download MoU documents securely in PDF format</p>
     
    </div>
  
    
  </div>
</section>
</section>
</>
  )
}

export default HomePage
