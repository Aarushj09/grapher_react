# Documentation

## Pages
- [Home](./src/pages/Home.js) : The home page gives the option to login or signup.
    - URL : `/`
- [Signup](./src/pages/Signup.js) : The signup page is used to register a new user.
    - URL : `/signup`
- [Login](./src/pages/Login.js) : The login page is used to login a user.
    - URL : `/login`
- [Datasets](./src/pages/Datasets.js) : The datasets page is used to view all the datasets of the current user and displays an option to add a new dataset.
    - URL : `/datasets`
- [Add Graph](./src/pages/AddGraph.js) : The add graph page is used to add a new graph to a dataset. It also displays few rows of the dataset to help the user select the columns to be used as the x-axis and y-axis.
    - URL : `/:dataset_id/graphs/add`
- [Graphs](./src/pages/Graphs.js) : The graphs page is used to view all the graphs of a particular dataset.
    - URL : `/:dataset_id/graphs`

## Components
- [Navbar](./src/components/Navbar.js) : The navbar component is used to display the navbar.
- [Layout](./src/components/Layout.js) : The layout component is used to display the navbar and the page content.
- [Upload File Modal](./src/components/UploadFileModal.js) : The upload file modal component is used to display the modal to upload a new dataset.
  