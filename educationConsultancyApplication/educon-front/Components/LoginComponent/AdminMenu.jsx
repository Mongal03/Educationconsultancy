import React, { useState } from "react";

const AdminMenu = () => {
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isStudentsOpen, setIsStudentsOpen] = useState(false);
    const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);

    return (
        <div style={styles.container}>
            {/* Background Overlay */}
            <div style={styles.overlay}></div>

            {/* Header */}
            <div style={styles.header}>
                <img src="/assets/login1.jpg" alt="EduConsult Logo" style={styles.logo} />
                <h2 style={styles.title}>Education Consultancy Admin Menu</h2>
            </div>

            {/* Horizontal Menu */}
            <nav style={styles.menu}>
                {/* Student Dropdown */}
                <div
                    style={styles.dropdown}
                    onMouseEnter={() => setIsStudentsOpen(true)}
                    onMouseLeave={() => setIsStudentsOpen(false)}
                >
                    <span style={styles.menuItem}>Student ▾</span>
                    {isStudentsOpen && (
                        <ul style={styles.dropdownContent}>
                            <li><a href="/student-list" style={styles.dropdownItem}>Student List</a></li>
                            <li><a href="/student-current-list" style={styles.dropdownItem}>Current Student List</a></li>
                        </ul>
                    )}
                </div>

                {/* Courses Dropdown */}
                <div
                    style={styles.dropdown}
                    onMouseEnter={() => setIsCoursesOpen(true)}
                    onMouseLeave={() => setIsCoursesOpen(false)}
                >
                    <span style={styles.menuItem}>Courses ▾</span>
                    {isCoursesOpen && (
                        <ul style={styles.dropdownContent}>
                            <li><a href="/course-add" style={styles.dropdownItem}>Course Addition</a></li>
                            <li><a href="/admin-course-list" style={styles.dropdownItem}>Admin Course List</a></li>
                        </ul>
                    )}
                </div>

                {/* Subscription Dropdown */}
                <div
                    style={styles.dropdown}
                    onMouseEnter={() => setIsSubscriptionsOpen(true)}
                    onMouseLeave={() => setIsSubscriptionsOpen(false)}
                >
                    <span style={styles.menuItem}>Subscription ▾</span>
                    {isSubscriptionsOpen && (
                        <ul style={styles.dropdownContent}>
                            <li><a href="/subscription-list" style={styles.dropdownItem}>Subscription List</a></li>
                        </ul>
                    )}
                </div>

                {/* Other Links */}
                <a href="/payment-list" style={styles.menuItem}>Payment List</a>
                <a href="/" style={styles.menuItem}>Logout</a>
            </nav>

            {/* Quote Section (Left Middle) */}
            <div style={styles.quoteSection}>
                <p style={styles.quote}>
                    "Empowering futures through guidance, knowledge, and opportunity — our education consultancy is your partner in the journey toward academic success."
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: "relative",
        backgroundImage: 'url("/assets/admin.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
        display: "flex",
        flexDirection: "column",
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
        backgroundColor: "rgba(0, 0, 0, 0)",
        zIndex: 1,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    },
    logo: {
        height: "60px",
        marginBottom: "10px",
    },
    title: {
        fontSize: "28px",
        margin: "0",
        color: "#fff",
    },
    menu: {
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "40px",
        padding: "20px 0",
        background: "rgba(104, 159, 218, 0.9)",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    },
    menuItem: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "500",
        padding: "10px 16px",
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
        top: "100%",
        left: 0,
        backgroundColor: "#fff",
        color: "#333",
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
    quoteSection: {
        position: "absolute",
        top: "60%",
        left: "60px",
        transform: "translateY(-50%)",
        zIndex: 1,
        width: "300px",
        textAlign: "left",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "35px 25px",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(4px)",
    },
    quote: {
        fontSize: "20spx",
        fontStyle: "italic",
        color: "#f0f0f0",
        lineHeight: "1.6",
        margin: 0,
    },
};

export default AdminMenu;
