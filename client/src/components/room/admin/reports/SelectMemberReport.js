import React, { Component } from 'react';
import styled from 'styled-components';
import { redirect } from '../../../../helpers/redirect';
import { materializeJS } from '../../../../helpers/materialize';

export default class SelectMemberReport extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        materializeJS.M.FormSelect.init(document.querySelectorAll('select'), {});
    }

    renderMemberOptions() {
        
        return Object.values(this.props.data)
            .sort((a, b) => `${a.name}`.localeCompare(`${b.name}`))
            .map(member => {
            return <option
                        value={member.id}
                        key={member.id} 
                        data-icon={member.photoUrl}
                    >
                        {member.name}
                    </option>
        });
    }

    render() {
        return (
            <StyledSelectCont>
                <div className="input-field col s12 m10 l10">
                    <select 
                        value="none"
                        className="icons"
                        onChange={(e) => redirect.roomMemberReport(this.props.roomID, e.target.value)}
                    >
                        <option disabled value="none">Choose a member</option>
                        {this.renderMemberOptions()}
                    </select>
                    <label>Select a member for individual report</label>
                </div>
            </StyledSelectCont>
        )
    }
}

const StyledSelectCont = styled.div`
    margin: 1rem 0;
`;
