import { useState } from "react";
import { User, Mail, Lock, Activity, AlertCircle, Eye, EyeOff, CheckCircle, ArrowRight } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMsg("");

    // Simulate API call
    setTimeout(() => {
      setMsg("Account created successfully! Redirecting to login...");
      setLoading(false);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }, 1500);
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: "", color: "" };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const levels = [
      { text: "Weak", color: "bg-red-500" },
      { text: "Fair", color: "bg-yellow-500" },
      { text: "Good", color: "bg-blue-500" },
      { text: "Strong", color: "bg-emerald-500" }
    ];
    
    return { 
      strength, 
      text: levels[strength - 1]?.text || "", 
      color: levels[strength - 1]?.color || "bg-gray-200" 
    };
  };

  const passwordStrength = getPasswordStrength(form.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
       

        {/* Signup Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
             <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg transform hover:scale-110 transition-transform">
            <Activity className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Start your journey to better health today</p>
        </div>
          {/* Username Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                name="username"
                placeholder="John Doe"
                value={form.username}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={20} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        level <= passwordStrength.strength
                          ? passwordStrength.color
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  Password strength: <span className="font-semibold">{passwordStrength.text}</span>
                </p>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-1"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          {/* Error/Success Message */}
          {msg && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              msg.includes("success") 
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {msg.includes("success") ? (
                <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium">{msg}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </>
            ) : (
              <>
                Create Account <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup Buttons */}
          {/* <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-semibold text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-semibold text-gray-700">Facebook</span>
            </button>
          </div> */}

          {/* Login Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Sign in
            </a>
          </p>
        </div>

        {/* Benefits Card */}
        {/* <div className="mt-6 bg-white rounded-xl p-5 shadow-md border border-gray-100">
          <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-600" />
            What you'll get:
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
              <span>14-day free trial with full access</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
              <span>AI-powered meal analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
              <span>Personalized nutrition insights</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
              <span>Expert nutritionist support</span>
            </div>
          </div>
        </div> */}

        {/* Trust Indicators */}
        {/* <div className="mt-6 flex items-center justify-center gap-6 text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <Lock size={14} />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={14} />
            <span>HIPAA Compliant</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;