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
				<h1 style={{
					textAlign: "center",
					fontSize: "6rem",
				}}>Exploratory Data Analysis</h1>
				<Box sx={{ '& button': { m: 1 } }}>
					<div style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
						alignItems: "center"
					}}>
					<Button variant="contained" size="large" href="/login">
					Login
					</Button>
					<Button variant="contained" size="large" href="/signup">
					Signup
					</Button>
					</div>
				</Box>
			</div>
		</Box>
		</>
	);
};

export default Home;