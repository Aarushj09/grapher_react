import React, { useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react";
import UploadFileModal from "../components/UploadFileModal";
import "../styles/pages/Datasets.css"

const Datasets = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [datasets, setDatasets] = useState([
		{
			name: 'Dataset 1'
		},
		{
			name: 'Dataset 2'
		},
		{
			name: 'Dataset 3'
		}
	]);

	useEffect(() => {
		// Check if user is logged in
		const token = document.cookie.split("=")[1];
		if (!token) {
			window.location = "/login";
		}

		// Get datasets
		// axios
		// 	.get("http://localhost:5000/datasets", {
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	})
		// 	.then((res) => {
		// 		setDatasets(res.data.datasets);
		setIsAuthenticated(true);
		// 	})
		// 	.catch((err) => {
		// 		Swal.fire({
		// 			title: 'Oops...',
		// 			text: err.response.data.message,
		// 			icon: 'error',
		// 			confirmButtonText: 'OK'
		// 		})
		// 			.then(() => {
		// 				// Redirect to login page
		// 				window.location = "/login";
		// 			});
		// 	});
	}, []);

	const changeHandler = (fileName) => {
		datasets.push({
			name: fileName
		})

		setDatasets([...datasets])
	};

	return (
		<>
			{isAuthenticated ? (
				<div className='page_container'>
					<h1>My Datasets</h1>
					<div className='options_container'>
						<UploadFileModal changeHandler={changeHandler} />
					</div>
					<div className='datasets_container'>
						{datasets.map((dataset) => (
							<div className='dataset' key={dataset.name}>
								<h2>{dataset.name}.csv</h2>
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