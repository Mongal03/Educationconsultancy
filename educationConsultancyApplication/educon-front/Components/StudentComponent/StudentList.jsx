import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllStudents } from '../../Services/StudentService';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    let navigate = useNavigate();

    const showStudents = () => {
        getAllStudents()
            .then((response) => setStudents(response.data))
            .catch(error => console.error("Error fetching students:", error));
    };

    useEffect(() => {
        showStudents();
    }, []);

    const returnBack = () => {
        navigate('/AdminMenu');
    };

    return (
        <div className="student-list-container">
            <style>{`
                body {
                    margin: 0;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .student-list-container {
                    background: linear-gradient(135deg, #e0f7fa, #ffffff);
                    padding: 40px 20px;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }

                .student-list-card {
                    background: #ffffff;
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 1300px;
                }

                .title {
                    text-align: center;
                    margin-bottom: 30px;
                    font-size: 32px;
                    font-weight: 700;
                    color: #333;
                }

                .divider {
                    height: 4px;
                    background: linear-gradient(to right, #36d1dc, #5b86e5);
                    border: none;
                    margin-bottom: 30px;
                    border-radius: 2px;
                }

                .table-responsive {
                    overflow-x: auto;
                }

                .student-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .student-table th,
                .student-table td {
                    padding: 16px;
                    text-align: center;
                    border-bottom: 1px solid #ddd;
                }

                .student-table th {
                    background-color: #2196f3;
                    color: white;
                    font-weight: bold;
                }

                .student-table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                .student-table tr:hover {
                    background-color: #eef6ff;
                    transition: 0.2s ease;
                }

                .btn {
                    padding: 10px 16px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s ease;
                }

                .btn-update {
                    background: linear-gradient(45deg, #36d1dc, #5b86e5);
                    color: white;
                }

                .btn-update:hover {
                    filter: brightness(1.1);
                    transform: scale(1.05);
                }

                .btn-return {
                    background: linear-gradient(45deg, #00c853, #64dd17);
                    color: white;
                    margin-top: 30px;
                    display: block;
                    margin-left: auto;
                }

                .btn-return:hover {
                    filter: brightness(1.1);
                    transform: scale(1.05);
                }

                @media screen and (max-width: 768px) {
                    .student-table th, .student-table td {
                        padding: 10px;
                        font-size: 12px;
                    }

                    .title {
                        font-size: 24px;
                    }

                    .student-list-card {
                        padding: 20px;
                    }
                }
            `}</style>

            <div className="student-list-card">
                <h2 className="title">📋 Student List</h2>
                <hr className="divider" />
                <div className="table-responsive">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Student Id</th>
                                <th>Username</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Student Level</th>
                                <th>Status</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.registrationNumber}>
                                    <td>{student.registrationNumber}</td>
                                    <td>{student.username}</td>
                                    <td>{student.studentName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.mobile}</td>
                                    <td>{student.address}</td>
                                    <td>{student.studentLevel}</td>
                                    <td>{student.status}</td>
                                    <td>
                                        <Link to={`/update-student/${student.registrationNumber}`}>
                                            <button className="btn btn-update">✏️ Update</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={returnBack} className="btn btn-return">⬅ Return</button>
            </div>
        </div>
    );
};

export default StudentList;
