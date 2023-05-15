import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { alertSliceActions } from '../../store/AlertStore';
import { postCreateOneView } from '../../store/PostStore';
import { AlertComponent } from '../AlertComponent';

import ReactQuill from 'react-quill';
//import "react-quill/dist/quill.snow.css"
import { QuillModules, QuillFormats } from '../../helpers/quill';

export const PostOneForm = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [author, setAuthor] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const contentFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }
        if (localStorage.getItem('content')) {
            return JSON.parse(localStorage.getItem('content'));
        } else {
            return false;
        }
    }
     const [content, setContent] = useState(contentFromLS());

    const onSubmitHandler =  (e) => {
        e.preventDefault()
        if (title !== '' && description !== '' && file !== '') {
            // console.log(file)    
            // const postObj = {title, content, file}
            // console.log(postObj)

            const formData = new FormData();

            formData.append('title', title);
            formData.append('description', description);
            formData.append('content', content);
            formData.append('author', user.username)

            formData.append('image', file);
            //console.log(...formData)

            const result =  dispatch(postCreateOneView(formData))
            if (result) {
                setContent("")
                history.push('/posts');
            }

        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All fields should have a value', variant: 'alert-danger' }))
        }
    }

    const handleContent = (e) => {
        setContent(e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('content', JSON.stringify(e));
        }
    }



    return (
        <div className='card-body'>
            <h3>Create Post</h3>
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
                <input className='form-control mb-3' type='file' onChange={(e) => setFile(e.target.files[0])} />
                <input className='form-control mb-3' type='text' placeholder='ผู้เขียน' value={user.username} onChange={(e) => setAuthor(e.target.value)} hidden />
                <button className='btn btn-primary btn-lg' type='submit'>Submit</button>
            </form>
        </div>
    )
}