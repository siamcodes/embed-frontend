import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { alertSliceActions } from '../../store/AlertStore';
import { postDetailView, postUpdateView } from '../../store/PostStore';
import { AlertComponent } from '../AlertComponent';

import ReactQuill from 'react-quill';
import { QuillModules, QuillFormats } from '../../helpers/quill';

export const PostEditForm = () => {

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);
    const post = useSelector(state => state.post.post)

    const { postID } = useParams()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {

        const postDetail = async () => {
            await dispatch(postDetailView(postID))
            setLoading(false)
        }
        postDetail()


    }, [dispatch])


    const postUpdateHandler = async () => {
        if (title !== '' && content !== '' && description !== '') {
            const token = localStorage.getItem('token')
            const postObj = { title: title, description: description, content: content }
            await dispatch(postUpdateView(token, postID, postObj))
        } else {
            dispatch(alertSliceActions.showAlert({ message: 'Fields cannot be blank', variant: 'alert-danger' }))
        }
    }


    const handleContent = (e) => {
        console.log(e)
        setContent(true);
    }

    const handleTitle = (e) => {
        console.log(e)
        setTitle(true)
    }


    return (
        !loading ?
            <div className='card-body'>
                <h3 className='card-title'>Edit Post</h3>
                <AlertComponent />

                <form>
                    <input className='form-control mb-3' type='text' value={post.title} onChange={handleTitle} />
                    <textarea className='form-control mb-3' type='text' value={post.description} onChange={(e) => setDescription(e.target.value)} />

                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        className='mb-3'
                        value={post.content}
                        onChange={handleContent}
                        theme="snow"
                        placeholder='เนื้อหา'
                    />
                    <input className='form-control mb-3' type='file' onChange={(e) => setFile(e.target.files[0])} />
                    <input className='form-control mb-3' type='text' placeholder='ผู้เขียน' value={user.username} onChange={(e) => setAuthor(e.target.value)} />
                    <button className='btn btn-primary btn-lg' onClick={postUpdateHandler} >Update</button>
                </form>
            </div>
            :
            <h1 className="text-danger">...Loading</h1>
    )
}

