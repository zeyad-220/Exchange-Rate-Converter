/* Exchange Rate Converter — live cross-rate engine (free endpoint, no API key)
   Currency picker: flags, popular-first ordering, search by currency or country (EN/AR) */

const CURRENCIES = {
    "AED": {"name": "UAE Dirham", "country": "United Arab Emirates", "ar": "الإمارات", "flag": "🇦🇪"},
    "AFN": {"name": "Afghan Afghani", "country": "Afghanistan", "ar": "أفغانستان", "flag": "🇦🇫"},
    "ALL": {"name": "Albanian Lek", "country": "Albania", "ar": "ألبانيا", "flag": "🇦🇱"},
    "AMD": {"name": "Armenian Dram", "country": "Armenia", "ar": "أرمينيا", "flag": "🇦🇲"},
    "ANG": {"name": "Netherlands Antillean Guilder", "country": "Curaçao & Sint Maarten", "ar": "كوراساو", "flag": "🇨🇼"},
    "AOA": {"name": "Angolan Kwanza", "country": "Angola", "ar": "أنغولا", "flag": "🇦🇴"},
    "ARS": {"name": "Argentine Peso", "country": "Argentina", "ar": "الأرجنتين", "flag": "🇦🇷"},
    "AUD": {"name": "Australian Dollar", "country": "Australia", "ar": "أستراليا", "flag": "🇦🇺"},
    "AWG": {"name": "Aruban Florin", "country": "Aruba", "ar": "أروبا", "flag": "🇦🇼"},
    "AZN": {"name": "Azerbaijani Manat", "country": "Azerbaijan", "ar": "أذربيجان", "flag": "🇦🇿"},
    "BAM": {"name": "Bosnia-Herzegovina Convertible Mark", "country": "Bosnia and Herzegovina", "ar": "البوسنة", "flag": "🇧🇦"},
    "BBD": {"name": "Barbadian Dollar", "country": "Barbados", "ar": "بربادوس", "flag": "🇧🇧"},
    "BDT": {"name": "Bangladeshi Taka", "country": "Bangladesh", "ar": "بنغلاديش", "flag": "🇧🇩"},
    "BGN": {"name": "Bulgarian Lev", "country": "Bulgaria", "ar": "بلغاريا", "flag": "🇧🇬"},
    "BHD": {"name": "Bahraini Dinar", "country": "Bahrain", "ar": "البحرين", "flag": "🇧🇭"},
    "BIF": {"name": "Burundian Franc", "country": "Burundi", "ar": "بوروندي", "flag": "🇧🇮"},
    "BMD": {"name": "Bermudian Dollar", "country": "Bermuda", "ar": "برمودا", "flag": "🇧🇲"},
    "BND": {"name": "Brunei Dollar", "country": "Brunei", "ar": "بروناي", "flag": "🇧🇳"},
    "BOB": {"name": "Bolivian Boliviano", "country": "Bolivia", "ar": "بوليفيا", "flag": "🇧🇴"},
    "BRL": {"name": "Brazilian Real", "country": "Brazil", "ar": "البرازيل", "flag": "🇧🇷"},
    "BSD": {"name": "Bahamian Dollar", "country": "Bahamas", "ar": "الباهاما", "flag": "🇧🇸"},
    "BTN": {"name": "Bhutanese Ngultrum", "country": "Bhutan", "ar": "بوتان", "flag": "🇧🇹"},
    "BWP": {"name": "Botswana Pula", "country": "Botswana", "ar": "بوتسوانا", "flag": "🇧🇼"},
    "BYN": {"name": "Belarusian Ruble", "country": "Belarus", "ar": "بيلاروسيا", "flag": "🇧🇾"},
    "BZD": {"name": "Belize Dollar", "country": "Belize", "ar": "بليز", "flag": "🇧🇿"},
    "CAD": {"name": "Canadian Dollar", "country": "Canada", "ar": "كندا", "flag": "🇨🇦"},
    "CDF": {"name": "Congolese Franc", "country": "DR Congo", "ar": "الكونغو", "flag": "🇨🇩"},
    "CHF": {"name": "Swiss Franc", "country": "Switzerland", "ar": "سويسرا", "flag": "🇨🇭"},
    "CLF": {"name": "Chilean Unit of Account (UF)", "country": "Chile", "ar": "تشيلي", "flag": "🇨🇱"},
    "CLP": {"name": "Chilean Peso", "country": "Chile", "ar": "تشيلي", "flag": "🇨🇱"},
    "CNH": {"name": "Chinese Yuan (Offshore)", "country": "China", "ar": "الصين", "flag": "🇨🇳"},
    "CNY": {"name": "Chinese Yuan", "country": "China", "ar": "الصين", "flag": "🇨🇳"},
    "COP": {"name": "Colombian Peso", "country": "Colombia", "ar": "كولومبيا", "flag": "🇨🇴"},
    "CRC": {"name": "Costa Rican Colón", "country": "Costa Rica", "ar": "كوستاريكا", "flag": "🇨🇷"},
    "CUP": {"name": "Cuban Peso", "country": "Cuba", "ar": "كوبا", "flag": "🇨🇺"},
    "CVE": {"name": "Cape Verdean Escudo", "country": "Cape Verde", "ar": "الرأس الأخضر", "flag": "🇨🇻"},
    "CZK": {"name": "Czech Koruna", "country": "Czech Republic", "ar": "التشيك", "flag": "🇨🇿"},
    "DJF": {"name": "Djiboutian Franc", "country": "Djibouti", "ar": "جيبوتي", "flag": "🇩🇯"},
    "DKK": {"name": "Danish Krone", "country": "Denmark", "ar": "الدنمارك", "flag": "🇩🇰"},
    "DOP": {"name": "Dominican Peso", "country": "Dominican Republic", "ar": "جمهورية الدومينيكان", "flag": "🇩🇴"},
    "DZD": {"name": "Algerian Dinar", "country": "Algeria", "ar": "الجزائر", "flag": "🇩🇿"},
    "EGP": {"name": "Egyptian Pound", "country": "Egypt", "ar": "مصر", "flag": "🇪🇬"},
    "ERN": {"name": "Eritrean Nakfa", "country": "Eritrea", "ar": "إريتريا", "flag": "🇪🇷"},
    "ETB": {"name": "Ethiopian Birr", "country": "Ethiopia", "ar": "إثيوبيا", "flag": "🇪🇹"},
    "EUR": {"name": "Euro", "country": "Eurozone", "ar": "أوروبا منطقة اليورو", "flag": "🇪🇺"},
    "FJD": {"name": "Fijian Dollar", "country": "Fiji", "ar": "فيجي", "flag": "🇫🇯"},
    "FKP": {"name": "Falkland Islands Pound", "country": "Falkland Islands", "ar": "جزر فوكلاند", "flag": "🇫🇰"},
    "FOK": {"name": "Faroese Króna", "country": "Faroe Islands", "ar": "جزر فارو", "flag": "🇫🇴"},
    "GBP": {"name": "British Pound", "country": "United Kingdom", "ar": "بريطانيا إنجلترا المملكة المتحدة", "flag": "🇬🇧"},
    "GEL": {"name": "Georgian Lari", "country": "Georgia", "ar": "جورجيا", "flag": "🇬🇪"},
    "GGP": {"name": "Guernsey Pound", "country": "Guernsey", "ar": "غيرنزي", "flag": "🇬🇬"},
    "GHS": {"name": "Ghanaian Cedi", "country": "Ghana", "ar": "غانا", "flag": "🇬🇭"},
    "GIP": {"name": "Gibraltar Pound", "country": "Gibraltar", "ar": "جبل طارق", "flag": "🇬🇮"},
    "GMD": {"name": "Gambian Dalasi", "country": "Gambia", "ar": "غامبيا", "flag": "🇬🇲"},
    "GNF": {"name": "Guinean Franc", "country": "Guinea", "ar": "غينيا", "flag": "🇬🇳"},
    "GTQ": {"name": "Guatemalan Quetzal", "country": "Guatemala", "ar": "غواتيمالا", "flag": "🇬🇹"},
    "GYD": {"name": "Guyanese Dollar", "country": "Guyana", "ar": "غيانا", "flag": "🇬🇾"},
    "HKD": {"name": "Hong Kong Dollar", "country": "Hong Kong", "ar": "هونغ كونغ", "flag": "🇭🇰"},
    "HNL": {"name": "Honduran Lempira", "country": "Honduras", "ar": "هندوراس", "flag": "🇭🇳"},
    "HRK": {"name": "Croatian Kuna", "country": "Croatia", "ar": "كرواتيا", "flag": "🇭🇷"},
    "HTG": {"name": "Haitian Gourde", "country": "Haiti", "ar": "هايتي", "flag": "🇭🇹"},
    "HUF": {"name": "Hungarian Forint", "country": "Hungary", "ar": "المجر", "flag": "🇭🇺"},
    "IDR": {"name": "Indonesian Rupiah", "country": "Indonesia", "ar": "إندونيسيا", "flag": "🇮🇩"},
    "ILS": {"name": "Israeli Shekel", "country": "Israel", "ar": "إسرائيل", "flag": "🇮🇱"},
    "IMP": {"name": "Isle of Man Pound", "country": "Isle of Man", "ar": "جزيرة مان", "flag": "🇮🇲"},
    "INR": {"name": "Indian Rupee", "country": "India", "ar": "الهند", "flag": "🇮🇳"},
    "IQD": {"name": "Iraqi Dinar", "country": "Iraq", "ar": "العراق", "flag": "🇮🇶"},
    "IRR": {"name": "Iranian Rial", "country": "Iran", "ar": "إيران", "flag": "🇮🇷"},
    "ISK": {"name": "Icelandic Króna", "country": "Iceland", "ar": "أيسلندا", "flag": "🇮🇸"},
    "JEP": {"name": "Jersey Pound", "country": "Jersey", "ar": "جيرسي", "flag": "🇯🇪"},
    "JMD": {"name": "Jamaican Dollar", "country": "Jamaica", "ar": "جامايكا", "flag": "🇯🇲"},
    "JOD": {"name": "Jordanian Dinar", "country": "Jordan", "ar": "الأردن", "flag": "🇯🇴"},
    "JPY": {"name": "Japanese Yen", "country": "Japan", "ar": "اليابان", "flag": "🇯🇵"},
    "KES": {"name": "Kenyan Shilling", "country": "Kenya", "ar": "كينيا", "flag": "🇰🇪"},
    "KGS": {"name": "Kyrgyzstani Som", "country": "Kyrgyzstan", "ar": "قيرغيزستان", "flag": "🇰🇬"},
    "KHR": {"name": "Cambodian Riel", "country": "Cambodia", "ar": "كمبوديا", "flag": "🇰🇭"},
    "KID": {"name": "Kiribati Dollar", "country": "Kiribati", "ar": "كيريباتي", "flag": "🇰🇮"},
    "KMF": {"name": "Comorian Franc", "country": "Comoros", "ar": "جزر القمر", "flag": "🇰🇲"},
    "KRW": {"name": "South Korean Won", "country": "South Korea", "ar": "كوريا الجنوبية", "flag": "🇰🇷"},
    "KWD": {"name": "Kuwaiti Dinar", "country": "Kuwait", "ar": "الكويت", "flag": "🇰🇼"},
    "KYD": {"name": "Cayman Islands Dollar", "country": "Cayman Islands", "ar": "جزر كايمان", "flag": "🇰🇾"},
    "KZT": {"name": "Kazakhstani Tenge", "country": "Kazakhstan", "ar": "كازاخستان", "flag": "🇰🇿"},
    "LAK": {"name": "Lao Kip", "country": "Laos", "ar": "لاوس", "flag": "🇱🇦"},
    "LBP": {"name": "Lebanese Pound", "country": "Lebanon", "ar": "لبنان", "flag": "🇱🇧"},
    "LKR": {"name": "Sri Lankan Rupee", "country": "Sri Lanka", "ar": "سريلانكا", "flag": "🇱🇰"},
    "LRD": {"name": "Liberian Dollar", "country": "Liberia", "ar": "ليبيريا", "flag": "🇱🇷"},
    "LSL": {"name": "Lesotho Loti", "country": "Lesotho", "ar": "ليسوتو", "flag": "🇱🇸"},
    "LYD": {"name": "Libyan Dinar", "country": "Libya", "ar": "ليبيا", "flag": "🇱🇾"},
    "MAD": {"name": "Moroccan Dirham", "country": "Morocco", "ar": "المغرب", "flag": "🇲🇦"},
    "MDL": {"name": "Moldovan Leu", "country": "Moldova", "ar": "مولدوفا", "flag": "🇲🇩"},
    "MGA": {"name": "Malagasy Ariary", "country": "Madagascar", "ar": "مدغشقر", "flag": "🇲🇬"},
    "MKD": {"name": "Macedonian Denar", "country": "North Macedonia", "ar": "مقدونيا الشمالية", "flag": "🇲🇰"},
    "MMK": {"name": "Myanmar Kyat", "country": "Myanmar", "ar": "ميانمار", "flag": "🇲🇲"},
    "MNT": {"name": "Mongolian Tugrik", "country": "Mongolia", "ar": "منغوليا", "flag": "🇲🇳"},
    "MOP": {"name": "Macanese Pataca", "country": "Macau", "ar": "ماكاو", "flag": "🇲🇴"},
    "MRU": {"name": "Mauritanian Ouguiya", "country": "Mauritania", "ar": "موريتانيا", "flag": "🇲🇷"},
    "MUR": {"name": "Mauritian Rupee", "country": "Mauritius", "ar": "موريشيوس", "flag": "🇲🇺"},
    "MVR": {"name": "Maldivian Rufiyaa", "country": "Maldives", "ar": "المالديف", "flag": "🇲🇻"},
    "MWK": {"name": "Malawian Kwacha", "country": "Malawi", "ar": "مالاوي", "flag": "🇲🇼"},
    "MXN": {"name": "Mexican Peso", "country": "Mexico", "ar": "المكسيك", "flag": "🇲🇽"},
    "MYR": {"name": "Malaysian Ringgit", "country": "Malaysia", "ar": "ماليزيا", "flag": "🇲🇾"},
    "MZN": {"name": "Mozambican Metical", "country": "Mozambique", "ar": "موزمبيق", "flag": "🇲🇿"},
    "NAD": {"name": "Namibian Dollar", "country": "Namibia", "ar": "ناميبيا", "flag": "🇳🇦"},
    "NGN": {"name": "Nigerian Naira", "country": "Nigeria", "ar": "نيجيريا", "flag": "🇳🇬"},
    "NIO": {"name": "Nicaraguan Córdoba", "country": "Nicaragua", "ar": "نيكاراغوا", "flag": "🇳🇮"},
    "NOK": {"name": "Norwegian Krone", "country": "Norway", "ar": "النرويج", "flag": "🇳🇴"},
    "NPR": {"name": "Nepalese Rupee", "country": "Nepal", "ar": "نيبال", "flag": "🇳🇵"},
    "NZD": {"name": "New Zealand Dollar", "country": "New Zealand", "ar": "نيوزيلندا", "flag": "🇳🇿"},
    "OMR": {"name": "Omani Rial", "country": "Oman", "ar": "عمان سلطنة", "flag": "🇴🇲"},
    "PAB": {"name": "Panamanian Balboa", "country": "Panama", "ar": "بنما", "flag": "🇵🇦"},
    "PEN": {"name": "Peruvian Sol", "country": "Peru", "ar": "بيرو", "flag": "🇵🇪"},
    "PGK": {"name": "Papua New Guinean Kina", "country": "Papua New Guinea", "ar": "بابوا غينيا الجديدة", "flag": "🇵🇬"},
    "PHP": {"name": "Philippine Peso", "country": "Philippines", "ar": "الفلبين", "flag": "🇵🇭"},
    "PKR": {"name": "Pakistani Rupee", "country": "Pakistan", "ar": "باكستان", "flag": "🇵🇰"},
    "PLN": {"name": "Polish Zloty", "country": "Poland", "ar": "بولندا", "flag": "🇵🇱"},
    "PYG": {"name": "Paraguayan Guarani", "country": "Paraguay", "ar": "باراغواي", "flag": "🇵🇾"},
    "QAR": {"name": "Qatari Riyal", "country": "Qatar", "ar": "قطر", "flag": "🇶🇦"},
    "RON": {"name": "Romanian Leu", "country": "Romania", "ar": "رومانيا", "flag": "🇷🇴"},
    "RSD": {"name": "Serbian Dinar", "country": "Serbia", "ar": "صربيا", "flag": "🇷🇸"},
    "RUB": {"name": "Russian Ruble", "country": "Russia", "ar": "روسيا", "flag": "🇷🇺"},
    "RWF": {"name": "Rwandan Franc", "country": "Rwanda", "ar": "رواندا", "flag": "🇷🇼"},
    "SAR": {"name": "Saudi Riyal", "country": "Saudi Arabia", "ar": "السعودية المملكة العربية", "flag": "🇸🇦"},
    "SBD": {"name": "Solomon Islands Dollar", "country": "Solomon Islands", "ar": "جزر سليمان", "flag": "🇸🇧"},
    "SCR": {"name": "Seychellois Rupee", "country": "Seychelles", "ar": "سيشل", "flag": "🇸🇨"},
    "SDG": {"name": "Sudanese Pound", "country": "Sudan", "ar": "السودان", "flag": "🇸🇩"},
    "SEK": {"name": "Swedish Krona", "country": "Sweden", "ar": "السويد", "flag": "🇸🇪"},
    "SGD": {"name": "Singapore Dollar", "country": "Singapore", "ar": "سنغافورة", "flag": "🇸🇬"},
    "SHP": {"name": "Saint Helena Pound", "country": "Saint Helena", "ar": "سانت هيلينا", "flag": "🇸🇭"},
    "SLE": {"name": "Sierra Leonean Leone", "country": "Sierra Leone", "ar": "سيراليون", "flag": "🇸🇱"},
    "SLL": {"name": "Sierra Leonean Leone (old)", "country": "Sierra Leone", "ar": "سيراليون", "flag": "🇸🇱"},
    "SOS": {"name": "Somali Shilling", "country": "Somalia", "ar": "الصومال", "flag": "🇸🇴"},
    "SRD": {"name": "Surinamese Dollar", "country": "Suriname", "ar": "سورينام", "flag": "🇸🇷"},
    "SSP": {"name": "South Sudanese Pound", "country": "South Sudan", "ar": "جنوب السودان", "flag": "🇸🇸"},
    "STN": {"name": "São Toméan Dobra", "country": "São Tomé and Príncipe", "ar": "ساو تومي", "flag": "🇸🇹"},
    "SYP": {"name": "Syrian Pound", "country": "Syria", "ar": "سوريا", "flag": "🇸🇾"},
    "SZL": {"name": "Eswatini Lilangeni", "country": "Eswatini", "ar": "إسواتيني سوازيلاند", "flag": "🇸🇿"},
    "THB": {"name": "Thai Baht", "country": "Thailand", "ar": "تايلاند", "flag": "🇹🇭"},
    "TJS": {"name": "Tajikistani Somoni", "country": "Tajikistan", "ar": "طاجيكستان", "flag": "🇹🇯"},
    "TMT": {"name": "Turkmenistani Manat", "country": "Turkmenistan", "ar": "تركمانستان", "flag": "🇹🇲"},
    "TND": {"name": "Tunisian Dinar", "country": "Tunisia", "ar": "تونس", "flag": "🇹🇳"},
    "TOP": {"name": "Tongan Paʻanga", "country": "Tonga", "ar": "تونغا", "flag": "🇹🇴"},
    "TRY": {"name": "Turkish Lira", "country": "Türkiye", "ar": "تركيا", "flag": "🇹🇷"},
    "TTD": {"name": "Trinidad and Tobago Dollar", "country": "Trinidad and Tobago", "ar": "ترينيداد وتوباغو", "flag": "🇹🇹"},
    "TVD": {"name": "Tuvaluan Dollar", "country": "Tuvalu", "ar": "توفالو", "flag": "🇹🇻"},
    "TWD": {"name": "Taiwan Dollar", "country": "Taiwan", "ar": "تايوان", "flag": "🇹🇼"},
    "TZS": {"name": "Tanzanian Shilling", "country": "Tanzania", "ar": "تنزانيا", "flag": "🇹🇿"},
    "UAH": {"name": "Ukrainian Hryvnia", "country": "Ukraine", "ar": "أوكرانيا", "flag": "🇺🇦"},
    "UGX": {"name": "Ugandan Shilling", "country": "Uganda", "ar": "أوغندا", "flag": "🇺🇬"},
    "USD": {"name": "US Dollar", "country": "United States", "ar": "أمريكا الولايات المتحدة", "flag": "🇺🇸"},
    "UYU": {"name": "Uruguayan Peso", "country": "Uruguay", "ar": "أوروغواي", "flag": "🇺🇾"},
    "UZS": {"name": "Uzbekistani Som", "country": "Uzbekistan", "ar": "أوزبكستان", "flag": "🇺🇿"},
    "VES": {"name": "Venezuelan Bolívar", "country": "Venezuela", "ar": "فنزويلا", "flag": "🇻🇪"},
    "VND": {"name": "Vietnamese Dong", "country": "Vietnam", "ar": "فيتنام", "flag": "🇻🇳"},
    "VUV": {"name": "Vanuatu Vatu", "country": "Vanuatu", "ar": "فانواتو", "flag": "🇻🇺"},
    "WST": {"name": "Samoan Tala", "country": "Samoa", "ar": "ساموا", "flag": "🇼🇸"},
    "YER": {"name": "Yemeni Rial", "country": "Yemen", "ar": "اليمن", "flag": "🇾🇪"},
    "XAF": {"name": "Central African CFA Franc", "country": "Central Africa", "ar": "أفريقيا الوسطى", "flag": "🌐"},
    "XCD": {"name": "East Caribbean Dollar", "country": "Eastern Caribbean", "ar": "شرق الكاريبي", "flag": "🌐"},
    "XCG": {"name": "Caribbean Guilder", "country": "Curaçao & Sint Maarten", "ar": "كوراساو", "flag": "🇨🇼"},
    "XDR": {"name": "IMF Special Drawing Rights", "country": "IMF", "ar": "صندوق النقد الدولي", "flag": "🌐"},
    "XOF": {"name": "West African CFA Franc", "country": "West Africa", "ar": "غرب أفريقيا", "flag": "🌐"},
    "XPF": {"name": "CFP Franc", "country": "French Pacific", "ar": "المحيط الهادئ الفرنسي", "flag": "🇵🇫"},
    "ZAR": {"name": "South African Rand", "country": "South Africa", "ar": "جنوب أفريقيا", "flag": "🇿🇦"},
    "ZMW": {"name": "Zambian Kwacha", "country": "Zambia", "ar": "زامبيا", "flag": "🇿🇲"},
    "ZWG": {"name": "Zimbabwe Gold", "country": "Zimbabwe", "ar": "زيمبابوي", "flag": "🇿🇼"},
    "ZWL": {"name": "Zimbabwean Dollar", "country": "Zimbabwe", "ar": "زيمبابوي", "flag": "🇿🇼"},
};

