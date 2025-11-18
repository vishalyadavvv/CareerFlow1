import React, { useContext, useState, useEffect } from "react";
import { FaRegUser, FaPencilAlt, FaPhoneAlt, FaGlobe } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import {URL} from "../../../constant/api"

// Language translations
const translations = {
  en: {
    welcome: "Join CareerFlow Community",
    welcomeSubtitle: "Start your journey to finding dream jobs or exceptional talent",
    createAccount: "Create your account",
    joinToday: "Join us today and unlock new opportunities",
    registerAs: "Register As",
    selectRole: "Select Role",
    employer: "Employer",
    jobSeeker: "Job Seeker",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    passwordLabel: "Password",
    passwordPlaceholder: "Create a strong password",
    passwordHint: "Use at least 8 characters with a mix of letters, numbers & symbols",
    createAccountButton: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    loginNow: "Login Now",
    whyJoin: "Why Join CareerFlow?",
    communityText: "Be part of a community that connects talent with opportunity",
    features: {
      secure: "Secure and encrypted data protection",
      personalized: "Personalized job recommendations", 
      network: "Network with industry professionals",
      growth: "Career growth and development resources"
    },
    featureLabels: {
      secure: "Secure",
      smart: "Smart", 
      connected: "Connected"
    },
    registrationSuccess: "Registration successful! Please login.",
    registrationFailed: "Registration failed. Please try again."
  },
  es: {
    welcome: "Únete a la Comunidad CareerFlow",
    welcomeSubtitle: "Comienza tu viaje para encontrar trabajos de ensueño o talento excepcional",
    createAccount: "Crea tu cuenta",
    joinToday: "Únete hoy y desbloquea nuevas oportunidades",
    registerAs: "Registrarse como",
    selectRole: "Seleccionar Rol",
    employer: "Empleador",
    jobSeeker: "Buscador de Empleo",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Ingresa tu nombre completo",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "Ingresa tu correo electrónico",
    phoneLabel: "Número de Teléfono",
    phonePlaceholder: "Ingresa tu número de teléfono",
    passwordLabel: "Contraseña",
    passwordPlaceholder: "Crea una contraseña segura",
    passwordHint: "Usa al menos 8 caracteres con una mezcla de letras, números y símbolos",
    createAccountButton: "Crear Cuenta",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    loginNow: "Iniciar Sesión Ahora",
    whyJoin: "¿Por qué unirse a CareerFlow?",
    communityText: "Sé parte de una comunidad que conecta talento con oportunidad",
    features: {
      secure: "Protección de datos segura y encriptada",
      personalized: "Recomendaciones de trabajo personalizadas",
      network: "Conecta con profesionales de la industria",
      growth: "Recursos de crecimiento y desarrollo profesional"
    },
    featureLabels: {
      secure: "Seguro",
      smart: "Inteligente",
      connected: "Conectado"
    },
    registrationSuccess: "¡Registro exitoso! Por favor inicia sesión.",
    registrationFailed: "Error en el registro. Por favor intenta de nuevo."
  },
  fr: {
    welcome: "Rejoignez la Communauté CareerFlow",
    welcomeSubtitle: "Commencez votre voyage pour trouver des emplois de rêve ou des talents exceptionnels",
    createAccount: "Créez votre compte",
    joinToday: "Rejoignez-nous aujourd'hui et débloquez de nouvelles opportunités",
    registerAs: "S'inscrire en tant que",
    selectRole: "Sélectionner le Rôle",
    employer: "Employeur",
    jobSeeker: "Demandeur d'Emploi",
    fullName: "Nom Complet",
    fullNamePlaceholder: "Entrez votre nom complet",
    emailLabel: "Adresse E-mail",
    emailPlaceholder: "Entrez votre e-mail",
    phoneLabel: "Numéro de Téléphone",
    phonePlaceholder: "Entrez votre numéro de téléphone",
    passwordLabel: "Mot de Passe",
    passwordPlaceholder: "Créez un mot de passe fort",
    passwordHint: "Utilisez au moins 8 caractères avec un mélange de lettres, chiffres et symboles",
    createAccountButton: "Créer un Compte",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    loginNow: "Se Connecter Maintenant",
    whyJoin: "Pourquoi rejoindre CareerFlow ?",
    communityText: "Faites partie d'une communauté qui connecte les talents aux opportunités",
    features: {
      secure: "Protection des données sécurisée et chiffrée",
      personalized: "Recommandations d'emploi personnalisées",
      network: "Réseau avec des professionnels de l'industrie",
      growth: "Ressources de croissance et développement de carrière"
    },
    featureLabels: {
      secure: "Sécurisé",
      smart: "Intelligent",
      connected: "Connecté"
    },
    registrationSuccess: "Inscription réussie ! Veuillez vous connecter.",
    registrationFailed: "Échec de l'inscription. Veuillez réessayer."
  },
  de: {
    welcome: "Treten Sie der CareerFlow-Community bei",
    welcomeSubtitle: "Beginnen Sie Ihre Reise, um Traumjobs oder außergewöhnliche Talente zu finden",
    createAccount: "Erstellen Sie Ihr Konto",
    joinToday: "Treten Sie heute bei und erschließen Sie neue Möglichkeiten",
    registerAs: "Registrieren als",
    selectRole: "Rolle Auswählen",
    employer: "Arbeitgeber",
    jobSeeker: "Jobsuchender",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    phoneLabel: "Telefonnummer",
    phonePlaceholder: "Geben Sie Ihre Telefonnummer ein",
    passwordLabel: "Passwort",
    passwordPlaceholder: "Erstellen Sie ein starkes Passwort",
    passwordHint: "Verwenden Sie mindestens 8 Zeichen mit einer Mischung aus Buchstaben, Zahlen und Symbolen",
    createAccountButton: "Konto Erstellen",
    alreadyHaveAccount: "Sie haben bereits ein Konto?",
    loginNow: "Jetzt Anmelden",
    whyJoin: "Warum CareerFlow beitreten?",
    communityText: "Werden Sie Teil einer Gemeinschaft, die Talente mit Möglichkeiten verbindet",
    features: {
      secure: "Sichere und verschlüsselte Datenschutz",
      personalized: "Personalisierte Jobempfehlungen",
      network: "Vernetzen Sie sich mit Branchenprofis",
      growth: "Karrierewachstum und Entwicklungsressourcen"
    },
    featureLabels: {
      secure: "Sicher",
      smart: "Intelligent",
      connected: "Verbunden"
    },
    registrationSuccess: "Registrierung erfolgreich! Bitte melden Sie sich an.",
    registrationFailed: "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut."
  },
  hi: {
    welcome: "CareerFlow समुदाय में शामिल हों",
    welcomeSubtitle: "सपनों की नौकरी या असाधारण प्रतिभा खोजने की अपनी यात्रा शुरू करें",
    createAccount: "अपना खाता बनाएं",
    joinToday: "आज ही शामिल हों और नए अवसर अनलॉक करें",
    registerAs: "इस रूप में पंजीकरण करें",
    selectRole: "भूमिका चुनें",
    employer: "नियोक्ता",
    jobSeeker: "नौकरी तलाशने वाला",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    emailLabel: "ईमेल पता",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    phoneLabel: "फोन नंबर",
    phonePlaceholder: "अपना फोन नंबर दर्ज करें",
    passwordLabel: "पासवर्ड",
    passwordPlaceholder: "एक मजबूत पासवर्ड बनाएं",
    passwordHint: "अक्षरों, संख्याओं और चिह्नों के मिश्रण के साथ कम से कम 8 वर्ण का उपयोग करें",
    createAccountButton: "खाता बनाएं",
    alreadyHaveAccount: "पहले से खाता है?",
    loginNow: "अभी लॉगिन करें",
    whyJoin: "CareerFlow में शामिल क्यों हों?",
    communityText: "एक ऐसे समुदाय का हिस्सा बनें जो प्रतिभा को अवसर से जोड़ता है",
    features: {
      secure: "सुरक्षित और एन्क्रिप्टेड डेटा सुरक्षा",
      personalized: "व्यक्तिगत नौकरी सिफारिशें",
      network: "उद्योग पेशेवरों के साथ नेटवर्क",
      growth: "करियर विकास और विकास संसाधन"
    },
    featureLabels: {
      secure: "सुरक्षित",
      smart: "स्मार्ट",
      connected: "जुड़ा हुआ"
    },
    registrationSuccess: "पंजीकरण सफल! कृपया लॉगिन करें।",
    registrationFailed: "पंजीकरण असफल। कृपया पुनः प्रयास करें।"
  }
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

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

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("careerflow-language");
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setShowRegister(true);
    }, 1000);

    return () => clearTimeout(welcomeTimer);
  }, []);

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem("careerflow-language", languageCode);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     const registerUser = async ({ name, phone, email, role, password }) => {
  try {
    const { data } = await axios.post(
      `${URL}/v1/user/register`, // Correct endpoint
      { name, phone, email, role, password }, // Payload
      {
        headers: {
          "Content-Type": "application/json", // JSON payload
        },
        withCredentials: true, // Include cookies if backend sets them
      }
    );

    console.log("Register success:", data);
    return data; // Return the response
  } catch (error) {
    console.error("Register failed:", error.response?.data || error.message);
    throw error; // Let the caller handle the error
  }
};
      toast.success(data?.message || t.registrationSuccess);

      // Clear fields
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");

      // ✅ Redirect to login page instead of setting authorized
      navigate("/login");

    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || t.registrationFailed;
      toast.error(errorMsg);
      console.error("Registration error:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 relative">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-40">
        <div className="relative group">
          <button className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white/90 transition-all">
            <FaGlobe className="text-indigo-600" />
            <span className="text-sm font-medium">
              {languages.find(lang => lang.code === currentLanguage)?.flag}
            </span>
            <span className="text-sm text-gray-700">
              {languages.find(lang => lang.code === currentLanguage)?.name}
            </span>
          </button>
          
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-indigo-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  currentLanguage === lang.code ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 animate-fade-in">
          <div className="text-center max-w-xs sm:max-w-md md:max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
            <img 
              src="https://res.cloudinary.com/dtcaankcx/image/upload/v1756847080/Gemini_Generated_Image_cpf0s3cpf0s3cpf0-removebg-preview_cmvabg.png" 
              alt="JobZee Logo" 
              className="mx-auto h-12 sm:h-16 md:h-20 w-auto mb-4 sm:mb-6 animate-bounce"
            />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-700 mb-4 sm:mb-6 animate-pulse px-2">
              {t.welcome}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              {t.welcomeSubtitle}
            </p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      {showRegister && (
        <div className="w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl animate-scale-in bg-white">
          
          {/* Left Side - Form */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center order-2 lg:order-1">
            <div className="text-center mb-6 sm:mb-8">
              <img 
                src="/JobZeelogo.png" 
                alt="JobZee Logo" 
                className="mx-auto h-12 sm:h-14 md:h-16 w-auto mb-3 sm:mb-4"
              />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{t.createAccount}</h3>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base px-2">
                {t.joinToday}
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
              {/* Role Selection */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">{t.registerAs}</label>
                <div className="relative">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-colors duration-200 text-sm sm:text-base"
                    required
                  >
                    <option value="">{t.selectRole}</option>
                    <option value="Employer">{t.employer}</option>
                    <option value="Job Seeker">{t.jobSeeker}</option>
                  </select>
                  <FaRegUser className="absolute right-2.5 sm:right-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">{t.fullName}</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.fullNamePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    required
                  />
                  <FaPencilAlt className="absolute right-2.5 sm:right-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">{t.emailLabel}</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    required
                  />
                  <MdOutlineMailOutline className="absolute right-2.5 sm:right-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">{t.phoneLabel}</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    required
                  />
                  <FaPhoneAlt className="absolute right-2.5 sm:right-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">{t.passwordLabel}</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    required
                  />
                  <RiLock2Fill className="absolute right-2.5 sm:right-3 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base" />
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1">
                  {t.passwordHint}
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                {t.createAccountButton}
              </button>

              {/* Login Link */}
              <div className="text-center mt-4 sm:mt-6">
                <p className="text-gray-600 text-sm sm:text-base">
                  {t.alreadyHaveAccount}{" "}
                  <Link 
                    to="/login" 
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
                  >
                    {t.loginNow}
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right Side - Info Panel */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-6 md:p-8 flex items-center justify-center order-1 lg:order-2 min-h-[200px] sm:min-h-[300px] lg:min-h-auto">
            <div className="text-center text-white p-3 sm:p-4 md:p-6 w-full max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">
                {t.whyJoin}
              </h2>
              <p className="text-indigo-100 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg">
                {t.communityText}
              </p>
              
              {/* Features List - Hidden on very small screens, shown from sm up */}
              <div className="hidden sm:block space-y-3 md:space-y-4 text-left max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base">{t.features.secure}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base">{t.features.personalized}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base">{t.features.network}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mr-3 sm:mr-4">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base">{t.features.growth}</p>
                </div>
              </div>

              {/* Simplified version for very small screens */}
              <div className="sm:hidden space-y-2 text-center">
                <div className="flex justify-center space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mb-1">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <p className="text-xs">{t.featureLabels.secure}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mb-1">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745" />
                      </svg>
                    </div>
                    <p className="text-xs">{t.featureLabels.smart}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-400 bg-opacity-25 flex items-center justify-center mb-1">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857" />
                      </svg>
                    </div>
                    <p className="text-xs">{t.featureLabels.connected}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;