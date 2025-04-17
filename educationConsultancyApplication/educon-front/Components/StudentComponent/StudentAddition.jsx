import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRegistration, saveStudent, getStudentStatusByUsername } from "../../Services/StudentService";

const StudentAddition = () => {
    const [student, setStudent] = useState({
        registrationNumber: "",
        username: "",
        studentName: "",
        email: "",
        mobile: 0,
        address: "",
        studentLevel: "",
        status: ""
    });

    const [newId, setNewId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getStudentStatusByUsername().then(response => {
            if (response.data === true || response.data === false) {
                alert("Student is already registered.");
                navigate("/StudentMenu");
            } else {
                generateRegistration().then((res) => setNewId(res.data));
            }
        });
    }, []);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({ ...prev, [name]: value }));
    };

    const studentSave = (e) => {
        e.preventDefault();
        student.registrationNumber = newId;
        saveStudent(student).then(() => {
            alert("New Student is registered");
            navigate('/StudentMenu');
        });
    };

    return (
        <div className="student-addition-wrapper">
            <style>{`
                .student-addition-wrapper {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #e3f2fd, #ffffff);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    font-family: 'Segoe UI', sans-serif;
                }

                .student-card {
                    background: #ffffff;
                    padding: 40px 35px;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    width: 100%;
                    max-width: 700px;
                }

                .student-card h2 {
                    text-align: center;
                    color: #2c3e50;
                    margin-bottom: 30px;
                    font-weight: 700;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    font-weight: 600;
                    color: #34495e;
                    display: block;
                    margin-bottom: 8px;
                }

                .form-control {
                    width: 100%;
                    padding: 10px 14px;
                    border-radius: 10px;
                    border: 1px solid #ccc;
                    font-size: 15px;
                    transition: 0.3s;
                }

                .form-control:focus {
                    border-color: #0d6efd;
                    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
                    outline: none;
                }

                .btn {
                    padding: 10px 20px;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                    margin-top: 20px;
                }

                .btn-success {
                    background: linear-gradient(135deg, #38ef7d, #11998e);
                    color: white;
                    border: none;
                    margin-right: 10px;
                }

                .btn-success:hover {
                    transform: scale(1.05);
                    background: linear-gradient(135deg, #2ecc71, #16a085);
                }

                .btn-secondary {
                    background: #bdc3c7;
                    color: white;
                    border: none;
                }

                .btn-secondary:hover {
                    background: #95a5a6;
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .student-card {
                        padding: 30px 20px;
                    }

                    .form-control {
                        font-size: 14px;
                    }

                    .btn {
                        font-size: 14px;
                    }
                }
            `}</style>

            <div className="student-card">
                <h2>🎓 Student Registration</h2>
                <form>
                    <div className="form-group">
                        <label>Registration Number</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            className="form-control"
                            value={newId}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={student.username}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Student Name</label>
                        <input
                            type="text"
                            name="studentName"
                            className="form-control"
                            value={student.studentName}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={student.email}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile</label>
                        <input
                            type="number"
                            name="mobile"
                            className="form-control"
                            value={student.mobile}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            value={student.address}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Student Level</label>
                        <input
                            type="text"
                            name="studentLevel"
                            className="form-control"
                            value={student.studentLevel}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <input
                            type="text"
                            name="status"
                            className="form-control"
                            value={student.status}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <button className="btn btn-success" onClick={studentSave}>Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => navigate('/StudentMenu')}>Return</button>
                </form>
            </div>
        </div>
    );
};

export default StudentAddition;
