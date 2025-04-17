import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../LoginView.css";
import { getBillByStudentId } from "../../Services/PaymentService";

const StudentPaymentList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        getBillByStudentId()
            .then(response => {
                console.log("Received payments:", response.data);
                if (response.data && response.data.length > 0) {
                    setPayments(response.data);
                } else {
                    setError("No payment records found.");
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching payments:", error);
                setError("Error loading payment records.");
                setLoading(false);
            });
    }, []);

    const returnBack = () => {
        navigate("/StudentMenu");
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: "80%" }}>
                <h2 className="text-center text-primary">
                    <u>Payment Records</u>
                </h2>

                {loading && <h4 className="text-center text-info mt-3">Loading...</h4>}

                {error && <h4 className="text-center text-danger mt-3">{error}</h4>}

                {!loading && !error && payments.length > 0 && (
                    <table className="table table-bordered mt-3">
                        <thead className="thead-dark">
                            <tr>
                                <th>Bill Number</th>
                                <th>Subscription ID</th>
                                <th>Student ID</th>
                                <th>Installment No</th>
                                <th>Amount</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment.billNumber || `payment-${index}`}>
                                    <td>{payment.billNumber}</td>
                                    <td>{payment.subscriptionId}</td>
                                    <td>{payment.studentId}</td>
                                    <td>{payment.installmentNo}</td>
                                    <td>₹{payment.amount}</td>
                                    <td>{payment.payDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="text-center">
                    <button onClick={returnBack} className="btn btn-success mt-3">
                        Return
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentPaymentList;
