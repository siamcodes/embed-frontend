import { createSlice } from "@reduxjs/toolkit";
import {alertSliceActions} from './AlertStore'

// CourseListView
export const courseListView = () => async (dispatch) => {
    let res = await fetch(`/api/courses`,{
        method: 'GET',
    })

    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(courseSlice.actions.loadCourses(data))
    }
}


// Course Create One View
export const courseCreateOneView = (courseObj) => async (dispatch) => {
    console.log(...courseObj)
    let res = await fetch('/api/courses/createOne',{
        method:'POST',
        body: courseObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(courseSlice.actions.createCourse(data))
    }
}


// Create Multiple View
export const courseCreateMultipleView = (courseObj) => async (dispatch) => {
    console.log(...courseObj)
    let res = await fetch('/api/courses/createMultiple',{
        method:'POST',
        body: courseObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(courseSlice.actions.createCourse(data))
    }
}


// Create PDF View
export const courseCreatePDFView = (courseObj) => async (dispatch) => {
    console.log(...courseObj)
    let res = await fetch('/api/courses/createPDF',{
        method:'POST',
        body: courseObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(courseSlice.actions.createCourse(data))
    }
}


// Course Delete View
export const courseDeleteView = (courseID) => async (dispatch) => {
    let res = await fetch(`/api/courses/delete/${courseID}`,{
        method:'DELETE',
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(courseSlice.actions.deleteCourse(courseID))
    }
}

export const courseDetailView = (courseID) => async (dispatch) => {
    let res = await fetch(`/api/courses/${courseID}`)

    let data = await res.json()
    console.log('Hi ',data)
    
    if(data.error){
        dispatch(alertSliceActions.showAlert({message:data.error, variant:'alert-danger'}))
        return false
    } else {
        dispatch(courseSliceActions.courseDetail(data))
        return true
    }
}


const courseSlice = createSlice({
    name: 'course',
    initialState:{
        courses: [],
        course:{}
    },
    reducers:{
        loadCourses(state, action){
            return{
                ...state,
                courses: action.payload
            }
        },
        createCourse(state, action){
            return{
                ...state,
                courses: [action.payload].concat(state.courses)
            }
        },
        deleteCourse(state, action){    
            const updatedCourses = state.courses.filter(course => course._id !== action.payload)      
            return{
                ...state,
                courses: updatedCourses
            }
        },
        courseDetail(state, action){
            return{
                ...state,
                course: action.payload
            }
        },

    }
})


export const courseSliceActions = courseSlice.actions
export default courseSlice.reducer