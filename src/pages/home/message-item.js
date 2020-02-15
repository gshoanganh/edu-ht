import React from 'react';

export default class messageItem extends React.Component {
    
    render () {
        console.log('mess item: ',this.props)
        var {userCurrent,item} = this.props;
        return (
            <li className={(userCurrent && userCurrent.name==item.userName)? "message right appeared": "message left appeared"}>
                <div className="avatar">{item?item.userName.substring(0,1).toUpperCase():'A'}</div>
                <div className="text_wrapper">
                    <div className="text">{this.props.message}</div>
                </div>
            </li>
        )
    }
}