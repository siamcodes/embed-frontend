import { useDispatch, useSelector } from 'react-redux'
import { postDeleteView, postUpdateView } from '../../store/PostStore'
import { Link } from 'react-router-dom'
import moment from 'moment';
import renderHTML from 'react-render-html';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export const Post = ({ post }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const postDeleteHandler = () => {
        dispatch(postDeleteView(post._id))
    }

    const postEditHandler = (e) => {
        console.log(post._id)
        dispatch(postUpdateView(post._id))
    }

    return (
        <div className='col'>
            <div className='card'>
                {post.image && <img src={post.image} alt='sampleImage' className='img img-fluid' style={{ maxHeight: '25rem' }} />}

                {post.images && post.images.length > 0 &&
                    <Slide>
                        {post.images && post.images.length > 0 && post.images.map((image, index) => (
                            <div className="each-fade" key={index}>
                                <img src={image.image} alt='imageAlt' className='img img-fluid' style={{ maxHeight: '25rem' }} />
                            </div>
                        ))}
                    </Slide>
                }

                <div className='card-body'>
                    <h4 className='card-title text-center'><Link to={`/post/${post._id}`}>{post.title}</Link></h4>
                    <div className="mb-3">
                                <small className='text-muted'>Writen by <span className="text-info"> {post.author}</span>  Published <span className="text-info"> {moment(post.updatedAt).fromNow()}</span></small>
                            </div>
                    <div className='card-text'>{post.description}</div>
                    {post.pdfFile && <Link to={post.pdfFile} target='_blank'>PDF File: {post.pdfFile}</Link>}
                    {user.username && user.role===`admin` && (
                        <>
                            <button className='btn btn-danger btn-sm' onClick={postDeleteHandler}>Delete</button> {''}
                            <Link className='btn btn-info btn-sm' to={`/postEdit/${post._id}`}>Edit</Link>
                        </>
                    )}
                </div>
            </div>
        </div >
    )
}