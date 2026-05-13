import React, { useState } from 'react';
import { registerApi } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import PendingUserInfo from '../../components/Cards/PendingUserInfo';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    role: 0,
    password: '',
    confirmPassword: ''
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    role: Yup.number().oneOf([0, 1], 'Invalid role').required('Role is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("Submitting:", values);
      setIsLoading(true);
      await registerApi(values);
      if (values.role === 1) {
        setShowPendingModal(true);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
    finally {
      setSubmitting(false);
      setIsLoading(false);
    }
  };




  return (
    <div className="min-h-screen bg-art-navy-20/20 dark:bg-art-navy-100 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-art-navy-80 max-w-4xl w-full rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row border border-art-gold-20">

        {/* Left Side: Artistic Visual */}
        <div className="md:w-1/3 bg-art-navy-100 p-10 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl italic mb-4 text-art-gold-100">Join the Gallery</h2>
            <p className="text-art-navy-40 text-sm leading-relaxed">
              Experience the world's most exclusive art collection.
            </p>
          </div>
          {/* Abstract background shape */}
          <div className="absolute top-[-10%] right-[-20%] w-64 h-64 bg-art-gold-100/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-8 lg:p-12">
          <Formik
            initialValues={ initialValues }
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isSubmitting, isValid, isLoading }) => (
              <Form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest font-bold text-art-navy-100 dark:text-art-gold-40">Full Name</label>
                    <Field
                      type="text" name="name" required
                      className="w-full border-b border-art-gold-20 py-2 focus:border-art-gold-100 outline-none transition-colors bg-transparent dark:text-white"
                      placeholder="Full Name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest font-bold text-art-navy-100 dark:text-art-gold-40">Email Address</label>
                    <Field
                      type="email" name="email" required
                      className="w-full border-b border-art-gold-20 py-2 focus:border-art-gold-100 outline-none transition-colors bg-transparent dark:text-white"
                      placeholder="user@example.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                {/* Role Selection (The "0" and "1" logic) */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-bold text-art-navy-100 dark:text-art-gold-40">I am joining as:</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFieldValue('role', 0)}
                      className={`flex-1 py-3 border transition-all ${values.role === 0 ? 'border-art-gold-100 bg-art-gold-20/10 text-art-gold-100' : 'border-art-gold-20 text-art-navy-40'}`}
                    >
                      <span className="block font-bold">Collector</span>
                      <span className="text-[10px] uppercase">To bid and buy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFieldValue('role', 1)}
                      className={`flex-1 py-3 border transition-all ${values.role === 1 ? 'border-art-gold-100 bg-art-gold-20/10 text-art-gold-100' : 'border-art-gold-20 text-art-navy-40'}`}
                    >
                      <span className="block font-bold">Artist</span>
                      <span className="text-[10px] uppercase">To showcase & sell</span>
                    </button>
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest font-bold text-art-navy-100 dark:text-art-gold-40">Password</label>
                    <Field
                      type="password" name="password" required
                      className="w-full border-b border-art-gold-20 py-2 focus:border-art-gold-100 outline-none transition-colors bg-transparent dark:text-white"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-widest font-bold text-art-navy-100 dark:text-art-gold-40">Confirm Password</label>
                    <Field
                      type="password" name="confirmPassword" required
                      className="w-full border-b border-art-gold-20 py-2 focus:border-art-gold-100 outline-none transition-colors bg-transparent dark:text-white"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 py-4 font-bold uppercase tracking-widest hover:bg-art-gold-100 dark:hover:bg-white transition-all duration-300 mt-4 shadow-lg"
                  disabled={isLoading || isSubmitting || !isValid}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Pending Modal for Artists */}
      {showPendingModal && <PendingUserInfo setShowPendingModal={setShowPendingModal} /> }
    </div>
  );
};

export default Register;