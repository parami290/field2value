"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Language = "en" | "si" | "ta"

type Translations = {
  [key: string]: {
    en: string
    si: string
    ta: string
  }
}

export const translations: Translations = {
  // Navigation
  home: { en: "Home", si: "මුල් පිටුව", ta: "முகப்பு" },
  about: { en: "About", si: "අපි ගැන", ta: "எங்களை பற்றி" },
  howItWorks: { en: "How It Works", si: "ක්‍රියාත්මක වන ආකාරය", ta: "இது எப்படி செயல்படுகிறது" },
  contact: { en: "Contact", si: "සම්බන්ධ වන්න", ta: "தொடர்பு" },
  login: { en: "Login", si: "පිවිසුම", ta: "உள்நுழைய" },
  register: { en: "Register", si: "ලියාපදිංචිය", ta: "பதிவு" },
  dashboard: { en: "Dashboard", si: "උපකරණ පුවරුව", ta: "டாஷ்போர்டு" },

  // Hero Section
  heroTitle: {
    en: "Turn Agricultural Waste into Value",
    si: "කෘෂිකාර්මික අපද්‍රව්‍ය වටිනාකමක් බවට පත් කරන්න",
    ta: "விவசாய கழிவுகளை மதிப்புமிக்கதாக மாற்றுங்கள்"
  },
  heroSubtitle: {
    en: "Join our circular economy platform and earn while protecting the environment",
    si: "අපගේ චක්‍රීය ආර්ථික වේදිකාවට එකතු වී පරිසරය ආරක්ෂා කරන අතරම ඉපයීමට",
    ta: "எங்கள் சுற்றுப்பொருளாதார தளத்தில் இணைந்து சுற்றுச்சூழலைப் பாதுகாக்கும் போது சம்பாதியுங்கள்"
  },
  getStarted: { en: "Get Started", si: "ආරම්භ කරන්න", ta: "தொடங்கு" },
  learnMore: { en: "Learn More", si: "තව දැනගන්න", ta: "மேலும் அறிக" },

  // Problem & Solution
  theProblem: { en: "The Problem", si: "ගැටලුව", ta: "பிரச்சனை" },
  problemDesc: {
    en: "Agricultural waste is burned or dumped, causing pollution and losing valuable resources",
    si: "කෘෂිකාර්මික අපද්‍රව්‍ය පුළුස්සනු ලැබේ හෝ බැහැර කරනු ලැබේ, දූෂණය ඇති කරයි",
    ta: "விவசாய கழிவுகள் எரிக்கப்படுகின்றன அல்லது குப்பையில் போடப்படுகின்றன"
  },
  theSolution: { en: "Our Solution", si: "අපගේ විසඳුම", ta: "எங்கள் தீர்வு" },
  solutionDesc: {
    en: "A digital platform connecting farmers with recyclers for a sustainable future",
    si: "තිරසාර අනාගතයක් සඳහා ගොවීන් නැවත භාවිතා කරන්නන් සමඟ සම්බන්ධ කරන ඩිජිටල් වේදිකාවක්",
    ta: "நிலையான எதிர்காலத்திற்காக விவசாயிகளை மறுசுழற்சி செய்பவர்களுடன் இணைக்கும் டிஜிட்டல் தளம்"
  },

  // Features
  features: { en: "Key Features", si: "ප්‍රධාන ලක්ෂණ", ta: "முக்கிய அம்சங்கள்" },
  wasteTracking: { en: "Waste Tracking", si: "අපද්‍රව්‍ය ලුහුබැඳීම", ta: "கழிவு கண்காணிப்பு" },
  wasteTrackingDesc: {
    en: "Track your agricultural waste submissions in real-time",
    si: "ඔබගේ කෘෂිකාර්මික අපද්‍රව්‍ය ඉදිරිපත් කිරීම් තත්කාලීනව ලුහුබඳින්න",
    ta: "உங்கள் விவசாய கழிவு சமர்ப்பிப்புகளை நிகழ்நேரத்தில் கண்காணிக்கவும்"
  },
  ecoCoins: { en: "Eco-Coins", si: "ඉකෝ-කාසි", ta: "ஈகோ-காயின்கள்" },
  ecoCoinsDesc: {
    en: "Earn digital coins for every verified waste submission",
    si: "සෑම සත්‍යාපිත අපද්‍රව්‍ය ඉදිරිපත් කිරීමක් සඳහාම ඩිජිටල් කාසි උපයන්න",
    ta: "ஒவ்வொரு சரிபார்க்கப்பட்ட கழிவு சமர்ப்பிப்புக்கும் டிஜிட்டல் காயின்கள் சம்பாதிக்கவும்"
  },
  impactReport: { en: "Impact Reports", si: "බලපෑම් වාර්තා", ta: "தாக்க அறிக்கைகள்" },
  impactReportDesc: {
    en: "See your environmental contribution with detailed reports",
    si: "විස්තරාත්මක වාර්තා සමඟ ඔබගේ පාරිසරික දායකත්වය බලන්න",
    ta: "விரிவான அறிக்கைகளுடன் உங்கள் சுற்றுச்சூழல் பங்களிப்பைப் பாருங்கள்"
  },

  // Stats
  farmersJoined: { en: "Farmers Joined", si: "සම්බන්ධ වූ ගොවීන්", ta: "இணைந்த விவசாயிகள்" },
  wasteCollected: { en: "Waste Collected", si: "එකතු කළ අපද්‍රව්‍ය", ta: "சேகரிக்கப்பட்ட கழிவு" },
  coinsEarned: { en: "Coins Earned", si: "උපයා ගත් කාසි", ta: "சம்பாதித்த காயின்கள்" },
  co2Reduced: { en: "CO2 Reduced", si: "අඩු කළ CO2", ta: "குறைக்கப்பட்ட CO2" },

  // About Page
  ourVision: { en: "Our Vision", si: "අපගේ දැක්ම", ta: "எங்கள் பார்வை" },
  visionDesc: {
    en: "A world where agricultural waste becomes a valuable resource, not a burden",
    si: "කෘෂිකාර්මික අපද්‍රව්‍ය බරක් නොව වටිනා සම්පතක් වන ලෝකයක්",
    ta: "விவசாய கழிவு சுமையாக அல்ல, மதிப்புமிக்க வளமாக மாறும் உலகம்"
  },
  ourMission: { en: "Our Mission", si: "අපගේ මෙහෙවර", ta: "எங்கள் நோக்கம்" },
  missionDesc: {
    en: "Empower farmers with technology to participate in the circular economy",
    si: "චක්‍රීය ආර්ථිකයට සහභාගී වීමට තාක්ෂණය මගින් ගොවීන් සවිබල ගැන්වීම",
    ta: "சுற்றுப்பொருளாதாரத்தில் பங்கேற்க விவசாயிகளுக்கு தொழில்நுட்பத்தின் மூலம் அதிகாரமளித்தல்"
  },
  circularEconomy: { en: "Circular Economy", si: "චක්‍රීය ආර්ථිකය", ta: "சுற்றுப்பொருளாதாரம்" },
  circularDesc: {
    en: "Waste from one becomes resource for another, creating a sustainable cycle",
    si: "එකක අපද්‍රව්‍ය තවත් කෙනෙකුට සම්පතක් බවට පත්වේ, තිරසාර චක්‍රයක් නිර්මාණය කරයි",
    ta: "ஒருவரின் கழிவு மற்றொருவருக்கு வளமாகிறது, நிலையான சுழற்சியை உருவாக்குகிறது"
  },

  // How It Works
  step1: { en: "Register", si: "ලියාපදිංචි වන්න", ta: "பதிவு செய்யுங்கள்" },
  step1Desc: {
    en: "Create your free farmer account in minutes",
    si: "විනාඩි කිහිපයකින් ඔබගේ නොමිලේ ගොවි ගිණුම සාදන්න",
    ta: "நிமிடங்களில் உங்கள் இலவச விவசாயி கணக்கை உருவாக்குங்கள்"
  },
  step2: { en: "Submit Waste", si: "අපද්‍රව්‍ය ඉදිරිපත් කරන්න", ta: "கழிவை சமர்ப்பிக்கவும்" },
  step2Desc: {
    en: "Log your agricultural waste details on the platform",
    si: "වේදිකාව මත ඔබගේ කෘෂිකාර්මික අපද්‍රව්‍ය විස්තර සටහන් කරන්න",
    ta: "தளத்தில் உங்கள் விவசாய கழிவு விவரங்களை பதிவு செய்யுங்கள்"
  },
  step3: { en: "Verification", si: "සත්‍යාපනය", ta: "சரிபார்ப்பு" },
  step3Desc: {
    en: "Our team verifies your submission for quality",
    si: "අපගේ කණ්ඩායම ගුණාත්මකභාවය සඳහා ඔබගේ ඉදිරිපත් කිරීම සත්‍යාපනය කරයි",
    ta: "எங்கள் குழு தரத்திற்காக உங்கள் சமர்ப்பிப்பை சரிபார்க்கிறது"
  },
  step4: { en: "Earn Eco-Coins", si: "ඉකෝ-කාසි උපයන්න", ta: "ஈகோ-காயின்கள் சம்பாதிக்கவும்" },
  step4Desc: {
    en: "Receive digital coins as reward for your contribution",
    si: "ඔබගේ දායකත්වයට ත්‍යාගයක් ලෙස ඩිජිටල් කාසි ලබා ගන්න",
    ta: "உங்கள் பங்களிப்புக்கு வெகுமதியாக டிஜிட்டல் காயின்கள் பெறுங்கள்"
  },
  step5: { en: "Track Impact", si: "බලපෑම ලුහුබඳින්න", ta: "தாக்கத்தை கண்காணிக்கவும்" },
  step5Desc: {
    en: "Monitor your environmental impact on the dashboard",
    si: "උපකරණ පුවරුව මත ඔබගේ පාරිසරික බලපෑම නිරීක්ෂණය කරන්න",
    ta: "டாஷ்போர்டில் உங்கள் சுற்றுச்சூழல் தாக்கத்தை கண்காணிக்கவும்"
  },

  // Contact
  contactUs: { en: "Contact Us", si: "අප අමතන්න", ta: "எங்களை தொடர்பு கொள்ளுங்கள்" },
  contactDesc: {
    en: "Have questions? We'd love to hear from you",
    si: "ප්‍රශ්න තිබේද? ඔබෙන් ඇසීමට අපි කැමතියි",
    ta: "கேள்விகள் உள்ளதா? உங்களிடமிருந்து கேட்க விரும்புகிறோம்"
  },
  yourName: { en: "Your Name", si: "ඔබේ නම", ta: "உங்கள் பெயர்" },
  yourEmail: { en: "Your Email", si: "ඔබේ විද්‍යුත් තැපෑල", ta: "உங்கள் மின்னஞ்சல்" },
  yourMessage: { en: "Your Message", si: "ඔබේ පණිවිඩය", ta: "உங்கள் செய்தி" },
  sendMessage: { en: "Send Message", si: "පණිවිඩය යවන්න", ta: "செய்தி அனுப்பு" },

  // Auth
  welcomeBack: { en: "Welcome Back", si: "ආයුබෝවන්", ta: "மீண்டும் வரவேற்கிறோம்" },
  createAccount: { en: "Create Account", si: "ගිණුමක් සාදන්න", ta: "கணக்கை உருவாக்கு" },
  email: { en: "Email", si: "විද්‍යුත් තැපෑල", ta: "மின்னஞ்சல்" },
  password: { en: "Password", si: "මුරපදය", ta: "கடவுச்சொல்" },
  confirmPassword: { en: "Confirm Password", si: "මුරපදය තහවුරු කරන්න", ta: "கடவுச்சொல்லை உறுதிப்படுத்து" },
  fullName: { en: "Full Name", si: "සම්පූර්ණ නම", ta: "முழு பெயர்" },
  noAccount: { en: "Don't have an account?", si: "ගිණුමක් නැද්ද?", ta: "கணக்கு இல்லையா?" },
  haveAccount: { en: "Already have an account?", si: "දැනටමත් ගිණුමක් තිබේද?", ta: "ஏற்கனவே கணக்கு உள்ளதா?" },

  // Dashboard
  welcome: { en: "Welcome", si: "ආයුබෝවන්", ta: "வரவேற்பு" },
  overview: { en: "Overview", si: "දළ විසුරුම", ta: "கண்ணோட்டம்" },
  totalWaste: { en: "Total Waste Submitted", si: "ඉදිරිපත් කළ මුළු අපද්‍රව්‍ය", ta: "சமர்ப்பிக்கப்பட்ட மொத்த கழிவு" },
  totalEarnings: { en: "Total Earnings", si: "මුළු ඉපැයීම්", ta: "மொத்த வருமானம்" },
  ecoCoinsBalance: { en: "Eco-Coins Balance", si: "ඉකෝ-කාසි ශේෂය", ta: "ஈகோ-காயின்கள் இருப்பு" },
  environmentalImpact: { en: "Environmental Impact", si: "පාරිසරික බලපෑම", ta: "சுற்றுச்சூழல் தாக்கம்" },
  submitWaste: { en: "Submit Waste", si: "අපද්‍රව්‍ය ඉදිරිපත් කරන්න", ta: "கழிவை சமர்ப்பிக்கவும்" },
  mySubmissions: { en: "My Submissions", si: "මගේ ඉදිරිපත් කිරීම්", ta: "எனது சமர்ப்பிப்புகள்" },
  reports: { en: "Reports", si: "වාර්තා", ta: "அறிக்கைகள்" },
  settings: { en: "Settings", si: "සැකසුම්", ta: "அமைப்புகள்" },
  logout: { en: "Logout", si: "ඉවත් වන්න", ta: "வெளியேறு" },

  // Footer
  allRightsReserved: { en: "All rights reserved", si: "සියලුම හිමිකම් ඇවිරිණි", ta: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை" },
  privacyPolicy: { en: "Privacy Policy", si: "රහස්‍යතා ප්‍රතිපත්තිය", ta: "தனியுரிமைக் கொள்கை" },
  termsOfService: { en: "Terms of Service", si: "සේවා නියම", ta: "சேவை விதிமுறைகள்" },

  // Loader
  loading: { en: "Growing...", si: "වැඩෙමින්...", ta: "வளர்கிறது..." },

  // Language names
  english: { en: "English", si: "English", ta: "English" },
  sinhala: { en: "සිංහල", si: "සිංහල", ta: "சிங்களம்" },
  tamil: { en: "தமிழ்", si: "දෙමළ", ta: "தமிழ்" },

  // Owner Portal
  ownerPortal: { en: "Owner Portal", si: "හිමිකරු ද්වාරය", ta: "உரிமையாளர் போர்டல்" },
  ownerPortalTitle: { 
    en: "Platform Owner Access", 
    si: "වේදිකා හිමිකරු ප්‍රවේශය", 
    ta: "தள உரிமையாளர் அணுகல்" 
  },
  ownerPortalDesc: { 
    en: "Manage farmers, verify waste submissions, and track platform operations", 
    si: "ගොවීන් කළමනාකරණය, අපද්‍රව්‍ය සත්‍යාපනය සහ වේදිකා මෙහෙයුම් නිරීක්ෂණය", 
    ta: "விவசாயிகளை நிர்வகிக்கவும், கழிவு சமர்ப்பிப்புகளை சரிபார்க்கவும், தள செயல்பாடுகளை கண்காணிக்கவும்" 
  },
  accessOwnerPortal: { en: "Access Portal", si: "ද්වාරයට ප්‍රවේශ වන්න", ta: "போர்டலை அணுகவும்" },

  // Agreement System
  agreement: { en: "Agreement", si: "ගිවිසුම", ta: "ஒப்பந்தம்" },
  myAgreement: { en: "My Agreement", si: "මගේ ගිවිසුම", ta: "எனது ஒப்பந்தம்" },
  agreementHistory: { en: "Agreement History", si: "ගිවිසුම් ඉතිහාසය", ta: "ஒப்பந்த வரலாறு" },
  wasteDeclaration: { en: "Waste Declaration", si: "අපද්‍රව්‍ය ප්‍රකාශය", ta: "கழிவு அறிவிப்பு" },
  wasteType: { en: "Waste Type", si: "අපද්‍රව්‍ය වර්ගය", ta: "கழிவு வகை" },
  paddyStraw: { en: "Paddy Straw (Piduru)", si: "පිදුරු", ta: "நெல் வைக்கோல்" },
  riceHusk: { en: "Rice Husk", si: "කුඩු", ta: "அரிசி உமி" },
  coconutShells: { en: "Coconut Shells", si: "පොල් කටු", ta: "தேங்காய் ஓடுகள்" },
  sugarcaneWaste: { en: "Sugarcane Waste", si: "උක් කසළ", ta: "கரும்பு கழிவு" },
  estimatedQuantity: { en: "Estimated Quantity", si: "ඇස්තමේන්තුගත ප්‍රමාණය", ta: "மதிப்பிடப்பட்ட அளவு" },
  availabilityPeriod: { en: "Availability Period", si: "ලබා ගත හැකි කාලය", ta: "கிடைக்கும் காலம்" },
  collectionLocation: { en: "Collection Location", si: "එකතු කිරීමේ ස්ථානය", ta: "சேகரிப்பு இடம்" },
  startDate: { en: "Start Date", si: "ආරම්භක දිනය", ta: "தொடக்க தேதி" },
  endDate: { en: "End Date", si: "අවසාන දිනය", ta: "முடிவு தேதி" },
  
  // Pricing & Conditions
  pricingConditions: { en: "Pricing & Conditions", si: "මිල සහ කොන්දේසි", ta: "விலை மற்றும் நிபந்தனைகள்" },
  pricePerKg: { en: "Price per kg", si: "කිලෝ ග්‍රෑම් එකකට මිල", ta: "கிலோவுக்கு விலை" },
  paymentMethod: { en: "Payment Method", si: "ගෙවීම් ක්‍රමය", ta: "கட்டண முறை" },
  cashPayment: { en: "Cash", si: "මුදල්", ta: "பணம்" },
  ecoCoinsPayment: { en: "Eco-Coins", si: "ඉකෝ-කාසි", ta: "ஈகோ-காயின்கள்" },
  mixedPayment: { en: "Mixed (Cash + Eco-Coins)", si: "මිශ්‍ර (මුදල් + ඉකෝ-කාසි)", ta: "கலப்பு (பணம் + ஈகோ-காயின்கள்)" },
  collectionResponsibility: { en: "Collection by platform team", si: "වේදිකා කණ්ඩායම විසින් එකතු කිරීම", ta: "தள குழுவால் சேகரிப்பு" },
  qualityRequirements: { en: "Dry, clean, free from foreign materials", si: "වියළි, පිරිසිදු, විදේශීය ද්‍රව්‍ය වලින් තොර", ta: "உலர்ந்த, சுத்தமான, அந்நிய பொருட்கள் இல்லாத" },

  // Agreement Status
  agreementStatus: { en: "Agreement Status", si: "ගිවිසුම් තත්ත්වය", ta: "ஒப்பந்த நிலை" },
  pending: { en: "Pending", si: "අපේක්ෂිත", ta: "நிலுவையில்" },
  pendingApproval: { en: "Pending Approval", si: "අනුමැතිය අපේක්ෂිතයි", ta: "ஒப்புதலுக்காக காத்திருக்கிறது" },
  active: { en: "Active", si: "ක්‍රියාකාරී", ta: "செயலில்" },
  expired: { en: "Expired", si: "කල් ඉකුත් වී ඇත", ta: "காலாவதியானது" },
  rejected: { en: "Rejected", si: "ප්‍රතික්ෂේප විය", ta: "நிராகரிக்கப்பட்டது" },
  declaredQuantity: { en: "Declared Quantity", si: "ප්‍රකාශිත ප්‍රමාණය", ta: "அறிவிக்கப்பட்ட அளவு" },
  remainingQuantity: { en: "Remaining Quantity", si: "ඉතිරි ප්‍රමාණය", ta: "மீதமுள்ள அளவு" },
  usedQuantity: { en: "Used Quantity", si: "භාවිතා කළ ප්‍රමාණය", ta: "பயன்படுத்திய அளவு" },

  // Agreement Actions
  submitAgreement: { en: "Submit Agreement", si: "ගිවිසුම ඉදිරිපත් කරන්න", ta: "ஒப்பந்தத்தை சமர்ப்பிக்கவும்" },
  agreeToTerms: { 
    en: "I agree to supply the above quantity under the listed conditions", 
    si: "මෙම කොන්දේසි යටතේ ඉහත ප්‍රමාණය සැපයීමට මම එකඟ වෙමි", 
    ta: "பட்டியலிடப்பட்ட நிபந்தனைகளின் கீழ் மேலே உள்ள அளவை வழங்க ஒப்புக்கொள்கிறேன்" 
  },
  agreementSubmitted: { 
    en: "Agreement submitted successfully! Awaiting owner approval.", 
    si: "ගිවිසුම සාර්ථකව ඉදිරිපත් කරන ලදී! හිමිකරු අනුමැතිය අපේක්ෂිතයි.", 
    ta: "ஒப்பந்தம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது! உரிமையாளர் ஒப்புதலுக்காக காத்திருக்கிறது." 
  },
  noActiveAgreement: { 
    en: "Please complete and activate an agreement before submitting waste.", 
    si: "කරුණාකර අපද්‍රව්‍ය ඉදිරිපත් කිරීමට පෙර ගිවිසුමක් සම්පූර්ණ කර සක්‍රිය කරන්න.", 
    ta: "கழிவை சமர்ப்பிக்கும் முன் ஒரு ஒப்பந்தத்தை முடித்து செயல்படுத்தவும்." 
  },
  createAgreement: { en: "Create Agreement", si: "ගිවිසුම සාදන්න", ta: "ஒப்பந்தத்தை உருவாக்கு" },
  viewAgreement: { en: "View Agreement", si: "ගිවිසුම බලන්න", ta: "ஒப்பந்தத்தைப் பார்" },

  // Legal Terms
  legalTermsEn: {
    en: "By agreeing, you confirm that the above waste quantity is available and suitable for collection. You agree to supply under the stated conditions. The platform agrees to collect and process the waste fairly. Either party may update future agreements if conditions change.",
    si: "By agreeing, you confirm that the above waste quantity is available and suitable for collection.",
    ta: "By agreeing, you confirm that the above waste quantity is available and suitable for collection."
  },
  legalTermsSi: {
    en: "ඔබ මෙහි සඳහන් කෘෂි අපද්‍රව්‍ය ප්‍රමාණය ලබාදීමට සූදානම් බව තහවුරු කරයි. මෙම කොන්දේසි යටතේ අපද්‍රව්‍ය සැපයීමට ඔබ එකඟ වේ. පද්ධතිය විසින් සාධාරණ ලෙස එකතු කිරීම සහ භාවිතය සිදු කරනු ඇත. අවශ්‍ය නම් ඉදිරි ගිවිසුම් දෙපාර්ශවය විසින් වෙනස් කළ හැක.",
    si: "ඔබ මෙහි සඳහන් කෘෂි අපද්‍රව්‍ය ප්‍රමාණය ලබාදීමට සූදානම් බව තහවුරු කරයි. මෙම කොන්දේසි යටතේ අපද්‍රව්‍ය සැපයීමට ඔබ එකඟ වේ. පද්ධතිය විසින් සාධාරණ ලෙස එකතු කිරීම සහ භාවිතය සිදු කරනු ඇත. අවශ්‍ය නම් ඉදිරි ගිවිසුම් දෙපාර්ශවය විසින් වෙනස් කළ හැක.",
    ta: "ஒப்புக்கொள்வதன் மூலம், மேலே உள்ள கழிவு அளவு சேகரிப்புக்கு கிடைக்கும் மற்றும் பொருத்தமானது என்பதை உறுதிப்படுத்துகிறீர்கள்."
  },

  // Owner Agreement Management
  pendingAgreements: { en: "Pending Agreements", si: "අපේක්ෂිත ගිවිසුම්", ta: "நிலுவையில் உள்ள ஒப்பந்தங்கள்" },
  activeAgreements: { en: "Active Agreements", si: "ක්‍රියාකාරී ගිවිසුම්", ta: "செயலில் உள்ள ஒப்பந்தங்கள்" },
  totalDeclaredWaste: { en: "Total Declared Waste", si: "මුළු ප්‍රකාශිත අපද්‍රව්‍ය", ta: "மொத்த அறிவிக்கப்பட்ட கழிவு" },
  farmersAwaitingApproval: { en: "Farmers Awaiting Approval", si: "අනුමැතිය බලාපොරොත්තුවෙන් සිටින ගොවීන්", ta: "ஒப்புதலுக்காக காத்திருக்கும் விவசாயிகள்" },
  reviewAgreement: { en: "Review", si: "සමාලෝචනය", ta: "மதிப்பாய்வு" },
  approveAgreement: { en: "Approve Agreement", si: "ගිවිසුම අනුමත කරන්න", ta: "ஒப்பந்தத்தை அங்கீகரி" },
  rejectAgreement: { en: "Reject Agreement", si: "ගිවිසුම ප්‍රතික්ෂේප කරන්න", ta: "ஒப்பந்தத்தை நிராகரி" },
  requestChange: { en: "Request Change", si: "වෙනස්කම් ඉල්ලන්න", ta: "மாற்றம் கோரு" },
  farmerDetails: { en: "Farmer Details", si: "ගොවි විස්තර", ta: "விவசாயி விவரங்கள்" },
  contactNumber: { en: "Contact Number", si: "සම්බන්ධතා අංකය", ta: "தொடர்பு எண்" },
  location: { en: "Location", si: "ස්ථානය", ta: "இடம்" },
  platformConditions: { en: "Platform Conditions", si: "වේදිකා කොන්දේසි", ta: "தள நிபந்தனைகள்" },
  ownerActions: { en: "Owner Actions", si: "හිමිකරු ක්‍රියා", ta: "உரிமையாளர் செயல்கள்" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key]
      if (!translation) return key
      return translation[language] || translation.en || key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
