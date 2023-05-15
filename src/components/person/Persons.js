import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { personListView } from '../../store/PersonStore';
import { Person } from './Person';


export const Persons = () => {
    const user = useSelector(state => state.user.user)
    const persons = useSelector(state => state.person.persons)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPerson = async () => {
            await dispatch(personListView())
            setLoading(false)
        }
        loadPerson()
    }, [dispatch])


    return !loading ?

        persons.length > 0 ?
            <>
                {user.role === 'admin' && (
                    <Link to="/personOne" type="button" className="ิbtn btn-primary btn-sm"> + เพิ่มข้อมูล </Link>
                )}
                <div className='row row-cols-1 row-cols-md-3 g-2 pt-2'>
                    {persons.map(person => (
                        <Person key={person._id} person={person} />
                    ))}
                </div>
            </>
            :
            <div className='card-me'>There are no person as of yet!</div>
        :
        <h2 className='text-danger'>...Loading</h2>
}
