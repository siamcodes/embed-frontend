import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { personDetailView, personListView } from "../../store/PersonStore"
import moment from 'moment';
import renderHTML from 'react-render-html';

export const PersonDetail = () => {

    const { personID } = useParams()
    const persons = useSelector(state => state.person.persons)
    const person = useSelector(state => state.person.person)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPerson = async () => {
            await dispatch(personListView())
            setLoading(false)
        }
        loadPerson();

        const personDetail = async () => {
            await dispatch(personDetailView(personID))
            setLoading(false)
        }
        personDetail()
    }, [])

    return (
        !loading ?
            <div className="row pt-1">
                <div className="col-md-9">
                    <div className="card">
                        <img className='img-fluid' src={person.image} alt='personImage' style={{ maxHeight: '250px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h2 className="card-title text-primary fw-bold ">
                                {person.fullname}
                            </h2>
                            <p>{person.position}</p>
                            <div>{person.academic}</div>
                            {person.description &&
                                <div className="catd-text">{renderHTML(person.description)}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <ul className="list-group list-group-flush mb-3">
                        {persons.map(person => (
                            <li className="list-group-item list-group-item-action pointer fw-light" key={person} onClick={() => { window.location.href = `/person/${person._id}` }}> {person.fullname} </li>
                        ))}
                    </ul>
                </div>
            </div>
            :
            <h1 className="text-danger">...Loading</h1>
    )
}