import { useState } from 'react';

export default function AdminLogin() {
  const [status, setStatus] = useState<'idle' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      setStatus('error');
      return;
    }

    // Placeholder login logic
    console.log('Admin login:', email);
  };

  return (
    <div className="pt-20 max-w-md mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
          <input id="email" name="email" type="email" className="w-full p-2 border rounded-md" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input id="password" name="password" type="password" className="w-full p-2 border rounded-md" required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Login</button>
        {status === 'error' && <p className="text-red-600">Please fill in all fields.</p>}
      </form>
    </div>
  );
}
