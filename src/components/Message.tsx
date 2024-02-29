import React from "react";
import { useRouter } from 'next/router'
const Message = ({ui}:{ui:any}) => {
    
  const router = useRouter();

  return (
    <>
      <div className="max-w-2xl pt-28 pb-4 mx-auto px-4 sm:px-6 md:px-8">
      </div>
      <div className={ ui.success === true ? "max-w-2xl rounded-3xl h-auto animate__animated animate__faster animate__fadeInUp bg-green-100 py-2 mx-auto px-4 sm:px-6 md:px-8 " :"max-w-2xl animate__animated animate__faster rounded-3xl h-auto animate__fadeInUp bg-red-100 py-2 mx-auto px-4 sm:px-6 md:px-8 " }>
        <div className="w-full  p-4">
          <h5 className={ui.success === true ? "text-3xl font-extrabold text-green-500" : "text-3xl font-extrabold text-red-500"}>{ui.title}</h5>
          <p className={ui.success === true ?"text-2xl font-extrabold text-green-500":"text-2xl font-extrabold text-red-500"}>
            {ui.message}
          </p>
        </div>
        <div className="w-full text-right p-4">
          <button onClick={() => router.push('../')} className={ui.success === true ? "bg-green-300 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-bold text-green-500 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" : "bg-red-300 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"}>Atras</button>
          <br></br>
        </div>
      </div>
    </>
  );
};

export default Message;
