import React, {Component} from 'react';
import {Form, Button} from 'semantic-ui-react';
import Validator from 'validator';

import InlineError from '../messages/InlineError';

import PropTypes from 'prop-types';

class LoginForm extends Component {

    state = {
        data: {
            email: "",
            password: ""
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0 ){
            this.props.submit(this.state.data);
        }
    };

    validate = (data) => {
        const errors = {};
        if (!data.password) errors.password = " Password is required";
        if (!Validator.isEmail(data.email)) errors.email = " Invalid Email";
        return errors;
    };

    render() {
        const {data, errors} = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="buddhika@example.com"
                        value={data.email}
                        name="email"
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.email && <InlineError text={errors.email}/>}
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="change me"
                        name="password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                </Form.Field>
                {errors.password && <InlineError text={errors.password}/>}
                <Button primary>Login</Button>
            </Form>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;

