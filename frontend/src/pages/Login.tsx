import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/axiosInstance';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogin = async (e:any) => {
    e.preventDefault();
    const response:any = await axiosInstance.post('/auth/login', { email, password })
    alert(response.data.message)
    dispatch(setUser({ email, _id: response.data.userId}))
    console.log(response)
    navigate('/chat')
  };
  const handleRegister = async (e:any) => {
    e.preventDefault();
    const response:any = await axiosInstance.post('/auth/register', { email, password })
    alert(response.data.message)
    dispatch(setUser({ email, _id: response.data.userId}))
    console.log(response)
    navigate('/chat')
  };

  return (
    
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6">
        <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">
                {isSignup ? "Sign Up" : "Sign In"}
            </h2>

            {/* Dynamic Subtext */}
            <p className="text-gray-500 mt-2">
                {isSignup ? "Create an account to get started" : "Sign in to continue"}
            </p>
        </div>
        
        <form onSubmit={isSignup ? handleRegister : handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="block mb-2">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="email" 
                id="email"
                placeholder="Enter your email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="password" className="block mb-2">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-12"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          {!isSignup && <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="mr-2 rounded text-blue-500 focus:ring-blue-400"
              />
              <Label htmlFor="remember" className="text-gray-600">Remember me</Label>
            </div>
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>}
          
          <Button type="submit" className="w-full">
          {isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        
        <div className="text-center">
            <p className="text-gray-600">
                {isSignup ? "Already have an account?" : "Don't have an account?"} {" "}
                <a
                    href="#"
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsSignup(!isSignup);
                    }}
                >
                    {isSignup ? "Log In" : "Sign Up"}
                </a>
            </p>

            
        </div>
      </div>
  );
}

export default Login;