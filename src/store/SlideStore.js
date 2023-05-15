import { createSlice } from "@reduxjs/toolkit";
import {alertSliceActions} from './AlertStore'

// SlideListView
export const slideListView = () => async (dispatch) => {
    let res = await fetch('/api/slides')
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(slideSlice.actions.loadSlides(data))
    }
}


// Slide Create One View
export const slideCreateOneView = (slideObj) => async (dispatch) => {
    console.log(...slideObj)
    let res = await fetch('/api/slides/createOne',{
        method:'POST',
        body: slideObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(slideSlice.actions.createSlide(data))
    }
}


// Create Multiple View
export const slideCreateMultipleView = (slideObj) => async (dispatch) => {
    console.log(...slideObj)
    let res = await fetch('/api/slides/createMultiple',{
        method:'POST',
        body: slideObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(slideSlice.actions.createSlide(data))
    }
}


// Create PDF View
export const slideCreatePDFView = (slideObj) => async (dispatch) => {
    console.log(...slideObj)
    let res = await fetch('/api/slides/createPDF',{
        method:'POST',
        body: slideObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(slideSlice.actions.createSlide(data))
    }
}


//  Delete View
export const slideDeleteView = (slideID) => async (dispatch) => {
    let res = await fetch(`/api/slides/delete/${slideID}`,{
        method:'DELETE',
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(slideSlice.actions.deleteSlide(slideID))
    }
}

export const slideDetailView = (slideID) => async (dispatch) => {
    let res = await fetch(`/api/slides/${slideID}`)

    let data = await res.json()
    console.log('Hi--> ',data)

    if (data.error) {
        dispatch(alertSliceActions.showAlert({ message: data.error, variant: 'alert-danger' }))
        return false
    } else {
        dispatch(slideSliceActions.slideDetail(data))
        return true
    }
}


const slideSlice = createSlice({
    name: 'slide',
    initialState:{
        slides: [],
        slide:{}
    },
    reducers:{
        loadSlides(state, action){
            return{
                ...state,
                slides: action.payload
            }
        },
        createSlide(state, action){
            return{
                ...state,
                slides: [action.payload].concat(state.slides)
            }
        },
        deleteSlide(state, action){    
            const updatedSlides = state.slides.filter(slide => slide._id !== action.payload)      
            return{
                ...state,
                slides: updatedSlides
            }
        },
        slideDetail(state, action) {
            return {
                ...state,
                slide: action.payload
            }
        },

    }
})

export const slideSliceActions = slideSlice.actions
export default slideSlice.reducer