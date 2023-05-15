import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { alertSliceActions } from '../../store/AlertStore'
import { activityCreatePDFView } from '../../store/ActivityStore'
import { AlertComponent } from '../AlertComponent'

export const ActivityPDFForm = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');

    const dispatch = useDispatch();

    const onSubmitHandler =  (e) => {
        e.preventDefault()
        if (title !== '' && content !== '' && file !== '') {
            // console.log(file)    
            // const activityObj = {title, content, file}
            // console.log(activityObj)
            const formData = new FormData()
            formData.append('title', title)
            formData.append('content', content)
            /*  formData.append('file', file) */
            for (let i = 0; i < file.length; i++) {
                formData.append('file', file[i])
            }
            //console.log(...formData)
            const result =  dispatch(activityCreatePDFView(formData))
            if (result) {
                history.push('/activities')
            }

        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All fields should have a value', variant: 'alert-danger' }))
        }
    }

    return (
        <div className='card-me'>
            <h3>Upload a PDF File</h3>
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