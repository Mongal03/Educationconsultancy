import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateBillId, savePayment } from '../../Services/PaymentService';
import { getAllSubscriptionsByStudent } from '../../Services/SubscriptionService';

const PaymentAddition = () => {
    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];

    const [payment, setPayment] = useState({
        billNumber: '',
        subscriptionId: '',
        studentId: '',
        installmentNo: 1,
        amount: 0.0,
        payDate: formatDate(today)
    });

    const [subscriptions, setSubscriptions] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        generateBillId()
            .then(res => setPayment(prev => ({ ...prev, billNumber: res.data })))
            .catch(err => console.error("Bill generation error:", err));

        getAllSubscriptionsByStudent()
            .then(res => setSubscriptions(res.data))
            .catch(err => console.error("Subscription fetch error:", err));
    }, []);

    const validate = () => {
        const err = {};
        if (!payment.subscriptionId) err.subscriptionId = "Subscription is required.";
        if (!payment.studentId) err.studentId = "Student ID is required.";
        if (!payment.installmentNo || payment.installmentNo <= 0) err.installmentNo = "Invalid installment number.";
        if (!payment.amount || payment.amount <= 0) err.amount = "Amount must be greater than zero.";
        if (!payment.payDate) err.payDate = "Payment date is required.";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const onSubscriptionChange = (e) => {
        const selected = subscriptions.find(sub => sub.subscriptionId === e.target.value);
        if (selected) {
            setPayment(prev => ({
                ...prev,
                subscriptionId: selected.subscriptionId,
                studentId: selected.studentId,
                installmentNo: selected.installments,
                amount: selected.installmentAmount
            }));
            setErrors(prev => ({ ...prev, subscriptionId: undefined }));
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setPayment(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const paymentSave = (e) => {
        e.preventDefault();
        if (!validate()) return;
        savePayment(payment)
            .then(() => {
                alert("✅ Payment successfully added!");
                navigate('/StudentMenu');
            })
            .catch(err => alert("❌ Error saving payment: " + err));
    };

    return (
        <div className="payment-wrapper">
            <style>{`
                .payment-wrapper {
                    background: linear-gradient(120deg, #f0f7ff, #fffdfd);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 50px 20px;
                    font-family: 'Segoe UI', sans-serif;
                }

                .payment-card {
                    background-color: #ffffff;
                    padding: 40px 35px;
                    border-radius: 20px;
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 700px;
                }

                .payment-card h2 {
                    font-size: 28px;
                    color: #2c3e50;
                    margin-bottom: 30px;
                    text-align: center;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                label {
                    font-weight: 600;
                    margin-bottom: 8px;
                    display: block;
                    color: #34495e;
                }

                input, select {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    font-size: 15px;
                    transition: all 0.3s ease;
                }

                input:focus, select:focus {
                    border-color: #007bff;
                    outline: none;
                    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
                }

                .btn {
                    padding: 12px 24px;
                    font-size: 16px;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: background 0.3s ease, transform 0.2s ease;
                }

                .btn-success {
                    background-color: #28a745;
                    color: white;
                }

                .btn-success:hover {
                    background-color: #218838;
                    transform: scale(1.03);
                }

                .btn-primary {
                    background-color: #007bff;
                    color: white;
                    margin-left: 10px;
                }

                .btn-primary:hover {
                    background-color: #0056b3;
                    transform: scale(1.03);
                }

                .error {
                    color: red;
                    font-size: 13px;
                    margin-top: 4px;
                }

                @media (max-width: 600px) {
                    .payment-card {
                        padding: 25px 20px;
                    }

                    .payment-card h2 {
                        font-size: 22px;
                    }

                    .btn {
                        font-size: 14px;
                        padding: 10px 18px;
                    }
                }
            `}</style>

            <div className="payment-card">
                <h2>💳 Add New Payment</h2>
                <form onSubmit={paymentSave}>
                    <div className="form-group">
                        <label>Bill Number:</label>
                        <input name="billNumber" value={payment.billNumber} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Select Subscription:</label>
                        <select name="subscriptionId" value={payment.subscriptionId} onChange={onSubscriptionChange}>
                            <option value="">-- Select Subscription --</option>
                            {subscriptions.map(sub => (
                                <option key={sub.subscriptionId} value={sub.subscriptionId}>
                                    {sub.subscriptionId} - Student: {sub.studentId}
                                </option>
                            ))}
                        </select>
                        {errors.subscriptionId && <div className="error">{errors.subscriptionId}</div>}
                    </div>

                    <div className="form-group">
                        <label>Student ID:</label>
                        <input name="studentId" value={payment.studentId} readOnly />
                        {errors.studentId && <div className="error">{errors.studentId}</div>}
                    </div>

                    <div className="form-group">
                        <label>Installment Number:</label>
                        <input name="installmentNo" value={payment.installmentNo} readOnly />
                        {errors.installmentNo && <div className="error">{errors.installmentNo}</div>}
                    </div>

                    <div className="form-group">
                        <label>Amount (₹):</label>
                        <input name="amount" value={payment.amount} readOnly />
                        {errors.amount && <div className="error">{errors.amount}</div>}
                    </div>

                    <div className="form-group">
                        <label>Payment Date:</label>
                        <input name="payDate" value={payment.payDate} readOnly />
                        {errors.payDate && <div className="error">{errors.payDate}</div>}
                    </div>

                    <div className="form-actions" style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button type="submit" className="btn btn-success">Pay</button>
                        <button type="button" className="btn btn-primary" onClick={() => navigate('/StudentMenu')}>Return</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentAddition;
