import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

import LoginScene from './components/login/LoginScene';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';
import DashboardShell from './components/DashboardShell';

import './styles.css';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const switchToRegister = () => setIsRegistering(true);
  const switchToLogin = () => setIsRegistering(false);

  return (
    <div className="App">
      {user ? (
        <DashboardShell />
      ) : (
        <LoginScene>
          {isRegistering ? (
            <RegisterForm onSwitchToLogin={switchToLogin} />
          ) : (
            <LoginForm onSwitchToRegister={switchToRegister} />
          )}
        </LoginScene>
      )}
    </div>
  );
}

export default App;
