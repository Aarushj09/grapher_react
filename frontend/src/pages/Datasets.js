import React, { useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react";
import UploadFileModal from "../components/UploadFileModal";
import "../styles/pages/Datasets.css"

const Datasets = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [datasets, setDatasets] = useState([]);

	// Validate auth token, if invalid redirect to login page
	const validateAuthToken = () => {
		let token = document.cookie;
		if (!token)
			window.location = "/login";

		token = token.split("=")[1];
		if (!token)
			window.location = "/login";
		
		token = token.split(";");
		if (!token)
			window.location = "/login";

		token = token[0];
		if (!token)
			window.location = "/login";

		return token;
	};

	useEffect(() => {
		// Check if there is some user logged in, if not redirect to login page
		const token = validateAuthToken();

		// Get datasets of current user
		axios
			.get("https://main--dulcet-taffy-eeeffb.netlify.app/datasets", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setDatasets(res.data.datasets);
				setIsAuthenticated(true);
			})
			.catch((err) => {
				console.log(err);
				Swal.fire({
					title: 'Oops...',
					text: err.response.data.message,
					icon: 'error',
					confirmButtonText: 'OK'
				})
					.then(() => {
						// Redirect to login page
						window.location = "/login";
					});
			});
	}, []);

	// redirect to graphs already plotted for this dataset
	const handleDatasetClick = (dataset_id) => {
		window.location = `/${dataset_id}/graphs`;
	};

	return (
		<>
			{isAuthenticated ? (
				<div className='page_container'>
					<h1>My Datasets</h1>
					<div className='options_container'>
						<UploadFileModal />
					</div>
					<div className='datasets_container'>
						{datasets.map((dataset) => (
							<div className='dataset' key={dataset.dataset_name} onClick={() => { handleDatasetClick(dataset.dataset_name) }}>
								<h2>{dataset.dataset_name.split("_")[1].split("_")[0]}.csv</h2>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className='page_container'>
					<h1>You are not logged in!</h1>
					<div className='datasets_container'>
						<p>Please log in to view this page.</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Datasets;