'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import GoogleSignIn from '@/components/ui/GoogleSignIn';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        console.error('login error:', result.error);
        setError(result.error);
      } else {
        alert('Account has been logged in');
        window.location.href = '/sellers';
      }
    } catch (error) {
      console.error('login error', error);
      setError('login has failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0c2c47',
        borderRadius: "24px",
        padding: '30px',
      }}
    >
      <h2 style={{paddingBottom: '30px', fontWeight: 'bold',  fontSize: '1.25rem'}}>
        Please login to your Seller&apos;s account
      </h2>
      <form
        onSubmit={handleLogin}
        style={{
          background: '#e4f2ea',
          padding: '2rem',
          borderRadius: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          minWidth: 400,
          maxWidth: 600,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          color: 'black',
        }}
      >
        <label htmlFor='email' style={{ fontWeight: 'bold' }}>Email</label>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={{
            border: '1px solid #e2a54d',
            borderRadius: '4px',
            padding: '8px 12px',
            background: 'white',
          }}
        />
        <label htmlFor='password' style={{ fontWeight: 'bold' }}>Password</label>
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={{
            border: '1px solid #e2a54d',
            borderRadius: '4px',
            padding: '8px 12px',
            background: 'white',
          }}
        />
        <button
          className='bg-blue-950 text-white rounded px-5 py-3 font-bold hover:bg-blue-900 transition-colors cursor-pointer'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Logging in... ' : 'Login'}
        </button>
        <Link 
          href='/create-account' 
          className='text-blue-500 hover:text-red-500' 
          style={{ 
            fontWeight: 'bold', 
            textDecoration: 'underline', 
            textAlign: 'center',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#2d5652'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
          >

          Create an account
        </Link>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <GoogleSignIn />
    </div>
  );
}
