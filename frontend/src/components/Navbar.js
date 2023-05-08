import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import '../styles/components/Navbar.css';

export default function ButtonAppBar() {
    const [username, setUsername] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        let token = document.cookie.split("=")[1];

        if (!token) {
            return;
        }
        
        token = token.split(";")[0];

        if (!token) {
            return;
        }

        axios.get("http://localhost:4000/auth/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUsername(res.data.user.username);
                setIsAuthenticated(true);
            })
    }, []);

    const handleSignupButton = () => {
        window.location = "/signup";
    };

    const handleLoginButton = () => {
        if (!isAuthenticated) {
            window.location = "/login";
        } else {
            document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            window.location = "/login";
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Exploratory Data Analysis
                    </Typography>
                    <Button className='navbar_button' color="inherit" onClick={handleLoginButton}>
                        {isAuthenticated ? "Logout" : "Login"}
                    </Button>
                    {!isAuthenticated ?
                        <Button className='navbar_button' color="inherit" onClick={handleSignupButton}>Signup</Button>
                        :
                        <Typography variant='h5' className='navbar_username' component="div">
                            {username}
                        </Typography>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}