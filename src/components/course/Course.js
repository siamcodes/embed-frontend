import { useDispatch, useSelector } from 'react-redux';
import { courseDeleteView } from '../../store/CourseStore';
import { Link } from 'react-router-dom';
import moment from 'moment';
import renderHTML from 'react-render-html';

export const Course = ({ course }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const courseDeleteHandler = () => {
        dispatch(courseDeleteView(course._id))
    }

    const courseEditHandler = () => {
        dispatch(courseDeleteView(course._id))
    }

    return (
        <div className='col pt-1'>
            <div className='card'>
                 {course.image && <img src={course.image} alt='sampleImage' style={{ maxHeight: '50px', objectFit: 'cover' }} />} 
                <div className='card-body'>
                    <h5 className='catd-title'><Link to={`/course/${course._id}`}>{course.title}</Link></h5>
                    <div className='card-text'>{renderHTML(course.content.substring(0, 250))}</div>
                    <div className='card-text'><small className='text-muted'>Published {moment(course.updatedAt).fromNow()}</small></div>
                    <div>
                        {course.images && course.images.length > 0 && course.images.map(image => (
                            <div className='col-sm-6'>
                                <img src={image.image} key={image._id} alt='imageAlt' className='img img-fluid' />
                            </div>
                        ))}
                    </div>
                    {course.pdfFile && <Link to={course.pdfFile} target='_blank'>PDF File: {course.pdfFile}</Link>}

                    {user.username && user.role===`admin` && (
                        <div className='card-body'>
                            <button className='btn btn-danger btn-sm' onClick={courseDeleteHandler}>Delete</button> {' '}
                            <button className='btn btn-info btn-sm' onClick={courseEditHandler}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

