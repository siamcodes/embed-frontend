import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { alertSliceActions } from '../../store/AlertStore';
import { courseCreateOneView } from '../../store/CourseStore';
import { AlertComponent } from '../AlertComponent';

import ReactQuill from 'react-quill';
//import "react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from '../../helpers/quill';

export const CourseOneForm = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [author, setAuthor] = useState('');
    const [courseType, setCourseType] = useState('');
    const [courseID, setCourseID] = useState('');
    const [major, setMajor] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    useEffect(() => {

    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (title !== '' && content !== '' && file !== '') {
            // console.log(file)    
            // const courseObj = {title, content, file}
            // console.log(courseObj)

            const formData = new FormData();

            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', file);
            formData.append('author', user.username);
            formData.append('courseType', courseType);
            formData.append('courseID', courseID);
            formData.append('major', major);
            //console.log(...formData)

            const result = dispatch(courseCreateOneView(formData));

            if (result) {
                setContent("")
                history.push('/courses');
            }
        } else {
            dispatch(alertSliceActions.showAlert({ message: 'All fields should have a value', variant: 'alert-danger' }))
        }
    }

    const handleContent = (e) => {
        setContent(e)
    }

    const handleCourseType = (e) => {
        // console.log(e.target.name, '----> ', e.target.value);
        setCourseType(e.target.value);
    }

    const handleMajor = (e) => {
        console.log(e.target.name, '--> ', e.target.value);
        setMajor(e.target.value);
    }

    return (
        <div className='card-me'>
            <h3>Create Course</h3>
            <AlertComponent />

            <form onSubmit={onSubmitHandler}>
                <div className='row mb-3'>
                    <div className='col-md-2'>
                        <input className='form-control' type='text' placeholder='รหัสวิชา' value={courseID} onChange={(e) => setCourseID(e.target.value)} />
                    </div>
                    <div className='col-md-6'>
                        <input className='form-control' type='text' placeholder='ชื่อวิชา' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='col-md-2'>
                        <select className="form-control" name='courseType' onChange={handleCourseType}>
                            <option>เลือกประเภทวิชา</option>
                            {/* 
                            {courseType.map((c) => (
                                    <option key={c} value={`${c}`}>{c}</option>
                                ))} 
                                */}
                            <option value={'หลักสูตรอุตสาหกรรม'}>หลักสูตรอุตสาหกรรม</option>
                            <option value={'หลักสูตรเทคโนโลยีสารสนเทศ'}>หลักสูตรเทคโนโลยีสารสนเทศ</option>
                            <option value={'หลักสูตรพาณิชยกรรม'}>หลักสูตรพาณิชยกรรม</option>
                            <option value={'หลักสูตรคหกรรม'}>หลักสูตรคหกรรม</option>
                            <option value={'หลักสูตรนวด'}>หลักสูตรนวด</option>
                        </select>
                    </div>
                    <div className='col-md-2'>
                        <select className="form-control" name='major'>
                            <option>เลือกสาขาวิชา</option>
                            <option value={'ช่างยนต์'}>ช่างยนต์</option>
                            <option value={'ช่างไฟฟ้ากำลัง'}>ช่างไฟฟ้ากำลัง</option>
                            <option value={'ช่างอิเล็กทรอนิกส์'}>ช่างอิเล็กทรอนิกส์</option>
                            <option value={'เทคโนโลยีสารสนเทศ'}>เทคโนโลยีสารสนเทศ</option>
                            <option value={'คอมพิวเตอร์ธุรกิจ'}>คอมพิวเตอร์ธุรกิจ</option>
                            <option value={'ภาษาต่างประเทศ'}>ภาษาต่างประเทศ</option>
                            <option value={'อาหารและโภชนาการ'}>อาหารและโภชนาการ</option>


                        </select>
                    </div>
                </div>


                {/*  <textarea className='form-control mb-3' type='text' placeholder='เนื้อหา' value={content} onChange={(e) => setContent(e.target.value)} /> */}
                <ReactQuill
                    modules={QuillModules}
                    formats={QuillFormats}
                    className='mb-3'
                    onChange={handleContent}
                    placeholder='เนื้อหา'
                />
                <input className='form-control mb-3' type='file' onChange={(e) => setFile(e.target.files[0])} />
                <input className='form-control mb-3' type='text' placeholder='ผู้เขียน' value={user.username} onChange={(e) => setAuthor(e.target.value)} hidden />
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
        </div>
    )
}
