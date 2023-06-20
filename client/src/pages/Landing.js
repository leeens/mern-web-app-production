import main from "../assets/images/main.svg";
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from "../components";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import React from "react";

function Landing() {
    const { user } = useAppContext();

    return (
        <React.Fragment>
            {user && <Navigate to='/' />}
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                {/* info */}
                <div className="container page">
                    <div className="info">
                        <h1>
                            Job <span>Tracking</span> App
                        </h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <Link to="/register" className="btn btn-hero">
                            Login/Register
                        </Link>
                    </div>
                    <img src={main} alt="job hunt" className="img main-img" />
                </div>
            </Wrapper>
        </React.Fragment>
    )
};


export default Landing;
