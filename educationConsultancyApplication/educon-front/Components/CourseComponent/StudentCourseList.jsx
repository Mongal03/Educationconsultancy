import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { displayAllCourses } from '../../Services/CourseService';

const StudentCourseList = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        displayAllCourses()
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                }
            })
            .catch(error => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div className="student-course-wrapper">
            <style>{`
                .student-course-wrapper {
                    min-height: 100vh;
                    background: linear-gradient(to right, #e0f7fa, #f1f8e9);
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 60px 20px;
                    font-family: 'Segoe UI', sans-serif;
                }

                .student-course-card {
                    background-color: #fff;
                    border-radius: 20px;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    padding: 40px;
                    max-width: 1200px;
                    width: 100%;
                }

                .student-course-title {
                    text-align: center;
                    font-size: 32px;
                    font-weight: bold;
                    color: #2c3e50;
                    margin-bottom: 30px;
                }

                .student-course-table {
                    width: 100%;
                    border-collapse: collapse;
                    overflow: hidden;
                    border-radius: 12px;
                }

                .student-course-table thead {
                    background: #4CAF50;
                    color: white;
                    font-size: 16px;
                }

                .student-course-table th, .student-course-table td {
                    padding: 16px;
                    text-align: center;
                    border-bottom: 1px solid #e0e0e0;
                }

                .student-course-table tbody tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                .student-course-table tbody tr:hover {
                    background-color: #e3f2fd;
                }

                .btn {
                    border: none;
                    padding: 10px 18px;
                    border-radius: 10px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-primary {
                    background: linear-gradient(135deg, #2196f3, #21cbf3);
                    color: white;
                }

                .btn-primary:hover {
                    background: linear-gradient(135deg, #1e88e5, #03a9f4);
                    transform: scale(1.05);
                }

                .btn-success {
                    background: linear-gradient(135deg, #4CAF50, #81C784);
                    color: white;
                    margin-top: 30px;
                    font-size: 16px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 12px 26px;
                }

                .btn-success:hover {
                    background: linear-gradient(135deg, #43a047, #66bb6a);
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .student-course-title {
                        font-size: 24px;
                    }

                    .student-course-table th, .student-course-table td {
                        font-size: 14px;
                        padding: 10px;
                    }

                    .btn {
                        padding: 8px 12px;
                        font-size: 13px;
                    }
                }
            `}</style>

            <div className="student-course-card">
                <h2 className="student-course-title">🎓 Available Courses for Students</h2>
                <table className="student-course-table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Name</th>
                            <th>Hours</th>
                            <th>Price</th>
                            <th>Technology</th>
                            <th>Subscribe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.courseId || `course-${index}`}>
                                <td>{course.courseId}</td>
                                <td>{course.courseName}</td>
                                <td>{course.hours}</td>
                                <td>${parseFloat(course.price).toFixed(2)}</td>
                                <td>{course.technology}</td>
                                <td>
                                    <Link to={`/subscription-add`}>
                                        <button className="btn btn-primary">Register</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => navigate('/StudentMenu')} className="btn btn-success">⬅ Return to Student Menu</button>
            </div>
        </div>
    );
};

export default StudentCourseList;
