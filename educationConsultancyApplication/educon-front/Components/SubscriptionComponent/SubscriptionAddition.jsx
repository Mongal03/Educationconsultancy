import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    generateSubscriptionId,
    saveSubscription,
    getAllSubscriptionsByStudent
} from '../../Services/SubscriptionService';
import { displayAllCourses } from '../../Services/CourseService';
import { getStudentDetail } from '../../Services/StudentService';

const SubscriptionAddition = () => {
    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const [subscription, setSubscription] = useState({
        subscriptionId: '',
        studentId: '',
        courseId: '',
        subscriptionDate: formatDate(today),
        endDate: formatDate(threeMonthsLater),
        installments: 1,
        installmentAmount: 0.0,
        status: ''
    });

    const [courses, setCourses] = useState([]);
    const [studentStatus, setStudentStatus] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [studentSubscriptions, setStudentSubscriptions] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        generateSubscriptionId().then(res =>
            setSubscription(prev => ({ ...prev, subscriptionId: res.data }))
        );

        getStudentDetail().then(res => {
            if (res.data?.registrationNumber) {
                setSubscription(prev => ({ ...prev, studentId: res.data.registrationNumber }));
                setStudentStatus(res.data.status);

                getAllSubscriptionsByStudent(res.data.registrationNumber).then(result =>
                    setStudentSubscriptions(result.data.map(sub => sub.courseId))
                );
            }
        });

        displayAllCourses().then(res => setCourses(res.data));
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;

        if (name === 'courseId') {
            const selected = courses.find(course => course.courseId.toString() === value);
            if (selected) {
                setSelectedCourse(selected);
                setSubscription(prev => ({
                    ...prev,
                    courseId: selected.courseId
                }));
                updateInstallmentAmount(selected.price, subscription.installments);
            }
        } else if (name === 'installments') {
            updateInstallmentAmount(selectedCourse?.price || 0, parseInt(value));
            setSubscription(prev => ({
                ...prev,
                installments: parseInt(value)
            }));
        } else {
            setSubscription(prev => ({ ...prev, [name]: value }));
        }

        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const updateInstallmentAmount = (price, installments) => {
        const amount = price / installments;
        setSubscription(prev => ({
            ...prev,
            installmentAmount: amount.toFixed(2)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!studentStatus) {
            alert('Student is not registered. Please complete registration first.');
            navigate('/StudentMenu');
            return false;
        }

        if (!subscription.courseId) {
            newErrors.courseId = 'Please select a course.';
        } else if (studentSubscriptions.includes(subscription.courseId)) {
            newErrors.courseId = 'You have already subscribed to this course.';
        }

        if (!subscription.subscriptionDate) {
            newErrors.subscriptionDate = 'Please select a subscription date.';
        } else if (new Date(subscription.subscriptionDate) > today) {
            newErrors.subscriptionDate = 'Subscription date cannot be in the future.';
        }

        if (!subscription.installments || subscription.installments < 1 || subscription.installments > 4) {
            newErrors.installments = 'Installments must be between 1 and 4.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const subscriptionSave = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        saveSubscription(subscription)
            .then(() => {
                alert('Subscription successfully added!');
                navigate('/StudentMenu');
            })
            .catch(error => {
                alert('Error occurred while saving subscription: ' + error);
            });
    };

    return (
        <div className="subscription-container">
            <style>{`
                .subscription-container {
                    background: linear-gradient(135deg, #e0f7fa, #fffde7);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px 20px;
                    font-family: 'Poppins', sans-serif;
                }

                .subscription-card {
                    background: white;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 600px;
                    width: 100%;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                }

                .subscription-title {
                    font-size: 28px;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 30px;
                    color: #2c3e50;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                label {
                    font-weight: 500;
                    display: block;
                    margin-bottom: 8px;
                    color: #34495e;
                }

                .form-control {
                    width: 100%;
                    padding: 10px 14px;
                    border: 1px solid #ced4da;
                    border-radius: 10px;
                    font-size: 15px;
                    transition: border-color 0.3s ease;
                }

                .form-control:focus {
                    border-color: #0d6efd;
                    outline: none;
                }

                .error-text {
                    color: red;
                    font-size: 13px;
                    margin-top: 4px;
                }

                .btn {
                    padding: 10px 20px;
                    font-size: 15px;
                    font-weight: 500;
                    border-radius: 10px;
                    border: none;
                    margin-right: 10px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .btn-success {
                    background: linear-gradient(135deg, #38ef7d, #11998e);
                    color: white;
                }

                .btn-success:hover {
                    background: linear-gradient(135deg, #34d877, #0f8f7b);
                    transform: scale(1.05);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #00c6ff, #0072ff);
                    color: white;
                }

                .btn-primary:hover {
                    background: linear-gradient(135deg, #00a8e8, #0051c3);
                    transform: scale(1.05);
                }

                @media (max-width: 600px) {
                    .subscription-card {
                        padding: 25px;
                    }

                    .subscription-title {
                        font-size: 22px;
                    }
                }
            `}</style>

            <div className="subscription-card">
                <h2 className="subscription-title">📄 New Subscription</h2>
                <form onSubmit={subscriptionSave}>
                    <div className="form-group">
                        <label>Subscription ID:</label>
                        <input className="form-control" value={subscription.subscriptionId} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Student ID:</label>
                        <input className="form-control" value={subscription.studentId} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Subscription Date:</label>
                        <input
                            type="date"
                            name="subscriptionDate"
                            value={subscription.subscriptionDate}
                            onChange={onChangeHandler}
                            className="form-control"
                        />
                        {errors.subscriptionDate && <div className="error-text">{errors.subscriptionDate}</div>}
                    </div>

                    <div className="form-group">
                        <label>End Date:</label>
                        <input className="form-control" value={subscription.endDate} readOnly />
                    </div>

                    <div className="form-group">
                        <label>Course Name:</label>
                        <select name="courseId" className="form-control" onChange={onChangeHandler} value={subscription.courseId}>
                            <option value="">-- Select Course --</option>
                            {courses.map(course => (
                                <option key={course.courseId} value={course.courseId}>
                                    {course.courseName}
                                </option>
                            ))}
                        </select>
                        {errors.courseId && <div className="error-text">{errors.courseId}</div>}
                    </div>

                    {selectedCourse && (
                        <div className="form-group">
                            <label>Course Price:</label>
                            <input className="form-control" value={selectedCourse.price} readOnly />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Number of Installments:</label>
                        <select name="installments" className="form-control" onChange={onChangeHandler} value={subscription.installments}>
                            <option value={1}>Full Payment</option>
                            <option value={2}>2 Installments</option>
                            <option value={3}>3 Installments</option>
                            <option value={4}>4 Installments</option>
                        </select>
                        {errors.installments && <div className="error-text">{errors.installments}</div>}
                    </div>

                    <div className="form-group">
                        <label>Installment Amount:</label>
                        <input className="form-control" value={subscription.installmentAmount} readOnly />
                    </div>

                    <button type="submit" className="btn btn-success">Subscribe</button>
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/StudentMenu')}>Return</button>
                </form>
            </div>
        </div>
    );
};

export default SubscriptionAddition;
