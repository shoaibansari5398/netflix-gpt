import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptmovieSuggestions from './GptmovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
		<div>
			<div className="fixed -z-10">
				<img className="h-screen object-cover" alt="bg-img" src={BG_URL} />
			</div>
			<GptSearchBar />
			<GptmovieSuggestions />
		</div>
	);
}

export default GptSearch
