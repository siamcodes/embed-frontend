import { createSlice } from "@reduxjs/toolkit";
import { alertSliceActions } from './AlertStore'

//ListView
export const postListView = () => async (dispatch) => {
    let res = await fetch('/posts')
    let data = await res.json()

    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }))
    } else {
        dispatch(postSlice.actions.loadPosts(data))
    }
}

//Create One View
export const postCreateOneView = (postObj) => async (dispatch) => {
    //console.log(...postObj)
    const res = await fetch(`/posts/createOne`, {
        method: 'POST',
        body: postObj
    })

    const data = await res.json();

    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }));
    } else {
        dispatch(postSlice.actions.createPost(data));
    }
}


//Create Multiple View
export const postCreateMultipleView = (postObj) => async (dispatch) => {
    console.log(...postObj)
    let res = await fetch('/api/posts/createMultiple', {
        method: 'POST',
        body: postObj
    })

    let data = await res.json()
    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }));
    } else {
        dispatch(postSlice.actions.createPost(data));
    }
}


//Create PDF View
export const postCreatePDFView = (postObj) => async (dispatch) => {
    console.log(...postObj)
    let res = await fetch('/api/posts/createPDF', {
        method: 'POST',
        body: postObj
    })

    let data = await res.json()
    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }));
    } else {
        dispatch(postSlice.actions.createPost(data));
    }
}


//Delete View
export const postDeleteView = (postID) => async (dispatch) => {
    let res = await fetch(`/api/posts/delete/${postID}`, {
        method: 'DELETE',
    })
    let data = await res.json();

    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }));
    } else {
        dispatch(postSlice.actions.deletePost(postID));
    }
}

//Detail
export const postDetailView = (postID) => async (dispatch) => {
    let res = await fetch(`/api/api/posts/${postID}`);
    let data = await res.json();

    if (data.error) {
        dispatch(alertSliceActions.showAlert({ message: data.error, variant: 'alert-danger' }));
        return false
    } else {
        dispatch(postSliceActions.postDetail(data));
        return true
    }
}


//Update View
export const postUpdateView = (token, postID, postObj) => async (dispatch) => {
    console.log('POST--->', ...postObj)
    let res = await fetch(`/api/posts/update/${postID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application.json',
         'Authorization': `Token ${token}`
        },
        body: JSON.stringify(postObj),

    })

    let data = await res.json();

    if (data.message) {
        dispatch(alertSliceActions.showAlert({ message: data.message, variant: 'alert-danger' }));
    } else {
        dispatch(postSlice.actions.updatePost(data));
        return true
    }
}

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        post: {}
    },

    reducers: {
        loadPosts(state, action) {
            return {
                ...state,
                posts: action.payload
            }
        },

        createPost(state, action) {
            return {
                ...state,
                posts: [action.payload].concat(state.posts)
            }
        },

        deletePost(state, action) {
            const updatedPosts = state.posts.filter(post => post._id !== action.payload)
            return {
                ...state,
                posts: updatedPosts
            }
        },

        postDetail(state, action) {
            return {
                ...state,
                post: action.payload
            }
        },

        updatePost(state, action) {
            const updatedPosts = state.posts.map(post => post._id === action.payload ? { ...post, ...action.payload } : { ...post })
            return {
                ...state,
                post: action.payload,
                posts: updatedPosts
            }
        }

    }
})

export const postSliceActions = postSlice.actions
export default postSlice.reducer

