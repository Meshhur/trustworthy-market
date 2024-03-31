import { observer } from 'mobx-react-lite';
import NavBar from '../components/Navbar'
import "../css/header.css";

const Header = observer(() => {
    return (
        <header className='header'>
            <NavBar />
        </header>
    )
})
export default Header