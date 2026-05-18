import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteButton from './DeleteButton'

function Card({ id, name, description, imageURL, tiktok, onDelete, index }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const accent = index % 2 === 0 ? 'cyan-accent' : 'red-accent'
    const avatarColor = index % 2 === 0 ? 'cyan' : 'red'

    return (
        <div className={`card ${accent}`} onClick={() => navigate(`/creator/${id}`)}>
            <div className='card-top'>
                {imageURL
                ? <img src={imageURL} alt={name} className='avatar'/>
                : <div className={`avatar-placeholder ${avatarColor}`}>{name[0]}</div>
                }
            </div>
            <div className='card-info'>
                <h2>{name}</h2>           
                    {tiktok && (
                        <a href={`https://tiktok.com/@${tiktok}`} target="_blank" className="tiktok-handle" onClick={e => e.stopPropagation()}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#69C9D0">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                            </svg>
                            @{tiktok}
                        </a>
                    )}
                <p>{description}</p>
                </div>                     
            <div className='card-menu' onClick={e => e.stopPropagation()}>
                <button className='menu-btn' onClick={() => setMenuOpen(!menuOpen)}>...</button>
                {menuOpen && (
                    <div className='dropdown'>
                        <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
                        <DeleteButton id={id} onDelete={onDelete} className="delete" />
                </div>
                )}
            </div>         
    </div>
    )
}

export default Card