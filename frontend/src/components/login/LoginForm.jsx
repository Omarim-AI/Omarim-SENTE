
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function LoginForm({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginFormContainer}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>OMARIM SOE</h2>
        <p style={styles.subtitle}>Connect to the AI Core</p>

        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <span onClick={() => setShowPassword(!showPassword)} style={styles.showHide}>👁</span>
        </div>

        <button type="submit" style={styles.loginButton} disabled={loading}>
          {loading ? 'Connecting...' : 'Login'}
        </button>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <div style={styles.links}>
          <a href="#" onClick={onSwitchToRegister} style={styles.link}>Create account</a>
        </div>

        <div style={styles.divider}></div>

        <button type="button" onClick={handleGoogleLogin} style={{...styles.button, ...styles.googleButton}}>Login with Google</button>
        <button type="button" style={{...styles.button, ...styles.magicLinkButton}}>Login with Magic Link</button>
        <button type="button" style={{...styles.button, ...styles.voiceAuthButton}}>Voice Authentication</button>

      </form>
    </div>
  );
}

const styles = {
  loginFormContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(10, 25, 47, 0.8)',
    padding: '40px',
    borderRadius: '15px',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    color: '#00aaff',
    marginBottom: '10px',
    textShadow: '0 0 10px #00aaff',
  },
  subtitle: {
    fontSize: '1.2em',
    marginBottom: '30px',
  },
  inputGroup: {
    position: 'relative',
    width: '100%',
    marginBottom: '20px',
  },
  input: {
    width: 'calc(100% - 40px)',
    padding: '15px 20px',
    border: '1px solid #00aaff',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: '1em',
  },
  showHide: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  loginButton: {
    padding: '15px 30px',
    border: 'none',
    borderRadius: '10px',
    background: 'linear-gradient(45deg, #00aaff, #00ffaa)',
    color: '#000011',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.1em',
    marginBottom: '20px',
    transition: 'transform 0.2s',
  },
  errorMessage: {
    color: '#ff4444',
    marginTop: '10px',
    textShadow: '0 0 5px #ff4444',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px',
  },
  link: {
    color: '#00aaff',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  divider: {
    height: '1px',
    width: '100%',
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    margin: '20px 0',
  },
  button: {
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
    width: '100%',
    border: '1px solid transparent',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
  },
  googleButton: {
    backgroundColor: '#db4437',
    color: 'white',
    borderColor: '#db4437',
  },
  magicLinkButton: {
    backgroundColor: 'transparent',
    color: '#00ffaa',
    borderColor: '#00ffaa',
  },
  voiceAuthButton: {
    backgroundColor: 'transparent',
    color: '#90f',
    borderColor: '#90f',
  },
};
