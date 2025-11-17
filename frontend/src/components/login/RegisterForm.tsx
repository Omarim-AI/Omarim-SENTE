
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSwitchToLogin();
    } catch (error) {
      if (error instanceof Error) {
          setError(error.message);
      } else {
          setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSwitchToLogin();
  }

  return (
    <div style={styles.registerFormContainer}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2>Create Account</h2>
        
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.registerButton} disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        {error && <p style={styles.errorMessage}>{error}</p>}

        <div style={styles.links}>
          <a href="#" onClick={handleSwitchToLogin}>Back to Login</a>
        </div>

      </form>
    </div>
  );
}

const styles: {[key: string]: React.CSSProperties} = {
  registerFormContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 17, 0.8)',
    padding: '40px',
    borderRadius: '10px',
    border: '1px solid rgba(0, 255, 255, 0.3)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputGroup: {
    position: 'relative',
    width: '100%',
    marginBottom: '20px',
  },
  input: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    border: '1px solid #0ff',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'white',
  },
  registerButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#0ff',
    color: '#000011',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px',
  },
};

export default RegisterForm;
