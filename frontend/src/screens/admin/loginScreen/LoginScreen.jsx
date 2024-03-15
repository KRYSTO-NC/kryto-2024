import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../../../slices/authSlice'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useLoginMutation } from '../../../slices/userApiSlice'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      // Check if the user is an admin
      if (userInfo.isAdmin) {
        // Redirect to the admin dashboard if the user is an admin
        navigate('/admin/dashboard');
      } else {
        // Redirect to the original destination if the user is not an admin
        navigate(redirect);
      }
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <div className='page-container'>
      <section className="heading">
        <h1>
          {' '}
          <FaUser /> Se connecter
        </h1>

        <p>Connectez-vous à votre compte</p>
      </section>
      <section className="form">
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="email">Email <span>*</span></label>
                <input type="email" id="email" placeholder="Entrer votre email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe <span>*</span></label>
                <input type="password" id="password" placeholder="Entrer votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn-reverse btn-block" disabled={isLoading}>
                    {isLoading ? 'Connexion...' : 'Connexion'}
                </button>
            </div>
            <div className="form-group">
                <span>Vous n'avez pas de compte? <Link className='link' to={redirect ? `/inscription?redirect=${redirect}` : '/inscription'}>S'inscrire</Link></span>
            </div>
        </form>

      </section>
    </div>
  )
}

export default LoginScreen
