import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { alertSliceActions } from '../../store/AlertStore';
import { aboutCreateOneView } from '../../store/AboutStore';
import { AlertComponent } from '../AlertComponent';

import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
import { QuillModules, QuillFormats } from '../../helpers/quill';

export const AboutOneForm = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [author, setAuthor] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (title !== '' && content !== '' && file !== '') {
            // console.log(file)    
            // const aboutObj = {title, content, file}
            // console.log(aboutObj)

            const formData = new FormData()

            formData.append('title', title)
            formData.append('content', content)
            formData.append('image', file)
            formData.append('author', user.username)
            //console.log(...formData)

            const result = dispatch(aboutCreateOneView(formData))
            if (result) {
                setContent("")
                history.push('/abouts');
            }

        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All fields should have a value', variant: 'alert-danger' }))
        }
    }

    const handleContent = (e) => {
        setContent(e)
    }

    return (
        <div className='card-me'>
            <h3>Create About</h3>
            <AlertComponent />

            <form onSubmit={onSubmitHandler}>
                <input className='form-control mb-3' type='text' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
                {/*  <textarea className='form-control mb-3' type='text' placeholder='Enter content' value={content} onChange={(e) => setContent(e.target.value)} /> */}
                <ReactQuill
                    modules={QuillModules}
                    formats={QuillFormats}
                    onChange={handleContent}
                    //theme="snow"
                    className='mb-3'
                    placeholder='เนื้อหา'
                />
                <input className='form-control mb-3' type='file' onChange={(e) => setFile(e.target.files[0])} />
                <input className='form-control mb-3' type='text' placeholder='ผู้เขียน' value={user.username} onChange={(e) => setAuthor(e.target.value)} hidden />
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
        </div>
    )
}