import React, { Component } from 'react';
import styled from 'styled-components';
import { authentication } from '../../api/authentication/authentication';
import CircularLoader from '../loaders/CircularLoader';

export default class VerifyAccount extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
        this.state = { 
            loading: true ,
            verified: false,
            message: 'verifying account...'
        };
    }

    async componentDidMount() {

        // check for valid and verification / user id
        const response = await authentication
            .verifyAccount({ ...this.props.match.params });

        console.log(response);

        this.setState({
            loading: false, 
            verified: response.data.success,
            message: response.data.message
        });
    }

    renderStatus() {

        if (this.state.loading) {
            return (
                <StyledLoaderCont>
                    <CircularLoader size="big" />
                    <h5>{this.state.message}</h5>
                </StyledLoaderCont>
            )
        }

        else if (this.state.verified) {
            return <h1>VERIFIED</h1>
        }

        else {
            return (
                <StyledInvalidCont>
                    <h1>Something went wrong...</h1>
                    <p>{this.state.message}</p>
                </StyledInvalidCont>
            )
        }
    }

    render() {
        return (
            <StyledMain>
               {this.renderStatus()}
            </StyledMain>
        )
    }
}

const StyledMain = styled.main`
    position: relative;
    min-height: 90vh;
`;


const StyledLoaderCont = styled.div`
    position: relative;
    min-height: 90vh;

    h5 {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%);
        font-size: 1.75rem;
        color: #bdbdbd;
        font-weight: 100;
    }
`;

const StyledInvalidCont = styled.div`
    
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;

    h1 {
        margin: 0;
        font-weight: 600;
        letter-spacing: 3px;
        font-size: 2.75rem;
    }
    
    p {
        margin: 1.5rem;
        color: #9e9e9e;
        opacity: 0.8;
        font-size: 1rem; 
        letter-spacing: 1px;   
    }
`;
