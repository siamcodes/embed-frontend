import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activityListView } from '../../store/ActivityStore';
import { Activity } from './Activity';

export const Activities = () => {

    const activities = useSelector(state => state.activity.activities)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadActivity = async () => {
            await dispatch(activityListView())
            setLoading(false)
        }
        loadActivity()
    }, [dispatch])


    return !loading ?

        activities.length > 0 ?
<>
            <div className='row row-cols-1 row-cols-md-3 g-2 pt-2'>
                {activities.map(activity => (
                    <Activity key={activity._id} activity={activity} />
                ))}
            </div>
</>
            :
            <div className='card-me'>There are no activity as of yet!</div>
        :
        <h2 className='text-danger'>...Loading</h2>
}
