import React, { Component } from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'react-feather';
import { redirect } from '../../helpers/redirect';

const BackToDash = () => (
    <StyledBack>
        <a onClick={redirect.dashboard}><ArrowLeft /> Back to Dashboard</a>
    </StyledBack>
)

export default BackToDash;


const StyledBack = styled.div`

    margin: 4rem 0 15vh 0;

    a {
        color: #bdbdbd;
    }

    svg {
        stroke: #7c4dff;
        margin-bottom: -6px;
        margin-right: 5px;
    }
`;
