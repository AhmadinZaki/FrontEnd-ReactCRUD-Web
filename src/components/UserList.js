import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style.css'

const UserList = () => {
    const [users, setUser] = useState([]);
    const [userTemporary, setUserTemporary] = useState([])

    // const [userid, setUserid] = useState([])

    useEffect(() => {
        getUsers();
        // getUserById();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:3001");
        setUser(response.data);
        setUserTemporary(response.data)
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

    // const getUserById = async (id) => {
    //     const response = await axios.get(`http://localhost:3001/${id}`);
    //     setUserid(response.data);
    // }
    const handleSearch = (e) => {
        let userSearch = users.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setUserTemporary(userSearch)
    }

    return (

        <div className="container">
            <div className="row ">
                {/* NAVBAR */}

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand " href="#">Ahmadin Zaki</a>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                            <Link to='add' className='btn btn-primary me-2 ' type='button'>Add New</Link>
                            <div className="d-flex">
                                <div className="col-8">
                                    <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" onChange={(e) => handleSearch(e)} />
                                </div>
                            </div>
                            F

                        </div>
                    </div>
                </nav>

                {/* CARD */}
                {/* {userTemporary.map((user, index) => (
                    <div className="card mt-3 ms-3" style={{ width: "18rem" }} key={user._id}>
                        <img src={user.image} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">Email : {user.email}</p>
                            <p className="card-text">No. Telp : {user.phone}</p>
                            <div className="d-grid gap-2 ">
                                <Link to={`edit/${user._id}`} type="button" className="btn btn-primary">Edit</Link>
                                <button onClick={() => { deleteUser(user._id) }} type="button" className="btn btn-danger">Remove</button>
                            </div>
                        </div>
                    </div> */}




                <table className="table table-tes">
                    <thead>
                        <tr>
                            <th scope="col">Nomor</th>
                            <th scope="col">Gambar</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                            <th scope="col">No.Telp</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTemporary.map((user, index) => (

                            <tr>
                                <th scope="row" >{index + 1}</th>
                                <td >                       
                                     <img src={user.image} className="card-img-top" style={{width:"50px"}} />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>

                                <td className=" gap-2 ">
                                    <Link to={`edit/${user._id}`} type="button" className="btn btn-primary">Edit</Link>
                                    <button onClick={() => { deleteUser(user._id) }} type="button" className="btn btn-danger">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div >

    )
}

export default UserList;