import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { aboutListView } from '../store/AboutStore'
import { courseListView } from '../store/CourseStore';

const Footer = () => {
    const abouts = useSelector(state => state.about.abouts);
    const courses = useSelector(state => state.course.courses);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [courseType, setCourseType] = useState(["สมรรถนะแกนกลาง", "สมรรถนะวิชาชีพ", "เลือกเสรี", "กิจกรรมเสริมหลักสูตร"]);

    useEffect(() => {
        const loadAbout = async () => {
            await dispatch(aboutListView())
            setLoading(false)
        }
        loadAbout();

        const loadCourse = async () => {
            await dispatch(courseListView())
            setLoading(false)
        }
        loadCourse();

    }, [dispatch])


    return (
        <div className="pt-1">
            <footer className="text-lg-start bg-light text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom">
                    <div className="d-none d-lg-block">
                        <span style={{ fontSize: "20px" }}>สาขาเทคโนโลยีระบบสมองกลฝังตัว โรงเรียนจิตรลดาวิชาชีพ</span>
                    </div>
                    <div>
                        <a href style={{ color: "#3498DB", paddingLeft: "10px", fontSize: "30px" }}>
                            <i className='bi bi-facebook' />
                        </a>
                        <a href style={{ color: "#88cc00", paddingLeft: "10px", fontSize: "30px" }}>
                            <i className='bi bi-line' />
                        </a>
                        <a href style={{ color: "#ff0066", paddingLeft: "10px", fontSize: "30px" }}>
                            <i className='bi bi-instagram' />
                        </a>
                        <a href style={{ color: "#33bbff", paddingLeft: "10px", fontSize: "30px" }}>
                            <i className='bi bi-telegram' />
                        </a>
                        <a href style={{ color: "#ff0000", paddingLeft: "10px", fontSize: "30px" }}>
                            <i className='bi bi-youtube' />
                        </a>
                        <a href style={{ color: "#9933ff", paddingLeft: "10px", fontSize: "30px" }}>
                            <i className='bi bi-messenger' />
                        </a>
                        <a href style={{ color: "#66ccff", paddingLeft: "10px", fontSize: "30px" }}>
                            <i className='bi bi-twitter' />
                        </a>
                    </div>
                </section>
                <section>
                    <div className="container text-md-start mt-4">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-3">
                                <h6 className="text-uppercase fw-bold mb-3">Description</h6>
                                <p>
                                    สาขาวิชาเทคโนโลยีระบบสมองกลฝังตัว โรงเรียนจิตรลดาวิชาชีพ 
                                </p>
                            </div>
                            <div className="col-md-2 col-6 col-xl-2 mx-auto mb-3">
                                <h6 className="text-uppercase fw-bold mb-3">Courses</h6>
                                {courseType.map((t) => (
                                    <p className='mb-1 pointer' key={t._id} as={Link} onClick={() => { window.location.href = `/courses` }}>{t}
                                        {/* {courses.map(course => (
                                            <div key={course}>
                                                {course.courseType === t &&
                                                    <div onClick={() => { window.location.href = `/course/${course._id}` }}>{course.title}</div>
                                                }
                                            </div>
                                        ))} */}
                                    </p>
                                ))}
                            </div>
                            <div className="col-md-3 col-6 col-xl-2 mx-auto mb-3">
                                <h6 className="text-uppercase fw-bold mb-3">About</h6>
                                {abouts.map(about => (
                                    <p className="mb-1 pointer" key={about._id} as={Link} onClick={() => { window.location.href = `/about/${about._id}` }}>{about.title} </p>

                                ))}
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-3">
                                <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
                                <p className="mb-2"> สาขาเทคโนโลยีระบบสมองกลฝังตัว โรงเรียนจิตรลดาวิชาชีพ
                                </p>
                                <p className="mb-1">โทร: 092-80644949 </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    Copyright© 2022 : <a className="text-reset fw-bold" href="http://embed.cdti.ac.th/">สาขาวิชาเทคโนโลยีระบบสมองกลฝังตัว </a>
                </div>
            </footer>
        </div>
    )
}


export default Footer;
