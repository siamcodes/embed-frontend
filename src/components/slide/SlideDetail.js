import React,{ useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { slideDetailView, slideListView } from "../../store/SlideStore"
import moment from 'moment';
import renderHTML from 'react-render-html';

export const SlideDetail = () => {

    const dispatch = useDispatch()
    const { slideID } = useParams()
    const slides = useSelector(state => state.slide.slides)
    const slide = useSelector(state => state.slide.slide)
    

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadSlide = async () => {
            await dispatch(slideListView())
            setLoading(false)
        }
        loadSlide();

        const slideDetail = async () => {
            await dispatch(slideDetailView(slideID))
            setLoading(false)
        }
        slideDetail()

    }, [dispatch])

    return (
        !loading ?
            <div className="row">
                <div className="col-md-9">
                    <div className="card">
                        <img className='img-fluid' src={slide.image} alt='slideImage' style={{ maxHeight: '250px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h2 className="card-title text-primary fw-bold ">
                                {slide.title}
                            </h2>
                            <div className="mb-3">
                                <small className='text-muted'>Writen by <span className="text-info"> {slide.author}</span>  Published <span className="text-info"> {moment(slide.updatedAt).fromNow()}</span></small>
                            </div>
                            {slide.content &&
                                <div className="catd-text">{renderHTML(slide.content)}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <ul className="list-group list-group-flush mb-3">
                        {slides.map(slide => (
                            <li className="list-group-item list-group-item-action pointer fw-light" key={slide} onClick={() => { window.location.href = `/slide/${slide._id}` }}> {slide.title} </li>
                        ))}
                    </ul>
                </div>
            </div>
            :
            <h1 className="text-danger">...Loading</h1>
    )
}