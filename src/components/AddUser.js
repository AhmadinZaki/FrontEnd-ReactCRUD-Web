import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const setImages = (e) => {
        console.log('tes', e);
        let fileUpload = e.target.files[0]
        let readerUpload = new FileReader()
        let rawImg;
        readerUpload.onloadend = () => {
            rawImg = readerUpload.result;
            setImage(rawImg)
            // console.log('img', rawImg);
            // this.setting.signature = rawImg;
        }
        readerUpload.readAsDataURL(fileUpload);
    }

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001", {
                name,
                email,
                phone,
                image
            })
            navigate("/");
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="container">
            <form onSubmit={saveUser} className='card p-5'>
                <p>Add User</p>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='xxx@gmail.com' />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Phone</label>
                    <input type="number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='08xxxxxx' />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Picture</label>
                    <input type="file" className="form-control" onChange={(e) => setImages(e)} placeholder='Masukan Gambar' />
                    <p className="text-danger">Ukuran gambar tidak boleh diatas 60kb</p>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddUser