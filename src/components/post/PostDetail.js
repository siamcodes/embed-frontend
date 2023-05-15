import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from 'moment';
import renderHTML from 'react-render-html';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { alertSliceActions } from "../../store/AlertStore";
import { postDetailView, postListView, postUpdateView } from "../../store/PostStore";
import { AlertComponent } from "../AlertComponent";

import ReactQuill from 'react-quill';
import { QuillModules, QuillFormats } from '../../helpers/quill';

export const PostDetail = () => {

    const { postID } = useParams()
    const user = useSelector(state => state.user.user)
    const posts = useSelector(state => state.post.posts)
    const post = useSelector(state => state.post.post)

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()


    useEffect(() => {

        const loadPost = async () => {
            await dispatch(postListView())
            setLoading(false)
        }
        loadPost();

        const postDetail = async () => {
            await dispatch(postDetailView(postID))
            setLoading(false)
        }
        postDetail()

    }, [dispatch])

    //update section
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [updateTitle, setUpdateTitle] = useState('')
    const [updateDescription, setUpdateDescription] = useState('')
    const [updateContent, setUpdateContent] = useState('')

    const updateItem = () => {
        setUpdateTitle(post.title)
        setUpdateDescription(post.description)
        setUpdateContent(post.content)
        setButtonDisabled(true)
        setUpdating(true)
    }

    const updateCancel = () => {
        setButtonDisabled(false)
        setUpdating(false)
    }

    const postUpdateHandler = async () => {
        if (updateTitle !== '' && updateContent !== '') {
            const token = localStorage.getItem('token')
            const postObj = { title: updateTitle, description: updateDescription, content: updateContent }
          //  console.log('Hello', postObj)

            await dispatch(postUpdateView(token, postID, postObj))
            setUpdating(false)
            setButtonDisabled(false)
        } else {
            dispatch(alertSliceActions.showAlert({ message: 'Fields cannot be blank', variant: 'alert-danger' }))
        }
    }

    const handleContent = (e) => {
        setUpdateContent(e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('content', JSON.stringify(e));
        }
    }


    return (
        !loading ?
            <div className="row pt-1">
                <div className="col-md-9">
                    <AlertComponent />
                    <div className="card">
                        {!updating &&
                            <>
                                {post.image && <img className='img img-fluid' key={post._id} src={post.image} alt='imageAlt' style={{ maxHeight: '250px', objectFit: 'cover' }} />}

                                {post.images && post.images.length > 0 &&
                                    <Slide>
                                        {post.images && post.images.length > 0 && post.images.map((image) => (
                                            <div className="each-fade" key={post._id}>
                                                <img src={image.image} alt='imageAlt' className='img img-fluid' style={{ maxHeight: '650px', width: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </Slide>
                                }

                                <div className="card-body">
                                    <h2 className="card-title text-primary fw-bold ">
                                        {post.title}
                                    </h2>

                                    <small className='text-muted mb-2'>Writen by <span className="text-info"> {post.author}</span>  Published <span className="text-info"> {moment(post.updatedAt).fromNow()}</span></small> <br/>
                                    <small className='text-muted mb-2'> {post.description}</small>

                                    {post.content &&
                                        <div className="catd-text">{renderHTML(post.content)}</div>
                                    }

                                    <div className="row">
                                        {post.images && post.images.length > 0 && post.images.map((image) => (
                                            <div className="column" key={post._id}>
                                                <img src={image.image} alt='imageAlt' style={{ width: '100%' }} />
                                            </div>
                                        ))}
                                    </div>

                                    {user.username && user.role && (
                                        <button onClick={updateItem} className="btn btn-primary btn-lg" >Update</button>
                                    )}
                                </div>
                            </>
                        }
                    </div>

                    {updating && (
                        <div>
                            <form onSubmit={postUpdateHandler}>
                                <input className='form-control mb-3' type='text' placeholder='หัวเรื่อง *' value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
                                <textarea className='form-control mb-3' type='text' placeholder='รายละเอียดแบบย่อ *' value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                                <ReactQuill
                                    modules={QuillModules}
                                    formats={QuillFormats}
                                    className='mb-3'
                                    value={updateContent}
                                    onChange={handleContent}
                                    theme="snow"
                                    placeholder='เนื้อหา'
                                />
                                {/*  <input className='form-control mb-3' type='file' onChange={(e) => setFile(e.target.files[0])} />  
                                         <input className='form-control mb-3' type='text' placeholder='ผู้เขียน' value={user.username} onChange={(e) => setAuthor(e.target.value)} hidden />  */}
                                <button className='btn btn-primary btn-lg' type='submit'>Update</button>
                            </form>
                        </div>
                    )}

                </div>
                <div className="col-md-3">
                    <ul className="list-group list-group-flush mb-3">
                        {posts.map(post => (
                            <li className="list-group-item list-group-item-action pointer fw-light" key={post._id} onClick={() => { window.location.href = `/post/${post._id}` }}> {post.title} </li>
                        ))}
                    </ul>
                </div>
            </div>
            :
            <h1 className="text-danger">...Loading</h1>
    )
}

