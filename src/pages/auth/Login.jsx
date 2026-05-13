//login
import React, { useState } from 'react';
import { loginApi } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';

import { AuthContext } from '../../context/AuthContext.jsx';
const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true);
            console.log("Logging in with:", values);

            const res = await loginApi(values);

            console.log("Login successful", res);
            
            login(res.user, res.token);

            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials and try again.");
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-art-navy-20/20 dark:bg-art-navy-100 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-art-navy-80 max-w-md w-full rounded-sm shadow-2xl border border-art-gold-20 overflow-hidden">

                {/* Header Section */}
                <div className="bg-art-navy-100 p-8 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="font-serif text-3xl italic text-art-gold-100 mb-2">Welcome Back</h2>
                        <p className="text-art-navy-40 text-xs uppercase tracking-[0.2em]">The Gallery Awaits</p>
                    </div>
                    {/* Subtle Artistic Decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-[-20px] left-[-20px] w-32 h-32 border border-art-gold-100 rotate-45"></div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-8 lg:p-10">
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-8">

                                {/* Email Input */}
                                <div className="relative group">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-art-navy-60 dark:text-art-gold-40 mb-1 block">
                                        Email Address
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        required
                                        className={`w-full border-b py-2 focus:border-art-gold-100 outline-none transition-all bg-transparent dark:text-white placeholder:text-art-navy-20 text-sm ${touched.email && errors.email ? 'border-red-500' : 'border-art-gold-20'
                                            }`}
                                        placeholder="curator@example.com"
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-art-gold-100 w-0 group-focus-within:w-full transition-all duration-500"></div>
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                {/* Password Input */}
                                <div className="relative group">
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-art-navy-60 dark:text-art-gold-40 block">
                                            Password
                                        </label>
                                        <a href="#" className="text-[10px] uppercase text-art-gold-100 hover:underline">Forgot?</a>
                                    </div>
                                    <Field
                                        type="password"
                                        name="password"
                                        required
                                        className={`w-full border-b py-2 focus:border-art-gold-100 outline-none transition-all bg-transparent dark:text-white text-sm ${touched.password && errors.password ? 'border-red-500' : 'border-art-gold-20'
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-art-gold-100 w-0 group-focus-within:w-full transition-all duration-500"></div>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading || isSubmitting}
                                        className="w-full bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 py-4 font-bold uppercase tracking-widest hover:bg-art-gold-100 dark:hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Signing In...' : 'Sign In'}
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {/* Footer Link */}
                    <p className="mt-8 text-center text-xs text-art-navy-60 dark:text-art-navy-40 uppercase tracking-widest">
                        New to the auction? <a href="/register" className="text-art-gold-100 font-bold hover:underline">Register Here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;