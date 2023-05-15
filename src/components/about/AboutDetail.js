import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  useParams} from "react-router-dom"
import { aboutDetailView, aboutListView } from "../../store/AboutStore"
//import moment from 'moment';
import renderHTML from 'react-render-html';
//import Jumbotron from "../../layout/Jumbotron";

export const AboutDetail = () => {

    const { aboutID } = useParams()
    const abouts = useSelector(state => state.about.abouts)
    const about = useSelector(state => state.about.about)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadAbout = async () => {
            await dispatch(aboutListView())
            setLoading(false)
        }
        loadAbout();

        const aboutDetail = async () => {
            await dispatch(aboutDetailView(aboutID))
            setLoading(false)
        }
        aboutDetail()
    }, [dispatch])

    return (
        !loading ?
            <div className="row pt-1">
                <div className="col-md-9">
                    <div className="card">
                        {/* <img className='img-fluid' src={about.image} alt='aboutImage' />  */}
                        <div className="jumbotron text-danger h1 fw-bold text-center">
                            {/* <Jumbotron text={[
                                "โรงเรียนฝึกอาชีพกรุงเทพมหานคร (ดินแดง1)",
                                "เปิดสอนหลักสูตรฝึกอาชีพระยะสั้น",
                                "จบแล้ว ได้ใบประกาศจากกรุงเทพมหานคร"
                            ]} /> */}
                        </div>
                        <div className="card-body">
                            <h2 className="card-title text-danger fw-bold ">
                                {about.title}
                            </h2>
                            {about.content &&
                                <div className="catd-text">{renderHTML(about.content)}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <ul className="list-group list-group-flush mb-3">
                        {abouts.map(about => (
                            <li key={about._id} className="list-group-item list-group-item-action pointer fw-light" onClick={() => { window.location.href = `/about/${about._id}` }}> {about.title} </li>
                        ))}
                    </ul>
                </div>
            </div>
            :
            <h1 className="text-danger">...Loading</h1>
    )
}