import React, { useEffect, useState } from "react";
import { getStudentDetail } from "../../Services/StudentService";
import { useNavigate, useParams } from "react-router-dom";

const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getStudentDetail(id)
            .then((response) => {
                if (response.data) {
                    setStudent(response.data);
                } else {
                    setError("Student details not found");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching student details:", error);
                setError("Error loading student details");
                setLoading(false);
            });
    }, [id]);

    const returnBack = () => {
        navigate("/StudentMenu");
    };

    return (
        <div className="student-detail-wrapper">
            <style>{`
                .student-detail-wrapper {
                    background: linear-gradient(to right, #c2e9fb, #a1c4fd);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .detail-card {
                    background: #fff;
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
                    width: 100%;
                    max-width: 700px;
                    transition: all 0.3s ease;
                }

                .detail-title {
                    font-size: 28px;
                    font-weight: bold;
                    color:rgb(99, 82, 193);
                    text-align: center;
                    margin-bottom: 30px;
                }

                .detail-table {
                    width: 100%;
                    border-collapse: collapse;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .detail-table th {
                    background-color:rgba(109, 180, 202, 0.65);
                    color: white;
                    font-weight: 600;
                    padding: 12px 15px;
                    text-align: left;
                }

                .detail-table td {
                    padding: 12px 15px;
                    background-color: #f9f9f9;
                    font-size: 15px;
                }

                .detail-table tr:nth-child(even) td {
                    background-color: #f1f1f1;
                }

                .detail-table tr:hover td {
                    background-color:rgba(94, 136, 146, 0.55);
                }

                .btn-return {
                    margin-top: 30px;
                    background: linear-gradient(135deg, #00c9ff, #92fe9d);
                    border: none;
                    padding: 12px 25px;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 10px;
                    transition: transform 0.2s ease, background 0.3s ease;
                }

                .btn-return:hover {
                    background: linear-gradient(135deg, #00b7e0, #7be89a);
                    transform: scale(1.05);
                }

                .text-info, .text-danger {
                    text-align: center;
                    margin-top: 20px;
                    font-weight: 500;
                }

                @media (max-width: 600px) {
                    .detail-title {
                        font-size: 22px;
                    }

                    .detail-card {
                        padding: 25px;
                    }

                    .btn-return {
                        width: 100%;
                        font-size: 15px;
                    }
                }
            `}</style>

            <div className="detail-card">
                <h2 className="detail-title">📄 Student Details</h2>

                {loading && <h5 className="text-info">Loading student info...</h5>}
                {error && <h5 className="text-danger">{error}</h5>}

                {!loading && !error && student && (
                    <table className="detail-table">
                        <tbody>
                            <tr><th>Registration Number</th><td>{student.registrationNumber || "N/A"}</td></tr>
                            <tr><th>User Name</th><td>{student.username || "N/A"}</td></tr>
                            <tr><th>Student Name</th><td>{student.studentName || "N/A"}</td></tr>
                            <tr><th>Email</th><td>{student.email || "N/A"}</td></tr>
                            <tr><th>Mobile</th><td>{student.mobile || "N/A"}</td></tr>
                            <tr><th>Address</th><td>{student.address || "N/A"}</td></tr>
                            <tr><th>Student Level</th><td>{student.studentLevel || "N/A"}</td></tr>
                            <tr><th>Status</th><td>{student.status ? "Active" : "Inactive"}</td></tr>
                        </tbody>
                    </table>
                )}

                <div className="text-center">
                    <button onClick={returnBack} className="btn-return">⬅ Return to Menu</button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;
