import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { alertSliceActions } from '../../store/AlertStore';
import { slideCreateOneView } from '../../store/SlideStore';
import { AlertComponent } from '../AlertComponent';

import ReactQuill from 'react-quill';
//import "react-quill/dist/quill.snow.css"
import { QuillModules, QuillFormats } from '../../helpers/quill';

export const SlideOneForm = () => {
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
            // const slideObj = {title, content, file}
            // console.log(slideObj)

            const formData = new FormData()

            formData.append('title', title)
            formData.append('content', content)
            formData.append('image', file)
            formData.append('author', user.username)
            //console.log(...formData)

            const result = dispatch(slideCreateOneView(formData));
            if (result) {
                setContent("")
                history.push('/slides');
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
            <h3>Create Slide</h3>
            <AlertComponent />

            <form onSubmit={onSubmitHandler}>
                <input className='form-control mb-3' type='text' placeholder='หัวเรื่อง' value={title} onChange={(e) => setTitle(e.target.value)} />
                {/*  <textarea className='form-control mb-3' type='text' placeholder='เนื้อหา' value={content} onChange={(e) => setContent(e.target.value)} /> */}
                <ReactQuill
                    modules={QuillModules}
                    formats={QuillFormats}
                    className='mb-3'
                    onChange={handleContent}
                    theme="snow"
                    placeholder='เนื้อหา'
                />
                <input className='form-control mb-3' type='file' onChange={(e) => setFile(e.target.files[0])} />
                <input className='form-control mb-3' type='text' placeholder='ผู้เขียน' value={user.username} onChange={(e) => setAuthor(e.target.value)} hidden />
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
        </div>
    )
}