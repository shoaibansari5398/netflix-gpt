import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptmovieSuggestions from './GptmovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
	  <div>
		  <div>
			  <img className='absolute -z-10' alt="bg-img" src={BG_URL} />
		  </div>
		  <GptSearchBar />
		  <GptmovieSuggestions/>
	</div>
  )
}

export default GptSearch
