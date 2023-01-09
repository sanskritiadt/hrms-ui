import Approuter from './Approuter'
function Navbar() {
    return (
        <div className='main'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" >HRMS</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="empfunc">EmpDetails</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="positiondetails">EmpPositio</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <Approuter></Approuter>
        </div>
    )
}
export default Navbar;