const POPULAR = ['USD', 'EUR', 'EGP', 'SAR', 'AED', 'KWD', 'JPY', 'GBP'];

const amount = document.getElementById('amount');
const resultValue = document.getElementById('resultValue');
const rateLine = document.getElementById('rateLine');
const updatedLine = document.getElementById('updatedLine');
const swapButton = document.getElementById('swap');
const tickerTrack = document.getElementById('tickerTrack');
const popularStrip = document.getElementById('popularStrip');
const copyButton = document.getElementById('copyResult');
const panels = document.querySelectorAll('.panel');

const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
const TICKER_CURRENCIES = ['EUR', 'GBP', 'EGP', 'SAR', 'AED', 'JPY', 'KWD', 'CHF', 'CAD', 'CNY'];

let rates = null; // USD-based rates table; every pair converts through it
let countUpFrame = null;
let lastResult = null; // numeric result of the last successful conversion
const selected = { from: 'USD', to: 'EUR' };

// ---------- remembered pair + amount ----------
function saveState() {
    try {
        localStorage.setItem('fx-state', JSON.stringify({ from: selected.from, to: selected.to, amount: amount.value }));
    } catch (e) { /* private mode etc. — remembering is best-effort */ }
}
function restoreState() {
    try {
        const s = JSON.parse(localStorage.getItem('fx-state') || 'null');
        if (!s) return;
        if (typeof s.from === 'string') selected.from = s.from;
        if (typeof s.to === 'string') selected.to = s.to;
        if (typeof s.amount === 'string' && s.amount !== '') amount.value = s.amount;
    } catch (e) { /* ignore corrupt state */ }
}
restoreState();

