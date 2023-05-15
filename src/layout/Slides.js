import Carousel from 'react-bootstrap/Carousel'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { slideListView } from '../store/SlideStore';

export const Slides = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const slides = useSelector(state => state.slide.slides)

    useEffect(() => {
        const loadSlide = async () => {
            await dispatch(slideListView())
            setLoading(false)
        }
        loadSlide()

    }, [dispatch])


    return (!loading ?
        <Carousel>
            {slides.map(slide => (
                <Carousel.Item interval={4000} key={slide._id} onClick={() => { window.location.href = `/slide/${slide._id}` }}>
                    <img
                        className="d-block w-100 h-50"
                        src={slide.image}
                        alt="slideImg"
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.content}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
        : <h2 className='text-danger'>...Loading</h2>
    )

}