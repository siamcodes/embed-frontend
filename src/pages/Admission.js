import React from 'react'
import {
  Redirect,
} from "react-router-dom";

const Admission = () => {
  return (
    <div>
      <h2>สมัครเรียน</h2>
      <Redirect to={window.open(`http://www.bmatraining.ac.th/school-course/1/typesub/99`)}  />
    </div>
  )
}

export default Admission;