const fmtAmount = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtRate = new Intl.NumberFormat('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
const fmtTicker = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function crossRate(from, to) {
    if (!rates || !rates[from] || !rates[to]) return null;
    return rates[to] / rates[from];
}

// ---------- search normalization (EN + AR) ----------
function norm(s) {
    return (s || '').toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي')
        .replace(/[ً-ْٰـ]/g, '')
        .trim();
}

function metaFor(code) {
    return CURRENCIES[code] || { name: code, country: '', ar: '', flag: '🌐' };
}

function matches(code, q) {
    const m = metaFor(code);
    return norm(code).includes(q) || norm(m.name).includes(q)
        || norm(m.country).includes(q) || norm(m.ar).includes(q);
}

function matchRank(code, q) {
    const m = metaFor(code);
    if (norm(code) === q) return 0;
    if (norm(code).startsWith(q)) return 1;
    if (norm(m.name).startsWith(q) || norm(m.country).startsWith(q)) return 2;
    return 3;
}

// ---------- count-up animation for the result ----------
function animateResult(target) {
    if (countUpFrame) cancelAnimationFrame(countUpFrame);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        resultValue.textContent = fmtAmount.format(target);
        return;
    }

    const current = parseFloat(resultValue.textContent.replace(/[^0-9.\-]/g, ''));
    const start = Number.isFinite(current) ? current : 0;
    const duration = 650;
    const t0 = performance.now();

    resultValue.classList.remove('flash');
    void resultValue.offsetWidth; // restart the flash animation
    resultValue.classList.add('flash');

    function step(now) {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        resultValue.textContent = fmtAmount.format(start + (target - start) * eased);
        if (p < 1) countUpFrame = requestAnimationFrame(step);
    }
    countUpFrame = requestAnimationFrame(step);
}

