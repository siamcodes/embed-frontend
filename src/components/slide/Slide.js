import { useDispatch, useSelector } from 'react-redux';
import { slideDeleteView } from '../../store/SlideStore';
import { Link } from 'react-router-dom';
import moment from 'moment';
import renderHTML from 'react-render-html';

export const Slide = ({ slide }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const slideDeleteHandler = () => {
        dispatch(slideDeleteView(slide._id))
    }

    const slideEditHandler = () => {
        dispatch(slideDeleteView(slide._id))
    }

    return (
        <div className='col'>
            <div className='card h-100'>
                {slide.image && <img src={slide.image} alt='sampleImage' style={{ maxHeight: '200px', objectFit: 'cover' }} />}
                <div className='card-body'>
                    <h5 className='catd-title'><Link to={`/slide/${slide._id}`}>{slide.title}</Link></h5>
                    <div className='mb-2'><small className='text-muted'>Writen by {slide.author}  Published {moment(slide.updatedAt).fromNow()}</small></div>
                    <div className='card-text'>{renderHTML(slide.content.substring(0, 250))}</div>

                    <div>
                        {slide.images && slide.images.length > 0 && slide.images.map(image => (
                            <div className='col-sm-6'>
                                <img src={image.image} key={image._id} alt='imageAlt' className='img img-fluid' />
                            </div>
                        ))}
                    </div>
                    {slide.pdfFile && <Link to={slide.pdfFile} target='_blank'>PDF File: {slide.pdfFile}</Link>}

                    {user.username && user.role===`admin` && (
                        <div className='card-body'>
                            <button className='btn btn-danger btn-sm' onClick={slideDeleteHandler}>Delete</button> {' '}
                            <button className='btn btn-info btn-sm' onClick={slideEditHandler}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}