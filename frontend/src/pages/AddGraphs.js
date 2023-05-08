import React, { useEffect, useState } from "react";
import "../styles/pages/Graphs.css";
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import axios from "axios";
import { Button, InputLabel } from "@mui/material";
import Swal from "sweetalert2";

const AddGraphs = () => {
	//State to store table column names
	const [tableRows, setTableRows] = useState([]);
	//State to store the values
	const [values, setValues] = useState([]);
	const [xAxis, setXAxis] = useState("");
	const [yAxis, setYAxis] = useState("");
	const [graphType, setGraphType] = useState("");

	const dataset_id = useParams().dataset_id;

	useEffect(() => {
		// Check if user is logged in
		let token = document.cookie.split("=")[1];
		token = token.split(";")[0];
		if (!token) {
			window.location = "/login";
		}

		axios.get(`http://localhost:4000/datasets/${dataset_id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				Object.keys(res.data.data[0]).map((key) => {
					if (!isNaN(res.data.data[0][key])) {
						// Convert all values in res.data.data[i][key] to numbers
						res.data.data.map((value) => {
							value[key] = Number(value[key]);
						});
					}
				});

				setTableRows(res.data.fields);
				setValues(res.data.data);
			})
	}, []);

	const handleSubmit = () => {
		if (xAxis === "" || yAxis === "" || graphType === "") {
			Swal.fire({
				title: 'Oops...',
				text: "Please select all options!",
				icon: 'error',
				confirmButtonText: 'OK'
			});

			return;
		}

		// Check if xAxis and yAxis are the same
		if (xAxis === yAxis) {
			Swal.fire({
				title: 'Oops...',
				text: "X-Axis and Y-Axis cannot be the same!",
				icon: 'error',
				confirmButtonText: 'OK'
			});

			return;
		}

		// TODO: Add validation checks

		axios.post("http://localhost:4000/graphs/create", {
			dataset_name: dataset_id,
			x_axis: xAxis,
			y_axis: yAxis,
			graph_type: graphType
		}, {
			headers: {
				Authorization: `Bearer ${document.cookie.split("=")[1]}`,
			},
		})
			.then((res) => {
				Swal.fire({
					title: 'Success!',
					text: "Graph generated successfully!",
					icon: 'success',
					confirmButtonText: 'OK'
				})
					.then(() => {
						window.location = `/${dataset_id}/graphs`;
					});
			})
			.catch((err) => {
				Swal.fire({
					title: 'Oops...',
					text: err.response.data.message,
					icon: 'error',
					confirmButtonText: 'OK'
				});
			});
	};

	// Display CSV table data
	return (
		<>
			<h1 className="heading_container">Dataset</h1>
			{values.length === 0 ? <h2 className="text_container">Loading dataset...</h2> :
				<div className="container">
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									{tableRows.map((rows, index) => {
										return <TableCell key={index}>{rows}</TableCell>;
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								{values.map((value, index) => {
									// Do this only until index = 4
									if (index > 4) {
										return;
									}

									return (
										<TableRow key={index}>
											{Object.values(value).map((val, index) => {
												return <TableCell key={index}>{val}</TableCell>;
											})}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>

					<div className="option_container">
						<h2>Create Graph</h2>
						{/* X-Axis */}
						<div className="option_input">
							<InputLabel
								id="x-axis-label"
							>
								X-Axis
							</InputLabel>
							<Select
								fullWidth
								labelId="x-axis-label"
								id="x-axis"
								value={xAxis}
								onChange={(e) => setXAxis(e.target.value)}
							>
								{tableRows.map((rows, index) => {
									return <MenuItem key={index} value={rows}>{rows}</MenuItem>;
								})}
							</Select>
						</div>

						{/* Y-Axis */}
						<div className="option_input">
							<InputLabel
								id="y-axis-label"
							>
								Y-Axis
							</InputLabel>
							<Select
								fullWidth
								labelId="y-axis-label"
								id="y-axis"
								value={yAxis}
								onChange={(e) => setYAxis(e.target.value)}
							>
								{tableRows.map((rows, index) => {
									return <MenuItem key={index} value={rows}>{rows}</MenuItem>;
								})}
							</Select>
						</div>

						{/* Graph Type */}
						<div className="option_input">
							<InputLabel
								id="graph-type-label"
							>
								Graph Type
							</InputLabel>
							<Select
								fullWidth
								labelId="graph-type-label"
								id="graph-type"
								value={graphType}
								onChange={(e) => setGraphType(e.target.value)}
							>
								<MenuItem value="bar">Bar</MenuItem>
								<MenuItem value="line">Area</MenuItem>
								<MenuItem value="pie">Pie</MenuItem>
							</Select>
						</div>

						<div className="option_input">
							<Button
								variant="contained"
								onClick={handleSubmit}
							>
								Generate Graph
							</Button>
						</div>
					</div>
				</div>
			}
		</>
	);
};

export default AddGraphs;