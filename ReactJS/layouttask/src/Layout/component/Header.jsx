import React from 'react'

function Header() {
    return (
        <div>
            <div>
                <div className="p-5 bg-primary text-white text-center">
                    <h1>My First Bootstrap 5 Page</h1>
                    <p>Resize this responsive page to see the effect!</p>
                </div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <div className="container-fluid">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Active</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        </div>
    )
}

export default Header