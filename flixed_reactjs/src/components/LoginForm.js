import React from 'react';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
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

    render() {
        return (
            <div className="container mx-auto flex flex-wrap min-h-screen justify-center content-center md:justify-end">
                <div className="bg-gray-100 flex flex-col rounded-lg p-8">
                    <div className='text-center text-xl my-3'>Log In</div>
                    <form onSubmit={e => this.props.handle_login(e, this.state)} method="post">
                        <div className='mb-4' controlId="formBasicEmail">
                            <label class="leading-7 text-base text-gray-600">Username</label>
                            <input name="username" value={this.state.username}
                                class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={this.handle_change} type="text" placeholder="Username" />
                        </div>

                        <div className="mb-4" controlId="formBasicPassword">
                            <label class="leading-7 text-base text-gray-600">Password</label>
                            <input name="password" value={this.state.password}
                                class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                onChange={this.handle_change} type="password" placeholder="Password" />
                        </div>
                        <div className="flex justify-center">
                            <button class="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;