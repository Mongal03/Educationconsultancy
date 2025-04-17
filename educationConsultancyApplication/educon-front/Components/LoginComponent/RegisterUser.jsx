import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../../Services/LoginService';

const RegisterUser = () => {
    const [educonUser, setEduconUser] = useState({
        username: "",
        password: "",
        email: "",
        category: "",
    });
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!educonUser.username || educonUser.username.length < 3) {
            newErrors.username = "Please enter the username.";
        }
        if (!educonUser.password || educonUser.password.length < 5 || educonUser.password.length > 10) {
            newErrors.password = "Password is required0.";
        }
        if (educonUser.password !== password2) {
            newErrors.password2 = "Passwords do not match.";
        }
        if (!educonUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(educonUser.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!educonUser.category) {
            newErrors.category = "Please select a category.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setEduconUser(prev => ({ ...prev, [name]: value }));
    };

    const saveNewUser = (e) => {
        e.preventDefault();
        if (validate()) {
            registerNewUser(educonUser).then(() => {
                alert("User registered successfully!");
                navigate('/');
            });
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <div style={styles.branding}>
                    <img src="/assets/login1.jpg" alt="Logo" style={styles.logo} />
                    <h1 style={styles.heading}>Join EduConsult</h1>
                    <p style={styles.subtext}>Start your journey with smarter learning today.</p>
                </div>
            </div>

            <div style={styles.rightSection}>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Register New User</h2>
                    <form onSubmit={saveNewUser}>
                        <label style={styles.label}>Username<span style={styles.required}>*</span></label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            value={educonUser.username}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.username && <div style={styles.error}>{errors.username}</div>}

                        <label style={styles.label}>Password<span style={styles.required}>*</span></label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={educonUser.password}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.password && <div style={styles.error}>{errors.password}</div>}

                        <label style={styles.label}>Confirm Password<span style={styles.required}>*</span></label>
                        <input
                            type="password"
                            name="password2"
                            placeholder="Re-enter password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            style={styles.input}
                        />
                        {errors.password2 && <div style={styles.error}>{errors.password2}</div>}

                        <label style={styles.label}>Email<span style={styles.required}>*</span></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={educonUser.email}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        {errors.email && <div style={styles.error}>{errors.email}</div>}

                        <label style={styles.label}>Category<span style={styles.required}>*</span></label>
                        <input
                            list="types"
                            name="category"
                            placeholder="Select role"
                            value={educonUser.category}
                            onChange={onChangeHandler}
                            style={styles.input}
                        />
                        <datalist id="types">
                            <option value="Student" />
                            <option value="Admin" />
                        </datalist>
                        {errors.category && <div style={styles.error}>{errors.category}</div>}

                        <button type="submit" style={{ ...styles.button, backgroundColor: 'lightgreen' }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        fontFamily: "Segoe UI, sans-serif",
    },
    leftSection: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "30px",
        textAlign: "center",
    },
    branding: {
        maxWidth: "400px",
    },
    logo: {
        width: "400px",
        marginBottom: "50px",
    },
    heading: {
        fontSize: "28px",
        color: "#333",
    },
    subtext: {
        fontSize: "16px",
        color: "#666",
        marginTop: "10px",
    },
    rightSection: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("/assets/login.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    card: {
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        padding: "40px",
        borderRadius: "16px",
        width: "400px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
    },
    cardTitle: {
        textAlign: "center",
        fontSize: "24px",
        marginBottom: "20px",
        color: "#222",
    },
    label: {
        fontWeight: 600,
        fontSize: "14px",
    },
    required: {
        color: "red",
        marginLeft: "4px",
    },
    input: {
        width: "100%",
        padding: "12px 14px",
        marginTop: "8px",
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
        outline: "none",
    },
    error: {
        color: "red",
        fontSize: "12px",
        marginTop: "-10px",
        marginBottom: "10px",
    },
    button: {
        width: "100%",
        padding: "12px",
        marginTop: "10px",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "15px",
        color: "white",
        cursor: "pointer",
    },
};

export default RegisterUser;
