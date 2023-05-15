import { useDispatch, useSelector } from 'react-redux';
import { blogDeleteView } from '../../store/BlogStore';
import { Link } from 'react-router-dom';
import moment from 'moment';
import renderHTML from 'react-render-html';

export const Blog = ({ blog }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const blogDeleteHandler = () => {
        dispatch(blogDeleteView(blog._id))
    }

    const blogEditHandler = () => {
        dispatch(blogDeleteView(blog._id))
    }

    return (
        <div className='col'>
            <div className='card h-100'>
                {blog.image && <img src={blog.image} alt='sampleImage' style={{ maxHeight: '200px', objectFit: 'cover' }} />}
                <div className='card-body'>
                    <h5 className='catd-title'><Link to={`/blog/${blog._id}`}>{blog.title}</Link></h5>
                    <div className='mb-2'><small className='text-muted'>Writen by {blog.author}  Published {moment(blog.updatedAt).fromNow()}</small></div>
                    <div className='card-text'>{renderHTML(blog.content.substring(0, 250))}</div>

                    <div>
                        {blog.images && blog.images.length > 0 && blog.images.map(image => (
                            <div className='col-sm-6'>
                                <img src={image.image} key={image._id} alt='imageAlt' className='img img-fluid' />
                            </div>
                        ))}
                    </div>
                    {blog.pdfFile && <Link to={blog.pdfFile} target='_blank'>PDF File: {blog.pdfFile}</Link>}

                    {user.username && user.role===`admin` && (
                        <div className='card-body'>
                            <button className='btn btn-danger btn-sm' onClick={blogDeleteHandler}>Delete</button> {' '}
                            <button className='btn btn-info btn-sm' onClick={blogEditHandler}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}