import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { activityDetailView, activityListView } from "../../store/ActivityStore"
import moment from 'moment';
import renderHTML from 'react-render-html';

export const ActivityDetail = () => {

    const { activityID } = useParams()
    const activities = useSelector(state => state.activity.activities)
    const activity = useSelector(state => state.activity.activity)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadActivity = async () => {
            await dispatch(activityListView())
            setLoading(false)
        }
        loadActivity();

        const activityDetail = async () => {
            await dispatch(activityDetailView(activityID))
            setLoading(false)
        }
        activityDetail()
    }, [])

    return (
        !loading ?
            <div className="row">
                <div className="col-md-9">
                    <div className="card">
                        <img className='img-fluid' src={activity.image} alt='activityImage' style={{ maxHeight: '250px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h2 className="card-title text-primary fw-bold ">
                                {activity.title}
                            </h2>
                            <div className="mb-3">
                                <small className='text-muted'>Writen by <span className="text-info"> {activity.author}</span>  Published <span className="text-info"> {moment(activity.updatedAt).fromNow()}</span></small>
                            </div>
                            {activity.content &&
                                <div className="catd-text">{renderHTML(activity.content)}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <ul className="list-group list-group-flush mb-3">
                        {activities.map(activity => (
                            <li className="list-group-item list-group-item-action pointer fw-light" key={activity} onClick={() => { window.location.href = `/activity/${activity._id}` }}> {activity.title} </li>
                        ))}
                    </ul>
                </div>
            </div>
            :
            <h1 className="text-danger">...Loading</h1>
    )
}