(this["webpackJsonpedu-ht"]=this["webpackJsonpedu-ht"]||[]).push([[0],{203:function(e,t){},210:function(e,t,n){},211:function(e,t,n){},212:function(e,t){String.prototype.capitalize=function(){return this.toLowerCase().replace(/./,(function(e){return e.toUpperCase()})).replace(/[^']\b\w/g,(function(e){return e.toUpperCase()}))}},213:function(e,t,n){},214:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),c=n(78),r=n.n(c),i=(n(90),n(6)),o=n(7),l=n(1),m=n(23),u=n(24),h=n(28),d=n(25),g=n(5),p=n(27),f=n(79),v=n.n(f),E=n(80),b=n.n(E),N=(n(206),n(216)),w=n(12),k=n.n(w),x=n(81),S=n.n(x),y=(n(210),n(211),n(212),[{name:'Trong nh\u1eefng nh\u1eadn x\xe9t sau \u0111\xe2y, nh\u1eadn x\xe9t n\xe0o kh\xf4ng \u0111\xfang v\u1ec1 v\u1ebb \u0111\u1eb9p c\u1ee7a b\xe0i th\u01a1 "Thu\u1eadt ho\xe0i"?',chooses:["V\u1ebb \u0111\u1eb9p c\u1ee7a ba ng\u01b0\u1eddi l\xednh.","V\u1ebb \u0111\u1eb9p c\u1ee7a con ng\u01b0\u1eddi k\xec v\u0129.","V\u1ebb \u0111\u1eb9p c\u1ee7a th\u1eddi gian k\xec v\u0129.","V\u1ebb \u0111\u1eb9p c\u1ee7a kh\xf4ng gian k\xec v\u0129."],answer:1},{name:'T\xecnh c\u1ea3m, c\u1ea3m x\xfac n\xe0o kh\xf4ng \u0111\u01b0\u1ee3c th\u1ec3 hi\u1ec7n trong b\xe0i th\u01a1 "Thu\u1eadt ho\xe0i"?',chooses:["T\u1ef1 h\xe0o v\u1ec1 kh\xed th\u1ebf v\xe0 s\u1ee9c m\u1ea1nh c\u1ee7a qu\xe2n \u0111\u1ed9i th\u1eddi Tr\u1ea7n.","Th\u1eb9n v\xec ch\u01b0a tr\u1ea3 xong n\u1ee3 c\xf4ng danh.","L\xf2ng y\xeau n\u01b0\u1edbc, t\u1ef1 h\xe0o d\xe2n t\u1ed9c.","Ph\xea ph\xe1n tri\u1ec1u \u0111\xecnh phong ki\u1ebfn."],answer:4},{name:"\u0110\u1eb7c s\u1eafc ngh\u1ec7 thu\u1eadt trong b\xe0i th\u01a1 \u201cThu\u1eadt ho\xe0i\u201d l\xe0 g\xec?",chooses:["Li\u1ec7t k\xea.","Qu\xfd h\u1ed3 tinh b\u1ea5t qu\xfd h\u1ed3 \u0111a.","So s\xe1nh.","K\u1ec3 chuy\u1ec7n."],answer:2},{name:"C\u1ea3m h\u1ee9ng y\xeau n\u01b0\u1edbc mang \xe2m h\u01b0\u1edfng H\xe0o kh\xed \u0110\xf4ng A \u0111\u01b0\u1ee3c th\u1ec3 hi\u1ec7n trong nh\u1eefng t\xe1c ph\u1ea9m n\xe0o sau \u0111\xe2y?",chooses:["Nam qu\u1ed1c s\u01a1n h\xe0, Thu\u1eadt ho\xe0i, Truy\u1ec7n Ki\u1ec1u.","Nh\xe0n, B\xecnh Ng\xf4 \u0111\u1ea1i c\xe1o, Thu\u1eadt ho\xe0i.","Thu\u1eadt ho\xe0i, Hich t\u01b0\u1edbng s\u0129, T\u1ee5ng gi\xe1 ho\xe0n kinh s\u01b0.","Thu\u1eadt ho\xe0i, Hich t\u01b0\u1edbng s\u0129, \u0110\u1ed9c Ti\u1ec3u Thanh k\xed."],answer:3}]),C=(n(213),n(82)),T=n.n(C),A=n(83),H=n.n(A),O=function(e){function t(){var e;return Object(m.a)(this,t),(e=Object(h.a)(this,Object(d.a)(t).call(this))).state={time:{},seconds:15},e.timer=0,e.startTimer=e.startTimer.bind(Object(g.a)(e)),e.countDown=e.countDown.bind(Object(g.a)(e)),e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"secondsToTime",value:function(e){var t=e%3600,n=t%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(n)}}},{key:"componentDidMount",value:function(){var e=this.secondsToTime(this.state.seconds);this.setState({time:e}),this.startTimer()}},{key:"startTimer",value:function(){0==this.timer&&this.state.seconds>0&&(this.timer=setInterval(this.countDown,1e3))}},{key:"countDown",value:function(){var e=this.state.seconds-1;this.setState({time:this.secondsToTime(e),seconds:e}),0==e&&clearInterval(this.timer)}},{key:"render",value:function(){return s.a.createElement("div",{className:"timer"},this.state.time.m," : ",this.state.time.s)}}]),t}(s.a.Component),I=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).setValue=function(e){console.log("setValue: ",e),n.setState(Object(l.a)({},n.state,{},e))},n.setOpen=function(e){var t=n.state.opens,a=t.findIndex((function(t){return t.route===e}));a>=0?t[a]={route:e,timeStart:n.getHourMinute(),tab:t&&t.length>0?t[a].tab:0,value:!(t&&t.length>0)||!t[a].value,answers:t&&t.length>0?t[a].answers:[]}:t=[].concat(Object(o.a)(t),[{route:e,timeStart:n.getHourMinute(),tab:0,value:!0,answers:[]}]),n.setState(Object(l.a)({},n.state,{opens:t,time:{},seconds:n.defaultSeconds})),console.log("opens: ",t),n.socket.emit("openQuestion",{opens:t})},n.setRating=function(e){var t=n.state.route,a=n.state.opens,s=a.findIndex((function(e){return e.route===t}));s>=0?a[s]=Object(l.a)({},a[s],{tab:e}):a=[].concat(Object(o.a)(a),[{route:t,timeStart:"",tab:e,value:!1,answers:[]}]),n.setState(Object(l.a)({},n.state,{opens:a})),console.log("opens rating: ",a),n.socket.emit("openQuestion",{opens:a})},n.getTab=function(){var e=n.state.route,t=n.state.opens,a=t.findIndex((function(t){return t.route===e}));return a>=0?t[a].tab:0},n.getOpen=function(){var e=n.state.opens;return(e=e.filter((function(e){return e.route===n.state.route})))&&e.length>0&&e[0].value},n.setAnswers=function(e){var t=n.state.route,a=[],s=n.state.opens;if((s=s.filter((function(e){return e.route===t})))&&s.length>0){if((a=s[0].answers)&&a.length>0){var c=a.findIndex((function(t){return t.userName===e.userName}));a=[].concat(c<0?Object(o.a)(a):Object(o.a)(a.filter((function(t){return t.userName!==e.userName}))),[e])}else a=[e];console.log("findIndex: ",c,e,s)}console.log("students: ",[],a),s=[].concat(Object(o.a)(n.state.opens.filter((function(e){return e.route!==t}))),[{route:t,tab:s&&s.length>0?s[0].tab:0,timeStart:s[0].timeStart,value:s[0].value,answers:a}]),n.setState(Object(l.a)({},n.state,{opens:s}))},n.getDateCurrent=function(){var e=new Date,t=String(e.getDate()).padStart(2,"0"),n=String(e.getMonth()+1).padStart(2,"0"),a=e.getFullYear();return e=n+"/"+t+"/"+a},n.getHourMinute=function(){var e=new Date,t=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0"),a=String(e.getSeconds()).padStart(2,"0"),s=String(e.getMilliseconds()).padStart(2,"0");return e=t+":"+n+":"+a+"."+s,console.log("time hour current: ",e),e},n.sendQuestion=function(e){console.log("send question",e),n.socket.emit("teacherQuestion",Object(l.a)({},e))},n.refreshList=function(){n.socket.emit("refreshList",!0)},n.exportStudent=function(){var e=n.state.route+1,t=n.state.opens[e-1],a="",s="",c="";if(t&&(a=t.timeStart,(t=t.answers)&&t.length>0)){var r=y[e-1].answer,i=t.filter((function(e){return r-1===e.message})),o=t.filter((function(e){return r-1!==e.message}));i&&i.length>0&&i.map((function(e,t){var a=n.getAnswers(e.message);s+="".concat(t+1,". ").concat(e.userName," <code: ").concat(e.code,"> (").concat(a,") - time: ").concat(e.time,"\r\n")})),o&&o.length>0&&o.map((function(e,t){var a=n.getAnswers(e.message);c+="".concat(t+1,". ").concat(e.userName," <code: ").concat(e.code,"> (").concat(a,") - time: ").concat(e.time,"\r\n")}))}if(!s)return alert("Kh\xf4ng c\xf3 d\u1eef li\u1ec7u ghi!"),null;s="\n             DANH S\xc1CH H\u1eccC SINH (C\xc2U H\u1eceI "+e+")\r\n"+"           (Th\u1eddi gian b\u1eaft \u0111\u1ea7u: "+a+")\r\n\r\n"+s,s+="\r\n \r\nDanh s\xe1ch tr\xean s\u1eafp x\u1ebfp theo ti\xeau ch\xed: \u0110\xfang v\xe0 nhanh nh\u1ea5t.",s+="\r\n \r\nDANH SACH HS SAI\r\n \r\n"+c;var l=document.createElement("a");l.href="data:application/octet-stream,"+encodeURIComponent(s),l.download="BangXepHang-Cau-Hoi-".concat(e,".txt"),l.click()},n.exportStudentFinal=function(e){var t="";if(e&&e.length>0&&e.map((function(e,a){var s=n.getAnswers(e.c1),c=n.getAnswers(e.c2),r=n.getAnswers(e.c3),i=n.getAnswers(e.c4);"undefined"==typeof s&&(s=" "),"undefined"==typeof c&&(c=" "),"undefined"==typeof r&&(r=" "),"undefined"==typeof i&&(i=" "),t+="".concat(a+1,". ").concat(e.userName," <code: ").concat(e.code,"> ").concat(s,", ").concat(c,", ").concat(r,", ").concat(i," - time: ").concat(e.secondAvg,":").concat(e.milliAvg,"\r\n")})),!t)return alert("Kh\xf4ng c\xf3 d\u1eef li\u1ec7u ghi!"),null;t+="\r\n \r\nDanh s\xe1ch tr\xean s\u1eafp x\u1ebfp theo ti\xeau ch\xed: \u0110\xfang v\xe0 nhanh nh\u1ea5t.";var a=document.createElement("a");a.href="data:application/octet-stream,"+encodeURIComponent(t),a.download="BangXepHangAll.txt",a.click()},n.showTooltip=function(e){n.setState({showBox:e})},n.renderBXHFinal=function(){var e=function(e){var t=[];e.map((function(e,n){var a=e.answers;a&&a.length>0&&a.map((function(n,a){var s=0,c=y[e.route];c&&c.answer-1==n.message&&(s=1);var r=k.a.duration(e.timeStart,"HH:mm:ss.SSSS"),i=k.a.duration(n.time,"HH:mm:ss.SSSS").subtract(r),o=i.seconds()+":"+i.milliseconds();console.log("final time: ",o);var m=t.findIndex((function(e){return e.userId==n.userId}));if(m>=0)switch(s+=t[m].countCorrect,e.route){case 0:t[m]=Object(l.a)({},t[m],{c1:n.message,time1:o,countCorrect:s});break;case 1:t[m]=Object(l.a)({},t[m],{c2:n.message,time2:o,countCorrect:s});break;case 2:t[m]=Object(l.a)({},t[m],{c3:n.message,time3:o,countCorrect:s});break;case 3:t[m]=Object(l.a)({},t[m],{c4:n.message,time4:o,countCorrect:s})}else switch(e.route){case 0:t.push({id:t.length+1,userId:n.userId,userName:n.userName,c1:n.message,c2:"",c3:"",c4:"",countCorrect:s,time1:o,time2:0,time3:0,time4:0,code:n.code});break;case 1:t.push({id:t.length+1,userId:n.userId,userName:n.userName,c1:"",c2:n.message,c3:"",c4:"",countCorrect:s,time1:0,time2:o,time3:0,time4:0,code:n.code});break;case 2:t.push({id:t.length+1,userId:n.userId,userName:n.userName,c1:"",c2:"",c3:n.message,c4:"",countCorrect:s,time1:0,time2:0,time3:o,time4:0,code:n.code});break;case 3:t.push({id:t.length+1,userId:n.userId,userName:n.userName,c1:"",c2:"",c3:"",c4:n.message,countCorrect:s,time1:0,time2:0,time3:0,time4:o,code:n.code})}}))})),t&&(t.map((function(e,n){var a=0,s=0,c=0;e.time1&&e.time1.split(":")&&e.time1.split(":").length>0&&(s+=parseInt(e.time1.split(":")[0]),c+=parseInt(e.time1.split(":")[1]),a++),e.time2&&e.time2.split(":")&&e.time2.split(":").length>0&&(s+=parseInt(e.time2.split(":")[0]),c+=parseInt(e.time2.split(":")[1]),a++),e.time3&&e.time3.split(":")&&e.time3.split(":").length>0&&(s+=parseInt(e.time3.split(":")[0]),c+=parseInt(e.time3.split(":")[1]),a++),e.time4&&e.time4.split(":")&&e.time4.split(":").length>0&&(s+=parseInt(e.time4.split(":")[0]),c+=parseInt(e.time4.split(":")[1]),a++),0==a&&(a=1);var r=Math.round(s/a*1e3)/1e3,i=Math.round(c/a*1e3)/1e3;t[n]=Object(l.a)({},t[n],{second:s,milli:c,repCount:a,secondAvg:r,milliAvg:i})})),t=(t=(t=t.sort((function(e,t){return e.milliAvg-t.milliAvg}))).sort((function(e,t){return e.secondAvg-t.secondAvg}))).sort((function(e,t){return t.countCorrect-e.countCorrect})));return t}(n.state.opens);return console.log("--------------"),console.log("BXH: ",e),s.a.createElement("div",null,s.a.createElement("h5",{className:"text-center"},"BXH TH\xc0NH T\xcdCH"),s.a.createElement("table",null,s.a.createElement("tr",null,s.a.createElement("th",null,"#"),s.a.createElement("th",{style:{paddingRight:"10px"}},"H\u1ecc T\xcaN"),s.a.createElement("th",null,"C1"),s.a.createElement("th",null,"C2"),s.a.createElement("th",null,"C3"),s.a.createElement("th",null,"C4"),s.a.createElement("th",{style:{padding:"10px"}},"\u0110\xdaNG"),s.a.createElement("th",{style:{padding:"10px"}},"TRUNG B\xccNH/1C (s)")),e&&e.length>0&&e.map((function(e,t){return s.a.createElement("tr",{key:t,className:0==t?"text-primary":1==t?"text-success":2==t?"text-info":""},s.a.createElement("td",null,t+1),s.a.createElement("td",{style:{paddingRight:"10px"}},e.userName),s.a.createElement("td",null,n.getAnswers(e.c1)),s.a.createElement("td",null,n.getAnswers(e.c2)),s.a.createElement("td",null,n.getAnswers(e.c3)),s.a.createElement("td",null,n.getAnswers(e.c4)),s.a.createElement("td",{className:"text-center"},e.countCorrect),s.a.createElement("td",{className:"text-center"},"".concat(e.secondAvg,":").concat(e.milliAvg)))}))),e&&e.length>0&&s.a.createElement("span",{className:"text-success ml-2 cursor",onClick:function(){return n.exportStudentFinal(e)}},"(T\u1ea3i danh s\xe1ch)"))},n.getAnswers=function(e){switch(e){case 0:return"A";case 1:return"B";case 2:return"C";case 3:return"D"}},n.renderList=function(){var e=n.state,t=e.opens,a=e.route;if((t=t.filter((function(e){return e.route===a})))&&t.length>0&&(t=t[0]),!t)return null;var c=y[a].answer,r=t.answers,i=[];return 1===n.getTab()&&r&&r.length>0&&(r=r.filter((function(e){return c-1===e.message})),i=t.answers.filter((function(e){return c-1!==e.message}))),console.log("danh sach: ",r,n.state),s.a.createElement("div",{className:"student"},s.a.createElement("div",{className:"clearfix"},1===n.getTab()?"Ds \u0111\xfang: ":"\u0110\xe3 tham gia:"," ",2===n.getTab()?n.state.userOnline.length:r?r.length:0,2===n.getTab()&&s.a.createElement("button",{onClick:function(){return n.refreshList()}},"Refresh"),1===n.getTab()&&s.a.createElement("span",{className:"text-success ml-2 cursor",onClick:function(){return n.exportStudent()}},"(T\u1ea3i danh s\xe1ch)")),s.a.createElement("table",null,s.a.createElement("tbody",null,2===n.getTab()&&n.state.userOnline.map((function(e,t){return s.a.createElement("tr",{key:t},s.a.createElement("td",{className:"w-20"},s.a.createElement("div",{className:"t-cricle"},t+1)),s.a.createElement("td",null,s.a.createElement("div",{className:"t-cricle-name1 ml-2"},"Admin"===e.name||"admin"===e.name?"Gi\xe1o vi\xean":e.name)),s.a.createElement("td",null,s.a.createElement("div",{className:"t-cricle-other"},e.time&&e.time.substring(0,8))))})),n.getTab()<2&&r&&r.length>0&&r.map((function(e,a){console.log("item: ",e);var c=k.a.duration(t.timeStart,"HH:mm:ss.SSSS"),r=k.a.duration(e.time,"HH:mm:ss.SSSS").subtract(c),i=r.hours()+":"+r.minutes()+":"+r.seconds()+":"+r.milliseconds();console.log("final time: ",i);e.user;return s.a.createElement("tr",{key:a},s.a.createElement("td",{className:"w-20"},s.a.createElement("div",{className:"t-cricle"},a+1)),s.a.createElement("td",null,s.a.createElement("div",{className:"t-cricle-name1 ml-2"},e.userName)),1===n.getTab()&&s.a.createElement(s.a.Fragment,null,s.a.createElement("td",null,s.a.createElement("div",{className:"t-cricle-other"},e.time)),s.a.createElement("td",null,s.a.createElement("div",{className:"t-cricle-other font-weight-bold text-success"},n.getAnswers(e.message)))),s.a.createElement("td",null,s.a.createElement("div",{className:"t-cricle-other text-primary"},"".concat(r.minutes(),":").concat(r.seconds(),".").concat(r.milliseconds()))))})),1===n.getTab()&&i&&i.length>0&&i.map((function(e,t){return s.a.createElement("tr",{key:t},s.a.createElement("td",{className:"w-20"}," "),s.a.createElement("td",null,s.a.createElement("div",{className:"t-cricle-name1 ml-2"},e.userName)),s.a.createElement(s.a.Fragment,null,s.a.createElement("td",null," "),s.a.createElement("td",null,s.a.createElement("div",{className:"t-cricle-other font-weight-bold text-success"},n.getAnswers(e.message)))),s.a.createElement("td",{className:"text-danger"},"SAI"))})))))},n.renderLogin=function(){var e;return s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-sm-9 col-md-7 col-lg-5 mx-auto"},s.a.createElement("div",{className:"card card-signin my-5"},s.a.createElement("div",{className:"card-body"},s.a.createElement("h5",{className:"card-title text-center"},"Sign In"),n.state.error&&s.a.createElement("p",{className:"text-danger text-center"},n.state.error),s.a.createElement("div",{className:"form-signin"},s.a.createElement("div",{className:"form-label-group"},s.a.createElement("input",{type:"text",name:"name",ref:"name",id:"inputEmail",className:"form-control",placeholder:"Email address"}),s.a.createElement("label",{for:"inputEmail"},"H\u1ecd v\xe0 t\xean")),s.a.createElement("div",{className:"form-label-group"},s.a.createElement("input",{type:"password",name:"code",ref:"code",id:"inputPassword",className:"form-control",placeholder:"Password"}),s.a.createElement("label",{for:"inputPassword"},"M\xe3 x\xe1c nh\u1eadn")),s.a.createElement("div",{className:"custom-control custom-checkbox mb-3"},s.a.createElement("input",(e={type:"text"},Object(i.a)(e,"type","checkbox"),Object(i.a)(e,"className","custom-control-input"),Object(i.a)(e,"id","customCheck1"),e)),s.a.createElement("label",{className:"custom-control-label",for:"customCheck1"},"Agree all")),s.a.createElement("div",null,"Ch\xfa \xfd: M\xe3 x\xe1c nh\u1eadn hs t\u1ef1 \u0111\u1eb7t (v\xe0 c\u1ea7n nh\u1edb)"),s.a.createElement("button",Object(i.a)({type:"button",name:"",onClick:n.login.bind(Object(g.a)(n)),className:"btn btn-lg btn-primary btn-block text-uppercase"},"type","submit"),"Sign in")))))))},n.renderStudent=function(){var e=n.state,t=e.route,a=e.opens,c=e.user,r=a&&a[t]&&n.getOpen(),i=null;if(r)if((i=a[t].answers)&&i.length>0){var o=i.findIndex((function(e){return e.userId===n.state.user.id}));i=o>=0?n.getAnswers(i[o].message):null}else i=null;return s.a.createElement("div",{className:"student-main"},s.a.createElement("div",{className:"content"},s.a.createElement("h3",{className:"text-center text-success"},"C\xe2u h\u1ecfi s\u1ed1 ",t+1),s.a.createElement("p",null,"H\u1ecd t\xean:",s.a.createElement("b",null," ",c.name)),r?s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"alert alert-"+(i?"primary":"danger"),role:"alert"},i?"\u0110\xe1p \xe1n \u0111\xe3 ch\u1ecdn: "+i:"B\u1ea1n ch\u01b0a ch\u1ecdn \u0111\xe1p \xe1n!"),s.a.createElement("div",{className:"choices_items"},s.a.createElement("button",{value:"0",type:"button",className:"btn btn-primary ml-2",onClick:function(){return n.sendnewMessage(0)}},"Ch\u1ecdn A")," ",s.a.createElement("span",{className:"ml-3"},y[t].chooses[0])),s.a.createElement("div",{className:"choices_items"},s.a.createElement("button",{value:"1",type:"button",className:"btn btn-primary ml-2",onClick:function(){return n.sendnewMessage(1)}},"Ch\u1ecdn B")," ",s.a.createElement("span",{className:"ml-3"},y[t].chooses[1])),s.a.createElement("div",{className:"choices_items"},s.a.createElement("button",{value:"2",type:"button",className:"btn btn-primary ml-2",onClick:function(){return n.sendnewMessage(2)}},"Ch\u1ecdn C")," ",s.a.createElement("span",{className:"ml-3"},y[t].chooses[2])),s.a.createElement("div",{className:"choices_items"},s.a.createElement("button",{value:"2",type:"button",className:"btn btn-primary ml-2",onClick:function(){return n.sendnewMessage(3)}},"Ch\u1ecdn D")," ",s.a.createElement("span",{className:"ml-3"},y[t].chooses[3])),s.a.createElement("div",{className:"timer"},s.a.createElement(O,null),"Vi\u1ec7c thay \u0111\u1ed5i \u0111\xe1p \xe1n s\u1ebd khi\u1ebfn cho th\u1eddi gian thay \u0111\u1ed5i")):s.a.createElement("div",{className:"bottom_sent clearfix"},s.a.createElement("div",{className:"alert alert-danger",role:"alert"},"Ch\u1edd gi\xe1o vi\xean \u0111\u1eb7t c\xe2u h\u1ecfi!"))))},n.renderTeacher=function(){var e=n.state,t=e.route,a=e.opens,c=a&&a[t]&&n.getOpen();return console.log("this.getTab(): ",n.getTab()),s.a.createElement("div",{className:"chat_window"},s.a.createElement("div",{className:"question_number"},y.map((function(e,a){return s.a.createElement(N.a,{key:a,className:"btn-circle "+(t===a?"btn-info":"btn-outline-warning"),onClick:function(){return n.sendQuestion({route:a})}},a+1)}))),s.a.createElement("div",{className:"questions"},s.a.createElement("div",{className:"message right appeared"},s.a.createElement("div",{className:"avatar"},s.a.createElement("img",{width:80,src:T.a,alt:"fireSpot"})),s.a.createElement("div",{className:"text_wrapper"},s.a.createElement("div",{className:"text"},c?y[t].name:"Ch\xe0o qu\xfd th\u1ea7y c\xf4 v\xe0 c\xe1c b\u1ea1n h\u1ecdc sinh!"))),s.a.createElement("div",{className:"contents"},s.a.createElement("div",{className:"choices_group"},c?s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"choices_items"},s.a.createElement("div",{className:"d-cricle"},"A")," ",y[t].chooses[0]),s.a.createElement("div",{className:"choices_items"},s.a.createElement("div",{className:"d-cricle"},"B")," ",y[t].chooses[1]),s.a.createElement("div",{className:"choices_items"},s.a.createElement("div",{className:"d-cricle"},"C")," ",y[t].chooses[2]),s.a.createElement("div",{className:"choices_items"},s.a.createElement("div",{className:"d-cricle"},"D")," ",y[t].chooses[3]),s.a.createElement("div",{className:"timer"},s.a.createElement(O,null))):s.a.createElement("div",{className:"bottom_sent clearfix"},s.a.createElement("div",{className:"send_message",onClick:function(){return n.setOpen(n.state.route)}},s.a.createElement("div",{className:"icon"}),s.a.createElement("div",{className:"text"},"B\u1eaeT \u0110\u1ea6U")),s.a.createElement("br",null),s.a.createElement("img",{width:180,src:H.a,alt:"fireSpot"}))),s.a.createElement("div",{className:"answers"},s.a.createElement("div",{className:"menu"},s.a.createElement("ul",{className:"user"},s.a.createElement("span",{className:"user-name"},n.state.user.name),s.a.createElement("p",{className:"text-center"},"B\u1ea2NG X\u1ebeP H\u1ea0NG"),s.a.createElement("div",{className:"menu_top"},s.a.createElement("nav",null,s.a.createElement("div",{className:"nav nav-tabs",id:"nav-tab",role:"tablist"},s.a.createElement("a",{className:"nav-item nav-link "+(0===n.getTab()?"active":""),onClick:function(){return n.setRating(0)},id:"nav-home-tab","data-toggle":"tab",href:"#nav-home",role:"tab","aria-controls":"nav-home","aria-selected":"true"},"Tr\u1ea3 l\u1eddi"),s.a.createElement("a",{className:"nav-item nav-link "+(1===n.getTab()?"active":""),onClick:function(){return n.setRating(1)},id:"nav-profile-tab","data-toggle":"tab",href:"#nav-profile",role:"tab","aria-controls":"nav-profile","aria-selected":"false"},"X\u1ebfp h\u1ea1ng"),s.a.createElement("a",{className:"nav-item nav-link "+(2===n.getTab()?"active":""),onClick:function(){return n.setRating(2)},id:"nav-contact-tab","data-toggle":"tab",href:"#nav-contact",role:"tab","aria-controls":"nav-contact","aria-selected":"false"},"Tham gia")))))),n.renderList()))),s.a.createElement("div",{className:"content"},s.a.createElement("div",{className:"bottom_wrapper clearfix"},s.a.createElement("div",{className:""},"Gi\xe1o vi\xean: ",s.a.createElement("b",null,"Nguy\u1ec5n Th\u1ecb Phi")," - B\u1ed9 m\xf4n: V\u0103n h\u1ecdc"))))},n.defaultSeconds=10,n.state={messages:[],user:{id:"",name:""},userOnline:[],route:0,opens:[],showBox:!1,timer:15},n.socket=null,n.timer=0,n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"secondsToTime",value:function(e){var t=e%3600,n=t%60,a=n%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(n),ms:Math.ceil(a)}}},{key:"componentDidMount",value:function(){}},{key:"componentWillMount",value:function(){var e=this;console.log("user temp: ",this.state.user);this.socket=b()("https://polar-falls-90130.herokuapp.com/",{"force new connection":!0,reconnectionAttempts:"Infinity",timeout:1e4,transports:["websocket"]}),this.socket.on("newMessage",(function(t){e.newMessage(t)})),this.socket.on("loginFail",(function(e){alert("T\xean \u0111\xe3 c\xf3 ng\u01b0\u1eddi s\u1eed d\u1ee5ng")})),this.socket.on("loginSuccess",(function(t){e.setValue({user:{id:e.socket.id,name:t.user,code:t.code,time:e.getHourMinute()}}),"Admin"!==t.user&&"admin"!==t.user||e.setRating(0)})),this.socket.on("updateUesrList",(function(t){e.setValue({userOnline:t})})),this.socket.on("teacherQuestion",(function(t){e.setValue({route:t.route})})),this.socket.on("openQuestion",(function(t){e.setValue({opens:t.opens})})),this.socket.on("refreshList",(function(t){"Admin"!==e.state.user.name&&"admin"!==e.state.user.name&&e.setValue({user:null})}))}},{key:"newMessage",value:function(e){console.log("get mess: ",e);var t=this.state.messages,n=v()(t,"id"),a={id:Math.max.apply(Math,Object(o.a)(n))+1,userId:e.user.id,message:e.data,userName:e.user.name,code:e.user.code,date:this.getDateCurrent(),time:this.getHourMinute()};t.push(a),this.setState({messages:t}),this.setAnswers(a)}},{key:"sendnewMessage",value:function(e){console.log("mess: ",e),this.socket.emit("newMessage",{data:e,user:this.state.user})}},{key:"login",value:function(){var e=this.refs.name.value.capitalize(),t=this.refs.code.value.capitalize();if(!e||!t)return this.setState({error:"H\u1ecd t\xean v\xe0 M\xe3 x\xe1c nh\u1eadn kh\xf4ng n\xean \u0111\u1ec3 tr\u1ed1ng!"}),null;if(("Admin"===e||"admin"===e)&&"1212p"!==t)return this.setState({error:"M\u1eadt kh\u1ea9u kh\xf4ng ch\xednh x\xe1c!"}),null;if(e.length<5)return this.setState({error:"H\u1ecd t\xean c\u1ee7a b\u1ea1n qu\xe1 ng\u1eafn!"}),null;var n=this.getHourMinute();this.socket.emit("login",{user:e,code:t,time:n}),this.socket.emit("teacherQuestion",{route:0})}},{key:"render",value:function(){var e=this,t=this.state,n=(t.route,t.opens,this.state.user&&"Admin"===this.state.user.name);return s.a.createElement("div",{className:"app__content"},this.state.user&&this.state.user.id&&this.state.user.name?n?this.renderTeacher():this.renderStudent():s.a.createElement("div",null,this.renderLogin()),n&&s.a.createElement(N.a,{onClick:function(){return e.setState({showBox:!e.state.showBox})},className:"btn-circle plus-bxh"},"+A-z",s.a.createElement(S.a,{show:this.state.showBox,position:"left",color:"#000",textBoxWidth:"400px"},this.renderBXHFinal())),s.a.createElement("div",{className:"footer"},"(c) Copyright Gs Hoang Anh - ",s.a.createElement("a",{href:"https://www.faceboo.com/gs.anhhoang",target:"_blank"},"facebook.com/gs.anhhoang")))}}]),t}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},82:function(e,t,n){e.exports=n.p+"static/media/teacher01.eae47470.png"},83:function(e,t,n){e.exports=n.p+"static/media/answer01.1f746f3a.png"},85:function(e,t,n){e.exports=n(214)},90:function(e,t,n){}},[[85,1,2]]]);
//# sourceMappingURL=main.0a19b53b.chunk.js.map