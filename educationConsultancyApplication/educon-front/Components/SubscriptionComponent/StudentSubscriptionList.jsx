import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSubscriptionsByStudent } from '../../Services/SubscriptionService';

const StudentSubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllSubscriptionsByStudent()
            .then(response => setSubscriptions(response.data))
            .catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    const returnBack = () => {
        navigate('/StudentMenu');
    };

    const handlePayment = (subscriptionId) => {
        console.log("Initiating payment for:", subscriptionId);
        navigate('/payment-add');
    };

    return (
        <div className="subscription-container">
            <style>{`
                .subscription-container {
                    min-height: 100vh;
                    background: linear-gradient(to right, #f0f2f5, #dbeafe);
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding: 60px 20px;
                    font-family: 'Segoe UI', sans-serif;
                }

                .subscription-card {
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 1100px;
                }

                .subscription-title {
                    font-size: 30px;
                    font-weight: 700;
                    text-align: center;
                    color: #1e3a8a;
                    margin-bottom: 30px;
                }

                .styled-table {
                    width: 100%;
                    border-collapse: collapse;
                    overflow: hidden;
                    border-radius: 12px;
                }

                .styled-table thead tr {
                    background-color: #3b82f6;
                    color: white;
                    text-align: center;
                    font-size: 16px;
                }

                .styled-table th, .styled-table td {
                    padding: 14px 18px;
                    border-bottom: 1px solid #e0e0e0;
                    font-size: 15px;
                }

                .styled-table tbody tr {
                    background-color: #f9fafb;
                    transition: background 0.3s ease-in-out;
                }

                .styled-table tbody tr:hover {
                    background-color: #e0f2fe;
                }

                .btn {
                    padding: 10px 16px;
                    font-size: 14px;
                    border-radius: 10px;
                    font-weight: 500;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                }

                .btn-primary {
                    background-color: #2563eb;
                    color: white;
                }

                .btn-primary:hover {
                    background-color: #1d4ed8;
                    transform: scale(1.05);
                }

                .btn-success {
                    background-color: #10b981;
                    color: white;
                    margin-top: 30px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }

                .btn-success:hover {
                    background-color: #059669;
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .styled-table th, .styled-table td {
                        padding: 10px;
                        font-size: 14px;
                    }

                    .btn {
                        padding: 8px 12px;
                        font-size: 13px;
                    }

                    .subscription-title {
                        font-size: 24px;
                    }
                }
            `}</style>

            <div className="subscription-card">
                <h2 className="subscription-title">📄 My Course Subscriptions</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Subscription ID</th>
                            <th>Course ID</th>
                            <th>Subscription Date</th>
                            <th>Installments</th>
                            <th>Installment Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((sub, index) => (
                            <tr key={sub.subscriptionId || `sub-${index}`}>
                                <td>{sub.subscriptionId}</td>
                                <td>{sub.courseId}</td>
                                <td>{sub.subscriptionDate}</td>
                                <td>{sub.installments}</td>
                                <td>₹{sub.installmentAmount}</td>
                                <td>{sub.status}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handlePayment(sub.subscriptionId)}>
                                        Pay Now
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={returnBack} className="btn btn-success">⬅ Return to Student Menu</button>
            </div>
        </div>
    );
};

export default StudentSubscriptionList;
