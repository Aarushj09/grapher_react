import React, { useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useState } from "react";
// import UploadFileModal from "../components/UploadFileModal";
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

	const changeHandler = (event) => {
		datasets.push({
			name: event.target.files[0].name
		})
		
		//re-render
		setDatasets([...datasets])
		console.log(event.target.files[0])
	};

	return (
		<div className='page_container'>
			<h1>My Datasets</h1>
			<div className='options_container'>
				<button className='btn'>
					Upload CSV
					<input
						// hidden
						type="file"
						accept=".csv"
						onChange={changeHandler}
						style={{ display: "block", margin: "10px auto" }}
					/>
				</button>
			</div>
			<div className='datasets_container'>
				{datasets.map((dataset) => (
					<div className='dataset'>
						<h2>{dataset.name}</h2>
					</div>
				))}
			</div>
		</div>
	);
};

export default Datasets;