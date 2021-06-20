import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

function DisplayCities({ cities, isLoaded, error }) {
	if (error) {
		return <div>Please wait a few seconds for the data to actualize</div>;
	} else if (!isLoaded || !cities) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className="grid grid-cols-5 mt-5 px-5">
				<ul className="gris col-start-2">
					{' '}
					City List
					<Divider />
					{cities.map((city) => (
						<li key={city.id}>
							<Link
								to={{
									pathname: '/city/' + city.name,
									state: {
										id: city.id,
									},
								}}>
								{city.city}
							</Link>
						</li>
					))}
				</ul>
				<ul className="grid col-start-3">
					{' '}
					Country
					<Divider />
					{cities.map((city) => (
						<li key={city.id}>
							{city.country}
							{'  '}
							{/* Countrys' flag */}
							<img
								id="myImage"
								src={
									'https://flagcdn.com/h20/' +
									city.countryCode.toLowerCase() +
									'.png'
								}
								className="inline-block w-5 h-4"
							/>
						</li>
					))}
				</ul>
				<ul className="gris col-start-4">
					{' '}
					Population
					<Divider />
					{cities.map((city) => (
						<li key={city.id}>{city.population}</li>
					))}
				</ul>
			</div>
		);
	}
}
export default React.memo(DisplayCities);
