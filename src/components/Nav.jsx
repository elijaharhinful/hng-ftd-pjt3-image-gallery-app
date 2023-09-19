import user from '../components/assets/user.svg';
import search from '../components/assets/search.svg';
import logo from '../components/assets/logo.png';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar">
            <Link to="/"><div className="logo"><img src={logo}></img></div></Link>

            <div className='user'><span className='userText'>User</span><span><img src={user} alt="user-icon"></img></span></div>
        </nav>
    )
}

export default Nav;