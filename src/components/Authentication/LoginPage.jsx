import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

import './LoginPage.css';

const schema = z.object({
    email: z.string().email({message:"PLEASE ENTER VALID EMAIL"} ).min(3),
    password: z.string().min(8, {message:"PASSWORD SHOULD BE AT LEAST 8 CHARACTERS"})
})

const LoginPage = () => {
    const {register, handleSubmit,formState :{errors}} =useForm({resolver : zodResolver(schema)})
    
    const onSubmit = (formData) => console.log(formData)
  return (
    <section className="align_center form_page">
        <form action="" className="authentication_form" onSubmit={handleSubmit (onSubmit)}>
            <h2>Login Form</h2>
            <div className="form_inputs">
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' 
                    id='email' className='form-text_input' 
                    placeholder='Enter your email'
                    {...register("email")}
                    />
                    {errors.email && (
                        <em className="form_error">{errors.email.message}</em>
                        )}
                </div>


                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' 
                    id='password' className='form-text_input' 
                    placeholder='Enter your password'
                    {...register("password")}
                    />
                    {errors.password && (
                        <em className="form_error">{errors.password.message}</em>
                        )}
                </div>

                <button type='submit' className='search_button form_submit'>Submit</button>
            </div>
        </form>
    </section>
 )
}

export default LoginPage 