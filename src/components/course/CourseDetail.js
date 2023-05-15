import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { courseDetailView, courseListView } from "../../store/CourseStore"
import { Link } from 'react-router-dom';
import { LoadingSpinner } from "../LoadingSpinner"
import moment from 'moment';
import renderHTML from 'react-render-html';

export const CourseDetail = () => {

    const { courseID } = useParams()
    const course = useSelector(state => state.course.course)
    const courses = useSelector(state => state.course.courses)

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [courseType, setCourseType] = useState(["หลักสูตรอุตสาหกรรม", "หลักสูตรเทคโนโลยีสารสนเทศ", "หลักสูตรพาณิชยกรรม", "หลักสูตรคหกรรม", "หลักสูตรนวด"])

    useEffect(() => {
        const courseDetail = async () => {
            await dispatch(courseDetailView(courseID))
            setLoading(false)
        }
        courseDetail()

        const loadCourse = async () => {
            await dispatch(courseListView())
            setLoading(false)
        }
        loadCourse();

    }, [dispatch])


    return (!loading ?
        <div className="row pt-1">
            <div className="col-md-9">
                <div className="card">
                    {/*  <img className='img-fluid' src={course.image} alt='courseImage' /> */}
                    <div className="card-body">
                        <h2 className="card-title text-danger fw-bold"> {course.title}</h2>
                        {course.content &&
                            <div className="catd-text">{renderHTML(course.content)}</div>
                        }
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                {courseType.map((t) => (
                    <ul className="list-group list-group-flush mb-3" as={Link} to={`/courses`} >
                        <li style={{ listStyleType: 'none', fontWeight: 'bold', color: '#FF8000' }}>{t}</li>
                        {courses.map((course,index) => (
                            <div key={index}>
                                {course.courseType === t &&
                                    <li className="list-group-item list-group-item-action pointer fw-light" onClick={() => { window.location.href = `/course/${course._id}` }}>{course.title}</li>
                                }
                            </div>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
        :
        <h1 className="text-danger">...Loading</h1>
    )
}