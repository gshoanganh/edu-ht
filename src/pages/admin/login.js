import React, { useState, Component } from "react";
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import "./login.css";

export default class Login extends Component {
    constructor(props) {
        super();
        this.name = null;
        this.password = null;
    }
    // const [name, setEmail] = useState("");
    // const [password, setPassword] = useState("");


    // function validateForm() {
    //     return name.length > 0 && password.length > 0;
    // }

    // function handleSubmit(event) {
    //     event.preventDefault();
    // }

    render(){
        return(
            <div className = "login" >
                <Alert show={true} variant="success">
                    <Alert.Heading>Đăng nhập</Alert.Heading>
                    <p className="text-center">
                        "Ngòi bút có uy lực hơn cả lưỡi gươm."
            </p>
                    <p className="text-center">Edward Bulwer-Lytton</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <form //onSubmit={handleSubmit}
                        >
                            <FormGroup controlId="name" bsSize="large">
                                <FormLabel>Họ và tên</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="name"
                                    name={"name"}
                                    value={this.name}
                                //onChange={e => setEmail(e.target.value)}
                                 ref={"name"}
                                 
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <FormLabel>Mã bão mật (tự đặt)</FormLabel>
                                <FormControl
                                    value={this.password}
                                    // onChange={e => setPassword(e.target.value)}
                                    type="password"
                                    ref={refs => this.password = refs}
                                />
                            </FormGroup>
                            <Button onClick={() => this.props.onClick()} bsSize="large" 
                            //disabled={!validateForm()} 
                            type="submit">
                                Login
            </Button>
                        </form>
                    </div>
                </Alert>
    
    
            </div>
        );
    }
}