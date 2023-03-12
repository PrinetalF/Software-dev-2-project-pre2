import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createClient} from '@supabase/supabase-js';
import {SessionContextProvider} from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://zmcqffuidpwphwiweczq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptY3FmZnVpZHB3cGh3aXdlY3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg2MjgxMDksImV4cCI6MTk5NDIwNDEwOX0.BMo3WEVY6pCDXr4f3sQOs5U1UJtl-behAYbJJdvkNM4"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
