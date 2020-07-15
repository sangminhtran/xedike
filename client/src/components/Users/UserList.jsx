import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUsers} from '../../action/users'

class UserList extends Component {
    componentDidMount() {
        this.props.getUsers();
      }

    render() {
        return (
            <div>
                <h1>Kakaka</h1>
            </div>
        );
    }
}

export default connect(null, {getUsers})(UserList);
