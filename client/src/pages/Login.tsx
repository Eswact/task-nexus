import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AjaxScripts from "../scripts/ajaxScript";
import { ShowError, ShowSuccess } from "../scripts/common";
import '../styles/pages/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Login: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        //verify email
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('verify');
        if (token) {
            window.history.replaceState(null, '', window.location.pathname);
            AjaxScripts.VerifyEmail({ 
                data: { token: token }, 
                onSuccess: (res: any) => {
                    ShowSuccess('Your e-mail has been confirmed successfully.');
                },
                onError: (err: any) => {
                    ShowError(err.response?.data.message || err.message);
                }
            });
        }
    }, []);

    const navigate = useNavigate();
    const login = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
          const mail = (document.getElementById("email") as HTMLInputElement).value;
          const password = (document.getElementById("password") as HTMLInputElement).value;
          const rememberMe = (document.getElementById("remember_me") as HTMLInputElement).checked;
          AjaxScripts.Login({ 
            data: { mail, password }, 
            onSuccess: (res: any) => {
                let token:string = JSON.stringify(res.token);
                if (rememberMe) {
                    localStorage.setItem('token', token);
                } else {
                    sessionStorage.setItem('token', token);
                }
                navigate('/');
                ShowSuccess('Welcome back!');
            },
            onError: (err: any) => {
                ShowError(err.response?.data.message || err.message);
                document.querySelectorAll('input').forEach((input) => { (input as HTMLInputElement).value = ''; });
            }
          });
        } catch (error: any) {
            ShowError(error.message || null);
        }
    };
    const register = async (event: React.FormEvent) => { 
        event.preventDefault();
        try {
            const mail = (document.getElementById("emailR") as HTMLInputElement).value;
            const username = (document.getElementById("usernameR") as HTMLInputElement).value;
            const password = (document.getElementById("passwordR") as HTMLInputElement).value;
            const password2 = (document.getElementById("passwordR2") as HTMLInputElement).value;
            const role = 0;
            if (password !== password2) {
                ShowError('Passwords do not match');
                document.querySelectorAll('input[type="password"]').forEach((input) => { (input as HTMLInputElement).value = ''; });
                return;
            }
            AjaxScripts.Register({ 
                data: { username, password, role, mail }, 
                onSuccess: (res: any) => {
                    ShowSuccess('You can log in using the confirmation email sent to your email.');
                    document.querySelectorAll('input').forEach((input) => { (input as HTMLInputElement).value = ''; });
                    switchTab();
                },
                onError: (err: any) => {
                    ShowError(err.response?.data.message || err.message);
                }
            });
        } catch (error: any) {
            ShowError(error.message || null);
        }
    };
    const switchTab = () => {
        const loginTabs = document.getElementsByClassName('loginTabs');
        for (let i = 0; i < loginTabs.length; i++) {
            let element = loginTabs[i];
            element.classList.toggle('open');
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Forms */}
            <div className="flex-none md:flex-1 flex flex-col justify-center py-12 px-28 lg:px-18 md:px-12 sm:px-8">
                {/* Login */}
                <div className="loginTabs open mx-auto w-full max-w-sm">
                    <div>
                        <h2 className="mt-6 text-3xl leading-9 font-extrabold text-main">
                            Login to your account
                        </h2>
                    </div>
                    <div className="mt-8">
                        <div className="mt-6">
                            <form onSubmit={login} method="POST">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="current-email"
                                        placeholder="example@mail.com"
                                        required
                                        className="appearance-none text-dark block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm relative flex items-center">
                                        <input
                                            id="password"
                                            name="password"
                                            type={passwordVisible ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            placeholder="············"
                                            required
                                            className="appearance-none text-dark block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        <span className="absolute right-[12px] cursor-pointer text-main" onClick={togglePasswordVisibility}>
                                            <FontAwesomeIcon icon={passwordVisible ? ["fas", "eye-slash"] : ["fas", "eye"]}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-main transition duration-150 ease-in-out"
                                        />
                                        <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                                        Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm leading-5">
                                        <a href="#" className="font-medium text-main hover:text-third focus:outline-none focus:underline transition ease-in-out duration-150">
                                        Forgot your password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-third focus:bg-third focus:outline-none focus:border-third focus:shadow-outline-indigo active:bg-third transition duration-150 ease-in-out"
                                        >
                                        Login
                                        </button>
                                        
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md shadow-sm">
                                    <button
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-main text-sm text-main font-medium rounded-md hover:text-third hover:border-third focus:outline-none  focus:border-third focus:text-third focus:shadow-outline-indigo active:text-third transition duration-150 ease-in-out"
                                    onClick={switchTab}
                                    >
                                    Switch to register
                                    </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Register */}
                <div className="loginTabs mx-auto w-full max-w-sm">
                    <div>
                        <h2 className="mt-6 text-3xl leading-9 font-extrabold text-main">
                        Register to TaskNexus
                        </h2>
                    </div>
                    <div className="mt-8">
                        <div className="mt-6">
                            <form onSubmit={register} method="POST">
                                <div>
                                    <label htmlFor="emailR" className="block text-sm font-medium leading-5 text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                        id="emailR"
                                        name="emailR"
                                        type="email"
                                        autoComplete="off"
                                        placeholder="example@mail.com"
                                        required
                                        className="appearance-none text-dark block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="usernameR" className="block text-sm font-medium leading-5 text-gray-700">
                                        Username
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                        id="usernameR"
                                        name="usernameR"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="username"
                                        required
                                        className="appearance-none text-dark block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="passwordR" className="block text-sm font-medium leading-5 text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            id="passwordR"
                                            name="passwordR"
                                            type="password"
                                            autoComplete="new-password"
                                            placeholder="············"
                                            required
                                            className="appearance-none text-dark block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="passwordR2" className="block text-sm font-medium leading-5 text-gray-700">
                                        Password Verify
                                    </label>
                                    <div className="mt-1 rounded-md shadow-sm">
                                        <input
                                            id="passwordR2"
                                            name="passwordR2"
                                            type="password"
                                            autoComplete="new-password"
                                            placeholder="············"
                                            required
                                            className="appearance-none text-dark block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-third focus:outline-none focus:border-third focus:bg-third focus:shadow-outline-indigo active:bg-main transition duration-150 ease-in-out"
                                        >
                                        Register
                                        </button>
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <span className="block w-full rounded-md shadow-sm">
                                    <button
                                    type="button"
                                    onClick={switchTab}
                                    className="w-full flex justify-center py-2 px-4 border border-main text-sm text-main font-medium rounded-md hover:text-third hover:border-third focus:border-third focus:text-third focus:outline-none focus:shadow-outline-indigo active:text-main transition duration-150 ease-in-out"
                                    >
                                    Switch to login
                                    </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Image */}
            <div className="md:hidden block relative w-0 flex-1">
                <img
                className="absolute inset-0 h-full w-full object-cover"
                src="/images/login.jpg"
                alt="Login"
                />
            </div>
        </div>
    );
};

export default Login;