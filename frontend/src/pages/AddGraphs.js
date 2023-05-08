import React, { useEffect, useState} from "react";
import "../styles/pages/Graphs.css";
import Papa from 'papaparse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Graph = () => {

	const [data, setData] = React.useState(null);
	//State to store table Column name
	const [tableRows, setTableRows] = useState([]);
	//State to store the values
	const [values, setValues] = useState([]);

	// read data from a local csv file
	const fetchCsv = async () => {
		const response = await fetch('https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv');
		const reader = response.body.getReader();
		const result = await reader.read(); // raw array
		const decoder = new TextDecoder('utf-8');
		const csv = decoder.decode(result.value); // the csv text
		return csv;
	}
	useEffect(() => {
		async function getData() {
			let csvData = await fetchCsv();
			Papa.parse(csvData, { header: true,skipEmptyLines: true,
				complete: function (results) {
					const rowsArray = [];
					const valuesArray = [];
					// Iterating data to get column name and their values
					results.data.map((d) => {
					  rowsArray.push(Object.keys(d));
					  valuesArray.push(Object.values(d));
					});
					// Parsed Data Response in array format
					setData(results.data);
					// Filtered Column Names
					setTableRows(rowsArray[0]);
					// Filtered Values
					setValues(valuesArray);
			}, })
		}
		getData()
	}, [fetchCsv])

	// display csv table data
	return (
		<>
		<h1>Graph</h1>
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
					return (
					<TableRow key={index}>
						{value.map((val, i) => {
						return <TableCell key={i}>{val}</TableCell>;
						})}
					</TableRow>
					);
				})}
				</TableBody>
			</Table>
		</TableContainer>
		</>
	);
};

export default Graph;