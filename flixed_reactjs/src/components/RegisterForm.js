import React from 'react';

class RegisterForm extends React.Component {
    state = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        error:''
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    validate(e) {
        this.setState({
            error: ''
          })
        if(this.state.email === ''||this.state.first_name === ''||this.state.last_name === ''||this.state.username === ''||this.state.password === ''||this.state.confirm_password === ''){
            this.setState({
              error: "All fields are mandatory!"
            })
          }
          else {
              var data = {
                  "email": this.state.email,
                  "first_name": this.state.first_name,
                  "last_name": this.state.last_name,
                  "username": this.state.username,
                  "password": this.state.password,
                  "confirm_password": this.state.confirm_password
              }
              this.props.handle_signup(e, data)
          }
    }

    render_errors(list_of_errors){
        if(list_of_errors !== undefined && list_of_errors.length !== 0)
            return(
                <ul>{
                    list_of_errors.length !== 0 ? 
                        list_of_errors.map((error, idx) => {
                            return <li key={idx}><p style={{ color: "red" }}>{error}</p></li>
                        }) : <p style={{ color: "green" }}>hello</p>
                }</ul>
            )
        else
         return <></>
    }

    render() {
        return (
            <div className='container'>
                <div className='d-flex align-items-center justify-content-end'>
                    <div className="my-5 ml-auto col-md-8">
                        <div className='card'>
                            <div className='card-body'>
                                <h4 className='card-title text-center my-3'>Sign Up</h4>
                                <div className='card-text'>
                                    <form>
                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className='mb-3'>
                                                    <label className='form-label'>Username</label>
                                                    <input className='form-control' name="username" value={this.state.username}
                                                        onChange={this.handle_change} type="text" placeholder="Username" />
                                                    {this.props.error.length !== 0 ? this.render_errors(this.props.error['username']) : <></>}   
                                                </div>

                                                <div className='mb-3'>
                                                    <label className='form-label'>First Name</label>
                                                    <input className='form-control' name="first_name" value={this.state.first_name}
                                                        onChange={this.handle_change} type="text" placeholder="First Name" />
                                                    {this.props.error.length !== 0 ? this.render_errors(this.props.error['first_name']) : <></>}
                                                </div>

                                                <div className='mb-3 '>
                                                    <label className='form-label'>Password</label>
                                                    <input className='form-control' name="password" value={this.state.password}
                                                        onChange={this.handle_change} type="password" placeholder="Password" />
                                                    {this.props.error.length !== 0 ? this.render_errors(this.props.error['password']) : <></>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className='form-label'>Email</label>
                                                    <input className='form-control' name="email" value={this.state.email}
                                                        onChange={this.handle_change} type="text" placeholder="Email" />
                                                    {this.props.error.length !== 0 ? this.render_errors(this.props.error['email']) : <></>}
                                                </div>

                                                <div className="mb-3">
                                                    <label className='form-label'>Last Name</label>
                                                    <input className='form-control' name="last_name" value={this.state.last_name}
                                                        onChange={this.handle_change} type="text" placeholder="Last Name" />
                                                    {this.props.error.length !== 0 ? this.render_errors(this.props.error['last_name']) : <></>}
                                                </div>

                                                <div className="mb-3">
                                                    <label className='form-label'>Confirm Password</label>
                                                    <input className='form-control' name="confirm_password" value={this.state.confirm_password}
                                                        onChange={this.handle_change} type="password" placeholder="Confirm Password" />
                                                    {this.props.error.length !== 0 ? this.render_errors(this.props.error['confirm_password']) : <></>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <label><p style={{ color: "red" }}>{this.state.error}</p></label>
                                        </div>

                                        <button type='button' className='btn btn-outline-dark my-4 mx-auto d-block' variant="primary" onClick={e => this.validate(e)}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default RegisterForm;