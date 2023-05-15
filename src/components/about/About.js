import { useDispatch, useSelector } from 'react-redux';
import { aboutDeleteView } from '../../store/AboutStore';
import { Link } from 'react-router-dom';
//import moment from 'moment';
import renderHTML from 'react-render-html';


export const About = ({ about }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const aboutDeleteHandler = () => {
        dispatch(aboutDeleteView(about._id))
    }

    const aboutEditHandler = () => {
        // dispatch(aboutDeleteView(about._id))
    }

    return (
        <div className='card'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-7'>
                        <h3 key={about._id}><Link to={`/about/${about._id}`}>{about.title}</Link></h3>
                        {renderHTML(about.content.substring(0, 250))}
                    </div>
                    <div className='col-md-3'>
                        {about.image && <img src={about.image} alt='sampleImage' className='img img-fluid' />}
                        {about.images && about.images.length > 0 && about.images.map(image => (
                            <img src={image.image} key={image._id} alt='imageAlt' className='img img-fluid' />
                        ))}
                        {about.pdfFile && <Link to={about.pdfFile} target='_blank'>PDF File: {about.pdfFile}</Link>}
                    </div>
                    {user.username && user.role && (
                        <div className='col-md-2'>
                            <button className='btn btn-danger' onClick={aboutDeleteHandler}>Delete</button> {''}
                            <button className='btn btn-info' onClick={aboutEditHandler}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}