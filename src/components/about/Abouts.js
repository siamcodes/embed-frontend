import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { aboutListView } from '../../store/AboutStore'
import { About } from './About'

export const Abouts = () => {
    const user = useSelector(state => state.user.user)
    const abouts = useSelector(state => state.about.abouts)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadAbout = async () => {
            await dispatch(aboutListView())
            setLoading(false)
        }
        loadAbout()
    }, [dispatch])


    return !loading ?

        abouts.length > 0 ?
            <>
                {user.role === 'admin' && (
                    <Link to="/aboutOne" type="button" className="ิbtn btn-primary btn-lg"> + เพิ่มข้อมูล </Link>
                )}
                {abouts.map(about => (<About key={about._id} about={about} />))}
            </>
            :
            <div className='card-me'>There are no about as of yet!</div>
        :
        <div className='card-me'><h1 className='text-danger'>...Loading</h1></div>
}
