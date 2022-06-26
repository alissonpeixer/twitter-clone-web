import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


const Input = props => (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum" />
)

const validationSchema = yup.object({
    name: yup.string().required('Digite seu nome'),
    surname: yup.string().required('Digite seu sobrenome'),
    username: yup.string().required('Digite um nome de usuário'),
    email: yup.string().required('Digite seu email').email('E-mail inválido'),
    password: yup.string().required('Digite sua senha')
}) 


function setUserInfo(res) {
    console.log(res)
    const userToken = {
        token: res.data.accessToken
    }
    const userInfo = {
        id: res.data.id,
        name: res.data.name,
        username: res.data.username,
        email: res.data.email
    };
    const jsonUser = JSON.stringify({
        userInfo: userInfo,
        userToken: userToken
    });

    localStorage.setItem('user',jsonUser);

}

export function Signup({signInUser}) {
    const [phone, setValue] = useState()
    
    const formik = useFormik({
        onSubmit: async values => {
            const res = await axios.post(`${import.meta.env.VITE_API_HOST}/signup`, {
                name: values.name,
                surname: values.surname,
                email: values.email,
                username: values.username,
                password: values.password,
                phone: phone
            })
            
            setUserInfo(res);
            signInUser(true);
        
        },
        initialValues: {
            email: '',
            password: '',
            phone: ''
        },
        validateOnMount: true,
        validationSchema,
    })

    return (
        <>
        <head>
            <title>AzWitte | Registre-se</title>
        </head>
        <div className='flex flex-row max-h-fit'>
            <div  className=' w-[99%] h-screen bg-birdBlue bg-galaxy '></div>
        <div className="flex flex-col justify-center p-12 space-y-6 w-full">
            <h1 className="text-3xl">Crie sua conta</h1>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>

                <div className="space-y-2">
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.name && formik.errors.name) && (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    )}
                </div>

                <div className="space-y-2">
                    <Input
                        type="text"
                        name="surname"
                        placeholder="Sobrenome"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.surname && formik.errors.surname) && (
                        <div className="text-red-500 text-sm">{formik.errors.surname}</div>
                    )}
                </div>

                <div className="space-y-2">
                    <Input
                        type="text"
                        name="username"
                        placeholder="Nome de usuário"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.username && formik.errors.username) && (
                        <div className="text-red-500 text-sm">{formik.errors.username}</div>
                    )}
                </div>

                <div className="space-y-2">
                    <Input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.email && formik.errors.email) && (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    )}
                </div>

                <div className="space-y-2">
                    <Input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={formik.isSubmitting}
                    />
                   {(formik.touched.password && formik.errors.password) && (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    )}
                </div>

                <div className="space-y-2">
                    
                    <PhoneInput
                        name="phone"
                        className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setValue}
                        disabled={formik.isSubmitting}
                    />
                    {(formik.touched.phone && formik.errors.phone) && (
                        <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
                    disabled={formik.isSubmitting || !formik.isValid || !phone}
                >
                    {formik.isSubmitting ? 'Enviando...' : 'Cadastrar' }
                </button>
            </form>

            <span className="text-sm text-silver text-center">
                Já tem uma conta? <a className="text-birdBlue" href="/">Acesse.</a>
            </span>
        </div>
        </div>
        
        
        </>
    )
}