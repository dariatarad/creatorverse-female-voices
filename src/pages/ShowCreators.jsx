import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

function ShowCreators() {
    const [creators, setCreators] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchCreators() {
        const { data } = await supabase.from('creators').select()
        setCreators(data)
        }
        fetchCreators()
    }, [])

    function handleDelete(id) {
        setCreators(creators.filter(c => c.id !== id))
    }

    return (
        <div className='page'>
            <div className='page-header'>
                <h1> Female Voices</h1>
                <p>creators · educators · innovators</p>
            </div>
            <div className='cards-grid'>
                {creators.length === 0
                    ? <p>No creators yet.</p>
                    : creators.map((creator, index) => (
                        <Card key={creator.id} {...creator} index={index} onDelete={handleDelete} />
                    ))
                }
            </div>
            <footer className="site-footer">
  Daria Taradina © 2026 — unfortunately not sponsored by TikTok
</footer>
        </div>
        
    )
}

export default ShowCreators