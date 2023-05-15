import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { alertSliceActions } from '../../store/AlertStore';
import { postCreateMultipleView } from '../../store/PostStore';
import { AlertComponent } from '../AlertComponent';

import ReactQuill from 'react-quill';
//import "react-quill/dist/quill.snow.css"
import { QuillModules, QuillFormats } from '../../helpers/quill';

export const PostMultipleForm = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [author, setAuthor] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const onSubmitHandler =  (e) => {
        e.preventDefault()
        if (title !== '' && content !== '' && file !== '') {
            // console.log(file)    
            // const postObj = {title, content, file}
            // console.log(postObj)
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description);
            formData.append('content', content)
            formData.append('author', user.username)

            for (let i = 0; i < file.length; i++) {
                formData.append('image', file[i])
            }

            //console.log(...formData)
            const result =  dispatch(postCreateMultipleView(formData))
            if (result) {
                setContent("")
                history.push('/posts')
            }

        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All fields should have a value', variant: 'alert-danger' }))
        }
    }

    const handleContent = (e) => {
        setContent(e);
    }

    return (
        <div className='card-me'>
            <h3>Upload Many Files</h3>
            <AlertComponent />
            <form onSubmit={onSubmitHandler}>
                <input className='form-control mb-3' type='text' placeholder='หัวเรื่อง *' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className='form-control mb-3' type='text' placeholder='รายละเอียดแบบย่อ *' value={description} onChange={(e) => setDescription(e.target.value)} />
                <ReactQuill
                    modules={QuillModules}
                    formats={QuillFormats}
                    className='mb-3'
                    onChange={handleContent}
                    theme="snow"
                    placeholder='เนื้อหา'
                />

                <input className='form-control mb-3' multiple type='file' onChange={(e) => setFile(e.target.files)} />
                <input className='form-control mb-3' type='text' placeholder='ผู้เขียน' value={user.username} onChange={(e) => setAuthor(e.target.value)} hidden />
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>

        </div>
    )
}