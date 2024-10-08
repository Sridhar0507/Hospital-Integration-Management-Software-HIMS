import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router, adjust this import accordingly

function NotFound() {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>404 - Not Found</h1>
            <p style={styles.paragraph}>Oops! The page you are looking for might be under construction or doesn't exist.</p>
            <Link to="/" style={styles.link}>Go back to the homepage</Link>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    heading: {
        fontSize: '3rem',
        color: '#555',
    },
    paragraph: {
        fontSize: '1.2rem',
        color: '#777',
        marginTop: '20px',
    },
    link: {
        display: 'block',
        fontSize: '1.2rem',
        color: '#007bff',
        textDecoration: 'none',
        marginTop: '20px',
    },
};

export default NotFound;


