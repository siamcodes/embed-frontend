import { createSlice } from "@reduxjs/toolkit";
import {alertSliceActions} from './AlertStore'

// BlogListView
export const blogListView = () => async (dispatch) => {
    let res = await fetch('/api/blogs')
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(blogSlice.actions.loadBlogs(data))
    }
}


// Blog Create One View
export const blogCreateOneView = (blogObj) => async (dispatch) => {
    console.log(...blogObj)
    let res = await fetch('/api/blogs/createOne',{
        method:'POST',
        body: blogObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(blogSlice.actions.createBlog(data))
    }
}


// Create Multiple View
export const blogCreateMultipleView = (blogObj) => async (dispatch) => {
    console.log(...blogObj)
    let res = await fetch('/api/blogs/createMultiple',{
        method:'POST',
        body: blogObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(blogSlice.actions.createBlog(data))
    }
}


// Create PDF View
export const blogCreatePDFView = (blogObj) => async (dispatch) => {
    console.log(...blogObj)
    let res = await fetch('/api/blogs/createPDF',{
        method:'POST',
        body: blogObj
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(blogSlice.actions.createBlog(data))
    }
}


// Blog Delete View
export const blogDeleteView = (blogID) => async (dispatch) => {
    let res = await fetch(`/api/blogs/delete/${blogID}`,{
        method:'DELETE',
    })
    let data = await res.json()
    if(data.message){
        dispatch(alertSliceActions.showAlert({message:data.message, variant:'alert-danger'}))
    } else {
        dispatch(blogSlice.actions.deleteBlog(blogID))
    }
}

export const blogDetailView = (blogID) => async (dispatch) => {
    let res = await fetch(`/api/blogs/${blogID}`)

    let data = await res.json()
    console.log('Hi--> ',data)

    if (data.error) {
        dispatch(alertSliceActions.showAlert({ message: data.error, variant: 'alert-danger' }))
        return false
    } else {
        dispatch(blogSliceActions.blogDetail(data))
        return true
    }
}


const blogSlice = createSlice({
    name: 'blog',
    initialState:{
        blogs: [],
        blog:{}
    },
    reducers:{
        loadBlogs(state, action){
            return{
                ...state,
                blogs: action.payload
            }
        },
        createBlog(state, action){
            return{
                ...state,
                blogs: [action.payload].concat(state.blogs)
            }
        },
        deleteBlog(state, action){    
            const updatedBlogs = state.blogs.filter(blog => blog._id !== action.payload)      
            return{
                ...state,
                blogs: updatedBlogs
            }
        },
        blogDetail(state, action) {
            return {
                ...state,
                blog: action.payload
            }
        },

    }
})

export const blogSliceActions = blogSlice.actions
export default blogSlice.reducer