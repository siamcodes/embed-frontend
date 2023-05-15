import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './AlertStore';
import userReducer from './UserStore';
import postReducer from './PostStore';
import blogReducer from './BlogStore';
import aboutReducer from './AboutStore';
import courseReducer from './CourseStore';
import slideReducer from './SlideStore';
import personReducer from './PersonStore';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        post: postReducer,
        user: userReducer,
        blog: blogReducer,
        about: aboutReducer,
        course: courseReducer,
        slide: slideReducer,
        person: personReducer,

    }
})