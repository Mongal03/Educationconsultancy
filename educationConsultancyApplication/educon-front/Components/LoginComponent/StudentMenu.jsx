import React, { useState } from "react";

const StudentMenu = () => {
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isStudentOpen, setIsStudentOpen] = useState(false);

    return (
        <div style={styles.container}>
            {/* Overlay */}
            <div style={styles.overlay}></div>

            {/* Header */}
            <div style={styles.header}>
                <img src="/assets/login1.jpg" alt="EduConsult Logo" style={styles.logo} />
                <h2 style={styles.title}>Education Consultancy Student Menu</h2>
            </div>

            {/* Right-Side Vertical Menu */}
            <nav style={styles.menu}>
                {/* Student Dropdown */}
                <div
                    onMouseEnter={() => setIsStudentOpen(true)}
                    onMouseLeave={() => setIsStudentOpen(false)}
                    style={styles.dropdown}
                >
                    <span style={styles.menuItem}>Student ▾</span>
                    {isStudentOpen && (
                        <ul style={styles.dropdownContent}>
                            <li><a href="/student-add" style={styles.dropdownItem}>Student Registration</a></li>
                            <li><a href="/student-detail" style={styles.dropdownItem}>Student Details</a></li>
                        </ul>
                    )}
                </div>

                {/* Courses Dropdown */}
                <div
                    onMouseEnter={() => setIsCoursesOpen(true)}
                    onMouseLeave={() => setIsCoursesOpen(false)}
                    style={styles.dropdown}
                >
                    <span style={styles.menuItem}>Courses ▾</span>
                    {isCoursesOpen && (
                        <ul style={styles.dropdownContent}>
                            <li><a href="/student-course-list" style={styles.dropdownItem}>Course List</a></li>
                            <li><a href="/studsubscription-list" style={styles.dropdownItem}>Subscription List</a></li>
                            <li><a href="/subscription-add" style={styles.dropdownItem}>Subscribe Course</a></li>
                        </ul>
                    )}
                </div>

                {/* Payment Dropdown */}
                <div
                    onMouseEnter={() => setIsPaymentOpen(true)}
                    onMouseLeave={() => setIsPaymentOpen(false)}
                    style={styles.dropdown}
                >
                    <span style={styles.menuItem}>Payment ▾</span>
                    {isPaymentOpen && (
                        <ul style={styles.dropdownContent}>
                            <li><a href="/stud-payment-list" style={styles.dropdownItem}>Payment Report</a></li>
                            <li><a href="/payment-add" style={styles.dropdownItem}>Course Payment</a></li>
                        </ul>
                    )}
                </div>

                {/* Logout */}
                <a href="/" style={styles.menuItem}>Logout</a>
            </nav>

            {/* Welcome Text */}
            <div style={styles.content}>
                <p style={styles.welcome}>Welcome to the Student Dashboard</p>
            </div>

            {/* Quote Section */}
            <div style={styles.quoteSection}>
                <p style={styles.quote}>
                    "Unlock your potential—education is the passport to the future, and you hold the key."
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: "relative",
        backgroundImage: 'url("/assets/student.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 0,
    },
    header: {
        position: "relative",
        width: "100%",
        textAlign: "center",
        padding: "25px 0",
        zIndex: 1,
    },
    logo: {
        height: "60px",
        marginBottom: "10px",
    },
    title: {
        fontSize: "28px",
        margin: 0,
        color: "#fff",
    },
    menu: {
        position: "absolute",
        top: "250px",
        right: "40px",
        background: "rgba(52, 152, 219, 0.9)",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        zIndex: 2,
    },
    menuItem: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "500",
        padding: "30px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background 0.3s ease",
        position: "relative",
    },
    dropdown: {
        position: "relative",
    },
    dropdownContent: {
        position: "absolute",
        top: "0",
        left: "-210px",
        backgroundColor: "#fff",
        listStyle: "none",
        padding: "10px 0",
        margin: 0,
        borderRadius: "6px",
        minWidth: "200px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 999,
    },
    dropdownItem: {
        padding: "10px 20px",
        textDecoration: "none",
        color: "#333",
        display: "block",
        fontSize: "16px",
        transition: "background 0.3s",
    },
    content: {
        marginTop: "30px",
        textAlign: "center",
        color: "#fff",
        zIndex: 1,
        position: "relative",
    },
    welcome: {
        fontSize: "20px",
        fontWeight: "500",
    },
    quoteSection: {
        position: "absolute",
        top: "50%",
        left: "800px",
        transform: "translateY(-50%)",
        zIndex: 1,
        width: "300px",
        textAlign: "left",
        backgroundColor: "rgba(108, 169, 189, 0.56)",
        padding: "20px 25px",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(4px)",
    },
    quote: {
        fontSize: "18px",
        fontStyle: "italic",
        color: "#f0f0f0",
        lineHeight: "1.6",
        margin: 0,
    },
};

export default StudentMenu;
