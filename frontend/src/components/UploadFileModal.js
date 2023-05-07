import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import Swal from "sweetalert2";

const UploadFileModal = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        const nameElement = document.querySelector(".uploaded_file_name");
        nameElement.innerHTML = file.name;
    };

    const handleSubmit = () => {
        if (!document.querySelector(".uploaded_file_name").innerHTML) {
            Swal.fire({
                title: 'Oops...',
                text: "Please choose a file to upload!",
                icon: 'error',
                confirmButtonText: 'OK'
            });

            return;
        }

        const token = document.cookie.split("=")[1];
        const file = document.querySelector("input[type=file]").files[0];
        const formData = new FormData();
        formData.append("file", file);

        axios
            .post("http://localhost:5000/datasets/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setOpen(false);
                
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                    .then(() => {
                        // Redirect to datasets page
                        window.location = "/datasets";
                    });
            })
            .catch((err) => {
                setOpen(false);
                
                Swal.fire({
                    title: 'Oops...',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Upload CSV
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload CSV File</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Upload a CSV file to create a new dataset.
                    </DialogContentText>
                    <br />
                    <div className="button_container">
                        <Button variant="contained" component="label">
                            Choose CSV File
                            <input type="file" hidden onChange={handleUpload} />
                        </Button>
                        <p className="uploaded_file_name">No file uploaded</p>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UploadFileModal;