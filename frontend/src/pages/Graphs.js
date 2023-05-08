import axios from "axios";
import React from "react";
import Plot from 'react-plotly.js';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../styles/pages/Graphs.css"
import { Button } from "@mui/material";

const Graphs = () => {
	//State to store table column names
	const [tableRows, setTableRows] = useState([]);
	//State to store the values
	const [values, setValues] = useState([]);
	const [graphs, setGraphs] = useState([]);


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


	const dataset_id = useParams().dataset_id;

	useEffect(() => {
		// Check if user is logged in
		const token = validateAuthToken()

		axios.get(`http://localhost:4000/datasets/${dataset_id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				// Convert all numeric columns to numbers
				Object.keys(res.data.data[0]).map((key) => {
					if (!isNaN(res.data.data[0][key])) {
						res.data.data.map((value) => {
							value[key] = Number(value[key]);
						});
					}
				});

				setTableRows(res.data.fields);
				setValues(res.data.data);

				axios.get(`http://localhost:4000/datasets/${dataset_id}/graphs`, {
					headers: {
						Authorization: `Bearer ${token}`,
					}
				})
					.then((res) => {
						setGraphs(res.data.graphs);
					});
			})
	}, []);

	return (
		<div className="page_container">
			<h1 className="heading_container">Graphs</h1>
			<div className='options_container'>
				<Button
					variant="contained"
					onClick={() => { window.location = `/${dataset_id}/graphs/add` }}
				>
					Add Graph
				</Button>
			</div>
			{values.length > 0 ? (
				<div className="graphs_container">
					{graphs.map((graph, index) => {
						// Create chart config and layout object for Plotly
						const chartConfig = {
							type: graph.graph_type,
						}
						const layout = {}

						if (graph.graph_type === "pie") {
							chartConfig.labels = values.map((value) => value[graph.x_axis]);
							chartConfig.values = values.map((value) => value[graph.y_axis]);
						} else {
							chartConfig.x = values.map((value) => value[graph.x_axis]);
							chartConfig.y = values.map((value) => value[graph.y_axis]);
							layout.xaxis = {
								title: graph.x_axis,
							}
							layout.yaxis = {
								title: graph.y_axis,
							}
							layout.width = 800;
							layout.height = 500;
						}

						return (
							<div className="graph" key={index}>
								<Plot
									data={[chartConfig]}
									layout={layout}
								/>
							</div>
						)
					}
					)}
				</div>
			) : (
				<h2 className="text_container">Loading graphs...</h2>
			)}
		</div>
	);
};

export default Graphs;