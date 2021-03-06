import React from 'react';
import './google-button.css';
import GoogleLogo from '../../assets/logo/google-logo.svg';

const GoogleButton = ({ ...otherProps }) => (
    <div className="google-btn" {...otherProps}>
        <div className="google-icon-wrapper">
            <img className="google-icon" src={GoogleLogo} alt='GoogleButton' />
        </div>
        <p className="btn-text"><b>Sign In With Google</b></p>
    </div>
)

export default GoogleButton;