import React from 'react';
import $ from 'jquery';
import Messages from './message-list';
import Input from './input';
import _map from 'lodash/map';
import io from 'socket.io-client';

import './home.css';
import '../../lib/extensions';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        //Khởi tạo state,
        this.state = {
            messages: [], // danh sách tin nhắn
            user: { id: '', name: '' },// người dùng hiện tại, nếu rỗng sẽ hiển thị form login, có sẽ hiển thị phòng chat
            userOnline: [] // danh sách người dùng đang online
        }
        this.socket = null;
    }
    //Connetct với server nodejs, thông qua socket.io
    componentWillMount() {
        console.log('user temp: ', this.state.user)
        //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        var connectionOptions = {
            "force new connection": true,
            "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "timeout": 10000,                  //before connect_error and connect_timeout are emitted.
            "transports": ["websocket"]
        };
        this.socket = io('localhost:6969', connectionOptions);
        // this.socket.on('connect', function () {
        //   console.log('connected!');
        //   this.socket.emit('greet', { message: 'Hello Mr.Server!' });
        // });

        // this.socket.on('respond', function (data) {
        //   console.log(data);
        // });

        this.socket.on('newMessage', (response) => { this.newMessage(response) }); //lắng nghe khi có tin nhắn mới
        this.socket.on('loginFail', (response) => { alert('Tên đã có người sử dụng') }); //login fail
        this.socket.on('loginSuccess', (response) => { this.setState({ user: { id: this.socket.id, name: response } }) }); //đăng nhập thành công 
        this.socket.on('updateUesrList', (response) => { this.setState({ userOnline: response }) }); //update lại danh sách người dùng online khi có người đăng nhập hoặc đăng xuất

    }
    //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
    newMessage(m) {
        const messages = this.state.messages;
        let ids = _map(messages, 'id');
        let max = Math.max(...ids);
        messages.push({
            id: max + 1,
            userId: m.user.id,
            message: m.data,
            userName: m.user.name
        });
        let objMessage = $('.messages');
        if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight) {
            this.setState({ messages });
            objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

        } else {
            this.setState({ messages });
            if (m.id === this.state.user) {
                objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
            }
        }
    }
    //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn và người gửi
    sendnewMessage(m) {
        if (m.value) {
            this.socket.emit("newMessage", { data: m.value, user: this.state.user }); //gửi event về server
            m.value = "";
        }
    }
    //login để định danh người dùng
    login() {
        this.socket.emit("login", this.refs.name.value.capitalize());
    }

    render() {
        return (

            <div className="app__content">
                <div className="title_home"><h2>{`"Ngòi bút có uy lực hơn cả lưỡi gươm" - Edward Bulwer-Lytton`}</h2></div>
                {/* kiểm tra xem user đã tồn tại hay chưa, nếu tồn tại thì render form chat, chưa thì render form login */}
                {this.state.user.id && this.state.user.name ?
                    <div className="chat_window">
                        {/* danh sách user online */}
                        <div className="menu">
                            <ul className="user">
                                <span className="user-name">{this.state.user.name}</span>
                                <p>Online</p>
                                {this.state.userOnline.map(item =>
                                    <li key={item.id}><span>{item.name}</span></li>
                                )}
                            </ul>
                        </div>
                        {/* danh sách message */}
                        <div className="content">
                            <Messages user={this.state.user} messages={this.state.messages} typing={this.state.typing} />
                            <Input sendMessage={this.sendnewMessage.bind(this)} />
                        </div>
                    </div>

                    :
                    <div className="login_form">{/* form login */}
                        <input type="text" name="name" ref="name"></input>
                        <input type="button" name="" value="Login" onClick={this.login.bind(this)}></input>
                    </div>
                }
            </div>
        )
    }
}