// ---------- conversion ----------
function convertCurrency() {
    const from = selected.from;
    const to = selected.to;
    const amountValue = parseFloat(amount.value);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
        resultValue.textContent = '—';
        rateLine.textContent = 'Enter an amount above zero.';
        lastResult = null;
        renderPopularStrip();
        return;
    }
    if (!rates) {
        resultValue.textContent = '—';
        return;
    }

    const rate = crossRate(from, to);
    if (rate == null) {
        resultValue.textContent = '—';
        rateLine.textContent = 'This pair is unavailable right now.';
        lastResult = null;
        renderPopularStrip();
        return;
    }

    lastResult = amountValue * rate;
    animateResult(lastResult);
    rateLine.innerHTML = `<b>1 ${from}</b> = <b>${fmtRate.format(rate)} ${to}</b><span class="rate-inverse">1 ${to} = ${fmtRate.format(1 / rate)} ${from}</span>`;
    renderPopularStrip();
    saveState();
}

// ---------- popular conversions strip ----------
function renderPopularStrip() {
    const amountValue = parseFloat(amount.value);
    if (!rates || !Number.isFinite(amountValue) || amountValue <= 0) {
        popularStrip.innerHTML = '';
        popularStrip.hidden = true;
        return;
    }
    const others = POPULAR.filter(c => c !== selected.from && c !== selected.to && rates[c]).slice(0, 5);
    if (!others.length) {
        popularStrip.innerHTML = '';
        popularStrip.hidden = true;
        return;
    }
    popularStrip.hidden = false;
    popularStrip.innerHTML = others.map(code => {
        const m = metaFor(code);
        const v = amountValue * crossRate(selected.from, code);
        return `<button type="button" class="popular-chip" data-code="${code}" title="Convert to ${m.name}">
            <span class="popular-flag" aria-hidden="true">${m.flag}</span>
            <span class="popular-value">${fmtAmount.format(v)}</span>
            <span class="popular-code">${code}</span>
        </button>`;
    }).join('');
}

