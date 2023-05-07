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

	return (
		<div className='page_container'>
			<h1>My Datasets</h1>
			<div className='options_container'>
				<button className='btn'>Upload CSV</button>
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