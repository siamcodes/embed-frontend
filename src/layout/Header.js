import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import logo from '../logodindang1.png';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { userSliceActions } from '../store/UserStore';
import { aboutListView } from '../store/AboutStore'
import { courseListView } from '../store/CourseStore';

export const Header = () => {
    const user = useSelector(state => state.user.user)
    const abouts = useSelector(state => state.about.abouts)
    const courses = useSelector(state => state.course.courses)

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [courseType, setCourseType] = useState(["สมรรถนะแกนกลาง", "สมรรถนะวิชาชีพ", "เลือกเสรี", "กิจกรรมเสริมหลักสูตร"])

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


    const logoutHandler = () => {
        dispatch(userSliceActions.userLogout())
    }

    return (
        <Navbar bg="secondary" expand="md" variant="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} alt='logo' style={{ objectFit: "cover", maxHeight:'32px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="เกี่ยวกับเรา" id="about-nav-dropdown">
                            {abouts.map(about => (
                                <NavDropdown.Item key={about} as={Link} onClick={() => { window.location.href = `/about/${about._id}` }}> {about.title} </NavDropdown.Item>
                            ))}
                        </NavDropdown>

                        <Nav.Link as={Link} to="/person">บุคลากร</Nav.Link>
                        <NavDropdownMenu title="หลักสูตร" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/courses">หลักสูตรที่เปิดสอน</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {courseType.map((t) => (
                                <DropdownSubmenu key={t} as={Link} to={`/courses`} title={`${t}`}>
                                    {courses.map(course => (
                                        <div key={course}>
                                            {course.courseType === t &&
                                                <NavDropdown.Item onClick={() => { window.location.href = `/course/${course._id}` }}>{course.title}</NavDropdown.Item>
                                            }
                                        </div>
                                    ))}
                                </DropdownSubmenu>
                            ))}
                        </NavDropdownMenu>
                        <NavDropdown title="หลักสูตรทั้งหมด" id="about-nav-dropdown">
                            {courses.map(course => (
                                <NavDropdown.Item key={course} onClick={() => { window.location.href = `/course/${course._id}` }}> {course.title} </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <Nav.Link as={Link} to="/admission">สมัครเรียน</Nav.Link>
                        <Nav.Link as={Link} to={`/apply`}>ระเบียบการรับสมัคร</Nav.Link>
                        <Nav.Link as={Link} to="/news">ข่าวกิจกรรม</Nav.Link>
                        <Nav.Link as={Link} to="/blogs">สาระความรู้</Nav.Link>

                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/travel">การเดินทาง</Nav.Link>
                        <Nav.Link as={Link} to="/contact">ติดต่อเรา</Nav.Link>
                        {!user.username && (
                            <>
                                <Nav.Link as={Link} to="/register"><i className="bi bi-person-plus"/> Register</Nav.Link>
                                <Nav.Link as={Link} to="/login"><i className="bi bi-box-arrow-in-right"/> Login</Nav.Link>
                            </>
                        )}
                        {user.username && (
                            <NavDropdown title={user.username} id="user-nav-dropdown" align="end" >
                                
                                <NavDropdown.Item as={Link} to="/profile"><i className="bi bi-person-bounding-box"></i> Profile</NavDropdown.Item>
                                {user.role === 'admin' && (
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/posts">News & Activity</NavDropdown.Item>
                                        {/* <NavDropdown.Item as={Link} to="/postOne">Upload One</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/postMultiple">Upload Multiple</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/postPDF">Upload PDF</NavDropdown.Item> */}

                                        <NavDropdown.Item as={Link} to="/blogs">Blogs</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/abouts">Abouts</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/courses">Courses</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/slides">Slides</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/persons">Persons</NavDropdown.Item>
                                        {/*   <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/activities">Activities</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/activityOne">Create Activity</NavDropdown.Item> */}

                                    </>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}> <i className="bi bi-box-arrow-right"/> Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}