popularStrip.addEventListener('click', e => {
    const chip = e.target.closest('.popular-chip');
    if (!chip) return;
    selected.to = chip.dataset.code;
    updatePickerButton(pickers.to);
    convertCurrency();
});

// ---------- copy result ----------
copyButton.addEventListener('click', async () => {
    if (lastResult == null) return;
    const text = `${fmtAmount.format(lastResult)} ${selected.to}`;
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
    }
    copyButton.classList.add('copied');
    setTimeout(() => copyButton.classList.remove('copied'), 1200);
});

// ---------- currency picker (flags + popular-first + search) ----------
const pickers = {};

function buildPicker(which, containerId, ariaLabel) {
    const container = document.getElementById(containerId);
    container.classList.add('currency-picker');
    container.innerHTML = `
        <button type="button" class="picker-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${ariaLabel}">
            <span class="picker-btn-flag" aria-hidden="true">🌐</span>
            <span class="picker-btn-text">
                <span class="picker-btn-code">—</span>
                <span class="picker-btn-name"></span>
            </span>
            <svg class="picker-caret" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="picker-pop" hidden>
            <div class="picker-search-wrap">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                <input type="text" class="picker-search" placeholder="Search currency or country… / ابحث باسم الدولة" aria-label="Search currency or country">
            </div>
            <div class="picker-list" role="listbox" aria-label="${ariaLabel}"></div>
        </div>`;

    const btn = container.querySelector('.picker-btn');
    const pop = container.querySelector('.picker-pop');
    const search = container.querySelector('.picker-search');
    const list = container.querySelector('.picker-list');
    const picker = { which, container, btn, pop, search, list, activeIndex: 0, codes: [] };
    pickers[which] = picker;

    btn.addEventListener('click', () => {
        if (pop.hidden) openPicker(picker); else closePicker(picker);
    });

    search.addEventListener('input', () => { picker.activeIndex = 0; renderList(picker); });
    search.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(picker, 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(picker, -1); }
        else if (e.key === 'Enter') {
            e.preventDefault();
            const rows = list.querySelectorAll('.picker-option');
            if (rows[picker.activeIndex]) rows[picker.activeIndex].click();
        } else if (e.key === 'Escape') { e.preventDefault(); closePicker(picker); btn.focus(); }
    });

    pop.addEventListener('click', e => {
        const opt = e.target.closest('.picker-option');
        if (opt) selectCurrency(picker, opt.dataset.code);
    });

    list.addEventListener('mousemove', e => {
        const opt = e.target.closest('.picker-option');
        if (!opt) return;
        const rows = Array.from(list.querySelectorAll('.picker-option'));
        const i = rows.indexOf(opt);
        if (i !== -1 && i !== picker.activeIndex) {
            picker.activeIndex = i;
            rows.forEach((r, j) => r.classList.toggle('active', j === i));
        }
    });

    return picker;
}

