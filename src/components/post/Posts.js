import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postListView } from '../../store/PostStore';
import { Post } from './Post';

export const Posts = () => {
    const user = useSelector(state => state.user.user)
    const posts = useSelector(state => state.post.posts)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPost = async () => {
            await dispatch(postListView())
            setLoading(false)
        }
        loadPost()
    }, [dispatch])


    


    return (
        <div>
            {user.role === 'admin' && (
                <div className='pt-1'>
                    <Link to="/postOne" type="button" className="ิbtn btn-primary btn-sm"> + เพิ่มข้อมูล </Link> {' '}
                    <Link to="/postMultiple" type="button" className="ิbtn btn-info btn-sm"> + เพิ่มข้อมูลได้หลายรูป </Link>{' '}
                    <Link to="/postPDF" type="button" className="ิbtn btn-danger btn-sm"> + เพิ่มข้อมูล PDF </Link>{' '}
                </div>
            )}

            {!loading ?
                posts.length > 0 ?
                    <div className='row row-cols-1 row-cols-md-3 g-2 pt-1'>
                        {posts.map(post => (<Post key={post._id} post={post} />))}
                    </div>
                    :
                    <div className='card-me'>There are no posts as of yet!</div>
                :
                <h1 className="text-danger">...Loading</h1>
            }
        </div>
    )
}
