
import React from 'react';

interface LoginSceneProps {
  children: React.ReactNode;
}

const LoginScene: React.FC<LoginSceneProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
}

export default LoginScene;
