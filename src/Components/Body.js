import React from 'react';
import { BiSearchAlt2, BiRefresh } from 'react-icons/bi';
import '../Style/bodyStyle.css';
import axios from 'axios';

import DisplayCities from './DisplayCities';

class Body extends React.Component {
	searchInput = null;

	constructor(props) {
		super(props);
		this.state = {
			search: '',
			descending: false,
			error: null,
			isLoaded: false,
			cities: [],
			pagination: 1,
		};
	}

	//Handle the submit of the form
	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ pagination: 1 }, this.apiCall);
	};

	componentDidMount() {
		this.apiCall();
	}

	//API call for the city list regarding values
	apiCall = async () => {
		let url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&offset=${
			(this.state.pagination - 1) * 10
		}&sort=${this.state.descending ? '-' : ''}name&namePrefix=${
			this.searchInput.value
		}`;
		try {
			let answer = await axios.get(url, {
				headers: {
					'x-rapidapi-key':
						'39432bd5edmsh1c596f8e842be1dp1a89e4jsnab9c8fb60032',
					'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
				},
			});
			this.setState({
				cities: answer.data.data,
				error: null,
				isLoaded: true,
			});
		} catch (error) {
			setTimeout(() => this.apiCall(), 2000);
			this.setState({
				isLoaded: true,
				error,
			});
		}
	};

	render() {
		const { pagination, cities, isLoaded, error, descending } = this.state;
		return (
			<div className="flex-1 bg-gray-400 pt-5">
				<form onSubmit={this.handleSubmit}>
					<div className="grid grid-cols-6 gap-2">
						<div className="col-start-3 col-span-2 flex justify-center">
							<div className="flex justify-start rounded-full bg-gray-700 border-2 w-5/6">
								{/* Handling the searching value */}
								<input
									className="text-center text-bold text-gray-400 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-dark my-1 ml-1 w-5/6"
									type="text"
									ref={(ref) => (this.searchInput = ref)}
									placeholder="Search for your city !"></input>

								<div className="flex justify-center ml-5 focus:outline-none">
									{/* Search button */}
									<button className="focus:outline-none">
										<BiSearchAlt2 className="w-10 h-6 text-white" />
									</button>
									{/* Refresh button */}
									<button
										className="focus:outline-none"
										type="button"
										onClick={(e) => {
											this.searchInput.value = null;
											this.setState({ pagination: 1 }, this.apiCall);
										}}>
										<BiRefresh className="w-10 h-6 text-white" />
									</button>
								</div>
							</div>
						</div>

						<div className="col-start-5">
							{/* Ascending or Descending button */}
							<input
								type="button"
								className="bg-gray-700 text-white rounded-full py-2 px-4 border-2 hover:text-gray-200 hover:border-gray-200"
								value={descending ? 'Z - A' : 'A - Z'}
								onClick={(e) => {
									this.setState({ descending: !descending }, this.apiCall);
								}}
							/>
						</div>
					</div>

					{/* Call component to display the cities */}
					<div className="grid grid-col-5 gap-4 ">
						<div class="text-center col-start-1 col-span-3 ">
							<DisplayCities
								cities={cities}
								isLoaded={isLoaded}
								error={error}
							/>
						</div>

						{/* Dealing of the pagination */}
						<div class="text-center col-start-1 col-span-3 ">
							<div className="space-y-10">
								<span className="pr-10"> Page {pagination}</span>
								<button
									type="button"
									disabled={pagination === 1}
									className="text-black hover:text-gray-200 focus:outline-none"
									onClick={(e) => {
										this.setState({ pagination: pagination - 1 }, this.apiCall);
									}}>
									Previous Page
								</button>
								<span> | </span>
								<button
									type="button"
									disabled={cities.length < 10}
									className="text-black hover:text-gray-200 focus:outline-none"
									onClick={(e) => {
										this.setState({ pagination: pagination + 1 }, this.apiCall);
									}}>
									Next Page
								</button>{' '}
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default Body;
