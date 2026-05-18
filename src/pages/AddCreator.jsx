import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function AddCreator (){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [tiktok, setTiktok] = useState('')
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    function validate() {
        const newErrors = {}

        if (!name.trim())
            newErrors.name = 'Name is required'

        if (!description.trim())
            newErrors.description = 'Description is required'

        if (!tiktok.trim()) {
            newErrors.tiktok = 'TikTok handle is required'
        } else if (!/^[a-zA-Z0-9_.]+$/.test(tiktok.trim())) {
            newErrors.tiktok = 'Handle can only contain letters, numbers, underscores, and dots'
        }

        return newErrors
    }
        
    async function handleSubmit() {
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setSubmitting(true)

        const { data: existing } = await supabase
            .from('creators')
            .select('id')
            .eq('tiktok', tiktok.trim())
            .single()

        if (existing) {
            setErrors({ tiktok: 'This creator has already been added' })
            setSubmitting(false)
            return
        }

        const { error } = await supabase
            .from('creators')
            .insert([{ name: name.trim(), description: description.trim(), imageURL, tiktok: tiktok.trim() }])

        if (error) {
            setErrors({ general: 'Something went wrong. Please try again.' })
            setSubmitting(false)
            return
        }

        navigate('/')
    }

    return (
        <div className="form-page">
            <button className="btn-back" onClick={() => navigate('/')}>← Back</button>
            <h1>Add Creator</h1>

            {errors.general && <p className="error-general">{errors.general}</p>}

            <div className="field">
                <label>Name <span className="required">*</span></label>
                <input
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: null })) }}
                    placeholder="Name"
                    className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <p className="error-msg">{errors.name}</p>}
            </div>

            <div className="field">
                <label>Description <span className="required">*</span></label>
                <input
                    value={description}
                    onChange={e => { setDescription(e.target.value); setErrors(p => ({ ...p, description: null })) }}
                    placeholder="Description"
                    className={errors.description ? 'input-error' : ''}
                />
                {errors.description && <p className="error-msg">{errors.description}</p>}
            </div>

            <div className="field">
                <label>Image URL <span className="optional">(optional)</span></label>
                <input
                    value={imageURL}
                    onChange={e => setImageURL(e.target.value)}
                    placeholder="https://..."
                />
            </div>

            <div className="field">
                <label>TikTok handle <span className="required">*</span></label>
                <div className="input-prefix-wrap">
                    <span className="input-prefix">@</span>
                    <input
                        value={tiktok}
                        onChange={e => { setTiktok(e.target.value); setErrors(p => ({ ...p, tiktok: null })) }}
                        placeholder="handle"
                        className={errors.tiktok ? 'input-error' : ''}
                    />
                </div>
                {errors.tiktok && <p className="error-msg">{errors.tiktok}</p>}
            </div>

            <button className="btn cyan" onClick={handleSubmit} disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Creator'}
            </button>
        </div>
  )
}

export default AddCreator