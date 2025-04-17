import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateUser } from '../../Services/LoginService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState({ username: false, password: false });

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!username || username.length < 3) {
            newErrors.username = 'Enter Username(mandatory).';
        }
        if (!password || password.length < 5) {
            newErrors.password = 'Enter Password(mandatory).';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            validateUser(username, password).then((response) => {
                const role = String(response.data);
                if (role === 'Admin') navigate('/AdminMenu');
                else if (role === 'Student') navigate('/StudentMenu');
                else alert('Invalid credentials');
            });
        }
    };

    const registerNewUser = () => {
        navigate('/Register');
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <div style={styles.branding}>
                    <img src="/assets/login1.jpg" alt="Logo" style={styles.logo} />
                    <h1 style={styles.heading}>Welcome to EduConsult</h1>
                    <p style={styles.subtext}>Empowering learners through smart technology</p>
                </div>
            </div>

            <div style={styles.rightSection}>
                <div style={styles.card}>
                    <h2 style={styles.cardTitle}>Login to Your Account</h2>
                    <form onSubmit={checkLogin}>
                        <label style={styles.label}>Username<span style={styles.required}>*</span></label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Enter username"
                            style={focused.username ? { ...styles.input, ...styles.inputFocus } : styles.input}
                            onFocus={() => setFocused({ ...focused, username: true })}
                            onBlur={() => setFocused({ ...focused, username: false })}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <div style={styles.error}>{errors.username}</div>}

                        <label style={styles.label}>Password<span style={styles.required}>*</span></label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            style={focused.password ? { ...styles.input, ...styles.inputFocus } : styles.input}
                            onFocus={() => setFocused({ ...focused, password: true })}
                            onBlur={() => setFocused({ ...focused, password: false })}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div style={styles.error}>{errors.password}</div>}

                        <button type="submit" style={{ ...styles.button, ...styles.loginButton }}>
                            Login
                        </button>

                        <button type="button" onClick={registerNewUser} style={{ ...styles.button, ...styles.registerButton }}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        width: '100%',
        fontFamily: "'Segoe UI', sans-serif",
    },
    leftSection: {
        flex: 1,
        backgroundColor: '#f3f0fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '30px',
        textAlign: 'center',
    },
    branding: {
        maxWidth: '400px',
    },
    logo: {
        width: '100%',
        maxWidth: '450px',
        marginBottom: '30px',
        borderRadius: '12px',
    },
    heading: {
        fontSize: '26px',
        color: '#5c5470',
        fontWeight: '600',
    },
    subtext: {
        fontSize: '15px',
        color: '#888',
        marginTop: '10px',
    },
    rightSection: {
        flex: 1,
        background: 'linear-gradient(135deg, #d3cce3, #e9e4f0)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundImage: 'url("/assets/login.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '18px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: '22px',
        marginBottom: '24px',
        color: '#4a4a4a',
        fontWeight: 'bold',
    },
    label: {
        fontWeight: '600',
        fontSize: '14px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginTop: '8px',
        marginBottom: '16px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        fontSize: '15px',
        outline: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    inputFocus: {
        borderColor: '#8e44ad',
        boxShadow: '0 0 6px rgba(142, 68, 173, 0.4)',
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '-10px',
        marginBottom: '10px',
    },
    button: {
        width: '100%',
        padding: '12px',
        marginTop: '12px',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 'bold',
        fontSize: '15px',
        color: 'white',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
    },
    required: {
        color: "red",
        marginLeft: "4px",
    },
    loginButton: {
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    },
    registerButton: {
        background: 'linear-gradient(to right, #43cea2, #185a9d)',
    },
};

export default LoginPage;
