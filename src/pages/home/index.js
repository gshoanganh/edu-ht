import React from 'react';
import $ from 'jquery';
//import Messages from './message-list';
//import Input from './input';
import _map from 'lodash/map';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import moment from 'moment';

import './home.css';
import './client.css'
import '../../lib/extensions';
import { questions } from './question';
//import Login from '../admin/login';
import '../admin/login.css';

import Teacher from '../../asset/photo/teacher01.png';
import Answer01 from '../../asset/photo/answer01.png';

import Timer from './timer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.defaultSeconds = 10;
    //Khởi tạo state,
    this.state = {
      messages: [], // danh sách tin nhắn
      user: { id: '', name: '' },// người dùng hiện tại, nếu rỗng sẽ hiển thị form login, có sẽ hiển thị phòng chat
      userOnline: [], // danh sách người dùng đang online
      route: 0,
      opens: [],//[{ route: 0, tab:0, timeStart: '', value: false, answers: [] }], //answers: câu trả lời 
      //timer 
      timer: 15
    }
    this.socket = null;
    //Timer  
    this.timer = 0;

  }

  setValue = (data) => {
    console.log('setValue: ', data)
    this.setState({ ...this.state, ...data })
  }

  //Mở câu hỏi 
  setOpen = (index) => {
    //start timer  

    //open question 
    var opens = this.state.opens;
    var findIndex = opens.findIndex(t => t.route === index);
    if (findIndex >= 0) {
      opens[findIndex] = {
        route: index,
        timeStart: this.getHourMinute(),
        tab: (opens && opens.length > 0) ? opens[findIndex].tab : 0,
        value: (opens && opens.length > 0) ? !opens[findIndex].value : true,
        answers: (opens && opens.length > 0) ? opens[findIndex].answers : []
      };
    }
    else {
      opens = [...opens, {
        route: index,
        timeStart: this.getHourMinute(),
        tab: 0,
        value: true,
        answers: []
      }];
    }

    this.setState({ ...this.state, opens, time: {}, seconds: this.defaultSeconds });
    console.log('opens: ', opens)
    this.socket.emit("openQuestion", { opens: opens }); //gửi event về server
  }
  setRating = (index) => {
    var route = this.state.route;
    var opens = this.state.opens;
    var findIndex = opens.findIndex(t => t.route === route);
    if (findIndex >= 0) {
      opens[findIndex] = {
        ...opens[findIndex],
        tab: index,
      };
    }
    else {
      opens = [...opens, {
        route: route,
        timeStart: '',
        tab: index,
        value: false,
        answers: []
      }];
    }

    this.setState({ ...this.state, opens });
    console.log('opens rating: ', opens)
    this.socket.emit("openQuestion", { opens: opens }); //gửi event về server
  }
  getTab = () => {
    var route = this.state.route;
    var opens = this.state.opens;
    var findIndex = opens.findIndex(t => t.route === route);
    return (findIndex >= 0) ? opens[findIndex].tab : 0;
  }

  //Kiểm tra câu hỏi đã mở hay chưa 
  getOpen = () => {
    var opens = this.state.opens;
    opens = opens.filter(t => t.route === this.state.route);
    return (opens && opens.length > 0) && opens[0].value;
  }
  //Thêm vào học sinh trả lời 
  setAnswers = (data) => {
    var index = this.state.route;
    var students = [];
    var answers = [];
    //open question 
    var opens = this.state.opens;
    opens = opens.filter(t => t.route === index);
    if (opens && opens.length > 0) {
      answers = opens[0].answers;
      if (!(answers && answers.length > 0)) {
        answers = [data];
      }
      else {
        var findIndex = answers.findIndex(t => t.userName === data.userName);
        if (findIndex < 0) {
          answers = [...answers, data];
        }
        else {
          answers = [...answers.filter(t => t.userName !== data.userName), data];
          //answers[findIndex] = data;
        }
      }
      console.log('findIndex: ', findIndex, data, opens);
    }
    else {
      //answers = [data];
    }
    console.log('students: ', students, answers);

    opens = [...this.state.opens.filter(t => t.route !== index),
    {
      route: index,
      tab: (opens && opens.length > 0) ? opens[0].tab : 0,
      timeStart: opens[0].timeStart,
      value: opens[0].value,
      answers: answers
    }]

    this.setState({ ...this.state, opens });
  }

  //Ngày hiện tại 
  getDateCurrent = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }
  //Giờ phút hiện tại 
  getHourMinute = () => {
    var time = new Date();
    var hh = String(time.getHours()).padStart(2, '0');
    var mm = String(time.getMinutes()).padStart(2, '0');
    var ss = String(time.getSeconds()).padStart(2, '0');
    var ms = String(time.getMilliseconds()).padStart(2, '0');

    time = hh + ':' + mm + ':' + ss + '.' + ms;
    console.log('time hour current: ', time)
    return time;
  }

  //Thời gian hiện tại 
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let divisor_for_milliseconds = divisor_for_seconds % 60;
    let milliSeconds = Math.ceil(divisor_for_milliseconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds,
      "ms": milliSeconds
    };
    return obj;
  }

  componentDidMount() {

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
    this.socket = io('https://polar-falls-90130.herokuapp.com/', connectionOptions);
    // this.socket.on('connect', function () {
    //   console.log('connected!');
    //   this.socket.emit('greet', { message: 'Hello Mr.Server!' });
    // });

    // this.socket.on('respond', function (data) {
    //   console.log(data);
    // });

    this.socket.on('newMessage', (response) => { this.newMessage(response) }); //lắng nghe khi có tin nhắn mới
    this.socket.on('loginFail', (response) => { alert('Tên đã có người sử dụng') }); //login fail
    this.socket.on('loginSuccess', (response) => {
      this.setValue({ user: { id: this.socket.id, name: response.user, code: response.code, time: this.getHourMinute() } })
      if (response.user === "Admin" || response.user === "admin") { //chỉ có Giáo viên đăng nhập mới load lại câu hỏi.
        this.setRating(0)
      }
    }); //đăng nhập thành công 
    this.socket.on('updateUesrList', (response) => { this.setValue({ userOnline: response }) }); //update lại danh sách người dùng online khi có người đăng nhập hoặc đăng xuất
    this.socket.on('teacherQuestion', (response) => { this.setValue({ route: response.route }); });
    this.socket.on('openQuestion', (response) => { this.setValue({ opens: response.opens }); });
    //lam moi lai danh sach refreshList
    this.socket.on('refreshList', (response) => {
      if (!(this.state.user.name === 'Admin' || this.state.user.name === 'admin')) {
        this.setValue({ user: null })
      }
    });

  }
  //Khi có tin nhắn mới, sẽ push tin nhắn vào state mesgages, và nó sẽ được render ra màn hình
  newMessage(m) {
    console.log('get mess: ', m)

    const messages = this.state.messages;
    let ids = _map(messages, 'id');
    let max = Math.max(...ids);
    var data = {
      id: max + 1,
      userId: m.user.id,
      message: m.data,
      userName: m.user.name,
      code: m.user.code,
      date: this.getDateCurrent(),
      time: this.getHourMinute()
    };
    messages.push(data);
    this.setState({ messages });
    //dua vao day cau tra loi
    this.setAnswers(data);

    // let objMessage = $('.messages');
    // if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight) {
    //   this.setState({ messages });
    //   objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300); //tạo hiệu ứng cuộn khi có tin nhắn mới

    // } else {
    //   this.setState({ messages });
    //   if (m.id === this.state.user) {
    //     objMessage.animate({ scrollTop: objMessage.prop('scrollHeight') }, 300);
    //   }
    // }
  }
  //Gửi event socket newMessage với dữ liệu là nội dung tin nhắn và người gửi
  sendnewMessage(m) {
    console.log('mess: ', m)
    // if (m.value) {
    //   this.socket.emit("newMessage", { data: m.value, user: this.state.user }); //gửi event về server
    //   m.value = "";
    // }
    this.socket.emit("newMessage", { data: m, user: this.state.user }); //gửi event về server
  }
  //login để định danh người dùng
  login() {
    var user = this.refs.name.value.capitalize();
    var code = this.refs.code.value.capitalize();
    if (!(user && code)) {
      this.setState({ error: 'Họ tên và Mã xác nhận không nên để trống!' })
      return null;
    }
    if ((user === 'Admin' || user === 'admin') && code !== '1212p') {
      this.setState({ error: 'Mật khẩu không chính xác!' })
      return null;
    }
    else if (user.length < 5) {
      this.setState({ error: 'Họ tên của bạn quá ngắn!' })
      return null;
    }
    var time = this.getHourMinute();
    this.socket.emit("login", { user, code, time });
  }

  //gui cau hoi hien tai dang mo
  sendQuestion = (data) => {
    console.log('send question', data)
    this.socket.emit("teacherQuestion", { ...data }); //gửi event về server
  }

  refreshList = () => {
    this.socket.emit("refreshList", true); //Làm mới lại toàn bộ danh sách
  }

  //xuất ds ra file 
  exportStudent = () => {
    var route = this.state.route + 1;
    var opens = this.state.opens[route - 1];
    var timeStart = "";
    var data = "";
    if (opens) {
      timeStart = opens.timeStart;
      opens = opens.answers;
      if (opens && opens.length > 0) {
        var answer = questions[route - 1].answer;
        var list = opens.filter(t => (answer - 1) === t.message);
        if (list && list.length > 0) {
          list.map((item, index) => {
            var dapan = this.getAnswers(item.message);
            data += `${index + 1}. ${item.userName} <code: ${item.code}> (${dapan}) - time: ${item.time}\r\n`;
          })
        }
      }
    }
    if (!data) {
      alert("Không có dữ liệu ghi!");
      return null;
    }
    var title = "\n             DANH SÁCH HỌC SINH (CÂU HỎI " + route + ")\r\n"
    data = title + "           (Thời gian bắt đầu: " + timeStart + ")\r\n\r\n" + data;
    data += "\r\n \r\nDanh sách trên sắp xếp theo tiêu chí: Đúng và nhanh nhất.";
    let script = document.createElement('a');
    script.href = "data:application/octet-stream," + encodeURIComponent(data);
    script.download = `BangXepHang-Cau-Hoi-${route}.txt`;
    script.click();
  }

  render() {
    var { route, opens } = this.state;
    //var show = opens && opens[route] && this.getOpen();
    console.log('this.state.user.name<: ', this.state.user)
    var isTeacher = this.state.user && this.state.user.name === 'Admin';
    return (
      <div className="app__content">
        {/* <div className="title_home"><h2>{`"Ngòi bút có uy lực hơn cả lưỡi gươm" - Edward Bulwer-Lytton`}</h2></div> */}

        {/* kiểm tra xem user đã tồn tại hay chưa, nếu tồn tại thì render form chat, chưa thì render form login */}
        {(this.state.user && this.state.user.id && this.state.user.name) ?
          (isTeacher ? this.renderTeacher() : this.renderStudent())
          :
          <div>
            {this.renderLogin()}
            {/* <div className="login_form">{/* form login 
              <input type="text" name="name" ref="name"></input>
              <input type="button" name="" value="Login" onClick={this.login.bind(this)}></input>
            </div> */}
          </div>

        }
        <div className="footer">(c) Copyright Gs Hoang Anh - facebook.com/gs.anhhoang</div>
      </div>
    )
  }

  getAnswers = (value) => {
    switch (value) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
    }
  }

  renderList = () => {
    var { opens, route } = this.state;
    opens = opens.filter(t => t.route === route);
    if (opens && opens.length > 0) {
      opens = opens[0];
    }
    if (!opens)
      return null;

    var answer = questions[route].answer;
    var list = opens.answers;
    var listIncorrect = [];
    if (this.getTab() === 1 && list && list.length > 0) {
      list = list.filter(t => (answer - 1) === t.message);
      listIncorrect = opens.answers.filter(t => (answer - 1) !== t.message);
    }
    console.log('danh sach: ', list, this.state)
    return <div className="student">
      <div className="clearfix">{this.getTab() === 1 ? "Ds đúng: " : "Đã tham gia:"} {this.getTab() === 2 ?
        this.state.userOnline.length : ((list) ? list.length : 0)}
        {this.getTab() === 2 && <button onClick={() => this.refreshList()}>Refresh</button>}
        {this.getTab() === 1 && <span className="text-success ml-2 cursor" onClick={() => this.exportStudent()}>{"(Tải dánh sách)"}</span>}
      </div>
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

          {(this.getTab() === 2) && this.state.userOnline.map((item, index) => {
            return (<tr key={index}>
              <td className="w-20"><div className="t-cricle">{index + 1}</div></td>
              <td><div className="t-cricle-name1 ml-2">{(item.name === 'Admin' || item.name === 'admin') ? 'Giáo viên' : item.name}</div></td>
              <td><div className="t-cricle-other">{item.time && item.time.substring(0, 8)}</div></td>
            </tr>)
          })}
          {(this.getTab() < 2 && list && list.length > 0) &&
            list.map((item, index) => {
              console.log('item: ', item)

              let valuestart = moment.duration(opens.timeStart, "HH:mm:ss.SSSS");
              let valuestop = moment.duration(item.time, "HH:mm:ss.SSSS");
              let difference = valuestop.subtract(valuestart);

              var finalTime = (difference.hours() + ":" + difference.minutes() + ":" + difference.seconds() + ":" + difference.milliseconds())
              console.log('final time: ', finalTime)
              var user = item.user;
              return (<tr key={index}>
                <td className="w-20"><div className="t-cricle">{index + 1}</div></td>
                <td><div className="t-cricle-name1 ml-2">{item.userName}</div></td>
                {
                  this.getTab() === 1 && (
                    <React.Fragment>

                      <td><div className="t-cricle-other">{item.time}</div></td>
                      <td><div className="t-cricle-other font-weight-bold text-success">{this.getAnswers(item.message)}</div></td>
                    </React.Fragment>
                  )
                }
                <td><div className="t-cricle-other text-primary">{`${difference.minutes()}:${difference.seconds()}.${difference.milliseconds()}`}</div></td>
              </tr>)
            })}
          {
            (this.getTab() === 1 && listIncorrect && listIncorrect.length > 0) && (
              listIncorrect.map((item, index) => {
                return (<tr key={index}>
                  <td className="w-20"> </td>
                  <td><div className="t-cricle-name1 ml-2">{item.userName}</div></td>

                  <React.Fragment>
                    <td> </td>
                    <td><div className="t-cricle-other font-weight-bold text-success">{this.getAnswers(item.message)}</div></td>
                  </React.Fragment>

                  <td className="text-danger">SAI</td>
                </tr>)
              }
              ))
          }
        </tbody>
      </table>
      {/* <small>Nếu có hs đăng nhập sau thì click tab "trả lời"</small> */}
      {/* {this.state.userOnline.map(item =>
        <li key={item.id}><span>{item.name}</span></li>
      )} */}
    </div>
  }

  renderLogin = () => {
    return (<div className={"container"}>
      <div className={"row"}>
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              {this.state.error && <p className="text-danger text-center">{this.state.error}</p>}
              <div className="form-signin">
                <div className="form-label-group">
                  <input type="text" name="name" ref="name" id="inputEmail" className="form-control" placeholder="Email address" />
                  <label for="inputEmail">Họ và tên</label>
                </div>
                <div className="form-label-group">
                  <input type="password" name="code" ref="code" id="inputPassword" className="form-control" placeholder="Password" />
                  <label for="inputPassword">Mã xác nhận</label>
                </div>
                <div className="custom-control custom-checkbox mb-3">
                  <input type="text" type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" for="customCheck1">Agree all</label>
                </div>
                <div>Chú ý: Mã xác nhận hs tự đặt (và cần nhớ)</div>
                <button type="button" name="" onClick={this.login.bind(this)} className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

  }

  renderStudent = () => {
    var { route, opens, user } = this.state;
    var show = opens && opens[route] && this.getOpen();

    var answered = null;
    if (show) {
      answered = (opens[route].answers);
      if (answered && answered.length > 0) {
        var findIndex = answered.findIndex(t => t.userId === this.state.user.id);
        if (findIndex >= 0) {
          answered = this.getAnswers(answered[findIndex].message);
        }
      }
      else { answered = null; }
    }
    //console.log('Current user: ', opens[route].answers, answered);
    return (<div className="student-main">
      <div className="content">
        <h3 className="text-center text-success">Câu hỏi số {route + 1}</h3><p>Họ tên:<b> {user.name}</b></p>
        {
          (show) ? (
            <React.Fragment>
              <div className={"alert alert-" + (answered ? "primary" : "danger")} role="alert">
                {(answered) ? ('Đáp án đã chọn: ' + answered) : 'Bạn chưa chọn đáp án!'}
              </div>
              <div className="choices_items"><button value="0" type="button" className="btn btn-primary ml-2" onClick={() => this.sendnewMessage(0)}>Chọn A</button> <span className="ml-3">{questions[route].chooses[0]}</span></div>
              <div className="choices_items"><button value="1" type="button" className="btn btn-primary ml-2" onClick={() => this.sendnewMessage(1)}>Chọn B</button> <span className="ml-3">{questions[route].chooses[1]}</span></div>
              <div className="choices_items"><button value="2" type="button" className="btn btn-primary ml-2" onClick={() => this.sendnewMessage(2)}>Chọn C</button> <span className="ml-3">{questions[route].chooses[2]}</span></div>
              <div className="choices_items"><button value="2" type="button" className="btn btn-primary ml-2" onClick={() => this.sendnewMessage(3)}>Chọn D</button> <span className="ml-3">{questions[route].chooses[3]}</span></div>
              <div className="timer">
                <Timer />
                Việc thay đổi đáp án sẽ khiến cho thời gian thay đổi
              </div>
            </React.Fragment>
          ) : (
              <div className="bottom_sent clearfix">
                <div className="alert alert-danger" role="alert">
                  Chờ giáo viên đặt câu hỏi!
                </div>
              </div>
            )
        }
      </div></div>)
  }

  renderTeacher = () => {
    var { route, opens } = this.state;
    var show = opens && opens[route] && this.getOpen();
    console.log('this.getTab(): ', this.getTab())
    return (<div className="chat_window">
      <div className="question_number">
        {
          questions.map((item, index) => {
            return (<Button key={index}
              className={"btn-circle " + (route === index ? "btn-info" : "btn-outline-warning")}
              onClick={() => this.sendQuestion({ route: index })}>{index + 1}</Button>
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
                  <div className="timer">
                    <Timer />
                  </div>
                </React.Fragment>
              ) : (
                  <div className="bottom_sent clearfix">

                    <div className="send_message" onClick={() => this.setOpen(this.state.route)}>
                      <div className="icon"></div>
                      <div className="text">BẮT ĐẦU</div>
                    </div>
                    <br />
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
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <a className={"nav-item nav-link " + (this.getTab() === 0 ? "active" : "")} onClick={() => this.setRating(0)} id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Trả lời</a>
                      <a className={"nav-item nav-link " + (this.getTab() === 1 ? "active" : "")} onClick={() => this.setRating(1)} id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Xếp hạng</a>
                      <a className={"nav-item nav-link " + (this.getTab() === 2 ? "active" : "")} onClick={() => this.setRating(2)} id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Tham gia</a>
                    </div>
                  </nav>
                  {/* <Nav fill variant="tabs">
                    <Nav.Item onClick={() => this.setRating(0)}>
                      <Nav.Link className={this.getTab() === 0 ? "active" : ""} eventKey="link-0">Trả lời</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={() => this.setRating(1)}>
                      <Nav.Link className={this.getTab() === 1 ? "active" : ""} eventKey="link-1">Xếp hạng</Nav.Link>
                    </Nav.Item>
                    <Nav.Item onClick={() => this.setRating(2)}>
                      <Nav.Link className={this.getTab() === 2 ? "active" : ""} eventKey="link-2">Tham gia</Nav.Link>
                    </Nav.Item>
                  </Nav> */}
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
    )
  }
}
