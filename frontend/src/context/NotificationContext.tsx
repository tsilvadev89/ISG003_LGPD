import React, { createContext, useState, useContext, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Notification {
  type: 'success' | 'error';
  message: string;
}

interface NotificationContextProps {
  notification: Notification | undefined;
  setNotification: (notification: Notification | undefined) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | undefined>();

  const handleClose = () => {
    setNotification(undefined);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {notification && (
          <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
