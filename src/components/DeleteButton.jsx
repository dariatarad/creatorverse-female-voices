import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function DeleteButton({ id, onDelete, className }) {
    const navigate = useNavigate()

    async function handleDelete() {
        await supabase.from('creators').delete().eq('id', id)
        if (onDelete) {
            onDelete(id)
        } else {
            navigate('/')
        }
    }

    return <button className={className || ''} onClick={handleDelete}>Delete</button>
}

export default DeleteButton