import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSubscriptions } from '../../Services/SubscriptionService';

const SubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllSubscriptions()
            .then(response => setSubscriptions(response.data))
            .catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    return (
        <div className="subscription-container">
            <style>{`
                .subscription-container {
                    background: linear-gradient(135deg, #e3f2fd, #f1f8e9);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 60px 20px;
                    font-family: 'Segoe UI', sans-serif;
                }

                .subscription-card {
                    background: #fff;
                    padding: 40px;
                    border-radius: 16px;
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 1200px;
                }

                .subscription-title {
                    font-size: 32px;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 30px;
                    color: #2c3e50;
                }

                .styled-table {
                    width: 100%;
                    border-collapse: collapse;
                    border-radius: 12px;
                    overflow: hidden;
                    text-align: center;
                }

                .styled-table thead {
                    background-color: #007bff;
                    color: white;
                }

                .styled-table th, .styled-table td {
                    padding: 14px 16px;
                    border-bottom: 1px solid #ddd;
                    font-size: 15px;
                }

                .styled-table tbody tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                .styled-table tbody tr:hover {
                    background-color: #f1f1f1;
                    transition: background 0.3s ease;
                }

                .btn-return {
                    margin-top: 30px;
                    display: block;
                    background: linear-gradient(135deg, #00c9a7, #009688);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-return:hover {
                    background: linear-gradient(135deg, #00bfa5, #00796b);
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .styled-table th, .styled-table td {
                        font-size: 13px;
                        padding: 10px;
                    }

                    .subscription-title {
                        font-size: 24px;
                    }

                    .btn-return {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="subscription-card">
                <h2 className="subscription-title">📝 Subscription Records</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Subscription ID</th>
                            <th>Student ID</th>
                            <th>Course ID</th>
                            <th>Subscription Date</th>
                            <th>Installments</th>
                            <th>Amount (₹)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((sub, index) => (
                            <tr key={sub.subscriptionId || `sub-${index}`}>
                                <td>{sub.subscriptionId}</td>
                                <td>{sub.studentId}</td>
                                <td>{sub.courseId}</td>
                                <td>{sub.subscriptionDate}</td>
                                <td>{sub.installments}</td>
                                <td>₹{sub.installmentAmount.toFixed(2)}</td>
                                <td>{sub.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={() => navigate('/AdminMenu')} className="btn-return">⬅ Back to Admin Menu</button>
            </div>
        </div>
    );
};

export default SubscriptionList;
