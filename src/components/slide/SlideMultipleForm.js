import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { alertSliceActions } from '../../store/AlertStore';
import { slideCreateMultipleView } from '../../store/SlideStore';
import { AlertComponent } from '../AlertComponent';

export const SlideMultipleForm = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const dispatch = useDispatch();

    const onSubmitHandler =  (e) => {
        e.preventDefault()
        if (title !== '' && content !== '' && file !== '') {
            // console.log(file)    
            // const slideObj = {title, content, file}
            // console.log(slideObj)
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            for (let i = 0; i < file.length; i++) {
                formData.append('image', file[i])
            }

            //console.log(...formData)
            const result =  dispatch(slideCreateMultipleView(formData))
            if (result) {
                history.push('/slides')
            }

        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All fields should have a value', variant: 'alert-danger' }))
        }
    }

    return (
        <div className='card-me'>
            <h3>Upload Many Files</h3>
            <AlertComponent />
            <form onSubmit={onSubmitHandler}>
                <input className='form-control mb-3' type='text' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className='form-control mb-3' type='text' placeholder='Enter content' value={content} onChange={(e) => setContent(e.target.value)} />
                <input className='form-control mb-3' multiple type='file' onChange={(e) => setFile(e.target.files)} />
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>

        </div>
    )
}