function rowHtml(code, isSelected) {
    const m = metaFor(code);
    const country = m.country ? `<span class="picker-country">${m.country}</span>` : '';
    return `<button type="button" class="picker-option${isSelected ? ' selected' : ''}" role="option"
        aria-selected="${isSelected}" data-code="${code}">
        <span class="picker-flag" aria-hidden="true">${m.flag}</span>
        <span class="picker-code">${code}</span>
        <span class="picker-label"><span class="picker-name">${m.name}</span>${country}</span>
        <span class="picker-check" aria-hidden="true">✓</span>
    </button>`;
}

function renderList(picker) {
    const q = norm(picker.search.value);
    const cur = selected[picker.which];
    picker.codes = rates ? Object.keys(rates).filter(c => true) : Object.keys(CURRENCIES);

    let html = '';
    if (q) {
        const hits = picker.codes.filter(c => matches(c, q))
            .sort((a, b) => (matchRank(a, q) - matchRank(b, q)) || a.localeCompare(b));
        html = hits.length
            ? hits.map(c => rowHtml(c, c === cur)).join('')
            : '<p class="picker-empty">No currency matches that search.</p>';
    } else {
        const popular = POPULAR.filter(c => picker.codes.includes(c));
        const rest = picker.codes.filter(c => !popular.includes(c)).sort();
        html = `<p class="picker-group">★ Most used</p>`
            + popular.map(c => rowHtml(c, c === cur)).join('')
            + `<p class="picker-group">All currencies</p>`
            + rest.map(c => rowHtml(c, c === cur)).join('');
    }
    picker.list.innerHTML = html;
    highlightActive(picker);
}

