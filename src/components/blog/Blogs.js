import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { blogListView } from '../../store/BlogStore';
import { Blog } from './Blog';


export const Blogs = () => {
    const user = useSelector(state => state.user.user)
    const blogs = useSelector(state => state.blog.blogs)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadBlog = async () => {
            await dispatch(blogListView())
            setLoading(false)
        }
        loadBlog()
    }, [dispatch])


    return !loading ?

        blogs.length > 0 ?
            <>
                {user.role == 'admin' && (
                    <div className='pt-1'>
                        <Link to="/blogOne" type="button" className="ิbtn btn-primary btn-sm"> + เพิ่มข้อมูล </Link>
                    </div>
                )}
                <div className='row row-cols-1 row-cols-md-3 g-2 pt-1'>
                    {blogs.map(blog => (
                        <Blog key={blog._id} blog={blog} />
                    ))}
                </div>

            </>
            :
            <div className='card-me'>There are no blog as of yet!</div>
        :
        <h2 className='text-danger'>...Loading</h2>
}
