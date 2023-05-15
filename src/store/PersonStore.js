import { createSlice } from "@reduxjs/toolkit";
import {alertSliceActions} from './AlertStore'

// PersongListView
export const personListView = () => async (dispatch) => {
    let res = await fetch('/api/persons')
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(personSlice.actions.loadPersons(data))
    }
}


// Person Create One View
export const personCreateOneView = (personObj) => async (dispatch) => {
    console.log(...personObj)
    let res = await fetch('/api/persons/createOne',{
        method:'POST',
        body: personObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(personSlice.actions.createPerson(data))
    }
}


// Create Multiple View
export const personCreateMultipleView = (personObj) => async (dispatch) => {
    console.log(...personObj)
    let res = await fetch('/api/persons/createMultiple',{
        method:'POST',
        body: personObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(personSlice.actions.createPerson(data))
    }
}


// Create PDF View
export const personCreatePDFView = (personObj) => async (dispatch) => {
    console.log(...personObj)
    let res = await fetch('/api/persons/createPDF',{
        method:'POST',
        body: personObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(personSlice.actions.createPerson(data))
    }
}


// Delete View
export const personDeleteView = (personID) => async (dispatch) => {
    let res = await fetch(`/api/persons/delete/${personID}`,{
        method:'DELETE',
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(personSlice.actions.deletePerson(personID))
    }
}

export const personDetailView = (personID) => async (dispatch) => {
    let res = await fetch(`/api/persons/${personID}`)

    let data = await res.json()
    console.log('Hi--> ',data)

    if (data.error) {
        dispatch(alertSliceActions.showAlert({ message: data.error, variant: 'alert-danger' }))
        return false
    } else {
        dispatch(personSliceActions.personDetail(data))
        return true
    }
}


const personSlice = createSlice({
    name: 'person',
    initialState:{
        persons: [],
        person:{}
    },
    reducers:{
        loadPersons(state, action){
            return{
                ...state,
                persons: action.payload
            }
        },
        createPerson(state, action){
            return{
                ...state,
                persons: [action.payload].concat(state.persons)
            }
        },
        deletePerson(state, action){    
            const updatedPersons = state.persons.filter(person => person._id !== action.payload)      
            return{
                ...state,
                persons: updatedPersons
            }
        },
        personDetail(state, action) {
            return {
                ...state,
                person: action.payload
            }
        },

    }
})

export const personSliceActions = personSlice.actions
export default personSlice.reducer