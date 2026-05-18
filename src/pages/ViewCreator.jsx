import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import DeleteButton from '../components/DeleteButton'

function ViewCreator() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [creator, setCreator] = useState(null)

    useEffect(() => {
        async function fetchCreator() {
            const { data } = await supabase.from('creators').select().eq('id', id).single()
            setCreator(data)                       
        }
        fetchCreator()
    }, [id])

    if (!creator) return <p>Loading...</p>

    return (
        <div className='view-page'>
            <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
            <div className='view-content'>
                {creator.imageURL && (
                    <img src={creator.imageURL} alt={creator.name} className='view-avatar' />
                )}
                <div className='view-info'>
                    <h1>{creator.name}</h1>
                    <p>{creator.description}</p>
                    {creator.tiktok && (
                        <a href={`https://tiktok.com/@${creator.tiktok}`} target="_blank" className="tiktok-handle">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#69C9D0">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                            </svg>
                            @{creator.tiktok}
                        </a>
                    )}
                    <div className='view-actions'>
                        <button className='btn cyan' onClick={() => navigate(`/edit/${id}`)}>Edit</button>
                        <DeleteButton id={id} className="btn red" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCreator