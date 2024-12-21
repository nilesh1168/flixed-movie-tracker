import React from 'react';
// import Card from 'react-bootstrap/Card'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'


class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
    };

    handle_change = e => {
        const name = e.target.id;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    validate(e) {
        var data = {
            "username": this.state.username,
            "password": this.state.password
        }
        this.props.handle_login(e, data, this.state.loading)
    }

    render() {
        return (
            // <form onSubmit={e => this.props.handle_login(e, this.state)} method="post">
            //     <div class="mb-3">
            //         <label for="username" class="form-label">Username</label>
            //         <input type="text" class="form-control" id="username" onChange={this.handle_change}/>
            //     </div>
            //     <div class="mb-3">
            //         <label for="password" class="form-label">Password</label>
            //         <input type="password" class="form-control" id="password" onChange={this.handle_change}/>
            //     </div>
            //     <div class="mb-3">
            //         <p style={{ color: "red" }}>{this.state.error}</p>
            //     </div>
            //     <button type="submit" class="btn btn-primary">Log In</button>
            // </form>




            <div className='container'>
                <div className='row my-5 d-flex justify-content-end align-items-center'>
                    <div className="col-md-4">
                        <div className='card shadow'>
                            <div className='card-body'>
                                <h4 className='card-title text-center my-3'>Log In</h4>
                                <div className='card-text'>
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handle_change} disabled = {this.props.loading} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handle_change} disabled = {this.props.loading} />
                                        </div>
                                        <button type='button' className='btn btn-outline-dark my-4 mx-auto d-block' onClick={e => this.validate(e)}>
                                            {this.props.loading ? <><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> loading.. </> : <>Login</>}
                                        </button>
                                        <div className='row'>
                                            <div className='container text-center'>
                                                <p style={{ color: "red" }}>{this.props.error}</p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;