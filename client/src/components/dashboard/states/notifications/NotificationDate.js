import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from '../../../../helpers/format';

export default class NotificationDate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledDate>
                <span className="date">{format.tsToDate(new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).getTime())}</span>
            </StyledDate>
        )
    }
}

const StyledDate = styled.div`

    min-width: 100%;
    text-align: center;
    position: sticky;
    z-index: 1000;
    border-bottom: 1px solid #e0e0e0;
    margin: 3rem 0;
    background-color: #f5f5f5;
    top: 0;


    span {
        display: inline-block;
    }

    .date {
        text-align: center;
        min-width: 15%;
        font-size: 0.9rem;
        font-weight: 600;
        color: #363636;
        padding: 0.3rem 0.7rem;
        margin-bottom: -1px;
    }
`;