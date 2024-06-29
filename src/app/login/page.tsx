'use client';

import { setCookie } from '@/utils/functions/commonFunction';
import service from '@/utils/service/service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// import service from '@/utils/service/service';
// import './SignUpForm.css'; // Import CSS file for styling

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const route = useRouter()
  const onSubmit = async (data: FormData) => {
    // const loginDetails = {
    //   email: 'chintanprajapati.ace@gmail.com',
    //   password: 'Abc@223133',
    // };

    // const res = await service.makeAPICall({
    //   methodName: service.Methods.POST,
    //   apiUrl: service.API_URL.auth.login,
    //   body: data,
    // });

    route.push('/')
    setCookie('token','testsuccess')
    // toast.success('Login successfully');
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { required: true })}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full  bg-neutral-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >

                Login
              </button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot Password ?
                </Link>
              </p> */}
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Doesn&apos;t have an account yet ?{' '}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign Up here
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
