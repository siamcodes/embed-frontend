import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { personListView } from '../store/PersonStore';
import { Link } from 'react-router-dom';
//import moment from 'moment';
//import renderHTML from 'react-render-html';

const Person = () => {
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

  return (
    !loading ?

      persons.length > 0 ?
        <div className='row row-cols-1 row-cols-md-3 g-2 pt-2'>
          {persons.map(person => (
            <>
              {person.position === "ผอ.สถานศึกษา" &&
                <div className='col-md-12'>
                  <div className='h-100 text-center'>
                    {person.image && <img src={person.image} alt='sampleImage' className="avatar" />}
                    <div>
                      <h4><Link to={`/person/${person._id}`}>{person.fullname}</Link></h4>
                      <p className='mb-1'>{person.position}</p>
                      <p>{person.academic}</p>
                    </div>
                  </div>
                </div>
              }
              {person.position === "รผอ.สถานศึกษา" &&
                <div className='col-md-6'>
                  <div className='h-100 text-center'>
                    {person.image && <img src={person.image} alt='sampleImage' className="avatar" />}
                    <div>
                      <h4><Link to={`/person/${person._id}`}>{person.fullname}</Link></h4>
                      <p className='mb-1'>{person.position}</p>
                      <p>{person.academic}</p>
                    </div>
                  </div>
                </div>
              }
              {person.position !== "ผอ.สถานศึกษา" && person.position !== "รผอ.สถานศึกษา" &&
                <div className='col-md-4'>
                  <div className='h-100 text-center'>
                    {person.image && <img src={person.image} alt='sampleImage' className="avatar" />}
                    <div>
                      <h4><Link to={`/person/${person._id}`}>{person.fullname}</Link></h4>
                      <p className='mb-1'>{person.position}</p>
                      <p>{person.academic}</p>
                    </div>
                  </div>
                </div>
              }
            </>
          ))}
        </div>
        :
        <div className='card-me'>There are no person as of yet!</div>
      :
      <h2 className='text-danger'>...Loading</h2>
  )
}

export default Person;



