import React, { Component } from 'react';
import './index.css';
import company from './company.jpeg';


class LoginForm extends Component {
  constructor(props) {// The constructor is used to initialize the component's state and to bind this to any methods that need it.
    super(props); //constructor of the parent class (i.e., Component) and pass in the props object as an argument
    this.state = {
      email: '',
      password: '',
      isFormSubmitted: false,
      emailError: '',
      passwordError: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleBlur = (event) => {
    const { name, value } = event.target;
    this.validateField(name, value);
  }

  validateField(fieldName, value) {
    let emailError = '';
    let passwordError = '';

    switch(fieldName) {
      case 'email':
        if (!value.includes('@')) {
          emailError = 'Invalid email';
        }
        break;
      case 'password':
        if (value.length < 5) {
          passwordError = 'Password must be at least 5 characters long';
        }
        break;
      default:
        break;
    }

    this.setState({ emailError, passwordError });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, rememberMe } = this.state; 
    if (email === 'abc@gmail.com' && password === '12345') {
      this.setState({ isFormSubmitted: true });
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      }
      alert('You successfully logged in to the system.');
    } else {
      alert('Please enter correct email and password.');
    }
  }
  
  

  renderEmailField() {
    return (
      <div className="input-container">
        
        <label className="input-label" htmlFor="email">Email:</label>
        <input
          className={`name-input-field ${this.state.emailError ? 'error-field' : ''}`}
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
        />
        <div className="error-message">{this.state.emailError}</div>
      </div>
    );
  }

  renderPasswordField() {
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="password">Password:</label>
        <input
          className={`name-input-field ${this.state.passwordError ? 'error-field' : ''}`}
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
        />
        <div className="error-message">{this.state.passwordError}</div>
      </div>
    );
  }


  renderLoginForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderEmailField()}
        {this.renderPasswordField()}
  
  <br></br><br></br><br></br>
        <div className="form-footer">
        <div className="remember-me-container">
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            onChange={this.handleInputChange}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <a href="/forgot-password" onClick={() => alert("Wait for a moment")}>
        Forgot password?
      </a>

      </div>
      <br></br><br></br>
        <button
          className="submit-button"
          type="submit"
          disabled={this.state.emailError || this.state.passwordError}
        >
          Log In
        </button>
      </form>
    );
  }
  
  render() {
    return (
      <div className="login-form-container">
        <div className="view-containerlog">
        <img className ="comanylogo"src={company} alt="form" />
        <h1 className="form-title">LOG IN</h1>

          {this.state.isFormSubmitted ? (
            <div>You have successfully logged in to the system.</div>
          ) : (
            this.renderLoginForm()
          )}
        </div>
      </div>
    );
  }
}

export default LoginForm;
