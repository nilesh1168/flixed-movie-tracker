import React from 'react';

class RegisterForm extends React.Component {
    state = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        error: ''
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
            error: ""
        })
        if (this.state.password === this.state.confirm_password) {
            var data = {
                "email": this.state.email,
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "username": this.state.username,
                "password": this.state.password,

            }
            console.log(e, data)
            this.props.handle_signup(e, data)
        }
        else {
            this.setState({
                error: "Password's do not match!!"
            })
        }
    }

    render() {
        return (
            <div className="container mx-auto flex flex-wrap min-h-screen justify-center content-center md:justify-end">
                <div className="flex flex-col bg-gray-100 p-8 rounded-lg">
                    <div className='text-center text-xl my-3'>Sign Up</div>
                    <div className="grid grid-flow-row">
                        <div className="grid grid-flow-row md:grid-cols-2">
                            <div className="mb-4 md:mr-3" controlId="formBasicUsername">
                                <label class="leading-7 text-base text-gray-600">Username</label>
                                <input name="username" value={this.state.username}
                                    class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={this.handle_change} type="text" placeholder="Username" />
                            </div>
                            <div className="mb-4" controlId="formBasicEmail">
                                <label class="leading-7 text-base text-gray-600">Email</label>
                                <input name="email" value={this.state.email}
                                    class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={this.handle_change} type="text" placeholder="Email" />
                            </div>

                        </div>
                        <div className="grid grid-flow-row md:grid-cols-2">
                            <div className="mb-4 md:mr-3" controlId="formBasicFName">
                                <label class="leading-7 text-base text-gray-600">First Name</label>
                                <input name="first_name" value={this.state.first_name}
                                    class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={this.handle_change} type="text" placeholder="First Name" />
                            </div>
                            <div className="mb-4" controlId="formBasicFName">
                                <label class="leading-7 text-base text-gray-600">Last Name</label>
                                <input name="last_name" value={this.state.last_name}
                                    class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={this.handle_change} type="text" placeholder="Last Name" />
                            </div>

                        </div>
                        <div className="grid grid-flow-row md:grid-cols-2">
                            <div className="mb-4 md:mr-3" controlId="formBasicPassword">
                                <label class="leading-7 text-base text-gray-600">Password</label>
                                <input name="password" value={this.state.password}
                                    class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={this.handle_change} type="password" placeholder="Password" />
                            </div>
                            <div className="mb-4" controlId="formBasicPassword">
                                <label class="leading-7 text-base text-gray-600">Confirm Password</label>
                                <input name="confirm_password" value={this.state.confirm_password}
                                    class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    onChange={this.handle_change} type="password" placeholder="Confirm Password" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" onClick={e => this.validate(e)}>Submit</button>
                        </div>
                        <div className="flex justify-center">
                            <p class="text-red-500 test-lg text-center">{this.props.errors}</p>
                            <p class="text-red-500 test-lg text-center">{this.state.error}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default RegisterForm;