import { useDispatch, useSelector } from 'react-redux';
import { personDeleteView } from '../../store/PersonStore';
import { Link } from 'react-router-dom';
//import moment from 'moment';
import renderHTML from 'react-render-html';

export const Person = ({ person }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const personDeleteHandler = () => {
        dispatch(personDeleteView(person._id))
    }

    const personEditHandler = () => {
        dispatch(personDeleteView(person._id))
    }

    return (
        <div className='col'>
            <div className='card h-100'>
                {person.image && <img src={person.image} alt='sampleImage' style={{ maxHeight: '200px', objectFit: 'cover' }} />}
                <div className='card-body'>
                    <h5 className='catd-title'><Link to={`/person/${person._id}`}>{person.fullname}</Link></h5>
                    <p>{person.position}</p>
                    <p>{person.academic}</p>
                    <div className='card-text'>{renderHTML(person.description.substring(0, 250))}</div>
                    <div>
                        {person.images && person.images.length > 0 && person.images.map(image => (
                            <div className='col-sm-6'>
                                <img src={image.image} key={image._id} alt='imageAlt' className='img img-fluid' />
                            </div>
                        ))}
                    </div>
                    {person.pdfFile && <Link to={person.pdfFile} target='_blank'>PDF File: {person.pdfFile}</Link>}
                    {user.username && user.role===`admin` && (
                        <div className='card-body'>
                            <button className='btn btn-danger btn-sm' onClick={personDeleteHandler}>Delete</button> {' '}
                            <button className='btn btn-info btn-sm' onClick={personEditHandler}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

