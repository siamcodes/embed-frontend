import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseListView } from '../../store/CourseStore';
import { Course } from './Course';


export const Courses = () => {
    const user = useSelector(state => state.user.user)
    const courses = useSelector(state => state.course.courses)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadCourse = async () => {
            await dispatch(courseListView())
            setLoading(false)
        }
        loadCourse()
    }, [dispatch])


    return !loading ?

        courses.length > 0 ?
            <>
             {user.role === 'admin' && (
                <Link to="/courseOne" type="button" className="ิbtn btn-primary btn-sm"> + เพิ่มข้อมูล </Link>
             )}
                <div className='row row-cols-1 row-cols-md-3 g-2'>
                    {courses.map(course => (
                        <Course key={course._id} course={course} />
                    ))}
                </div>
            </>
            :
            <div className='card-me'>There are no course as of yet!</div>
        :
        <h2 className='text-danger'>...Loading</h2>
}
