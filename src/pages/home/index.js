import React from 'react';
import $ from 'jquery';
import Messages from './message-list';
import Input from './input';
import _map from 'lodash/map';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';

import './home.css';
import './client.css'
import '../../lib/extensions';
import { questions } from './question';

import Teacher from '../../asset/photo/teacher01.png';
import Answer01 from '../../asset/photo/answer01.png';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //Khởi tạo state,
    this.state = {
      messages: [], // danh sách tin nhắn
      user: { id: '', name: '' },// người dùng hiện tại, nếu rỗng sẽ hiển thị form login, có sẽ hiển thị phòng chat
      userOnline: [], // danh sách người dùng đang online
      route: 0,
      opens: [{ route: 0, value: false }]
    }
    this.socket = null;
  }

  setValue = (data) => {
    this.setState({ ...this.state, ...data })
  }

  setOpen = (index) => {
    var opens = this.state.opens;
    opens = opens.filter(t => t.route == index);
    console.log('opens: ', index, opens)
    opens = [...this.state.opens.filter(t => t.route != index), { route: index, value: (opens && opens.length > 0) ? !opens[0].value : true }]
    console.log('opens2: ', index, opens)
    this.setState({ ...this.state, opens });
  }

  getOpen = () => {
    var opens = this.state.opens;
    opens = opens.filter(t => t.route == this.state.route);
    return (opens && opens.length > 0) && opens[0].value;

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
    var { route, opens } = this.state;
    var show = opens && opens[route] && this.getOpen();
    return (

      <div className="app__content">
        <div>
          <div className="title_home"><h2>{`"Ngòi bút có uy lực hơn cả lưỡi gươm" - Edward Bulwer-Lytton`}</h2></div>

          {/* kiểm tra xem user đã tồn tại hay chưa, nếu tồn tại thì render form chat, chưa thì render form login */}
          {!(this.state.user.id && this.state.user.name) ?
            <div className="chat_window">

              <div className="question_number">
                {
                  questions.map((item, index) => {
                    return (<Button
                      className={"btn-circle " + (route == index ? "btn-info" : "btn-outline-warning")}
                      onClick={() => this.setValue({ route: index })}>{index + 1}</Button>
                    )
                  })
                }
              </div>
              <div className="questions">
                <div className={(true) ? "message right appeared" : "message left appeared"}>
                  <div className="avatar"><img width={80} src={Teacher} alt="fireSpot" /></div>
                  <div className="text_wrapper">
                    <div className="text">{show ? questions[route].name : 'Chào quý thầy cô và các bạn học sinh!'}</div>
                  </div>
                </div>
                <div className="contents">
                  <div className={"choices_group"}>
                    {
                      (show) ? (
                        <React.Fragment>
                          <div className="choices_items"><div className="d-cricle">A</div> {questions[route].chooses[0]}</div>
                          <div className="choices_items"><div className="d-cricle">B</div> {questions[route].chooses[1]}</div>
                          <div className="choices_items"><div className="d-cricle">C</div> {questions[route].chooses[2]}</div>
                          <div className="choices_items"><div className="d-cricle">D</div> {questions[route].chooses[3]}</div>
                        </React.Fragment>
                      ) : (
                          <div className="bottom_sent clearfix">

                            <div className="send_message" onClick={() => this.setOpen(this.state.route)}>
                              <div className="icon"></div>
                              <div className="text">BẮT ĐẦU</div>
                            </div>
                            <br/>
                             <img width={180} src={Answer01} alt="fireSpot" /> 

                          </div>
                        )
                    }
                  </div>
                  <div className="answers">
                    {/* danh sách user online */}
                    <div className="menu">
                      <ul className="user">
                        <span className="user-name">{this.state.user.name}</span>
                        <p className="text-center">{'BẢNG XẾP HẠNG'}</p>
                        <div className="menu_top">
                          <Nav fill variant="tabs" defaultActiveKey="link-0">
                            <Nav.Item>
                              <Nav.Link eventKey="link-0">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="link-1">Time</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="link-2">Full</Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div>

                      </ul>
                    </div>
                    {this.renderList()}
                  </div>
                </div>
              </div>

              {/* danh sách message */}
              <div className="content">

                <div className="bottom_wrapper clearfix">
                  <div className="">
                    {'Giáo viên: '}<b>Nguyễn Thị Phi</b>{' - Bộ môn: Văn học'}</div></div>

                {/* <Messages user={this.state.user} messages={this.state.messages} typing={this.state.typing} />
      <Input sendMessage={this.sendnewMessage.bind(this)} /> */}
              </div>
            </div>

            :
            <div className="login_form">{/* form login */}
              <input type="text" name="name" ref="name"></input>
              <input type="button" name="" value="Login" onClick={this.login.bind(this)}></input>
            </div>
          }
        </div>
        <div className="footer">(c) Copyright Gs Hoang Anh - facebook.com/gs.anhhoang</div>
      </div>
    )
  }

  renderList = () => {
    var list = [];
    for (var i = 0; i < 40; i++) {
      list.push({ i })
    }
    return <div className="student">
      <table>
        {/* <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <td><div className="t-cricle">1</div></td>
            <td><div className="t-cricle-name1">Ly Thanh Nam</div></td>
            <td><div className="t-cricle-other">A</div></td>
            <td><div className="t-cricle-other">15 s</div></td>
          </tr>
          {list.map((item, index) => {
            return (<tr>
              <td><div className="t-cricle">{index + 1}</div></td>
              <td><div className="t-cricle-name1">Ly Thanh Nam</div></td>
              <td><div className="t-cricle-other">A</div></td>
              <td><div className="t-cricle-other">15 s</div></td>
            </tr>)
          })}
        </tbody>
      </table>
      {this.state.userOnline.map(item =>
        <li key={item.id}><span>{item.name}</span></li>
      )}
    </div>
  }
}