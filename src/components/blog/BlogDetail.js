import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { blogDetailView, blogListView } from "../../store/BlogStore"
import moment from 'moment';
import renderHTML from 'react-render-html';

export const BlogDetail = () => {

    const { blogID } = useParams()
    const blogs = useSelector(state => state.blog.blogs)
    const blog = useSelector(state => state.blog.blog)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadBlog = async () => {
            await dispatch(blogListView())
            setLoading(false)
        }
        loadBlog();

        const blogDetail = async () => {
            await dispatch(blogDetailView(blogID))
            setLoading(false)
        }
        blogDetail()
    }, [])

    return (
        !loading ?
            <div className="row">
                <div className="col-md-9">
                    <div className="card">
                        <img className='img-fluid' src={blog.image} alt='blogImage' style={{ maxHeight: '250px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h2 className="card-title text-primary fw-bold ">
                                {blog.title}
                            </h2>
                            <div className="mb-3">
                                <small className='text-muted'>Writen by <span className="text-info"> {blog.author}</span>  Published <span className="text-info"> {moment(blog.updatedAt).fromNow()}</span></small>
                            </div>
                            {blog.content &&
                                <div className="catd-text">{renderHTML(blog.content)}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <ul className="list-group list-group-flush mb-3">
                        {blogs.map(blog => (
                            <li className="list-group-item list-group-item-action pointer fw-light" key={blog} onClick={() => { window.location.href = `/blog/${blog._id}` }}> {blog.title} </li>
                        ))}
                    </ul>
                </div>
            </div>
            :
            <h1 className="text-danger">...Loading</h1>
    )
}