import { createSlice } from "@reduxjs/toolkit";
import { alertSliceActions } from './AlertStore';


// AboutListView
export const aboutListView = () => async (dispatch) => {
    let res = await fetch('/api/abouts')
    
    let data = await res.json()
    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }))
    } else {
        dispatch(aboutSlice.actions.loadAbouts(data))
    }
}


// About Create One View
export const aboutCreateOneView = (aboutObj) => async (dispatch) => {
    console.log(...aboutObj)
    let res = await fetch('/api/abouts/createOne', {
        method: 'POST',
        body: aboutObj
    })
    let data = await res.json()
    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }))
    } else {
        dispatch(aboutSlice.actions.createAbout(data))
    }
}


// Create Multiple View
export const aboutCreateMultipleView = (aboutObj) => async (dispatch) => {
    console.log(...aboutObj)
    let res = await fetch('/api/abouts/createMultiple', {
        method: 'POST',
        body: aboutObj
    })
    let data = await res.json()
    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }))
    } else {
        dispatch(aboutSlice.actions.createAbout(data))
    }
}


// Create PDF View
export const aboutCreatePDFView = (aboutObj) => async (dispatch) => {
    console.log(...aboutObj)
    let res = await fetch('/api/abouts/createPDF', {
        method: 'POST',
        body: aboutObj
    })
    let data = await res.json()
    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }))
    } else {
        dispatch(aboutSlice.actions.createAbout(data))
    }
}


// About Delete View
export const aboutDeleteView = (aboutID) => async (dispatch) => {
    let res = await fetch(`/api/abouts/delete/${aboutID}`, {
        method: 'DELETE',
    })

    let data = await res.json()
    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }))
    } else {
        dispatch(aboutSlice.actions.deleteAbout(aboutID))
    }
}


export const aboutDetailView = (aboutID) => async (dispatch) => {
    let res = await fetch(`/api/abouts/${aboutID}`)

    let data = await res.json()
    console.log('Hi--> ',data)

    if (data.error) {
        dispatch(alertSliceActions.showAlert({ message: data.error, variant: 'alert-danger' }))
        return false
    } else {
        dispatch(aboutSliceActions.aboutDetail(data))
        return true
    }
}


const aboutSlice = createSlice({
    name: 'about',
    initialState: {
        abouts: [],
        about: {}
    },
    reducers: {
        loadAbouts(state, action) {
            return {
                ...state,
                abouts: action.payload
            }
        },
        createAbout(state, action) {
            return {
                ...state,
                abouts: [action.payload].concat(state.abouts)
            }
        },
        deleteAbout(state, action) {
            const updatedAbouts = state.abouts.filter(about => about._id !== action.payload)
            return {
                ...state,
                abouts: updatedAbouts
            }
        },
        aboutDetail(state, action) {
            return {
                ...state,
                about: action.payload
            }
        },

    }
})

export const aboutSliceActions = aboutSlice.actions
export default aboutSlice.reducer