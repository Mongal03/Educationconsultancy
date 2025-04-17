import React, { useState, useEffect } from 'react';
import { updateStudent, getStudentById } from "../../Services/StudentService";
import { useParams, useNavigate } from 'react-router-dom';

const StudentUpdate = () => {
    const [student, setStudent] = useState({
        registrationNumber: '',
        studentName: '',
        address: '',
        mobile: '',
        studentLevel: '',
        username: '',
        email: '',
        status: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { studentId } = useParams();

    useEffect(() => {
        getStudentById(studentId)
            .then(res => setStudent(res.data))
            .catch(err => console.log("Error fetching student data:", err));
    }, [studentId]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setStudent(values => ({ ...values, [name]: value }));
    };

    const validate = () => {
        const errs = {};
        if (!student.registrationNumber.trim()) errs.registrationNumber = "Registration number is required";
        if (!student.username.trim()) errs.username = "Username is required";
        if (!student.studentName.trim()) errs.studentName = "Student name is required";
        if (!student.email.trim()) errs.email = "Email is required";
        if (!student.address.trim()) errs.address = "Address is required";
        if (!student.mobile.trim() || !/^\d{10}$/.test(student.mobile)) errs.mobile = "Enter a valid 10-digit mobile number";
        if (!student.studentLevel.trim()) errs.studentLevel = "Student level is required";
        if (!student.status.trim()) errs.status = "Status is required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const studentSave = (event) => {
        event.preventDefault();
        if (!validate()) return;

        updateStudent(student)
            .then(() => {
                alert("Student is updated successfully!");
                navigate('/student-list');
            })
            .catch(error => {
                console.error("Update failed", error);
                alert("Update failed. Check console.");
            });
    };

    const goBack = () => {
        navigate('/student-list');
    };

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
            padding: '40px'
        },
        card: {
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '800px'
        },
        title: {
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '30px',
            fontSize: '32px',
            fontWeight: '700'
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
        },
        fullWidth: {
            gridColumn: '1 / -1'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column'
        },
        label: {
            fontWeight: '600',
            marginBottom: '5px',
            color: '#2e4053'
        },
        input: {
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            transition: 'all 0.2s ease-in-out',
            outline: 'none'
        },
        error: {
            color: '#e74c3c',
            fontSize: '13px',
            marginTop: '4px'
        },
        buttonRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '30px'
        },
        saveBtn: {
            backgroundColor: '#3498db',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        },
        returnBtn: {
            backgroundColor: '#7f8c8d',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'background-color 0.3s ease',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Update Student Details</h2>
                <form onSubmit={studentSave} style={styles.formGrid}>
                    {[
                        { name: 'registrationNumber', label: 'Registration Number' },
                        { name: 'username', label: 'Username' },
                        { name: 'studentName', label: 'Student Name' },
                        { name: 'email', label: 'Email' },
                        { name: 'address', label: 'Address' },
                        { name: 'mobile', label: 'Mobile' },
                        { name: 'studentLevel', label: 'Student Level' },
                        { name: 'status', label: 'Status' },
                    ].map((field, i) => (
                        <div key={field.name} style={styles.inputGroup} className={i > 3 ? styles.fullWidth : ''}>
                            <label style={styles.label}>{field.label}:</label>
                            <input
                                type={field.name === 'email' ? 'email' : 'text'}
                                name={field.name}
                                value={student[field.name]}
                                onChange={onChangeHandler}
                                style={styles.input}
                                onFocus={(e) => e.target.style.backgroundColor = '#f0f9ff'}
                                onBlur={(e) => e.target.style.backgroundColor = '#fff'}
                            />
                            {errors[field.name] && <div style={styles.error}>{errors[field.name]}</div>}
                        </div>
                    ))}

                    <div className="full-width" style={{ ...styles.fullWidth, ...styles.buttonRow }}>
                        <button
                            type="button"
                            style={styles.returnBtn}
                            onMouseOver={e => e.target.style.backgroundColor = '#5a6268'}
                            onMouseOut={e => e.target.style.backgroundColor = '#7f8c8d'}
                            onClick={goBack}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            style={styles.saveBtn}
                            onMouseOver={e => e.target.style.backgroundColor = '#2980b9'}
                            onMouseOut={e => e.target.style.backgroundColor = '#3498db'}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentUpdate;
