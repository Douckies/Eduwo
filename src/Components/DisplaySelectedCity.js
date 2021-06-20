import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

/* API to fetch citys' informations */
const fetchCity = async (id) => {
	let url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/' + id;
	try {
		let answer = await axios.get(url, {
			headers: {
				'x-rapidapi-key': '39432bd5edmsh1c596f8e842be1dp1a89e4jsnab9c8fb60032',
				'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
			},
		});
		return answer.data.data;
	} catch (error) {
		return null;
	}
};

function DisplaySelectedCity() {
	//Hooks to find props / API fetched datas
	const location = useLocation();
	const [city, setCity] = useState(null);
	useEffect(() => {
		(async () => {
			setCity(await fetchCity(location.state.id));
		})();
	}, []);
	if (city === null) return null;

	return (
		<div className="flex-1 bg-gray-400">
			<div className="grid grid-cols-3 bg-gray-400 ">
				<div className="col-start-2 text-white font-bold mt-4">
					<div className="flex justify-center">
						Welcome in {city.country}
						<img
							id="myImage"
							className="inline-block"
							srcset={
								'https://flagcdn.com/32x24/' +
								city.countryCode.toLowerCase() +
								'.png'
							}
						/>
					</div>
					<div className="flex justify-center mt-20">
						{city.name} is a city of {city.population} inhabitants and is
						located in the region of {city.region}
					</div>
				</div>
				<div className="col-start-2 mt-20">
					<Link
						className="bg-gray-700 text-white rounded-full py-2 px-4 border-2 hover:text-gray-200 hover:border-gray-200"
						to={{
							pathname: '/',
						}}>
						Back
					</Link>
				</div>
			</div>
		</div>
	);
}

export default DisplaySelectedCity;
