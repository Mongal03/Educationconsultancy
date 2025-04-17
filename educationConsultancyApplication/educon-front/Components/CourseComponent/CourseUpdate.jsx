import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { displayCourseById, updateCourse } from '../../Services/CourseService';

const CourseUpdate = () => {
    const [course, setCourse] = useState({
        courseId: 0,
        courseName: '',
        hours: '',
        price: '',
        technology: ''
    });

    const navigate = useNavigate();
    const { courseId } = useParams();

    useEffect(() => {
        displayCourseById(courseId).then((response) => {
            setCourse(response.data);
        });
    }, [courseId]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };

    const courseSave = (event) => {
        event.preventDefault();
        updateCourse(course).then(() => {
            alert("✅ Course has been updated successfully.");
            navigate('/admin-course-list');
        });
    };

    return (
        <div className="course-update-container">
            <style>{`
                .course-update-container {
                    background: linear-gradient(to right, #f0f4f8, #d9e2ec);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 30px 20px;
                    font-family: 'Segoe UI', sans-serif;
                }

                .form-card {
                    background: white;
                    padding: 40px 30px;
                    border-radius: 16px;
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    width: 100%;
                }

                .form-title {
                    text-align: center;
                    font-size: 28px;
                    font-weight: 600;
                    color: #2c3e50;
                    margin-bottom: 25px;
                }

                .form-group {
                    margin-bottom: 18px;
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

                .button-group {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 30px;
                }

                .btn-save {
                    background: linear-gradient(135deg, #007bff, #0056b3);
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s ease, background 0.3s ease;
                }

                .btn-save:hover {
                    background: linear-gradient(135deg, #0056b3, #004094);
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
                    transition: transform 0.2s ease, background 0.3s ease;
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
                <h2 className="form-title">✏️ Update Course</h2>
                <form onSubmit={courseSave}>
                    <div className="form-group">
                        <label>Course ID</label>
                        <input
                            name="courseId"
                            className="form-control"
                            value={course.courseId}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Course Name</label>
                        <input
                            name="courseName"
                            className="form-control"
                            value={course.courseName}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Hours</label>
                        <input
                            type="number"
                            name="hours"
                            className="form-control"
                            value={course.hours}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={course.price}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Technology</label>
                        <input
                            name="technology"
                            className="form-control"
                            value={course.technology}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/admin-course-list')}>Return</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseUpdate;

