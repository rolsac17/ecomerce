import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { AnyRecord } from "dns";

const SingIn: NextPage = () => {

  const [ values, setValues ] = useState({ email:'', password:'' });

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setValues({...values, [name]: value})
  }

  useEffect(() => {
    const fechData = async (email:any, password:any) => {
      try {
        const { data } = await Axios.post(
          "http://localhost:1323/api/login",
          {
            email,
            password
          }
        );
      } catch (error) {
        console.log(error);
        
      }
    };
    fechData(values.email, values.password);
  }, [] );

return(
 <>
 <div className="min-h-screen flex">
  <div className="
  flex-1 flex flex-col 
  justify-center py-12 
  px-4 sm:px-6 lg:flex-none 
  lg:px-20 xl:px-24">
    <div className="
    mx-auto w-full 
    max-w-sm lg:w-96">
      <div>
        <img 
        className="h-12 w-auto" 
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" 
        alt="Workflow"/>
        <h2 className="
        mt-6 text-3xl 
        font-extrabold 
        text-gray-900">
          Iniciar sesión en tu cuenta
        </h2>
      </div>

      <div className="mt-8">

        <div className="mt-6">

          <form 
          action="#" 
          method="POST" 
          className="space-y-6">
            <div>
              <label 
              htmlFor="email" 
              className="
              block text-sm 
              font-medium 
              text-gray-700"> 
              Email 
              </label>
              <div className="mt-1">
                <input 
                id="email" 
                name="email" 
                type="email"
                onChange={handleChange}
                autoComplete="email" 
                required 
                className="
                appearance-none 
                block w-full 
                px-3 py-2 border 
                border-gray-300 
                rounded-md shadow-sm 
                placeholder-gray-400 
                focus:outline-none 
                focus:ring-indigo-500 
                focus:border-indigo-500 sm:text-sm"/>
              </div>
            </div>

            <div className="space-y-1">
              <label 
              htmlFor="password" 
              className="
              block text-sm 
              font-medium 
              text-gray-700"> 
              Clave 
              </label>
              <div className="mt-1">
                <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="
                appearance-none 
                block w-full 
                px-3 py-2 border 
                border-gray-300 
                rounded-md shadow-sm 
                placeholder-gray-400 
                focus:outline-none 
                focus:ring-indigo-500 
                focus:border-indigo-500 
                sm:text-sm"/>
              </div>
            </div>

            <div className="
            flex items-center 
            justify-between">
              {/* <div className="flex items-center">
                <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                className="
                h-4 w-4 
                text-indigo-600 
                focus:ring-indigo-500 
                border-gray-300 rounded"/>
                <label 
                htmlFor="remember-me" 
                className="
                ml-2 block 
                text-sm 
                text-gray-900"> 
                Remember me 
                </label>
              </div> */}

              {/* <div className="text-sm">
                <a 
                href="#" 
                className="
                font-medium 
                text-indigo-600 
                hover:text-indigo-500"> 
                Forgot your password? 
                </a>
              </div> */}
            </div>

            <div>
              <button 
              type="submit" 
              className="
              w-full flex 
              justify-center 
              py-2 px-4 border 
              border-transparent 
              rounded-md shadow-sm 
              text-sm font-medium 
              text-white bg-indigo-600 
              hover:bg-indigo-700 
              focus:outline-none 
              focus:ring-2 
              focus:ring-offset-2 
              focus:ring-indigo-500">
                Registrarse
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div className="hidden lg:block relative w-0 flex-1">
    <img className="absolute  inset-0 h-full w-full object-cover" src="https://images.pexels.com/photos/6969619/pexels-photo-6969619.jpeg?cs=srgb&dl=pexels-mikhail-nilov-6969619.jpg&fm=jpg" alt=""/>
  </div>
</div>

</>
)
};

export default SingIn;