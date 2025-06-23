import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { userContext } from '../../../Context/UserContext'

export default function Register() {

  let{setUserLogin} = useContext(userContext)
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let navigate = useNavigate() 
  
  let validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required').min(6 , 'Password should be more or equal 6'),
    repassword: Yup.string().oneOf([Yup.ref('password')] , `Passwords don't match` ).required(`Repassword is required`)
  })
  
  async function handleRegister(values) {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/signup`, values);
        console.log("API Response:", response.data);
        
        localStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI1Y2QwMTUzYmZkMGE2Mjg3NzdlYjMiLCJpYXQiOjE3NDczMDg2MzksImV4cCI6MTc0NzMxMjIzOX0.1nk8w5BMTe2RD53Dwy_JZ7EpbP3P8RD9c0Lzdh4YB20');
        setSuccessMessage(response.data.message);
        console.log('successMessage' + successMessage)
        navigate(`/home`);

        setUserLogin('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI1Y2QwMTUzYmZkMGE2Mjg3NzdlYjMiLCJpYXQiOjE3NDczMDg2MzksImV4cCI6MTc0NzMxMjIzOX0.1nk8w5BMTe2RD53Dwy_JZ7EpbP3P8RD9c0Lzdh4YB20')
    
    } catch (error) {
        console.log("Axios ERROR:", error);
        setErrorMessage(error.response?.data?.message || "Something went wrong");
    }}

  let formik = useFormik({
    initialValues:{
        name:'',
        email:'',
        password:'',
        repassword:''
    },
    onSubmit: handleRegister,
    validationSchema
  }) 
  
    return (
    <>


        <form className="max-w-sm mx-auto h-screen md:pt-10" onSubmit={formik.handleSubmit}>
            <p className='text-center text-[--accent-color] text-2xl font-semibold pb-2'>    Join Booksy — it's free and full of stories!</p>
            {errorMessage? 
                <div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span class="font-medium">{errorMessage}</span>
                </div>:null
            }
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@gmail.com" required />
                {formik.errors.name && formik.touched.name? 
                    <div class="p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.name}</span>
                    </div>:null
                }
            </div>
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
            <div className="mb-5">
                <label htmlFor="repassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.repassword} name='repassword' id="repassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                {formik.errors.repassword && formik.touched.repassword? 
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.repassword}</span>
                    </div>:null
                }
            </div>
            <button type="submit" className="text-white bg-[--accent-color] hover:bg-[--second-color] focus:ring-4 focus:outline-none focus:[--accent-color] font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center">Register</button>
            <NavLink to={'/login'}>
                <p className=' text-[--accent-color] border-b-2 border-[--accent-color] w-auto absolute pt-4 text-lg hover:text-[--second-color] hover:border-[--second-color]'>Login</p>
            </NavLink>
        </form>
        
    </>
  )
}
