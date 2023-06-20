import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from '../context/appContext';
import { useNavigate } from "react-router-dom";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

function Register() {
    const [values, setValues] = useState(initialState);
    const navigate = useNavigate();
    const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert();
            return;
        }
        const currentUser = { name, email, password };
        if (isMember) {
            setupUser({
                currentUser,
                endpoint: "login",
                alertText: "Login Successful! Redirecting..."
            });
        } else {
            setupUser({
                currentUser,
                endpoint: "register",
                alertText: "User Created! Redirecting..."
            });
        }
        console.log(values);
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return (
        <Wrapper className="full-page">
            <form onSubmit={onSubmit} className='form'>
                <Logo />
                <h3>{values.isMember ? "Login" : "Register"}</h3>
                {showAlert && <Alert />}
                {/* Name input */}
                {!values.isMember &&
                    <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />
                }
                {/* Email input */}
                <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
                {/* Password input */}
                <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
                <button type="submit" className='btn btn-block' disabled={isLoading}>submit</button>
                <button
                    type="button"
                    className='btn btn-block btn-hipster'
                    disabled={isLoading}
                    onClick={() => {
                        setupUser({
                            currentUser: { email: "testUser@test.com", password: "secret" },
                            endpoint: "login",
                            alertText: "Login Successful! Redirecting..."
                        });
                    }}
                >
                    {isLoading ? 'loading...' : 'demo'}
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type="button" onClick={toggleMember} className='member-btn'>
                        {values.isMember ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;