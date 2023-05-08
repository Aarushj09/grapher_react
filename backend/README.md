# Documentation

## Models
- [User](./models/user.model.js) : The user model is used to store the user's information. It contains the following fields:
    - `username` : The username of the user.
    - `email` : The email of the user.
    - `password` : The password of the user.
- [User and Dataset Mapping](./models/user_dataset.model.js) : The dataset model is used to store the dataset's information. It contains the following fields:
    - `dataset_name` : The name of the dataset.
    - `user_email` : The email of the user who added the dataset.
- [Graph](./models/graph.model.js) : The graph model is used to store the graph's information. It contains the following fields:
    - `user_email` : The email of the user who added the graph.
    - `dataset_name` : The name of the dataset to which the graph belongs.
    - `x_axis` : The name of the column to be used as the x-axis.
    - `y_axis` : The name of the column to be used as the y-axis.
    - `graph_type` : The type of the graph.
- [Datasets] : Since the datasets are csv files themselves, they are stored directly as tables in the database. The name of the table is `dataset_{name of file}_{time of creation}`.

## Routes
- [Auth](./routes/auth.route.js) : The auth route is used to handle the authentication of the user. It contains the following routes:
    - `/auth/signup` : This route is used to register a new user. It accepts the following parameters:
        - `username` : The username of the user.
        - `email` : The email of the user.
        - `password` : The password of the user.
    It returns the following:
        - `token` : The JWT token.
    - `/auth/login` : This route is used to login a user. It accepts the following parameters:
        - `email` : The email of the user.
        - `password` : The password of the user.
    It returns the following:
        - `token` : The JWT token.
    - `/auth/user` : This route is used to get the details of the current user.
- [Datasets](./routes/dataset.route.js) : The datasets route is used to handle the datasets. It contains the following routes:
    - `/datasets` : This route is used to get the list of all the datasets of the current user.
    - `/datasets/:dataset_id` : This route is used to get the details of a particular dataset. It returns the following:
        - `fields` : The list of all the column headers in the dataset.
        - `data` : The list of all the rows in the dataset.
    - `datasets/create` : This route is used to upload a new dataset. It accepts the following parameters:
        - `name` : The name of the dataset.
        - `fields` : The list of all the column headers in the dataset.
        - `data` : The list of all the rows in the dataset.
    - `datasets/:dataset_id/graphs` : This route is used to get the list of all the graphs of a particular dataset. It returns the following:
        - `graphs` : The list of all the graphs of the dataset.
- [Graph](./routes/graph.route.js) : The graph route is used to handle the graphs. It contains the following routes:
    - `/graphs/create` : This route is used to create a new graph. It accepts the following parameters:
        - `dataset_name` : The name of the dataset to which the graph belongs.
        - `x_axis` : The name of the column to be used as the x-axis.
        - `y_axis` : The name of the column to be used as the y-axis.
        - `graph_type` : The type of the graph.

## [Authentication](./middleware/auth.js)
The authentication is done using JWT. The token is sent in the header of every request. It is verified using the `auth` middleware. It decoded the token and adds the user's email to the request object. This is used to get the details of the current user. It helps in preventing unauthorized access to the data.