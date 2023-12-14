import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

	const showGptSearch = useSelector(store=>store.gpt.showGptSearch)

	const dispatch = useDispatch();

	const user = useSelector(store=>store.user)

	const navigate = useNavigate();

	const handleSignOut = () => {
		signOut(auth)
		.then(() => {
		})
		.catch((error) => {
			navigate("/error");
		});
	}

	const handleGptSearchClick = () => {
		dispatch(toggleGptSearchView())
	}

	const handleLanguageChange = (e) => {
		console.log(e.target.value);
		dispatch(changeLanguage(e.target.value))
	 }

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			const { uid, email, displayName,photoURL } = user;
			dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
			navigate("/browse")
			// ...
		} else {
			// User is signed out
			dispatch(removeUser())
			navigate("/");
			// ...
		}
		});
		return () => unsubscribe();
	},[])

	return (
		<div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
			<img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt='logo' />

			{user && <div className="flex p-2">
				{showGptSearch &&	<select className='p-2 m-2 bg-gray-900 rounded-lg text-white' onChange={handleLanguageChange}>
					{
						SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier }>{lang.name}</option>)
					}
				</select>}
				<button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{!showGptSearch ?"GPT Search" : "HomePage"}</button>
				<img className="w-12 h-12" alt="usericon" src={user?.photoURL} />
				<button onClick={handleSignOut} className="font-bold text-white ">
					(Sign Out)
				</button>
        	</div> }

		</div>

	)

}

export default Header
