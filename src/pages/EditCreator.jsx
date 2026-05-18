import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'
import DeleteButton from '../components/DeleteButton'

function EditCreator () {
    const { id } = useParams()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [tiktok, setTiktok] = useState('')
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        async function fetchCreator() {
            const { data } = await supabase.from('creators').select().eq('id', id).single()
            setName(data.name)
            setDescription(data.description)
            setImageURL(data.imageURL || '')
            setTiktok(data.tiktok || '')                      
        }
        fetchCreator()
    }, [id])

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

    async function handleUpdate() {
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
            .neq('id', id)
            .single()

        if (existing) {
            setErrors({ tiktok: 'This creator has already been added' })
            setSubmitting(false)
            return
        }

        const { error } = await supabase
            .from('creators')
            .update({ name: name.trim(), description: description.trim(), imageURL, tiktok: tiktok.trim() })
            .eq('id', id)

        if (error) {
            setErrors({ general: 'Something went wrong. Please try again.' })
            setSubmitting(false)
            return
        }

        navigate('/')
    }
    
    return (
    <div className="form-page">
      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
      <h1>Edit Creator</h1>

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
        <div className={`input-prefix-wrap ${errors.tiktok ? 'error' : ''}`}>
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

      <div className="form-actions">
        <button className="btn cyan" onClick={handleUpdate} disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
        <DeleteButton id={id} className="btn red" />
      </div>
    </div>
  )
}

export default EditCreator