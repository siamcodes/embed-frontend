import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { alertSliceActions } from '../../store/AlertStore';
import { personCreateOneView } from '../../store/PersonStore';
import { AlertComponent } from '../AlertComponent';

import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
//import { QuillModules, QuillFormats } from '../../helpers/quill';

export const PersonOneForm = () => {
    const history = useHistory();
    const [fullname, setFullname] = useState('');
    const [position, setPosition] = useState('');
    const [academic, setAcademic] = useState('');
    const [description, setDescription] = useState('');

    const [file, setFile] = useState('');
    const [author, setAuthor] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (fullname !== '' && position !== '') {
            // console.log(file)    
            // const personObj = {title, content, file}
            // console.log(personObj)

            const formData = new FormData()

            formData.append('fullname', fullname)
            formData.append('position', position)
            formData.append('academic', academic)
            formData.append('description', description)
            formData.append('image', file)
            formData.append('author', user.username)
            //console.log(...formData)

            const result = dispatch(personCreateOneView(formData));
            if (result) {
                setDescription("")
                history.push('/persons');
            }

        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All fields should have a value', variant: 'alert-danger' }))
        }
    }

    const handleDescription = (e) => {
        setDescription(e)
    }

    return (
        <div className='card-me'>
            <h3>Create Person</h3>
            <AlertComponent />

            <form onSubmit={onSubmitHandler}>
                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <input className='form-control' type='text' placeholder='ชื่อ นามสกุล' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className='col-md-3'>
                        <input className='form-control' type='text' placeholder='ตำแหน่ง' value={position} onChange={(e) => setPosition(e.target.value)} />
                    </div>
                    <div className='col-md-3'>
                        <input className='form-control' type='text' placeholder='วิทยฐานะ' value={academic} onChange={(e) => setAcademic(e.target.value)} />
                    </div>
                </div>



                <ReactQuill
                    // modules={QuillModules}
                    // formats={QuillFormats}
                    className='mb-3'
                    onChange={handleDescription}
                    theme="snow"
                    placeholder='รายละเอียด'
                />
                <input className='form-control mb-3' type='file' onChange={(e) => setFile(e.target.files[0])} />
                <input className='form-control mb-3' type='text' placeholder='ผู้เขียน' value={user.username} onChange={(e) => setAuthor(e.target.value)} hidden />
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
        </div>
    )
}