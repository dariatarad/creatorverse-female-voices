import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className='navbar'>
            <span className='nav-brand'>Creatorverse</span>
            <div className='nav-actions'>
                <button className='nav-btn' onClick={() => navigate('/')}>View All Creators</button>
                <button className='nav-btn primary' onClick={() => navigate('/add')}>+ Add Creator</button>
            </div>
        </nav>
    )
}

export default Navbar