function highlightActive(picker) {
    const rows = picker.list.querySelectorAll('.picker-option');
    rows.forEach((r, i) => r.classList.toggle('active', i === picker.activeIndex));
    const active = rows[picker.activeIndex];
    if (active) active.scrollIntoView({ block: 'nearest' });
}

function moveActive(picker, delta) {
    const rows = picker.list.querySelectorAll('.picker-option');
    if (!rows.length) return;
    picker.activeIndex = (picker.activeIndex + delta + rows.length) % rows.length;
    highlightActive(picker);
}

function updatePickerButton(picker) {
    const code = selected[picker.which];
    const m = metaFor(code);
    picker.btn.querySelector('.picker-btn-flag').textContent = m.flag;
    picker.btn.querySelector('.picker-btn-code').textContent = code;
    picker.btn.querySelector('.picker-btn-name').textContent = m.name;
}

// keep the pop inside the visible viewport: drop up when space below is short,
// and cap its height against the visual viewport (shrinks when the mobile keyboard opens)
function placePicker(picker) {
    const anchor = picker.pop.offsetParent;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const vv = window.visualViewport;
    const vh = vv ? vv.height : window.innerHeight;
    const cap = Math.max(220, Math.min(430, vh * 0.72));
    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;
    const dropUp = spaceBelow < cap && spaceAbove > spaceBelow;
    const avail = (dropUp ? spaceAbove : spaceBelow) - 8;
    picker.pop.style.maxHeight = Math.max(160, Math.min(cap, avail)) + 'px';
    picker.pop.classList.toggle('drop-up', dropUp);
}

