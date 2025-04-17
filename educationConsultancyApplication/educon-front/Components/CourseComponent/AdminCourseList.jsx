import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { displayAllCourses, deleteCourseById } from '../../Services/CourseService';

const AdminCourseList = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        displayAllCourses()
            .then((response) => setCourses(response.data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    const removeCourse = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            deleteCourseById(id)
                .then(() => setCourses(courses.filter(course => course.courseId !== id)))
                .catch(error => console.error("Error deleting course:", error));
        }
    };

    return (
        <div className="beautiful-course-container">
            <style>{`
                .beautiful-course-container {
                    background: linear-gradient(135deg, #e0f7fa, #fffde7);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 60px 20px;
                    font-family: 'Poppins', sans-serif;
                }

                .course-list-card {
                    background: white;
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 1200px;
                }

                .course-title {
                    text-align: center;
                    font-size: 32px;
                    font-weight: 700;
                    color: #2c3e50;
                    margin-bottom: 30px;
                }

                .styled-table {
                    width: 100%;
                    border-collapse: collapse;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .styled-table thead tr {
                    background-color:rgb(253, 13, 193);
                    color: #ffffff;
                    text-align: center;
                    font-weight: 600;
                }

                .styled-table th, .styled-table td {
                    padding: 16px 18px;
                    font-size: 15px;
                    border-bottom: 1px solid #e0e0e0;
                }

                .styled-table tbody tr {
                    background-color: #f8f9fa;
                    transition: background-color 0.2s ease-in-out;
                }

                .styled-table tbody tr:hover {
                    background-color: #e9ecef;
                }

                .btn {
                    padding: 10px 18px;
                    font-size: 14px;
                    border-radius: 10px;
                    font-weight: 500;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                }

                .btn-info {
                    background: linear-gradient(135deg, #00b4db, #0083b0);
                    color: white;
                }

                .btn-info:hover {
                    background: linear-gradient(135deg, #0092ca, #00729a);
                    transform: scale(1.05);
                }

                .btn-danger {
                    background: linear-gradient(135deg, #ff416c, #ff4b2b);
                    color: white;
                }

                .btn-danger:hover {
                    background: linear-gradient(135deg, #e63946, #e5383b);
                    transform: scale(1.05);
                }

                .btn-success {
                    background: linear-gradient(135deg, #38ef7d, #11998e);
                    color: white;
                    display: block;
                    margin: 40px auto 0;
                    padding: 12px 24px;
                    font-size: 16px;
                }

                .btn-success:hover {
                    background: linear-gradient(135deg, #34d877, #0f8f7b);
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .styled-table th, .styled-table td {
                        padding: 12px 10px;
                        font-size: 14px;
                    }

                    .btn {
                        padding: 8px 14px;
                        font-size: 13px;
                    }

                    .course-title {
                        font-size: 24px;
                    }
                }
            `}</style>

            <div className="course-list-card">
                <h2 className="course-title">📚 Course Management</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Hours</th>
                            <th>Price</th>
                            <th>Technology</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.courseId}>
                                <td>{course.courseId}</td>
                                <td>{course.courseName}</td>
                                <td>{course.hours}</td>
                                <td>${course.price.toFixed(2)}</td>
                                <td>{course.technology}</td>
                                <td>
                                    <Link to={`/update-course/${course.courseId}`}>
                                        <button className="btn btn-info">Edit</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => removeCourse(course.courseId)} className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => navigate('/AdminMenu')} className="btn btn-success">⬅ Back to Admin Menu</button>
            </div>
        </div>
    );
};

export default AdminCourseList;
