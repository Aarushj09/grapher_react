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
import axios from "axios";

const Graph = () => {
	const [data, setData] = React.useState(null);
	//State to store table Column name
	const [tableRows, setTableRows] = useState([]);
	//State to store the values
	const [values, setValues] = useState([]);

	const dataset_id = useParams().dataset_id;

	useEffect(() => {
		axios.get(`http://localhost:4000/datasets/${dataset_id}`, {
			headers: {
				Authorization: `Bearer ${document.cookie.split("=")[1]}`,
			},
		})
			.then((res) => {
				setTableRows(res.data.fields);
				setValues(res.data.data);
			})
	}, []);

	// Display CSV table data
	return (
		<>
			<h1 className="heading_container">Graph</h1>
			{values.length === 0 ? <h2 className="text_container">Loading dataset...</h2> :
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
			}
		</>
	);
};

export default Graph;