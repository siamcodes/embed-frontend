import  React,{ useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import { Home } from "./pages/Home";
import { Layout } from "./layout/Layout";
import { Switch, Route } from 'react-router-dom'
import { RegisterForm } from "./components/auth/RegisterForm";
import { LoginForm } from "./components/auth/LoginForm";
import { Profile } from "./components/auth/Profile";
import { PrivateRoute } from "./layout/PrivateRoute";


import { userVerifyView } from "./store/UserStore";
import { PasswordResetRequest } from "./components/auth/PasswordResetRequest";
import { PasswordResetForm } from "./components/auth/PasswordResetForm";

import { PostMultipleForm } from "./components/post/PostMultipleForm";
import { PostOneForm } from "./components/post/PostOneForm";
import { PostPDFForm } from "./components/post/PostPDFForm";
import { Posts } from "./components/post/Posts";

import Contact from "./pages/Contact";
import Travel from "./pages/Travel";

import News from "./pages/News";
import Apply from "./pages/Apply";
import Admission from "./pages/Admission";
import Person from "./pages/Person";
import { Blogs } from "./components/blog/Blogs";
import { BlogOneForm } from "./components/blog/BlogOneForm";
import { BlogMultipleForm } from "./components/blog/BlogMultipleForm";
import { BlogPDFForm } from "./components/blog/BlogPDFForm";
import { BlogDetail } from "./components/blog/BlogDetail";

import { Abouts } from "./components/about/Abouts";
import { AboutOneForm } from "./components/about/AboutOneForm";
import { AboutMultipleForm } from "./components/about/AboutMultipleForm";
import { AboutPDFForm } from "./components/about/AboutPDFForm";
import { AboutDetail } from "./components/about/AboutDetail";

import { Courses } from "./components/course/Courses";
import { CourseOneForm } from "./components/course/CourseOneForm";
import { CourseMultipleForm } from "./components/course/CourseMultipleForm";
import { CoursePDFForm } from "./components/course/CoursePDFForm";
import { CourseDetail } from "./components/course/CourseDetail";

import { Slides } from "./components/slide/Slides";
import { SlideOneForm } from "./components/slide/SlideOneForm";
import { SlideMultipleForm } from "./components/slide/SlideMultipleForm";
import { SlidePDFForm } from "./components/slide/SlidePDFForm";
import { SlideDetail } from "./components/slide/SlideDetail";

import { Persons } from "./components/person/Persons";
import { PersonOneForm } from "./components/person/PersonOneForm";
import { PersonMultipleForm } from "./components/person/PersonMultipleForm";
import { PersonPDFForm } from "./components/person/PersonPDFForm";
import { PersonDetail } from "./components/person/PersonDetail";

import { Activities } from "./components/activity/Activities";
import { ActivityOneForm } from "./components/activity/ActivityOneForm";
import { ActivityMultipleForm } from "./components/activity/ActivityMultipleForm";
import { ActivityPDFForm } from "./components/activity/ActivityPDFForm";
import { ActivityDetail } from "./components/activity/ActivityDetail";
import { PostDetail } from "./components/post/PostDetail";
import { PostEditForm } from "./components/post/PostEditForm";


function App() {

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        await dispatch(userVerifyView(token))
      }
      setLoading(false)
    }

    verifyUser();

  }, [dispatch])

  return (
    <Layout>
    
      {!loading ?
       <Switch>
        <Route path='/' exact><Home /></Route>
        <Route path='/contact' exact><Contact /></Route>
        <Route path='/travel' exact><Travel /></Route>
        <Route path='/news' exact><News /></Route>
        <Route path='/apply' exact><Apply /></Route>
        <Route path='/admission' exact><Admission /></Route>
        <Route path='/person' exact><Person /></Route> 
        <Route path='/register' exact><RegisterForm /></Route>
        <Route path='/login' exact><LoginForm /></Route>
        <Route path='/passwordResetRequest' exact><PasswordResetRequest /></Route>
        <Route path='/passwordResetForm/:token' exact><PasswordResetForm /></Route>
        <PrivateRoute path='/profile' exact><Profile /></PrivateRoute>

        <PrivateRoute path='/posts' exact><Posts /></PrivateRoute>
        <PrivateRoute path='/postOne' exact><PostOneForm /></PrivateRoute>
        <PrivateRoute path='/postMultiple' exact><PostMultipleForm /></PrivateRoute>
        <PrivateRoute path='/postPDF' exact><PostPDFForm /></PrivateRoute>
        <Route path='/postEdit/:postID' exact><PostEditForm /></Route>
        <Route path='/post/:postID' exact><PostDetail /></Route>

        <Route path='/blogs' exact><Blogs /></Route>
        <PrivateRoute path='/blogOne' exact><BlogOneForm /></PrivateRoute>
        <PrivateRoute path='/blogMultiple' exact><BlogMultipleForm /></PrivateRoute>
        <PrivateRoute path='/blogPDF' exact><BlogPDFForm /></PrivateRoute>
        <Route path='/blog/:blogID' exact><BlogDetail /></Route>

        <Route path='/abouts' exact><Abouts /></Route>
        <PrivateRoute path='/aboutOne' exact><AboutOneForm /></PrivateRoute>
        <PrivateRoute path='/aboutMultiple' exact><AboutMultipleForm /></PrivateRoute>
        <PrivateRoute path='/aboutPDF' exact><AboutPDFForm /></PrivateRoute>
        <Route path='/about/:aboutID' exact><AboutDetail /></Route>

        <Route path='/courses' exact><Courses /></Route>
        <PrivateRoute path='/courseOne' exact><CourseOneForm /></PrivateRoute>
        <PrivateRoute path='/courseMultiple' exact><CourseMultipleForm /></PrivateRoute>
        <PrivateRoute path='/coursePDF' exact><CoursePDFForm /></PrivateRoute>
        <Route path='/course/:courseID' exact><CourseDetail /></Route>

        <Route path='/slides' exact><Slides /></Route>
        <PrivateRoute path='/slideOne' exact><SlideOneForm /></PrivateRoute>
        <PrivateRoute path='/slideMultiple' exact><SlideMultipleForm /></PrivateRoute>
        <PrivateRoute path='/slidePDF' exact><SlidePDFForm /></PrivateRoute>
        <Route path='/slide/:slideID' exact><SlideDetail /></Route>

        <Route path='/persons' exact><Persons /></Route>
        <PrivateRoute path='/personOne' exact><PersonOneForm /></PrivateRoute>
        <PrivateRoute path='/personMultiple' exact><PersonMultipleForm /></PrivateRoute>
        <PrivateRoute path='/personPDF' exact><PersonPDFForm /></PrivateRoute>
        <Route path='/person/:personID' exact><PersonDetail /></Route>

        <Route path='/activities' exact><Activities /></Route>
        <PrivateRoute path='/activityOne' exact><ActivityOneForm /></PrivateRoute>
        <PrivateRoute path='/activityMultiple' exact><ActivityMultipleForm /></PrivateRoute>
        <PrivateRoute path='/activityPDF' exact><ActivityPDFForm /></PrivateRoute>
        <Route path='/activity/:activityID' exact><ActivityDetail /></Route>

      </Switch> : '...Loading'}
    </Layout>
  );
}

export default App;
