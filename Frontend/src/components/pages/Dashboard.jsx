import { useEffect, useState } from "react";
import {
  Activity,
  TrendingUp,
  History,
  MessageSquare,
  Send,
  BarChart3,
  Calendar,
  FileText,
  X,
  Eye,
} from "lucide-react";
import UserProfile from "../../hooks/UserProfile";
import DietAnalyzer from "../../api/DietAnalyzer";
import logo from "../../assets/logo.png";
export default function Dashboard() {
  const { profile } = UserProfile();

  const [activeTab, setActiveTab] = useState("analyzer");
  const [hasGreeted, setHasGreeted] = useState(false);

  // Diet Analyzer State
  const [dietText, setDietText] = useState("");
  const [disease, setDisease] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Chat State
  const [chatText, setChatText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  // Stats & History State
  const [stats, setStats] = useState(null);
  const [dietHistory, setDietHistory] = useState([]);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Modal State for Analysis Details
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Terms & Conditions Modal
  const [showTermsModal, setShowTermsModal] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsCheckbox, setTermsCheckbox] = useState(false);

  useEffect(() => {
    // Check if user has already accepted terms in this session
    const hasAccepted = sessionStorage.getItem("termsAccepted");
    if (hasAccepted === "true") {
      setTermsAccepted(true);
      setShowTermsModal(false);
    }

    if (hasAccepted) {
      loadDashboardData();
    }
  }, []);

  // Greeting effect when switching to chat tab
  useEffect(() => {
    if (activeTab === "chat" && !hasGreeted && chatHistory.length === 0) {
      const greetUser = async () => {
        // Play greeting sound
        // try {
        //   const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRQ8PV6vn77FiGgQ9ld7zxnMpBSp+zPLaizsIGGS57uihUBELTKXh8bllHAU2jtHz0oA0Bx1qvu7mnEsPEFWo5/K0ZRsENZLb88p2KwUngcvx3I4+CRZivO7jo1QSC0mi4PG9aR4FN47Q89R/MwcdaLzv56ZOFQ9Ppe/zuGcdBDSO2fPOejAFKH3J8NySRAsWX7nv5KNVEgxIoeDxwGsdBTiO0PPVgTQHHGi78OilUBAPSKXv87lnHQU1jdj0z3sxBSd8yPDck0MMF124793ilEwNCkWf3/K9aCAGM4fQ89OCNQcbaLru5aZQEAxGouDyvWocBjaO0fPUgjQHHGi78OepURAPSKXu9LloHgU1i9fzz3wvBCh7x/Ddlf///////w==');
        //   audio.volume = 0.3;
        //   await audio.play();
        // } catch (err) {
        //   console.log('Audio play failed:', err);
        // }

        // Get time-based greeting
        const hour = new Date().getHours();
        let greeting = "";

        if (hour < 12) {
          greeting = "Good Morning";
        } else if (hour < 17) {
          greeting = "Good Afternoon";
        } else {
          greeting = "Good Evening";
        }

        // Add greeting message
        setTimeout(() => {
          const greetingMessage = {
            role: "assistant",
            content: `${greeting}! 👋\n\nHello I'm NutriScan AI, created by Dipayan Dey.\n\nHow can I help you today? Feel free to ask me anything about:\n• Nutrition and diet planning\n• Healthy eating habits\n• Meal recommendations\n• Managing health conditions through diet\n• Food alternatives and substitutions`,
          };
          setChatHistory([greetingMessage]);
          setHasGreeted(true);
        }, 500);
      };

      greetUser();
    }
  }, [activeTab, hasGreeted, chatHistory.length]);

  const loadDashboardData = async () => {
    setHistoryLoading(true);
    try {
      const [statsRes, dietHistoryRes, analysisHistoryRes] = await Promise.all([
        DietAnalyzer.getStats(),
        DietAnalyzer.getDietHistory(),
        DietAnalyzer.getAnalysisHistory(),
      ]);

      setStats(statsRes.data.stats);
      setDietHistory(dietHistoryRes.data.history || []);
      setAnalysisHistory(analysisHistoryRes.data.history || []);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    }
    setHistoryLoading(false);
  };

  const handleAnalyze = async () => {
    if (!dietText) return;

    try {
      setLoading(true);
      const res = await DietAnalyzer.analyzeDiet({
        diet_text: dietText,
        disease: disease,
      });

      setAnalysisResult(res.data.analysis);
      loadDashboardData(); // Refresh data
    } catch (err) {
      console.error("Error analyzing diet:", err);
    }
    setLoading(false);
  };

  const handleChat = async () => {
    if (!chatText.trim()) return;

    const userMessage = { role: "user", content: chatText };
    setChatHistory((prev) => [...prev, userMessage]);
    setChatText("");

    try {
      setChatLoading(true);
      const res = await DietAnalyzer.customChat(chatText);
      const aiMessage = { role: "assistant", content: res.data.response };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error in chat:", err);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    }
    setChatLoading(false);
  };

  // Clean text by removing markdown symbols
  const cleanText = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "") // Remove bold markers
      .replace(/\*/g, "") // Remove italic markers
      .replace(/###/g, "") // Remove heading markers
      .replace(/##/g, "") // Remove heading markers
      .replace(/#/g, "") // Remove heading markers
      .trim();
  };

  const formatAnalysisText = (text) => {
    if (!text) return null;

    const cleanedText = cleanText(text);
    const lines = cleanedText.split("\n").filter((line) => line.trim());

    return (
      <div className="space-y-6">
        {lines.map((line, index) => {
          // Main headings (short lines with title case)
          if (line.match(/^[A-Z][a-z\s]+$/) && line.length < 50) {
            return (
              <h3
                key={index}
                className="text-xl font-semibold text-gray-800 mt-6 mb-3"
              >
                {line}
              </h3>
            );
          }

          // Subheadings (lines that start with numbers)
          if (line.match(/^\d+\.\s+[A-Z]/)) {
            return (
              <h4
                key={index}
                className="text-lg font-medium text-emerald-700 mt-4 mb-2"
              >
                {line}
              </h4>
            );
          }

          // Regular paragraphs
          return (
            <p key={index} className="text-gray-700 leading-relaxed">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openAnalysisModal = (analysis) => {
    setSelectedAnalysis(analysis);
    setShowModal(true);
  };

  const closeAnalysisModal = () => {
    setShowModal(false);
    setSelectedAnalysis(null);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
    sessionStorage.setItem("termsAccepted", "true");
    loadDashboardData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Terms & Conditions Modal */}
      {showTermsModal && !termsAccepted && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                  {/* <Activity className="w-8 h-8" /> */}
                  <img src={logo} alt="" className="w-16" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">
                    Welcome to NutriSense AI
                  </h2>

                  <p className="text-emerald-100 text-sm mt-1">
                    AI-Powered Nutrition Analysis Platform
                  </p>


                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-280px)]">
              <div className="prose max-w-none">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Terms & Conditions
                </h3>

                <div className="space-y-6 text-gray-700">
                  <section>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                      1. Acceptance of Terms
                    </h4>
                    <p className="leading-relaxed">
                      By accessing and using NutriSense AI, you acknowledge that
                      you have read, understood, and agree to be bound by these
                      Terms and Conditions. If you do not agree to these terms,
                      please do not use this service.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                      2. Medical Disclaimer
                    </h4>
                    <p className="leading-relaxed">
                      NutriSense AI provides AI-generated nutritional analysis
                      and recommendations for informational purposes only. This
                      service is{" "}
                      <strong>
                        not a substitute for professional medical advice,
                        diagnosis, or treatment
                      </strong>
                      . Always consult with qualified healthcare professionals
                      before making any dietary changes, especially if you have
                      existing health conditions.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                      3. Use of Service
                    </h4>
                    <p className="leading-relaxed">
                      You agree to use NutriSense AI responsibly and for lawful
                      purposes only. You must provide accurate information when
                      using the diet analysis features. The AI assistant is
                      designed to provide general nutritional guidance and
                      should not be relied upon for critical health decisions.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                      4. Data Privacy
                    </h4>
                    <p className="leading-relaxed">
                      We respect your privacy and are committed to protecting
                      your personal information. Your diet data and analysis
                      history are stored securely and used solely to provide and
                      improve our services. We do not share your personal health
                      information with third parties without your explicit
                      consent.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                      5. AI-Generated Content
                    </h4>
                    <p className="leading-relaxed">
                      The nutritional analysis and recommendations provided by
                      NutriSense AI are generated by artificial intelligence
                      created by <strong>Dipayan Dey</strong>. While we strive
                      for accuracy, AI-generated content may contain errors or
                      be based on generalized information that may not apply to
                      your specific circumstances.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                      6. Limitation of Liability
                    </h4>
                    <p className="leading-relaxed">
                      NutriSense AI and its creators shall not be liable for any
                      direct, indirect, incidental, consequential, or special
                      damages arising from your use of this service or reliance
                      on the information provided. Use this service at your own
                      risk.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                      7. Modifications to Terms
                    </h4>
                    <p className="leading-relaxed">
                      We reserve the right to modify these Terms and Conditions
                      at any time. Continued use of the service after changes
                      constitutes acceptance of the modified terms.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2">
                      8. Contact Information
                    </h4>
                    <p className="leading-relaxed">
                      For questions or concerns about these terms or the
                      service, please contact the developer :
                      <strong>
                        <a
                          href="https://www.dipayandey.site"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Dipayan Dey
                        </a>
                      </strong>
                      .
                    </p>
                  </section>
                  <div className="flex items-center gap-2 mt-2">
                    {/* <span className="font-semibold">WhatsApp:</span> */}

                    <a
                      href="https://wa.me/918389806944"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      WhatsApp Me
                    </a>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                  <p className="text-amber-800 font-semibold mb-2">
                    ⚠️ Important Notice
                  </p>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    This platform is designed to assist with general nutritional
                    guidance. For personalized medical advice, please consult
                    with licensed healthcare professionals, registered
                    dietitians, or nutritionists.

                    
                  </p>
                     <p className=" text-xs mt-2 bg-yellow-600/20 px-3 py-1 rounded-md border border-yellow-400">
                     This is an AI-based prototype. Results may not be fully
                    accurate and should be used for general guidance only — not
                    as professional medical advice.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-start space-x-3 mb-4">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={termsCheckbox}
                  onChange={(e) => setTermsCheckbox(e.target.checked)}
                  className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                />
                <label
                  htmlFor="terms-checkbox"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  I have read and agree to the Terms & Conditions. I understand
                  that this service provides AI-generated nutritional guidance
                  and is not a substitute for professional medical advice.
                </label>
              </div>
              <button
                onClick={handleAcceptTerms}
                disabled={!termsCheckbox}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                Accept & Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Content - Only show when terms are accepted */}
      {termsAccepted && (
        <>
          {/* Header */}
          <header>
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-full">
                    <img src={logo} alt="" className="h-15" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      NutriScan AI
                    </h1>
                    <p className="text-sm text-gray-500">
                      AI-Powered Nutrition Analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold text-lg">
                    {profile?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      {profile?.username}
                    </p>
                    <p className="text-sm text-gray-500">{profile?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Stats Cards */}
          {stats && (
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-md p-6 border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Total Diets Submitted
                      </p>
                      <p className="text-3xl font-bold text-emerald-600 mt-2">
                        {stats.total_diets_submitted || 0}
                      </p>
                    </div>
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <FileText className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 border border-teal-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Total Analyses Generated
                      </p>
                      <p className="text-3xl font-bold text-teal-600 mt-2">
                        {stats.total_analyses_generated || 0}
                      </p>
                    </div>
                    <div className="bg-teal-100 p-3 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-teal-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="bg-white rounded-2xl shadow-md p-2 border border-emerald-100">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("analyzer")}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                    activeTab === "analyzer"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Activity className="w-5 h-5 inline mr-2" />
                  Diet Analyzer
                </button>

                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                    activeTab === "chat"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <MessageSquare className="w-5 h-5 inline mr-2" />
                  AI Chat
                </button>

                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                    activeTab === "history"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <History className="w-5 h-5 inline mr-2" />
                  History
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-7xl mx-auto px-6 pb-12">
            {/* Diet Analyzer Tab */}
            {activeTab === "analyzer" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-emerald-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Analyze Your Diet
                  </h2>
                  <p className="mb-6">
                    Here you can enter your disease — what you are suffering
                    from. AI will help you understand how to live a better life
                    with that condition, based on the information you provide in
                    the chat.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Health Condition
                      </label>
                      <input
                        type="text"
                        value={disease}
                        onChange={(e) => setDisease(e.target.value)}
                        placeholder="e.g., Diabetes, Hypertension"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Diet Description *
                      </label>
                      <textarea
                        value={dietText}
                        onChange={(e) => setDietText(e.target.value)}
                        placeholder="Describe your daily diet in detail..."
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none resize-none"
                      />
                    </div>

                    <button
                      onClick={handleAnalyze}
                      disabled={loading || !dietText}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Analyzing...
                        </span>
                      ) : (
                        "Analyze Diet"
                      )}
                    </button>
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-emerald-100 max-h-[600px] overflow-y-auto">
                  {analysisResult ? (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                          Analysis Results
                        </h2>
                        <div className="bg-emerald-100 px-4 py-2 rounded-lg">
                          <BarChart3 className="w-5 h-5 text-emerald-600 inline mr-2" />
                          <span className="font-semibold text-emerald-700">
                            Complete
                          </span>
                        </div>
                      </div>
                      <div className="prose max-w-none">
                        {formatAnalysisText(analysisResult)}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center">
                      <div>
                        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">
                          Your analysis results will appear here
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          Fill in the form and click Analyze Diet
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === "chat" && (
              <div className="bg-white rounded-2xl shadow-md border border-emerald-100 h-[600px] flex flex-col">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800">
                    AI Nutrition Assistant
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Ask me anything about nutrition, meal planning, and healthy
                    eating
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div className="max-w-md">
                        <div className="animate-pulse">
                          <MessageSquare className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                        </div>
                        <p className="text-gray-500 text-lg mb-4">
                          Initializing AI Assistant...
                        </p>
                      </div>
                    </div>
                  ) : (
                    chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                            msg.role === "user"
                              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-6 py-4 rounded-2xl">
                        <div className="flex space-x-2">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={chatText}
                      onChange={(e) => setChatText(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && !chatLoading && handleChat()
                      }
                      placeholder="Type your question..."
                      disabled={chatLoading}
                      className="flex-1 px-6 py-4 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none disabled:opacity-50"
                    />
                    <button
                      onClick={handleChat}
                      disabled={chatLoading || !chatText.trim()}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Diet History */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-emerald-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Diet History
                  </h2>

                  {historyLoading ? (
                    <div className="text-center py-12">
                      <svg
                        className="animate-spin h-8 w-8 text-emerald-500 mx-auto"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  ) : dietHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No diet history yet</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Start analyzing your diet to see history
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {dietHistory.map((item) => (
                        <div
                          key={item._id}
                          className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              {item.disease && (
                                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-2">
                                  {item.disease}
                                </span>
                              )}
                              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                                {item.diet_text}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-3">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(item.created_at)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Analysis History */}
                <div className="bg-white rounded-2xl shadow-md p-8 border border-emerald-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Analysis History
                  </h2>

                  {historyLoading ? (
                    <div className="text-center py-12">
                      <svg
                        className="animate-spin h-8 w-8 text-emerald-500 mx-auto"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  ) : analysisHistory.length === 0 ? (
                    <div className="text-center py-12">
                      <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No analysis history yet</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Your analyses will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto">
                      {analysisHistory.map((item) => (
                        <div
                          key={item._id}
                          className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800 mb-2">
                                Analysis Report
                              </p>
                              <p className="text-sm text-gray-600 line-clamp-3">
                                {cleanText(item.analysis)?.substring(0, 150)}...
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(item.created_at || new Date())}
                            </div>
                            <button
                              onClick={() => openAnalysisModal(item)}
                              className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-all"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Show More</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Analysis Modal */}
          {showModal && selectedAnalysis && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Full Analysis Report
                      </h2>
                      <p className="text-emerald-100 text-sm mt-1">
                        {formatDate(selectedAnalysis.created_at || new Date())}
                      </p>
                    </div>
                    <button
                      onClick={closeAnalysisModal}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {formatAnalysisText(selectedAnalysis.analysis)}
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <button
                    onClick={closeAnalysisModal}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
