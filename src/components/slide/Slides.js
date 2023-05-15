import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { slideListView } from '../../store/SlideStore';
import { Slide } from './Slide';


export const Slides = () => {
    const user = useSelector(state => state.user.user)
    const slides = useSelector(state => state.slide.slides)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadSlide = async () => {
            await dispatch(slideListView())
            setLoading(false)
        }
        loadSlide()
    }, [dispatch])


    return !loading ?

        slides.length > 0 ?
            <>
                {user.role === 'admin' && (
                    <Link to="/slideOne" type="button" className="ิbtn btn-primary btn-sm"> + เพิ่มข้อมูล </Link>
                )}
                <div className='row row-cols-1 row-cols-md-3 g-2 pt-2'>
                    {slides.map(slide => (
                        <Slide key={slide._id} slide={slide} />
                    ))}
                </div>
            </>
            :
            <div className='card-me'>There are no slide as of yet!</div>
        :
        <h2 className='text-danger'>...Loading</h2>
}
