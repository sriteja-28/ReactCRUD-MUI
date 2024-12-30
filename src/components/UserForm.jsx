// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const UserForm = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (id) {
//             axios.get(`http://localhost:3001/users/${id}`).then(response => {
//                 setName(response.data.name);
//                 setEmail(response.data.email);
//             });
//         }
//     }, [id]);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (id) {
//             axios.put(`http://localhost:3001/users/${id}`, { name, email }).then(() => {
//                 navigate('/');
//             }).catch((error) => {
//                 console.error("Error updating user:", error);
//             });
//         } else {
//             axios.post(`http://localhost:3001/users/`, { name, email }).then(() => {
//                 navigate('/');
//             }).catch((error) => {
//                 console.error("Error adding user:", error);
//             });
//         }
//     }

//     return (
//         <>
//             <h1>UserForm</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="">Name</label>
//                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label htmlFor="">Email</label>
//                     <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     <button type="submit">{id ? 'Update' : 'Add'} User</button>
//                 </div>
//             </form>
//         </>
//     );
// }

// export default UserForm;


import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Container, Grid2, Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/users/${id}`).then(response => {
                setName(response.data.name);
                setEmail(response.data.email);
            });
        }
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            axios.put(`http://localhost:3001/users/${id}`, { name, email }).then(() => {
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                    navigate('/');
                }, 2000);
            }).catch((error) => {
                console.error("Error updating user:", error);
            });
        } else {
            axios.post(`http://localhost:3001/users/`, { name, email }).then(() => {
                setAlertVisible(true);

                setTimeout(() => {
                    setAlertVisible(false);
                    navigate('/');
                }, 2000);
            }).catch((error) => {
                console.error("Error adding user:", error);
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>{id ? 'Edit' : 'Add'} User</Typography>
            {alertVisible && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ marginBottom: 2 }}>
                    {id ? 'User updated successfully!' : 'User added successfully!'}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <Grid2 container spacing={2}>
                    <Grid2 item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Grid2>
                    <Grid2 item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                {id ? 'Update' : 'Add'} User
                            </Button>
                    </Grid2>
                </Grid2>
            </form>
        </Container>
    );
}

export default UserForm;
