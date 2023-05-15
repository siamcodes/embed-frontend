import { useDispatch, useSelector } from 'react-redux';
import { activityDeleteView } from '../../store/ActivityStore';
import { Link } from 'react-router-dom';
import moment from 'moment';
import renderHTML from 'react-render-html';

export const Activity = ({ activity }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const activityDeleteHandler = () => {
        dispatch(activityDeleteView(activity._id))
    }

    const activityEditHandler = () => {
        dispatch(activityDeleteView(activity._id))
    }

    return (
        <div className='col'>
            <div className='card h-100'>
                {activity.image && <img src={activity.image} alt='sampleImage' style={{ maxHeight: '200px', objectFit: 'cover' }} />}
                <div className='card-body'>
                    <h5 className='catd-title'><Link to={`/activity/${activity._id}`}>{activity.title}</Link></h5>
                    <div className='mb-2'><small className='text-muted'>Writen by {activity.author}  Published {moment(activity.updatedAt).fromNow()}</small></div>
                    <div className='card-text'>{renderHTML(activity.content.substring(0, 250))}</div>

                    <div>
                        {activity.images && activity.images.length > 0 && activity.images.map(image => (
                            <div className='col-sm-6'>
                                <img src={image.image} key={image._id} alt='imageAlt' className='img img-fluid' />
                            </div>
                        ))}
                    </div>
                    {activity.pdfFile && <Link to={activity.pdfFile} target='_blank'>PDF File: {activity.pdfFile}</Link>}

                    {user.username && user.role===`admin` && (
                        <div className='card-body'>
                            <button className='btn btn-danger btn-sm' onClick={activityDeleteHandler}>Delete</button> {' '}
                            <button className='btn btn-info btn-sm' onClick={activityEditHandler}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}