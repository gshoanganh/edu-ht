import React from 'react';
import Message from './message-item';


export default class MessageItem extends React.Component {
    render () {
        console.log('me list: ', this.props)
        return (
            <ul className="messages">
                {this.props.messages.map((item, index) =>
                    <Message key={index} userCurrent={this.props.user} item={item} message={item.message}/>
                )}
            </ul>
        )
    }
}