import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
		<Box
		 display="flex"
		 justifyContent="center"
		 alignItems="center"
		 minHeight="100vh"
		 >
			<div>
				<h1>Exploratory Data Analysis</h1>
				<Box sx={{ '& button': { m: 1 } }}>
				<Button variant="contained" size="large">
				<Link to="/login">Login</Link>
				</Button>
				<Button variant="contained" size="large">
				<Link to="/signup">Register</Link>
				</Button>
				</Box>
			</div>
		</Box>
		</>
	);
};

export default Home;