import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

const LoginForm = ({ onSubmit, onEmailChange, onPasswordChange }) => (
  <div className="login-form">
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={onEmailChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={onPasswordChange}
            />
            <Button color="teal" fluid size="large" onClick={onSubmit}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? Please Sign Up
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;
