import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { userContext } from '../../../Context/UserContext'

export default function Login() {
  
  let{setUserLogin} = useContext(userContext)

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  let navigate = useNavigate() 

  let validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required').min(6 , 'Password should be more or equal 6'),
  })
  
   async function handleRegister(values) {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, values);
        console.log("API Response:", response.data);
        
        console.log('userToken'+ response.data.token)
        localStorage.setItem('userToken', response.data.token);
        setSuccessMessage(response.data.message);
        console.log('successMessage' + successMessage)
        navigate(`/home`);

        setUserLogin(response.data.token)

    } catch (error) {
        console.log("Axios Error:", error);
        setErrorMessage(error.response?.data?.message || "Something went wrong");
    }}


  let formik = useFormik({
    initialValues:{
        email:'',
        password:'',
    },
    onSubmit: handleRegister,
    validationSchema
  }) 
  
    return (
    <>
        <form className="max-w-sm mx-auto h-[75vh] md:pt-20" onSubmit={formik.handleSubmit}>
            <p className='text-center text-[--accent-color] text-2xl font-semibold pb-8'>Ready to read? Log in now!</p>
            {errorMessage? 
                <div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span class="font-medium">{errorMessage}</span>
                </div>:null
            }
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@gmail.com" required />
                {formik.errors.email && formik.touched.email? 
                    <div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.email}</span>
                    </div>:null
                }
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                {formik.errors.password && formik.touched.password? 
                    <div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.password}</span>
                    </div>:null
                }
            </div>
            <button type="submit" className="text-white bg-[--accent-color] hover:bg-[--second-color] focus:ring-4 focus:outline-none focus:[--accent-color] font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center">Login</button>
            <NavLink to={'/register'}>
                <p className='text-[--accent-color] border-b-2 border-[--accent-color] w-auto absolute pt-4 text-lg hover:text-[--second-color] hover:border-[--second-color]'>Register</p>
            </NavLink>
        </form>
        
    </>
  )
}
