import React, { Component } from 'react';
import styled from 'styled-components';


export default class GoogleAuth extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StyledGoogleBtn
                    className="btn waves-effect waves-light login-base-btn hoverable"
                    href="http://localhost:5000/api/auth/google"
                >
                    <img src="/img/login/google.svg" alt="g-logo"/>
                    <span>Log in with Google</span>
                </StyledGoogleBtn>
            </div>
        )
    }
}

const StyledGoogleBtn = styled.a`
    color: #363636;
    background-color: #ffffff;
    position: relative;

    img {
        position: absolute;
        height: 2.5rem;
        width: 2.5rem;
        top: 20%;
        left: 10%;
        transform: translate(-10%);
    }

    span {
        margin-left: 10%;
    }

    &:hover, &:focus {
        background-color: #ffffff;
    }
`;