import { useState } from 'react';
import { ArrowRight, Brain, Utensils, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/image.png';
const LandingPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
              AI-Powered Nutrition Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Health with
              <span className="text-emerald-600" > NutriScan AI</span>
            </h1> 
            <p className="text-lg text-gray-600 leading-relaxed">
              Get personalized nutrition insights powered by advanced AI. Track your meals, 
              analyze nutrients, and achieve your health goals with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-gray-900"
              />
              <button 
                onClick={handleGetStarted}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Get Started <ArrowRight size={20} />
              </button>
            </div>
            {/* <p className="text-sm text-gray-500">Free 14-day trial. No credit card required.</p> */}
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-8 shadow-2xl">
              <img 
                src={avatar}
                alt="Healthy food and nutrition"
                className="rounded-lg w-full h-auto shadow-lg"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Brain className="text-emerald-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">98%</p>
                  <p className="text-sm text-gray-600">Accuracy Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NutriScan AI?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge AI technology meets nutrition science to deliver 
              personalized insights you can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100">
              <div className="bg-emerald-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Brain className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced machine learning algorithms analyze your dietary patterns 
                and provide personalized recommendations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
              <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Utensils className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Meal Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Snap a photo or enter your meals manually. Our AI identifies 
                ingredients and calculates nutritional values instantly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize your nutrition journey with comprehensive charts and 
                reports that show your improvements over time.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-100">
              <div className="bg-orange-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Medical-Grade Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Your health data is protected with bank-level encryption and 
                HIPAA-compliant security measures.
              </p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-red-50 p-8 rounded-2xl border border-rose-100">
              <div className="bg-rose-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Get instant feedback on your meals and make informed decisions 
                about your nutrition throughout the day.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-8 rounded-2xl border border-indigo-100">
              <div className="bg-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with certified nutritionists and dietitians who can 
                guide you on your health journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">50K+</p>
              <p className="text-emerald-100">Active Users</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">2M+</p>
              <p className="text-emerald-100">Meals Analyzed</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">98%</p>
              <p className="text-emerald-100">Accuracy Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">4.9★</p>
              <p className="text-emerald-100">User Rating</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already improved their nutrition 
              and achieved their health goals.
            </p>
            <button 
              onClick={handleGetStarted}
              className="bg-white text-emerald-600 hover:bg-gray-100 px-10 py-5 rounded-lg font-bold text-lg inline-flex items-center gap-3 transition-colors shadow-lg"
            >
              Start Your Free Trial <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default LandingPage;