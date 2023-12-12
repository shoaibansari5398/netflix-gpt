import React, { useState,useRef } from 'react'
import Header from "./Header"
import { checkValidData } from '../utils/validate'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';




const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const toggleSignInForm = () => {
		setIsSignInForm(!isSignInForm);
	};

	const name = useRef(null)
	const email = useRef(null)
	const password = useRef(null)

	const handleButtonClick = () => {

		const message = checkValidData(email.current.value, password.current.value);
		setErrorMessage(message)

		if (message) return;

		if (!isSignInForm) {

			createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				updateProfile(user, {
					displayName: name.current.value,
					photoURL: "https://avatars.githubusercontent.com/u/52561687?v=4",
          		})
				.then(() => {
					const { uid, email, displayName,photoURL } = auth.currentUser;
					dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
					navigate("/browse");
				})
				.catch((error) => {
				setErrorMessage(error.message);
				});
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
				setErrorMessage(errorCode + " - " + errorMessage)
			});
		}
		else {
			signInWithEmailAndPassword(auth, email.current.value, password.current.value)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				navigate("/browse")
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setErrorMessage(errorCode + " - " + errorMessage)
			});

		}
	 }

	return (
		<div className=''>
			<Header />
			<div className='absolute'>
				<img src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo"/>
			</div>
			<form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
				<h1 className="font-bold text-3xl py-4">
				{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>

				{!isSignInForm && (
				<input
					type="text"
					placeholder="Full Name"
					className="p-4 my-4 w-full bg-gray-700"
					ref={name}
				/>
				)}
				<input
				ref={email}
				type="text"
				placeholder="Email Address"
				className="p-4 my-4 w-full bg-gray-700"
				/>
				<input
				ref={password}
				type="password"
				placeholder="Password"
				className="p-4 my-4 w-full bg-gray-700"
				/>
				<p className='text-red-600'>{errorMessage}</p>
				<button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
				{isSignInForm ? "Sign In" : "Sign Up"}
				</button>
				<p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
				{isSignInForm
					? "New to Netflix? Sign Up Now"
					: "Already registered? Sign In Now."}
				</p>
      		</form>
	  </div>
  )
}

export default Login