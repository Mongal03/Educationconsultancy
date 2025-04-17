import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateCourseId, saveCourse } from '../../Services/CourseService';

const CourseAddition = () => {
    const [course, setCourse] = useState({
        courseId: 0,
        courseName: '',
        hours: '',
        price: '',
        technology: ''
    });

    const [newId, setNewId] = useState(0);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        generateCourseId().then((response) => {
            setNewId(response.data);
        });
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCourse((values) => ({ ...values, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // clear error on change
    };

    const validate = () => {
        const newErrors = {};
        if (!course.courseName.trim()) newErrors.courseName = 'Course name is required';
        if (!course.hours || isNaN(course.hours) || course.hours <= 0) newErrors.hours = 'Hours must be a positive number';
        if (!course.price || isNaN(course.price) || course.price <= 0) newErrors.price = 'Price must be a positive number';
        if (!course.technology.trim()) newErrors.technology = 'Technology is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const courseSave = (event) => {
        event.preventDefault();
        if (!validate()) return;
        course.courseId = newId;
        saveCourse(course).then(() => {
            alert("✅ New course has been saved!");
            navigate('/AdminMenu');
        });
    };

    return (
        <div className="course-add-container">
            <style>{`
                .course-add-container {
                    background: linear-gradient(to right, #f0f2f5, #e4eaf0);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    font-family: 'Segoe UI', sans-serif;
                }

                .form-card {
                    background: white;
                    padding: 40px 30px;
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 600px;
                }

                .form-title {
                    text-align: center;
                    font-size: 28px;
                    font-weight: 600;
                    color: #2c3e50;
                    margin-bottom: 30px;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                label {
                    font-weight: 500;
                    display: block;
                    margin-bottom: 6px;
                    color: #333;
                }

                input.form-control {
                    width: 100%;
                    padding: 10px 14px;
                    font-size: 15px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    transition: border-color 0.3s;
                }

                input.form-control:focus {
                    border-color: #007bff;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
                }

                .error-text {
                    color: red;
                    font-size: 13px;
                    margin-top: 4px;
                }

                .button-group {
                    display: flex;
                    justify-content: center;
                    margin-top: 30px;
                    gap: 15px;
                }

                .btn-submit {
                    background: linear-gradient(135deg, #28a745, #218838);
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                }

                .btn-submit:hover {
                    background: linear-gradient(135deg, #218838, #1e7e34);
                    transform: scale(1.05);
                }

                .btn-cancel {
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                }

                .btn-cancel:hover {
                    background: #5a6268;
                    transform: scale(1.05);
                }

                @media (max-width: 600px) {
                    .form-card {
                        padding: 30px 20px;
                    }

                    .form-title {
                        font-size: 22px;
                    }
                }
            `}</style>

            <div className="form-card">
                <h2 className="form-title">📚 Add New Course</h2>
                <form onSubmit={courseSave}>
                    <div className="form-group">
                        <label>Course ID</label>
                        <input
                            type="text"
                            name="courseId"
                            className="form-control"
                            value={newId}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Course Name</label>
                        <input
                            type="text"
                            name="courseName"
                            className="form-control"
                            value={course.courseName}
                            onChange={onChangeHandler}
                        />
                        {errors.courseName && <div className="error-text">{errors.courseName}</div>}
                    </div>

                    <div className="form-group">
                        <label>Hours</label>
                        <input
                            type="number"
                            name="hours"
                            className="form-control"
                            value={course.hours}
                            onChange={onChangeHandler}
                        />
                        {errors.hours && <div className="error-text">{errors.hours}</div>}
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={course.price}
                            onChange={onChangeHandler}
                        />
                        {errors.price && <div className="error-text">{errors.price}</div>}
                    </div>

                    <div className="form-group">
                        <label>Technology</label>
                        <input
                            type="text"
                            name="technology"
                            className="form-control"
                            value={course.technology}
                            onChange={onChangeHandler}
                        />
                        {errors.technology && <div className="error-text">{errors.technology}</div>}
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn-submit">Save</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/AdminMenu')}>Return</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseAddition;
