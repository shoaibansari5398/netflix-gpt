import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";


const useMovieTrailer = (id) => {

	const dispatch = useDispatch()

	const getMovieTrailer = async () => {
		const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS)
		const json = await data.json();
		const filteredData = json.results.filter(movie => movie.type === "Trailer")
		const trailer = filteredData.length ? filteredData[0] : json.results[0]
		dispatch(addTrailerVideo(trailer))
	}

	useEffect(() => {
		getMovieTrailer();
	},[])
}

export default useMovieTrailer;
