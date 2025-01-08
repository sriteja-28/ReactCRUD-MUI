// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const UserList = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:3001/users").then(response => {
//             setUsers(response.data);
//         });
//     }, []);

//     const deleteUser = (id) => {
//         axios.delete(`http://localhost:3001/users/${id}`).then(response => {
//             setUsers(users.filter(user => user.id !== id));
//         });
//     }

//     return (
//         <>
//             <h1>Users</h1>
//             <Link to='/add'>Add user</Link>
//             <ul>
//                 {
//                     users.map(user => (
//                         <li key={user.id}>
//                             {user.name} - {user.email}
//                             <button onClick={() => deleteUser(user.id)}>Delete</button>
//                             <Link to={`/edit/${user.id}`}>Edit</Link>
//                         </li>
//                     ))
//                 }
//             </ul>
//         </>
//     );
// }

// export default UserList;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid2, Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [alertVisible, setAlertVisible] = useState(false);
    const [deletedUser, setDeletedUser] = useState(null); 

    useEffect(() => {
        axios.get("https://react-crud-mui-two.vercel.app/db.json/").then(response => {
            setUsers(response.data);
        });
    }, []);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`).then(response => {
            const deletedUser = users.find(user => user.id === id);
            setUsers(users.filter(user => user.id !== id)); 
            setDeletedUser(deletedUser); 
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 2000);
        }).catch((error) => {
            console.error("Error deleting user:", error);
        });
    };

    return (
        <>
            <h1>Users</h1>
            <Link to='/add'>
                <Button variant="contained" color="primary" sx={{ marginBottom: "20px" }}>
                    Add User
                </Button>
            </Link>
            {alertVisible && deletedUser && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ marginBottom: 2 }}>
                    User "{deletedUser.name}" deleted successfully!
                </Alert>
            )}

            <Grid2 container spacing={2}>
                {users.map(user => (
                    <Grid2 item key={user.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{user.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                                <div style={{ marginTop: "10px" }}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteUser(user.id)}
                                        sx={{ marginRight: "10px" }}
                                    >
                                        Delete
                                    </Button>
                                    <Link to={`/edit/${user.id}`} style={{ textDecoration: 'none' }}>
                                        <Button variant="outlined" color="primary">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </>
    );
}

export default UserList;