if (window.visualViewport) {
    const replaceOpen = () => Object.values(pickers).forEach(p => { if (!p.pop.hidden) placePicker(p); });
    window.visualViewport.addEventListener('resize', replaceOpen);
    window.visualViewport.addEventListener('scroll', replaceOpen);
}

function openPicker(picker) {
    Object.values(pickers).forEach(p => { if (p !== picker) closePicker(p); });
    picker.search.value = '';
    picker.activeIndex = 0;
    renderList(picker);
    picker.pop.hidden = false;
    picker.btn.setAttribute('aria-expanded', 'true');
    picker.container.classList.add('open');
    const panel = picker.container.closest('.panel');
    if (panel) panel.classList.add('raised');
    placePicker(picker);
    // scroll the current selection into view when no search text
    const sel = picker.list.querySelector('.picker-option.selected');
    if (sel) sel.scrollIntoView({ block: 'nearest' });
    picker.search.focus();
    // re-place once the keyboard-open viewport change and focus scroll settle
    setTimeout(() => { if (!picker.pop.hidden) placePicker(picker); }, 400);
}

function closePicker(picker) {
    picker.pop.hidden = true;
    picker.btn.setAttribute('aria-expanded', 'false');
    picker.container.classList.remove('open');
    const panel = picker.container.closest('.panel');
    if (panel) panel.classList.remove('raised');
}

function selectCurrency(picker, code) {
    selected[picker.which] = code;
    updatePickerButton(picker);
    closePicker(picker);
    picker.btn.focus();
    convertCurrency();
}

// close any open picker on outside click
document.addEventListener('click', e => {
    Object.values(pickers).forEach(p => {
        if (!p.pop.hidden && !p.container.contains(e.target)) closePicker(p);
    });
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') Object.values(pickers).forEach(p => { if (!p.pop.hidden) closePicker(p); });
});

// ---------- live ticker ----------
function buildTicker() {
    const items = TICKER_CURRENCIES
        .filter(code => rates[code])
        .map(code => `<span class="ticker-item"><b>USD/${code}</b>${fmtTicker.format(rates[code])}</span>`)
        .join('');
    tickerTrack.innerHTML = items + items; // duplicated for a seamless marquee loop
}

// ---------- load rates ----------
async function loadRates() {
    buildPicker('from', 'fromCurrency', 'From currency');
    buildPicker('to', 'toCurrency', 'To currency');
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('bad response');
        const data = await response.json();
        rates = data.rates;

        if (!rates[selected.from]) selected.from = 'USD';
        if (!rates[selected.to]) selected.to = rates['EUR'] ? 'EUR' : Object.keys(rates)[0];
        updatePickerButton(pickers.from);
        updatePickerButton(pickers.to);
        buildTicker();

        if (data.time_last_updated) {
            const d = new Date(data.time_last_updated * 1000);
            updatedLine.textContent = 'Indicative rates from ExchangeRate-API, updated daily. Latest: '
                + d.toUTCString().replace('GMT', 'UTC');
        }
        convertCurrency();
    } catch (error) {
        rateLine.textContent = 'Error loading rates. Please check your connection and try again.';
        resultValue.textContent = '—';
        tickerTrack.innerHTML = '<span class="ticker-item muted">Rates unavailable</span>';
    }
}

// ---------- events ----------
amount.addEventListener('input', convertCurrency);
amount.addEventListener('keydown', e => { if (e.key === 'Enter') convertCurrency(); });

swapButton.addEventListener('click', () => {
    const tmp = selected.from;
    selected.from = selected.to;
    selected.to = tmp;
    if (pickers.from) updatePickerButton(pickers.from);
    if (pickers.to) updatePickerButton(pickers.to);

    swapButton.classList.toggle('spun');
    panels[0].classList.remove('sliding-down');
    panels[1].classList.remove('sliding-up');
    panels[0].classList.add('sliding-up');
    panels[1].classList.add('sliding-down');
    panels.forEach(p => p.addEventListener('animationend', () => {
        p.classList.remove('sliding-up', 'sliding-down');
    }, { once: true }));

    convertCurrency();
});

loadRates();
