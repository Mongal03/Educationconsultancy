import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBills } from '../../Services/PaymentService';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllBills()
            .then(response => {
                setPayments(response.data);
            })
            .catch(error => console.error("Error fetching payments:", error));
    }, []);

    return (
        <div className="payment-container">
            <style>{`
                .payment-container {
                    background: linear-gradient(to right, #f1f4f9, #dff2f1);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 60px 20px;
                    font-family: 'Segoe UI', sans-serif;
                }

                .payment-card {
                    background-color: white;
                    padding: 40px;
                    border-radius: 16px;
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 1200px;
                }

                .payment-title {
                    font-size: 30px;
                    font-weight: 600;
                    text-align: center;
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
                    background-color: #0d6efd;
                    color: #ffffff;
                    text-align: center;
                    font-weight: bold;
                }

                .styled-table th, .styled-table td {
                    padding: 14px 16px;
                    font-size: 15px;
                    border-bottom: 1px solid #e0e0e0;
                    text-align: center;
                }

                .styled-table tbody tr:nth-child(even) {
                    background-color: #f8f9fa;
                }

                .styled-table tbody tr:hover {
                    background-color: #e2f0ff;
                }

                .btn-return {
                    background: linear-gradient(to right, #43cea2, #185a9d);
                    color: white;
                    padding: 12px 28px;
                    border: none;
                    font-size: 15px;
                    font-weight: 500;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: transform 0.2s ease-in-out;
                    display: block;
                    margin: 30px auto 0;
                }

                .btn-return:hover {
                    transform: scale(1.05);
                    background: linear-gradient(to right, #36d1dc, #5b86e5);
                }

                @media (max-width: 768px) {
                    .styled-table th, .styled-table td {
                        padding: 10px;
                        font-size: 14px;
                    }

                    .payment-title {
                        font-size: 24px;
                    }
                }
            `}</style>

            <div className="payment-card">
                <h2 className="payment-title">💰 Payment Records</h2>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Bill No.</th>
                            <th>Subscription ID</th>
                            <th>Student ID</th>
                            <th>Installment No.</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr key={payment.billNumber || `pay-${index}`}>
                                    <td>{payment.billNumber}</td>
                                    <td>{payment.subscriptionId}</td>
                                    <td>{payment.studentId}</td>
                                    <td>{payment.installmentNo}</td>
                                    <td>₹{payment.amount}</td>
                                    <td>{payment.payDate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No payments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button className="btn-return" onClick={() => navigate('/AdminMenu')}>⬅ Back to Admin Menu</button>
            </div>
        </div>
    );
};

export default PaymentList;
