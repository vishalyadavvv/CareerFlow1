// components/Auth/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { FaRegUser, FaGlobe } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { URL } from "../../../constant/api";

// Language translations
const translations = {
  en: {
    welcome: "Welcome to CareerFlow",
    subtitle: "Your gateway to dream careers and exceptional talent",
    joinToday: "Join CareerFlow Today",
    description: "Discover thousands of job opportunities or find the perfect candidate for your company",
    features: {
      exclusive: "Access exclusive job listings",
      secure: "Secure and personalized experience",
      connect: "Connect with top employers and candidates"
    },
    loginTitle: "Login to your account",
    loginSubtitle: "Welcome back! Please enter your details",
    loginAs: "Login As",
    selectRole: "Select Role",
    employer: "Employer",
    jobSeeker: "Job Seeker",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    loginButton: "Login",
    loggingIn: "Logging in...",
    noAccount: "Don't have an account?",
    registerNow: "Register Now",
    loginSuccess: "Login successful!",
    loginFailed: "Login failed. Please try again."
  },
  es: {
    welcome: "Bienvenido a CareerFlow",
    subtitle: "Tu puerta de entrada a carreras de ensueño y talento excepcional",
    joinToday: "Únete a CareerFlow Hoy",
    description: "Descubre miles de oportunidades de trabajo o encuentra el candidato perfecto para tu empresa",
    features: {
      exclusive: "Acceso a ofertas de trabajo exclusivas",
      secure: "Experiencia segura y personalizada",
      connect: "Conecta con los mejores empleadores y candidatos"
    },
    loginTitle: "Inicia sesión en tu cuenta",
    loginSubtitle: "¡Bienvenido de nuevo! Por favor ingresa tus datos",
    loginAs: "Iniciar sesión como",
    selectRole: "Seleccionar Rol",
    employer: "Empleador",
    jobSeeker: "Buscador de Empleo",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "Ingresa tu correo electrónico",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "Ingresa tu contraseña",
    loginButton: "Iniciar Sesión",
    loggingIn: "Iniciando sesión...",
    noAccount: "¿No tienes una cuenta?",
    registerNow: "Regístrate Ahora",
    loginSuccess: "¡Inicio de sesión exitoso!",
    loginFailed: "Error al iniciar sesión. Por favor intenta de nuevo."
  },
  fr: {
    welcome: "Bienvenue sur CareerFlow",
    subtitle: "Votre passerelle vers des carrières de rêve et des talents exceptionnels",
    joinToday: "Rejoignez CareerFlow Aujourd'hui",
    description: "Découvrez des milliers d'opportunités d'emploi ou trouvez le candidat parfait pour votre entreprise",
    features: {
      exclusive: "Accès à des offres d'emploi exclusives",
      secure: "Expérience sécurisée et personnalisée",
      connect: "Connectez-vous avec les meilleurs employeurs et candidats"
    },
    loginTitle: "Connectez-vous à votre compte",
    loginSubtitle: "Bon retour ! Veuillez saisir vos informations",
    loginAs: "Se connecter en tant que",
    selectRole: "Sélectionner le Rôle",
    employer: "Employeur",
    jobSeeker: "Demandeur d'Emploi",
    emailLabel: "Adresse E-mail",
    emailPlaceholder: "Entrez votre e-mail",
    passwordLabel: "Mot de Passe",
    passwordPlaceholder: "Entrez votre mot de passe",
    loginButton: "Se Connecter",
    loggingIn: "Connexion en cours...",
    noAccount: "Vous n'avez pas de compte ?",
    registerNow: "S'inscrire Maintenant",
    loginSuccess: "Connexion réussie !",
    loginFailed: "Échec de la connexion. Veuillez réessayer."
  },
  de: {
    welcome: "Willkommen bei CareerFlow",
    subtitle: "Ihr Tor zu Traumkarrieren und außergewöhnlichen Talenten",
    joinToday: "Treten Sie CareerFlow heute bei",
    description: "Entdecken Sie Tausende von Stellenangeboten oder finden Sie den perfekten Kandidaten für Ihr Unternehmen",
    features: {
      exclusive: "Zugang zu exklusiven Stellenausschreibungen",
      secure: "Sichere und personalisierte Erfahrung",
      connect: "Verbinden Sie sich mit Top-Arbeitgebern und Kandidaten"
    },
    loginTitle: "Bei Ihrem Konto anmelden",
    loginSubtitle: "Willkommen zurück! Bitte geben Sie Ihre Daten ein",
    loginAs: "Anmelden als",
    selectRole: "Rolle Auswählen",
    employer: "Arbeitgeber",
    jobSeeker: "Jobsuchender",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    passwordLabel: "Passwort",
    passwordPlaceholder: "Geben Sie Ihr Passwort ein",
    loginButton: "Anmelden",
    loggingIn: "Wird angemeldet...",
    noAccount: "Sie haben noch kein Konto?",
    registerNow: "Jetzt Registrieren",
    loginSuccess: "Anmeldung erfolgreich!",
    loginFailed: "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."
  },
  hi: {
    welcome: "CareerFlow में आपका स्वागत है",
    subtitle: "सपनों के करियर और असाधारण प्रतिभा के लिए आपका प्रवेश द्वार",
    joinToday: "आज ही CareerFlow से जुड़ें",
    description: "हजारों नौकरी के अवसरों की खोज करें या अपनी कंपनी के लिए सही उम्मीदवार खोजें",
    features: {
      exclusive: "विशेष नौकरी सूची तक पहुंच",
      secure: "सुरक्षित और व्यक्तिगत अनुभव",
      connect: "शीर्ष नियोक्ताओं और उम्मीदवारों से जुड़ें"
    },
    loginTitle: "अपने खाते में लॉग इन करें",
    loginSubtitle: "वापस आपका स्वागत है! कृपया अपना विवरण दर्ज करें",
    loginAs: "इस रूप में लॉग इन करें",
    selectRole: "भूमिका चुनें",
    employer: "नियोक्ता",
    jobSeeker: "नौकरी तलाशने वाला",
    emailLabel: "ईमेल पता",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    passwordLabel: "पासवर्ड",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
    loginButton: "लॉग इन करें",
    loggingIn: "लॉग इन हो रहा है...",
    noAccount: "खाता नहीं है?",
    registerNow: "अभी पंजीकरण करें",
    loginSuccess: "लॉग इन सफल!",
    loginFailed: "लॉग इन असफल। कृपया पुनः प्रयास करें।"
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("careerflow-language");
    return savedLanguage && translations[savedLanguage] ? savedLanguage : "en";
  });

  const { isAuthorized, setIsAuthorized, setUser, user, loading } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current translations
  const t = translations[currentLanguage];

  // Language options
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" }
  ];

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem("careerflow-language", languageCode);
    setShowLanguageDropdown(false);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.language-selector')) {
      setShowLanguageDropdown(false);
    }
  };

  // Add click outside listener
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // FIXED: Better redirect logic
  useEffect(() => {
    // Only redirect if auth check is complete and user is authenticated
    if (!loading && isAuthorized && user) {
      const redirectPath = user.role === "Employer" ? "/" : "/job/getall";
      
      // Small delay to ensure smooth transition
      const redirectTimer = setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 100);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isAuthorized, user, loading, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);

    try {
     const loginUser = async ({ email, password, role }) => {
  try {
    const { data } = await axios.post(
      `${URL}/v1/user/login`,  // Correct endpoint
      { email, password, role }, // Payload
      {
        headers: {
          "Content-Type": "application/json", // Tell server JSON is sent
        },
        withCredentials: true, // Include cookies if backend uses HTTP-only cookies
      }
    );

    console.log("Login success:", data);
    return data; // Return the server response
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error; // Let caller handle error
  }
};
      toast.success(data?.message || t.loginSuccess);

      // Clear fields
      setEmail("");
      setPassword("");
      setRole("");

      // Set auth & user
      setIsAuthorized(true);

      // Ensure user object has all required fields
      const userData = {
        name: data.user?.name || "Unknown User",
        email: data.user?.email || email,
        phone: data.user?.phone || "N/A",
        role: data.user?.role || role,
        ...data.user // Spread any additional user data
      };

      setUser(userData);
      localStorage.setItem("careerflow-user", JSON.stringify(userData));

      // Store token
      if (data.token) {
        localStorage.setItem("careerflow-token", data.token);
      }

      // Redirect based on role
      const redirectPath = userData.role === "Employer" ? "/" : "/job/getall";
      navigate(redirectPath, { replace: true });

    } catch (error) {
      const errorMessage = error?.response?.data?.message || t.loginFailed;
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // FIXED: Show loading state during initial auth check
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/JobZeelogo.png"
            alt="CareerFlow Logo"
            className="mx-auto h-16 w-auto mb-4 animate-pulse"
          />
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="text-indigo-600 font-medium">Checking authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  // FIXED: Only redirect if definitely authenticated
  if (isAuthorized && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/JobZeelogo.png"
            alt="CareerFlow Logo"
            className="mx-auto h-16 w-auto mb-4"
          />
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span className="text-indigo-600 font-medium">Redirecting...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4 relative">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-40">
        <div className="relative language-selector">
          <button 
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-all text-xs sm:text-sm"
          >
            <FaGlobe className="text-indigo-600 text-sm sm:text-base" />
            <span className="font-medium">
              {languages.find(lang => lang.code === currentLanguage)?.flag}
            </span>
            <span className="text-gray-700 hidden sm:inline">
              {languages.find(lang => lang.code === currentLanguage)?.name}
            </span>
            {/* Mobile: Show abbreviated name */}
            <span className="text-gray-700 sm:hidden">
              {currentLanguage.toUpperCase()}
            </span>
            <svg 
              className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transform transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border min-w-40 sm:min-w-48 transform transition-all duration-200 origin-top-right ${
            showLanguageDropdown ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
          }`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-indigo-50 transition-colors first:rounded-t-lg last:rounded-b-lg text-sm ${
                  currentLanguage === lang.code ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <svg className="w-4 h-4 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl animate-scale-in">
        {/* Right Panel */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6 md:p-8 text-center text-white order-1 md:order-2 flex flex-col justify-center min-h-[200px] sm:min-h-[300px] md:min-h-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">{t.joinToday}</h2>
          <p className="text-indigo-100 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
            {t.description}
          </p>
          <ul className="space-y-3 text-left max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <li className="text-sm sm:text-base">✅ {t.features.exclusive}</li>
            <li className="text-sm sm:text-base">✅ {t.features.secure}</li>
            <li className="text-sm sm:text-base">✅ {t.features.connect}</li>
          </ul>
        </div>

        {/* Login Panel */}
        <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center order-2 md:order-1">
          <div className="text-center mb-6 sm:mb-8">
            <img
              src="/JobZeelogo.png"
              alt="CareerFlow Logo"
              className="mx-auto h-12 sm:h-14 md:h-16 w-auto mb-3 sm:mb-4"
            />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              {t.loginTitle}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base px-2 mt-1 sm:mt-2">
              {t.loginSubtitle}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                {t.loginAs}
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none text-sm sm:text-base"
                  required
                >
                  <option value="">{t.selectRole}</option>
                  <option value="Employer">{t.employer}</option>
                  <option value="Job Seeker">{t.jobSeeker}</option>
                </select>
                <FaRegUser className="absolute right-2.5 sm:right-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                {t.emailLabel}
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
                <MdOutlineMailOutline className="absolute right-2.5 sm:right-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
                <RiLock2Fill className="absolute right-2.5 sm:right-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm sm:text-base ${
                isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-indigo-700"
              }`}
            >
              {isLoading ? t.loggingIn : t.loginButton}
            </button>

            <p className="text-center text-gray-600 text-sm sm:text-base mt-4 sm:mt-6">
              {t.noAccount}{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
              >
                {t.registerNow}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;