Converting your app to a microfrontend architecture using Module Federation in Webpack involves several steps. You need to break your application into separate modules, configure Webpack to expose and consume these modules, and ensure they can communicate effectively. Here's a step-by-step guide to achieve this, including how to add a microfrontend for user summary:

### 1. Setup Module Federation

First, let's set up Module Federation for your existing React app with the modal.

#### Step 1: Create Two Separate Apps

- **App 1**: The main app that contains the grid and the modal for adding users.
- **App 2**: A new app that displays a summary of the users added.

#### Step 2: Install Dependencies

For each app, you need to install Webpack, Webpack CLI, and the necessary loaders and plugins:

```sh
npm install --save-dev webpack webpack-cli html-webpack-plugin
```

For Module Federation:

```sh
npm install --save-dev @module-federation/webpack-5 @module-federation/webpack-federation-plugin
```

#### Step 3: Configure Webpack in App 1 (Main App)

Create or update the `webpack.config.js` in App 1 to expose the modal and other components.

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('@module-federation/webpack-federation-plugin');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'App1',
      filename: 'remoteEntry.js',
      exposes: {
        './UserModal': './src/components/UserModal', // Expose your UserModal component
      },
      shared: ['react', 'react-dom', 'formik', 'yup', '@mui/material'],
    }),
  ],
};
```

#### Step 4: Configure Webpack in App 2 (Summary App)

Create or update the `webpack.config.js` in App 2 to consume the exposed module from App 1.

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('@module-federation/webpack-federation-plugin');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3002,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'App2',
      filename: 'remoteEntry.js',
      remotes: {
        App1: 'App1@http://localhost:3001/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};
```

#### Step 5: Consume the Module in App 2

In your App 2, you can now consume the exposed `UserModal` component from App 1.

**App2/src/index.tsx:**

```tsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { UserModal } from 'App1/UserModal'; // Import exposed component

const App: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Here, you would typically fetch user data from an API or shared state
  }, []);

  return (
    <div>
      <h1>User Summary</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.firstName} {user.lastName} ({user.gender})
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### 2. Add Microfrontend Communication

For the microfrontends to communicate, you can use a shared state management system like Redux or a simple event-based system. Here's an example using a shared state with React context.

#### Step 1: Set Up a Shared State

Create a context to manage the users.

**App1/src/context/UserContext.tsx:**

```tsx
import React, { createContext, useContext, useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  gender: string;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
```

Wrap your main app in `UserProvider`.

**App1/src/index.tsx:**

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
```

#### Step 2: Update User Modal to Use Context

Update the `UserModal` component to use the context to add users.

**App1/src/components/UserModal.tsx:**

```tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { useUserContext } from '../context/UserContext';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose }) => {
  const { addUser } = useUserContext();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: (values) => {
      addUser(values);
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            label="First Name"
            {...formik.getFieldProps('firstName')}
            error={formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            {...formik.getFieldProps('lastName')}
            error={formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            select
            {...formik.getFieldProps('gender')}
            error={formik.touched.gender && !!formik.errors.gender}
            helperText={formik.touched.gender && formik.errors.gender}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserModal;
```

#### Step 3: Consume the Shared State in App 2

Update the `App2` to consume the shared state by fetching it from the main app.

**App2/src/index.tsx:**

```tsx
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { UserModal } from 'App1/UserModal'; // Import exposed component
import { useUserContext } from 'App1/UserContext'; // Import UserContext

const UserSummary: React.FC = () => {
  const { users } = useUserContext();



 return (
    <div>
      <h1>User Summary</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.firstName} {user.lastName} ({user.gender})
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <UserSummary />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

#### Step 4: Ensure Both Apps Run

Run both applications on their respective ports (e.g., `http://localhost:3001` for App 1 and `http://localhost:3002` for App 2).

### Final Notes

1. **Webpack Configuration**: Ensure that the Webpack configurations in both applications correctly reference each other and expose/consume the necessary modules.
2. **Shared State Management**: Depending on your requirements, you might need a more sophisticated state management solution. Using contexts, as shown, is simple but might need to be extended for more complex scenarios.
3. **Testing and Validation**: Thoroughly test the communication between microfrontends to ensure that the integration is smooth and data flows correctly.

This setup allows you to break down your application into microfrontends, making it easier to manage, develop, and deploy independently.