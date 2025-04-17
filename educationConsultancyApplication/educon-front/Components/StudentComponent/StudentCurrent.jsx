import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentStudents } from '../../Services/StudentService';

const StudentCurrent = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentStudents()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    }, []);

    const returnBack = () => {
        navigate('/AdminMenu');
    };

    return (
        <div className="student-current-container">
            <style>{`
                .student-current-container {
                    background: linear-gradient(135deg, #f1f4f9, #e0eafc);
                    min-height: 100vh;
                    padding: 40px 20px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    font-family: 'Segoe UI', sans-serif;
                }

                .student-card {
                    background-color: white;
                    border-radius: 16px;
                    padding: 40px;
                    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 1300px;
                }

                .student-title {
                    text-align: center;
                    font-size: 28px;
                    font-weight: 600;
                    color: #2c3e50;
                    margin-bottom: 20px;
                }

                .divider {
                    height: 4px;
                    border: none;
                    background: linear-gradient(to right, #4facfe, #00f2fe);
                    border-radius: 2px;
                    margin-bottom: 30px;
                }

                .student-table {
                    width: 100%;
                    border-collapse: collapse;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
                }

                .student-table th,
                .student-table td {
                    padding: 14px 12px;
                    text-align: center;
                    border-bottom: 1px solid #e0e0e0;
                    font-size: 14px;
                }

                .student-table th {
                    background-color: #2980b9;
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

                .no-data {
                    text-align: center;
                    color: #777;
                    font-style: italic;
                    padding: 20px;
                }

                .btn-back {
                    background: linear-gradient(45deg, #d32f2f, #f44336);
                    color: white;
                    font-weight: bold;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    margin-top: 30px;
                    display: block;
                    margin-left: auto;
                    transition: background 0.3s ease, transform 0.2s;
                }

                .btn-back:hover {
                    background: linear-gradient(45deg, #b71c1c, #e53935);
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .student-table th,
                    .student-table td {
                        font-size: 12px;
                        padding: 10px 6px;
                    }

                    .student-title {
                        font-size: 22px;
                    }

                    .student-card {
                        padding: 20px;
                    }
                }
            `}</style>

            <div className="student-card">
                <h2 className="student-title">📘 Current Student List</h2>
                <hr className="divider" />
                <div className="table-responsive">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Registration No</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Level</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.registrationNumber || "N/A"}</td>
                                        <td>{student.username || "N/A"}</td>
                                        <td>{student.studentName || "N/A"}</td>
                                        <td>{student.email || "N/A"}</td>
                                        <td>{student.mobile || "N/A"}</td>
                                        <td>{student.address || "N/A"}</td>
                                        <td>{student.studentLevel || "N/A"}</td>
                                        <td>{student.status ? "Active" : "Inactive"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="no-data">No student data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <button className="btn-back" onClick={returnBack}>⬅ Back to Admin Menu</button>
            </div>
        </div>
    );
};

export default StudentCurrent;
