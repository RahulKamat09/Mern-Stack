import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Link } from 'react-router-dom'

function About() {
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-4">
                        <h2>About Me</h2>
                        <h5>Photo of me:</h5>
                        <div className="fakeimg">Fake Image</div>
                        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                        <h3 className="mt-4">Some Links</h3>
                        <p>Lorem ipsum dolor sit ame.</p>
                        <ul className="nav nav-pills flex-column">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <hr className="d-sm-none" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
