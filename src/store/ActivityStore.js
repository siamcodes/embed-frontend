import { createSlice } from "@reduxjs/toolkit";
import {alertSliceActions} from './AlertStore'

//gListView
export const activityListView = () => async (dispatch) => {
    let res = await fetch('/api/activities')
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(activitySlice.actions.loadActivities(data))
    }
}


// Create One View
export const activityCreateOneView = (activityObj) => async (dispatch) => {
    console.log(...activityObj)
    let res = await fetch('/api/activities/createOne',{
        method:'POST',
        body: activityObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(activitySlice.actions.createActivity(data))
    }
}


// Create Multiple View
export const activityCreateMultipleView = (activityObj) => async (dispatch) => {
    console.log(...activityObj)
    let res = await fetch('/api/activities/createMultiple',{
        method:'POST',
        body: activityObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(activitySlice.actions.createActivity(data))
    }
}


// Create PDF View
export const activityCreatePDFView = (activityObj) => async (dispatch) => {
    console.log(...activityObj)
    let res = await fetch('/api/activities/createPDF',{
        method:'POST',
        body: activityObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(activitySlice.actions.createActivity(data))
    }
}


// Delete View
export const activityDeleteView = (activityID) => async (dispatch) => {
    let res = await fetch(`/api/activities/delete/${activityID}`,{
        method:'DELETE',
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(activitySlice.actions.deleteActivity(activityID))
    }
}

export const activityDetailView = (activityID) => async (dispatch) => {
    let res = await fetch(`/api/activities/${activityID}`)

    let data = await res.json()
    //console.log('Hi--> ',data)

    if (data.error) {
        dispatch(alertSliceActions.showAlert({ message: data.error, variant: 'alert-danger' }))
        return false
    } else {
        dispatch(activitySliceActions.activityDetail(data))
        return true
    }
}


const activitySlice = createSlice({
    name: 'activity',
    initialState:{
        activities: [],
        activity:{}
    },
    reducers:{
        loadActivities(state, action){
            return{
                ...state,
                activities: action.payload
            }
        },
        createActivity(state, action){
            return{
                ...state,
                activities: [action.payload].concat(state.activities)
            }
        },
        deleteActivity(state, action){    
            const updatedActivities = state.activities.filter(activity => activity._id !== action.payload)      
            return{
                ...state,
                activities: updatedActivities
            }
        },
        activityDetail(state, action) {
            return {
                ...state,
                activity: action.payload
            }
        },

    }
})

export const activitySliceActions = activitySlice.actions
export default activitySlice.reducer