import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
//import { useParams, useSearchParams } from "react-router-dom"
import { aboutDetailView, aboutListView } from "../store/AboutStore"
//import moment from 'moment';
import renderHTML from 'react-render-html';
import Jumbotron from "../layout/Jumbotron";
import Iframe from 'react-iframe';


const Travel = () => {
 // const { aboutID } = useParams()
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
      await dispatch(aboutDetailView(`620d2af20331cd180fb8b76f`))
      setLoading(false)
    }
    aboutDetail()
  }, [dispatch])

  return (
    !loading ?
      <div className="row pt-1">
        <div className="col-md-9">
          <div className="card">
            {/*  <img className='img-fluid' src={about.image} alt='aboutImage' /> */}
            <div className="jumbotron text-danger h1 fw-bold text-center">
              <Jumbotron text={[
                "โรงเรียนฝึกอาชีพกรุงเทพมหานคร (ดินแดง1)",
                "เปิดสอนหลักสูตรฝึกอาชีพระยะสั้น",
                "จบแล้ว ได้ใบประกาศจากกรุงเทพมหานคร"
              ]} />
            </div>
            <div className="card-body">
              <h2 className="card-title text-danger fw-bold ">
                {about.title}
              </h2>
              {about.content &&
                <div className="catd-text">{renderHTML(about.content)}</div>
              }
              
              <hr />
              <Iframe url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7316.39254501795!2d100.556838!3d13.768912!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xee38b1d37cda3c91!2z4LmC4Lij4LiH4LmA4Lij4Li14Lii4LiZ4Lid4Li24LiB4Lit4Liy4LiK4Li14Lie4LiB4Lij4Li44LiH4LmA4LiX4Lie4Lih4Lir4Liy4LiZ4LiE4LijKOC4lOC4tOC4meC5geC4lOC4hzEp!5e1!3m2!1sth!2sth!4v1645286715822!5m2!1sth!2sth"
                width="100%"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative" />

            </div>
          </div>

        </div>
        <div className="col-md-3">
          <ul className="list-group list-group-flush mb-3">
            {abouts.map(about => (
              <li className="list-group-item list-group-item-action pointer fw-light" onClick={() => { window.location.href = `/about/${about._id}` }}> {about.title} </li>
            ))}
          </ul>
        </div>
      </div>
      :
      <h1 className="text-danger">...Loading</h1>
  )
}

export default Travel;






