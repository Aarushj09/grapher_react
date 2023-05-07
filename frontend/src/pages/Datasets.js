import React from "react";
import { useState } from "react";
import "../styles/pages/Datasets.css"

const Datasets = () => {
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