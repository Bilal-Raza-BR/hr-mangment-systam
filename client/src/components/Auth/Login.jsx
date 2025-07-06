import React, { useState } from 'react';

const Login = () => {
    const submitHandle =(e) =>{
        e.preventDefault()
          console.log("Sumbit",formData);
  
    }
    const [formData, setFormData]=useState({
        email:'',
        password:""

    });
    const handleChange = (e)=>{
        setFormData({ ...formData,
            [e.target.name]:e.target.value
        })

    }
   console.log(formData);
   
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full transition-all duration-300 hover:scale-[1.02]">
        
        <h2 className="text-white text-4xl font-extrabold text-center mb-8 tracking-wide drop-shadow-lg">Login</h2>

        <form className="space-y-6" onSubmit={(e)=>{submitHandle(e)}}>
          <div className="px-2">
            <label htmlFor="email" className="block text-sm text-white mb-2">Email Address</label>
            <input
            required
            name='email'
            onChange={handleChange}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white text-white border border-emerald-400 w-full focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            />
          </div>

          <div className="px-2">
            <label htmlFor="password" className="block text-sm text-white mb-2">Password</label>
            <input
            required
            name='password'
            onChange={handleChange}
              type="password"
              id="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-full bg-white/20 placeholder-white text-white border border-emerald-400 w-full focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            />
          </div>

          <div className="px-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-300 mt-6">
          Don’t have an account? <span className="text-emerald-400 cursor-pointer hover:underline">Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
