/** Hindi translations. */
export const hi: Record<string, string> = {
  // Common
  'common.ok': 'ठीक है',
  'common.cancel': 'रद्द करें',
  'common.close': 'बंद करें',
  'common.retry': 'पुनः प्रयास करें',
  'common.loading': 'लोड हो रहा है...',
  'common.error': 'त्रुटि',
  'common.save': 'सहेजें',
  'common.reset': 'रीसेट करें',
  'common.notAvailable': 'डेटा उपलब्ध नहीं',

  // Canonical weather conditions
  'conditions.clear': 'साफ़',
  'conditions.clear.night': 'साफ़ रात',
  'conditions.partly': 'आंशिक बादल',
  'conditions.cloudy': 'बादल छाए',
  'conditions.overcast': 'घने बादल',
  'conditions.fog': 'कोहरा',
  'conditions.drizzle': 'बूंदाबांदी',
  'conditions.rain': 'बारिश',
  'conditions.heavy-rain': 'भारी बारिश',
  'conditions.sleet': 'बर्फीली बारिश',
  'conditions.snow': 'बर्फबारी',
  'conditions.heavy-snow': 'भारी बर्फबारी',
  'conditions.hail': 'ओलावृष्टि',
  'conditions.thunder': 'आंधी-तूफ़ान',
  'conditions.thunder-rain': 'गरज के साथ बारिश',
  'conditions.windy': 'तेज़ हवा',

  // Language picker (language names are endonyms — identical in every dictionary)
  'language.title': 'भाषा',
  'language.system': 'सिस्टम',
  'language.en': 'English',
  'language.zh': '中文',
  'language.es': 'Español',
  'language.hi': 'हिन्दी',
  'language.ar': 'العربية',
  'language.fa': 'فارسی',
  'language.it': 'Italiano',
  'language.restartTitle': 'पुनः आरंभ आवश्यक',
  'language.restartMessage': 'नई लेआउट दिशा लागू करने के लिए कृपया WeatherWell को बंद करके दोबारा खोलें।',

  // Tutorial
  'tutorial.title': 'WeatherWell में आपका स्वागत है',
  'tutorial.skip': 'छोड़ें',
  'tutorial.next': 'आगे',
  'tutorial.back': 'पीछे',
  'tutorial.done': 'शुरू करें',
  'tutorial.settingsRow': 'ऐप ट्यूटोरियल',
  'tutorial.settingsRowSubtitle': 'WeatherWell का परिचय दोबारा देखें',
  'tutorial.page1.title': 'आपका मौसम, आपके अंदाज़ में',
  'tutorial.page1.body': 'WeatherWell आपके स्थान के लिए वर्तमान मौसम, प्रति घंटा और 7-दिन का पूर्वानुमान दिखाता है — विज्ञापन-मुक्त और निजता-हितैषी।',
  'tutorial.page2.title': 'स्थान खोजें और पिन करें',
  'tutorial.page2.body': 'कोई भी शहर खोजें और उसे अपने मुख्य स्थान के रूप में पिन करें। ऐप और विजेट आपके पिन किए स्थान का अनुसरण करेंगे; वर्तमान स्थान पर लौटने के लिए अनपिन करें।',
  'tutorial.page3.title': 'अपना प्रोवाइडर चुनें',
  'tutorial.page3.body': 'छह मौसम प्रोवाइडरों में से चुनें, उनकी आमने-सामने तुलना करें, या अपना कस्टम मिश्रण बनाएं — हर मेट्रिक उस प्रोवाइडर से जिस पर आपको सबसे अधिक भरोसा है।',
  'tutorial.page4.title': 'स्मार्ट फ़ीचर',
  'tutorial.page4.body': 'कपड़ों के सुझाव, छाता रिमाइंडर, वायु गुणवत्ता, खगोलीय डेटा और मौसम अलर्ट पाएं — साथ ही होम स्क्रीन विजेट भी।',
  'tutorial.page5.title': 'इसे अपना बनाएं',
  'tutorial.page5.body': 'पांच एक्सेंट रंगों में थीम, लाइट और डार्क मोड, मौसम एनिमेशन और कई भाषाएं। सब कुछ सेटिंग्स में पाएं।',

  // Settings — header
  'settings.title': 'सेटिंग्स',

  // Settings — appearance
  'settings.appearance': 'दिखावट',
  'settings.modeSystem': 'सिस्टम',
  'settings.modeLight': 'लाइट',
  'settings.modeDark': 'डार्क',
  'settings.weatherAnimations': 'मौसम एनिमेशन',
  'settings.weatherAnimationsSubtitle': 'मुख्य स्क्रीन पर बारिश, बर्फ़ और बादलों के परिवेशी प्रभाव',
  'settings.themeColor': 'थीम रंग',

  // Settings — weather data / provider
  'settings.weatherData': 'मौसम डेटा',
  'settings.weatherProvider': 'मौसम प्रोवाइडर',
  'settings.providerWeatherApiDesc': 'WeatherAPI - पूर्ण खगोलीय डेटा के साथ सबसे सटीक',
  'settings.providerOpenWeatherMapDesc': 'OpenWeatherMap - भरोसेमंद पूर्वानुमान, सीमित खगोलीय डेटा',
  'settings.providerVisualCrossingDesc': 'Visual Crossing - अच्छा डेटा, खगोलीय डेटा नहीं',
  'settings.providerOpenMeteoDesc': 'Open-Meteo - मुफ़्त, चंद्र कला डेटा नहीं',
  'settings.providerQWeatherDesc': '⚠ QWeather - सशुल्क प्लान की आवश्यकता हो सकती है',
  'settings.providerMeteostatDesc': '⚠ Meteostat - केवल ऐतिहासिक डेटा, पूर्वानुमान के लिए नहीं',
  'settings.providerCustomDesc': 'कस्टम - नीचे हर मेट्रिक के लिए प्रोवाइडर चुनें',
  'settings.providerCustom': 'कस्टम (प्रोवाइडर मिलाएं)',
  'settings.providerHint': 'WA WeatherAPI · OWM OpenWeather · VC Visual Crossing · OM Open-Meteo · QW QWeather · MS Meteostat',

  // Settings — custom source metric labels
  'settings.metricForecast': 'पूर्वानुमान (प्रति घंटा और दैनिक)',
  'settings.metricTemperature': 'तापमान',
  'settings.metricCondition': 'मौसम स्थिति',
  'settings.metricHumidity': 'आर्द्रता',
  'settings.metricWind': 'हवा',
  'settings.metricPressure': 'वायुदाब',
  'settings.metricUvIndex': 'UV इंडेक्स',
  'settings.metricVisibility': 'दृश्यता',
  'settings.metricAirQuality': 'वायु गुणवत्ता',
  'settings.metricAstronomy': 'खगोलीय डेटा',

  // Settings — units and refresh
  'settings.temperatureUnit': 'तापमान इकाई',
  'settings.refreshInterval': 'रीफ़्रेश अंतराल',
  'settings.refreshIntervalSubtitle': 'हर {minutes} मिनट में अपडेट',
  'settings.minutesShort': '{minutes}मि',

  // Settings — API keys
  'settings.weatherApiKey': 'WeatherAPI कुंजी',
  'settings.openWeatherMapKey': 'OpenWeatherMap कुंजी',
  'settings.visualCrossingKey': 'Visual Crossing कुंजी',
  'settings.qweatherKey': 'QWeather कुंजी',
  'settings.meteostatKey': 'Meteostat कुंजी (RapidAPI)',
  'settings.customKeyConfigured': 'कस्टम कुंजी कॉन्फ़िगर की गई',
  'settings.usingDefaultKey': 'डिफ़ॉल्ट कुंजी उपयोग में',
  'settings.apiKeyModalSubtitle': 'अपनी API कुंजी दर्ज करें या डेमो कुंजी के लिए खाली छोड़ें',
  'settings.apiKeyPlaceholder': 'API कुंजी दर्ज करें...',
  'settings.apiKeyUpdated': 'API कुंजी सफलतापूर्वक अपडेट हुई',

  // Settings — display options
  'settings.displayOptions': 'प्रदर्शन विकल्प',
  'settings.showFeelsLike': 'महसूस होने वाला तापमान दिखाएं',
  'settings.showHumidity': 'आर्द्रता दिखाएं',
  'settings.showPressure': 'वायुदाब दिखाएं',
  'settings.showVisibility': 'दृश्यता दिखाएं',
  'settings.showUvIndex': 'UV इंडेक्स दिखाएं',
  'settings.showWindSpeed': 'हवा की गति दिखाएं',
  'settings.showWindDirection': 'हवा की दिशा दिखाएं',
  'settings.showAirQuality': 'वायु गुणवत्ता दिखाएं',

  // Settings — notifications
  'settings.notifications': 'सूचनाएं',
  'settings.notificationNote': 'निर्धारित अलर्ट (दैनिक/प्रति घंटा) आपके चुने समय पर भेजे जाते हैं।\nडायनामिक अलर्ट आपके रीफ़्रेश अंतराल ({minutes} मिनट) के अनुसार जांच करते हैं और खतरनाक स्थितियों से पहले चेतावनी देते हैं।',
  'settings.enableNotifications': 'सूचनाएं चालू करें',
  'settings.enableNotificationsSubtitle': 'सभी निर्धारित और डायनामिक मौसम अलर्ट चालू/बंद करें',
  'settings.severeWeatherAlerts': 'गंभीर मौसम अलर्ट',
  'settings.severeWeatherAlertsSubtitle': 'आंधी-तूफ़ान, भारी बारिश, बर्फबारी और ओलावृष्टि की चेतावनी देता है',
  'settings.dailyForecast': 'दैनिक पूर्वानुमान',
  'settings.dailyForecastSubtitle': '{time} पर मौसम और सुझावों के साथ निर्धारित दैनिक सारांश',
  'settings.hourlyForecast': 'प्रति घंटा पूर्वानुमान',
  'settings.hourlyForecastSubtitle': '{time} पर बारिश और तापमान जानकारी के साथ 6 घंटे का निर्धारित पूर्वानुमान',
  'settings.temperatureAlerts': 'तापमान अलर्ट',
  'settings.temperatureAlertsSubtitle': 'तापमान {low}°C से नीचे या {high}°C से ऊपर होने पर अलर्ट',
  'settings.tempLowShort': 'न्यून:{value}°',
  'settings.tempHighShort': 'अधि:{value}°',
  'settings.uvAlerts': 'UV इंडेक्स अलर्ट',
  'settings.uvAlertsSubtitle': 'आपकी त्वचा की सुरक्षा के लिए UV इंडेक्स {value}+ होने पर चेतावनी',
  'settings.umbrellaAlerts': 'छाता अलर्ट',
  'settings.umbrellaAlertsSubtitle': 'बारिश की संभावना {value}%+ होने पर छाता ले जाने की याद दिलाता है',
  'settings.windAlerts': 'हवा अलर्ट',
  'settings.windAlertsSubtitle': 'हवा की गति {value} km/h से अधिक होने पर चेतावनी',
  'settings.aqiAlerts': 'वायु गुणवत्ता अलर्ट',
  'settings.aqiAlertsSubtitle': 'AQI {value}+ (अस्वास्थ्यकर स्तर) पहुंचने पर अलर्ट',
  'settings.percentValue': '{value}%',

  // Settings — time picker modal
  'settings.dailyForecastTimeTitle': 'दैनिक पूर्वानुमान समय',
  'settings.hourlyForecastTimeTitle': 'प्रति घंटा पूर्वानुमान समय',

  // Settings — threshold editor modal
  'settings.thresholdRain': 'बारिश सीमा (%)',
  'settings.thresholdWind': 'हवा की गति सीमा (km/h)',
  'settings.thresholdUv': 'UV इंडेक्स सीमा',
  'settings.thresholdTempHigh': 'उच्च तापमान सीमा (°C)',
  'settings.thresholdTempLow': 'निम्न तापमान सीमा (°C)',
  'settings.thresholdAqi': 'AQI सीमा',
  'settings.thresholdModalSubtitle': 'अलर्ट के लिए सीमा मान दर्ज करें',
  'settings.thresholdPlaceholder': 'मान दर्ज करें...',
  'settings.invalidValueTitle': 'अमान्य मान',
  'settings.invalidValueMessage': 'कृपया एक मान्य संख्या दर्ज करें',

  // Settings — widget
  'settings.homeScreenWidget': 'होम स्क्रीन विजेट',
  'settings.addWidget': 'होम स्क्रीन पर विजेट जोड़ें',
  'settings.addWidgetSubtitle': 'मौसम विजेट सीधे जोड़ने के लिए टैप करें',
  'settings.widgetAlertTitle': 'विजेट',
  'settings.widgetPinHint': 'विजेट जोड़ने के लिए होम स्क्रीन पर देर तक दबाएं → विजेट → WeatherWell',
  'settings.widgetOpacity': 'विजेट अपारदर्शिता',
  'settings.widgetShowFeelsLike': 'महसूस होने वाला तापमान दिखाएं',
  'settings.widgetShowFeelsLikeSubtitle': 'महसूस होने वाला तापमान प्रदर्शित करें',
  'settings.widgetShowHighLow': 'अधिकतम/न्यूनतम दिखाएं',
  'settings.widgetShowHighLowSubtitle': 'दैनिक अधिकतम और न्यूनतम तापमान प्रदर्शित करें',
  'settings.widgetShowRainChance': 'बारिश की संभावना दिखाएं',
  'settings.widgetShowRainChanceSubtitle': 'वर्षा की संभावना प्रदर्शित करें',
  'settings.widgetShowConditions': 'मौसम स्थिति दिखाएं',
  'settings.widgetShowConditionsSubtitle': 'मौसम स्थिति का टेक्स्ट प्रदर्शित करें',
  'settings.widgetShowTomorrow': 'कल का मौसम दिखाएं',
  'settings.widgetShowTomorrowSubtitle': 'कल के अधिकतम/न्यूनतम पूर्वानुमान प्रदर्शित करें',

  // Settings — privacy
  'settings.privacy': 'गोपनीयता',
  'settings.shareLocation': 'मौसम डेटा में स्थान साझा करें',
  'settings.shareLocationSubtitle': 'मौसम साझा करते समय स्थान शामिल करें',

  // Settings — advanced (backup / reset)
  'settings.advanced': 'उन्नत',
  'settings.exportBackup': 'बैकअप निर्यात करें',
  'settings.exportBackupSubtitle': 'सभी सेटिंग्स और पसंदीदा सहेजें',
  'settings.importBackup': 'बैकअप आयात करें',
  'settings.importBackupSubtitle': 'सेटिंग्स और पसंदीदा पुनर्स्थापित करें',
  'settings.resetToDefaults': 'डिफ़ॉल्ट पर रीसेट करें',
  'settings.resetToDefaultsSubtitle': 'सभी सेटिंग्स मूल मानों पर रीसेट करें',
  'settings.successTitle': 'सफल',
  'settings.resetTitle': 'सेटिंग्स रीसेट करें',
  'settings.resetConfirm': 'क्या आप वाकई सभी सेटिंग्स डिफ़ॉल्ट पर रीसेट करना चाहते हैं?',
  'settings.resetDone': 'सेटिंग्स डिफ़ॉल्ट पर रीसेट हो गईं',
  'settings.exportDialogTitle': 'WeatherWell बैकअप निर्यात करें',
  'settings.backupExported': 'बैकअप सफलतापूर्वक निर्यात हुआ',
  'settings.sharingUnavailable': 'इस डिवाइस पर साझा करना उपलब्ध नहीं है',
  'settings.exportFailed': 'बैकअप निर्यात विफल: {error}',
  'settings.unknownError': 'अज्ञात त्रुटि',
  'settings.backupRestored': 'बैकअप पुनर्स्थापित हुआ (सेटिंग्स और पसंदीदा)',
  'settings.restoreFailed': 'बैकअप से सेटिंग्स पुनर्स्थापित करने में विफल',
  'settings.settingsImported': 'सेटिंग्स सफलतापूर्वक आयात हुईं',
  'settings.invalidBackupFile': 'अमान्य बैकअप फ़ाइल',
  'settings.importFailed': 'बैकअप आयात विफल। सुनिश्चित करें कि आपने एक मान्य .weatherwell फ़ाइल चुनी है।',

  // Settings — testers
  'settings.testers': 'टेस्टर',
  'settings.testersThanks': 'आपकी बहुमूल्य प्रतिक्रिया के लिए धन्यवाद!',

  // Settings — about
  'settings.about': 'ऐप के बारे में',
  'settings.appTagline': 'विज्ञापन-मुक्त मौसम पूर्वानुमान',
  'settings.version': 'संस्करण',
  'settings.developer': 'डेवलपर',
  'settings.privacyPolicy': 'गोपनीयता नीति',
  'settings.privacyPolicySubtitle': 'कोई व्यक्तिगत डेटा एकत्र या साझा नहीं किया जाता',

  // Settings — more from SeMo Lab
  'settings.moreFromSemoLab': 'SeMo Lab से और भी',
  'settings.feedwellDesc': 'विज्ञापन-मुक्त RSS रीडर। बिना ध्यान भटकाए साफ़-सुथरा पठन।',
  'settings.ledgerwellDesc': 'व्यक्तिगत लेन-देन और उधार का हिसाब रखें, बहु-मुद्रा समर्थन।',
  'settings.allSemoLabApps': 'SeMo Lab के सभी ऐप',
  'settings.allSemoLabAppsSubtitle': 'Google Play पर हमारे सभी ऐप देखें',

  // Settings — footer
  'settings.footerText': 'WeatherWell गोपनीयता-प्रथम दृष्टिकोण के साथ सटीक मौसम पूर्वानुमान प्रदान करता है। कोई व्यक्तिगत डेटा एकत्र या साझा नहीं किया जाता।',
  'settings.copyright': '© 2026 SeMo Lab',

  // HomeScreen
  'home.loadingTitle': 'WeatherWell लोड हो रहा है...',
  'home.loadingSubtext': 'आपका स्थान और मौसम डेटा प्राप्त किया जा रहा है',
  'home.errorTitle': '⚠️ त्रुटि',
  'home.tryAgain': 'फिर से कोशिश करें',
  'home.retry': 'पुनः प्रयास करें',
  'home.noWeatherData': 'कोई मौसम डेटा उपलब्ध नहीं',
  'home.locationPermissionRequired': 'मौसम डेटा पाने के लिए स्थान की अनुमति आवश्यक है',
  'home.failedToLoad': 'मौसम डेटा लोड करने में विफल',
  'home.currentLocation': 'वर्तमान स्थान',
  'home.locationFormat': '{name}, {country}',
  'home.pinned': 'पिन किया गया',
  'home.pinAsMain': 'मुख्य के रूप में पिन करें',
  'home.useCurrentLocation': 'वर्तमान स्थान उपयोग करें',

  // SearchScreen
  'search.title': 'स्थान खोजें',
  'search.placeholder': 'शहर या स्थान खोजें...',
  'search.searching': 'स्थान खोजे जा रहे हैं...',
  'search.noResults': '"{query}" के लिए कोई स्थान नहीं मिला',
  'search.tryDifferent': 'कोई दूसरा खोज शब्द आज़माएं',
  'search.favoritePlaces': 'पसंदीदा स्थान',
  'search.recentSearches': 'हाल की खोजें',
  'search.clearAll': 'सभी हटाएं',
  'search.searchResults': 'खोज परिणाम',
  'search.popularCities': 'आपकी खोज से मेल खाते लोकप्रिय शहर',
  'search.searchAnyLocation': 'कोई भी स्थान खोजें',
  'search.startTyping': 'दुनिया भर के शहर खोजने के लिए टाइप करना शुरू करें',
  'search.regionCountry': '{region}, {country}',
  'search.clearRecentTitle': 'हाल की खोजें हटाएं',
  'search.clearRecentMessage': 'क्या आप वाकई सभी हाल की खोजें हटाना चाहते हैं?',
  'search.clear': 'हटाएं',

  // Compare
  'compare.title': 'प्रोवाइडर तुलना',
  'compare.hint': 'किसी प्रोवाइडर को अपना मौसम स्रोत बनाने के लिए उस पर टैप करें',
  'compare.inUse': 'उपयोग में',
  'compare.unavailable': 'अभी उपलब्ध नहीं',
  'compare.humidityValue': '{value}%',
  'compare.windValue': '{value} km/h',
  'compare.aqiValue': 'AQI {value}',

  // Weather — section titles
  'weather.hourlyForecast': 'प्रति घंटा पूर्वानुमान',
  'weather.dailyForecast': 'आगामी पूर्वानुमान',

  // Weather — relative day/time labels
  'weather.now': 'अभी',
  'weather.today': 'आज',
  'weather.tomorrow': 'कल',

  // Weather — current conditions card
  'weather.feelsLike': 'महसूस होता है {temp}',
  'weather.humidity': 'आर्द्रता',
  'weather.wind': 'हवा',
  'weather.uvIndex': 'UV इंडेक्स',
  'weather.pressure': 'वायुदाब',
  'weather.windDir': 'हवा की दिशा',
  'weather.visibility': 'दृश्यता',
  'weather.airQuality': 'वायु गुणवत्ता',

  // Weather — unit-bearing value formats
  'weather.percentValue': '{value}%',
  'weather.kmhValue': '{value} km/h',
  'weather.hpaValue': '{value} hPa',
  'weather.kmValue': '{value} km',
  'weather.aqiValue': 'AQI {value}',

  // SmartFeaturesCard — sections and cards
  'smart.recommendations': 'सुझाव',
  'smart.umbrellaAlert': 'छाता अलर्ट',
  'smart.umbrellaChance': 'अगले 24 घंटों में {percent}% तक बारिश की संभावना',
  'smart.clothingSuggestion': 'कपड़ों का सुझाव',
  'smart.tempFeelsLike': '{temp}°C, महसूस होता है {feels}°C',
  'smart.uvProtection': 'UV सुरक्षा',
  'smart.uvIndexLabel': 'UV इंडेक्स: {value}',
  'smart.airQuality': 'वायु गुणवत्ता',
  'smart.aqiPmDetail': 'AQI: {aqi} • PM2.5: {pm25}μg/m³',
  'smart.na': 'उपलब्ध नहीं',

  // SmartFeaturesCard — umbrella advice
  'smart.umbrella.definitely': 'छाता ज़रूर साथ ले जाएं!',
  'smart.umbrella.consider': 'छाता साथ रखने पर विचार करें',
  'smart.umbrella.none': 'आज छाते की ज़रूरत नहीं',

  // SmartFeaturesCard — clothing suggestions
  'smart.clothing.winter': 'भारी सर्दियों का कोट, मफ़लर, दस्ताने',
  'smart.clothing.jacket': 'जैकेट या गर्म स्वेटर',
  'smart.clothing.sweater': 'हल्का स्वेटर या पूरी बाजू के कपड़े',
  'smart.clothing.tshirt': 'टी-शर्ट या हल्के कपड़े',

  // SmartFeaturesCard — UV advice
  'smart.uv.high': 'धूप का चश्मा और SPF 30+ सनस्क्रीन लगाएं',
  'smart.uv.medium': 'धूप का चश्मा और सनस्क्रीन पर विचार करें',
  'smart.uv.light': 'हल्की धूप सुरक्षा की सलाह',
  'smart.uv.none': 'धूप से सुरक्षा की ज़रूरत नहीं',

  // SmartFeaturesCard — mask advice
  'smart.mask.wear': 'बाहर मास्क पहनें',
  'smart.mask.consider': 'मास्क पहनने पर विचार करें',
  'smart.mask.none': 'मास्क की ज़रूरत नहीं',

  // SmartFeaturesCard — air quality levels
  'smart.air.good': 'वायु गुणवत्ता अच्छी है',
  'smart.air.moderate': 'मध्यम वायु गुणवत्ता',
  'smart.air.sensitive': 'संवेदनशील लोगों के लिए अस्वास्थ्यकर',
  'smart.air.unhealthy': 'अस्वास्थ्यकर वायु गुणवत्ता',

  // SmartFeaturesCard — hourly detail modals
  'smart.dailyAirQuality': 'दैनिक वायु गुणवत्ता',
  'smart.aqiValue': 'AQI {value}',
  'smart.hourlyRain': 'प्रति घंटा बारिश पूर्वानुमान',
  'smart.hourlyTemperature': 'प्रति घंटा तापमान',
  'smart.hourlyUvIndex': 'प्रति घंटा UV इंडेक्स',
  'smart.now': 'अभी',
  'smart.tempC': '{temp}°C',
  'smart.uvValue': 'UV {value}',
  'smart.uvLevel.veryHigh': 'बहुत अधिक',
  'smart.uvLevel.high': 'अधिक',
  'smart.uvLevel.moderate': 'मध्यम',
  'smart.uvLevel.low': 'कम',

  // SmartFeaturesCard — astronomy
  'smart.astronomy': 'खगोलीय जानकारी',
  'smart.sunTimes': 'सूर्य समय',
  'smart.sunriseSunset': 'सूर्योदय: {sunrise} • सूर्यास्त: {sunset}',
  'smart.daylightLabel': 'दिन की रोशनी: {duration}',
  'smart.daylightDuration': '{hours}घं {minutes}मि',
  'smart.dailySunTimes': 'दैनिक सूर्य समय',
  'smart.moonPhases': 'चंद्र कलाएं',
  'smart.moonPhase': 'चंद्र कला',
  'smart.illumination': 'प्रकाश: {percent}%',
  'smart.illuminationUnavailable': 'प्रकाश: डेटा उपलब्ध नहीं',
  'smart.illuminatedPercent': '{percent}% प्रकाशित',

  // SmartFeaturesCard — moon phase names
  'smart.moon.newMoon': 'अमावस्या',
  'smart.moon.waxingCrescent': 'बढ़ता अर्धचंद्र',
  'smart.moon.firstQuarter': 'प्रथम चतुर्थांश',
  'smart.moon.waxingGibbous': 'बढ़ता उत्तल चंद्र',
  'smart.moon.fullMoon': 'पूर्णिमा',
  'smart.moon.waningGibbous': 'घटता उत्तल चंद्र',
  'smart.moon.lastQuarter': 'अंतिम चतुर्थांश',
  'smart.moon.waningCrescent': 'घटता अर्धचंद्र',

  // WeatherDetailModal — titles
  'detail.title.humidity': 'आर्द्रता रुझान',
  'detail.title.wind': 'हवा की गति के रुझान',
  'detail.title.uv': 'UV इंडेक्स रुझान',
  'detail.title.pressure': 'वायुमंडलीय दाब',
  'detail.title.windDir': 'हवा की दिशा',
  'detail.title.visibility': 'दृश्यता रुझान',
  'detail.title.airquality': 'वायु गुणवत्ता सूचकांक',
  'detail.title.default': 'मौसम विवरण',

  // WeatherDetailModal — descriptions
  'detail.desc.humidity': 'अगले 12 घंटों में सापेक्ष आर्द्रता का स्तर। अधिक मान का अर्थ है हवा में अधिक नमी।',
  'detail.desc.wind': 'दिन भर हवा की गति में बदलाव। बाहरी गतिविधियों की योजना बनाने में मदद करता है।',
  'detail.desc.uv': 'धूप की तीव्रता दर्शाने वाला UV इंडेक्स पूर्वानुमान। मान 3 से ऊपर होने पर धूप से सुरक्षा अपनाएं।',
  'detail.desc.pressure': 'वायुमंडलीय दाब में बदलाव मौसम के मिज़ाज में परिवर्तन का संकेत दे सकते हैं।',
  'detail.desc.windDir': 'कम्पास दृश्य के साथ वर्तमान हवा की दिशा और गति।',
  'detail.desc.visibility': 'दृश्यता की स्थिति ड्राइविंग, बाहरी गतिविधियों और उड़ान सुरक्षा को प्रभावित करती है। साफ़ दृश्यता अच्छे मौसम का संकेत है।',
  'detail.desc.airquality': 'वायु गुणवत्ता सूचकांक वायु प्रदूषण के स्तर को मापता है। कम मान का अर्थ है बेहतर वायु गुणवत्ता।',

  // WeatherDetailModal — current values
  'detail.windDirAt': '{direction} से {speed} km/h',
  'detail.na': 'उपलब्ध नहीं',

  // WeatherDetailModal — health tips
  'detail.tipTitle': 'सुझाव',
  'detail.tip.humidityHigh': 'उच्च आर्द्रता - पानी पीते रहें और ठंडक में रहें',
  'detail.tip.humidityLow': 'कम आर्द्रता - मॉइस्चराइज़र लगाएं और पानी पिएं',
  'detail.tip.humidityComfort': 'आरामदायक आर्द्रता स्तर',
  'detail.tip.windStrong': 'तेज़ हवाएं - ढीली चीज़ें सुरक्षित करें',
  'detail.tip.windModerate': 'मध्यम हवाएं - बाहरी गतिविधियों के लिए अच्छी',
  'detail.tip.windLight': 'हल्की हवाएं - किसी भी बाहरी योजना के लिए बढ़िया',
  'detail.tip.uvVeryHigh': 'बहुत अधिक UV - SPF 30+ सनस्क्रीन लगाएं',
  'detail.tip.uvHigh': 'अधिक UV - धूप से सुरक्षा पर विचार करें',
  'detail.tip.uvModerate': 'मध्यम UV - हल्की सुरक्षा की सलाह',
  'detail.tip.uvLow': 'कम UV - न्यूनतम सुरक्षा पर्याप्त',
  'detail.tip.pressureHigh': 'उच्च दाब - स्थिर मौसम की उम्मीद',
  'detail.tip.pressureLow': 'निम्न दाब - मौसम में बदलाव संभव',
  'detail.tip.pressureNormal': 'सामान्य दाब - स्थिर परिस्थितियां',
  'detail.tip.windDir': 'हवा {direction} दिशा से आ रही है',
  'detail.tip.visibilityExcellent': 'उत्कृष्ट दृश्यता - सभी गतिविधियों के लिए बढ़िया',
  'detail.tip.visibilityGood': 'अच्छी दृश्यता - ड्राइविंग और बाहरी गतिविधियों के लिए सुरक्षित',
  'detail.tip.visibilityReduced': 'घटी हुई दृश्यता - सावधानी से गाड़ी चलाएं, हेडलाइट जलाएं',
  'detail.tip.visibilityPoor': 'खराब दृश्यता - अनावश्यक यात्रा से बचें, अत्यधिक सावधानी बरतें',
  'detail.tip.aqiGood': 'अच्छी वायु गुणवत्ता - बाहरी गतिविधियों के लिए सुरक्षित',
  'detail.tip.aqiModerate': 'मध्यम - अधिकांश लोगों के लिए स्वीकार्य',
  'detail.tip.aqiSensitive': 'संवेदनशील समूहों के लिए अस्वास्थ्यकर - लंबी बाहरी गतिविधियां सीमित करें',
  'detail.tip.aqiUnhealthy': 'अस्वास्थ्यकर - सभी को बाहरी गतिविधियां सीमित करनी चाहिए',
  'detail.tip.aqiVeryUnhealthy': 'बहुत अस्वास्थ्यकर - बाहरी गतिविधियों से बचें',

  // WeatherDetailModal — insight cards
  'detail.insight.humidityTitle': '🌡️ आर्द्रता आराम गाइड',
  'detail.insight.humidityBody':
    '• 30% से कम: बहुत शुष्क - त्वचा/गले में जलन हो सकती है\n' +
    '• 30-50%: आदर्श आराम क्षेत्र - उत्तम स्थितियां\n' +
    '• 50-65%: अधिकांश लोगों के लिए आरामदायक\n' +
    '• 65-75%: हल्की नमी - गर्मी महसूस हो सकती है\n' +
    '• 75% से अधिक: बहुत आर्द्र - उमस और चिपचिपाहट महसूस होती है',
  'detail.insight.windTitle': 'हवा की गति गाइड',
  'detail.insight.windBody':
    '• 0-5 km/h: शांत - धुआं सीधा ऊपर उठता है\n' +
    '• 6-11 km/h: हल्की हवा - पत्तियां धीरे-धीरे हिलती हैं\n' +
    '• 12-19 km/h: हल्की बयार - बाहरी गतिविधियों के लिए बढ़िया\n' +
    '• 20-28 km/h: मंद बयार - टहनियां हिलती हैं, झंडे फहराते हैं\n' +
    '• 29-38 km/h: मध्यम बयार - छोटे पेड़ झूमते हैं\n' +
    '• 39-49 km/h: ताज़ा बयार - बड़ी शाखाएं हिलती हैं\n' +
    '• 50-61 km/h: तेज़ बयार - छाता संभालना मुश्किल\n' +
    '• 62+ km/h: प्रचंड हवा - बाहरी गतिविधियों से बचें',
  'detail.insight.uvTitle': '☀️ UV इंडेक्स गाइड',
  'detail.insight.uvBody':
    '• 0-2: कम - सुरक्षा की ज़रूरत नहीं\n' +
    '• 3-5: मध्यम - दोपहर में छाया में रहें\n' +
    '• 6-7: अधिक - सुरक्षा आवश्यक\n' +
    '• 8-10: बहुत अधिक - अतिरिक्त सुरक्षा ज़रूरी\n' +
    '• 11+: चरम - धूप में जाने से बचें',
  'detail.insight.pressureTitle': 'दाब रुझान',
  'detail.insight.pressureBody':
    '• बढ़ता दाब: अच्छे मौसम की उम्मीद\n' +
    '• गिरता दाब: तूफ़ान संभव\n' +
    '• स्थिर दाब: एक-सा मौसम\n' +
    '• सामान्य सीमा: 1000-1020 hPa',
  'detail.insight.visibilityTitle': '👁️ दृश्यता गाइड',
  'detail.insight.visibilityBody':
    '• 10+ km: उत्कृष्ट - सभी गतिविधियों के लिए बढ़िया\n' +
    '• 5-10 km: अच्छी - सुरक्षित ड्राइविंग स्थितियां\n' +
    '• 2-5 km: मध्यम - सावधानी बरतें, हेडलाइट जलाएं\n' +
    '• 1-2 km: खराब - खतरनाक ड्राइविंग स्थितियां\n' +
    '• <1 km: बहुत खराब - संभव हो तो यात्रा से बचें',
  'detail.insight.airTitle': '🌫️ वायु गुणवत्ता विवरण',
  'detail.air.currentAqi': 'वर्तमान AQI: {value}',
  'detail.air.pollutantValue': '{name}: {value} μg/m³',
  'detail.air.scaleTitle': 'AQI पैमाना:',
  'detail.air.scaleBody':
    '• 0-50: अच्छा - वायु गुणवत्ता संतोषजनक है\n' +
    '• 51-100: मध्यम - अधिकांश के लिए स्वीकार्य\n' +
    '• 101-150: संवेदनशील समूहों के लिए अस्वास्थ्यकर\n' +
    '• 151-200: अस्वास्थ्यकर - सभी पर असर पड़ सकता है\n' +
    '• 201-300: बहुत अस्वास्थ्यकर - स्वास्थ्य चेतावनी\n' +
    '• 301+: खतरनाक - आपातकालीन स्थितियां',

  // RealCompass
  'compass.title': 'कम्पास',
  'compass.windLabel': 'हवा: {direction}',
  'compass.deviceHeading': 'डिवाइस दिशा: {value}°',
  'compass.instruction': 'सर्वोत्तम सटीकता के लिए: फ़ोन को सपाट पकड़ें, धातु की चीज़ों से दूर रखें, और कैलिब्रेट करने के लिए 8 के आकार में घुमाएं',

  // RealCompass — calibration status
  'compass.status.initializing': 'आरंभ हो रहा है...',
  'compass.status.noSensorsStatic': 'सेंसर उपलब्ध नहीं - स्थिर कम्पास दिखाया जा रहा है',
  'compass.status.calibratingDevice': 'डिवाइस सेंसर कैलिब्रेट हो रहे हैं...',
  'compass.status.calibratedDevice': '✓ कैलिब्रेटेड - वास्तविक कम्पास सक्रिय',
  'compass.status.calibratingMagnetometer': 'मैग्नेटोमीटर कैलिब्रेट हो रहा है...',
  'compass.status.calibratedMagnetometer': '✓ कैलिब्रेटेड - मैग्नेटोमीटर सक्रिय',
  'compass.status.noSensors': '⚠️ कोई सेंसर उपलब्ध नहीं - स्थिर कम्पास',
  'compass.status.sensorError': '⚠️ सेंसर त्रुटि - स्थिर कम्पास',

  // RealCompass — heading accuracy
  'compass.accuracy.high': '● उच्च सटीकता',
  'compass.accuracy.medium': '● मध्यम सटीकता',
  'compass.accuracy.low': '● कम सटीकता - धातु की चीज़ों से दूर जाएं',

  // RealCompass — cardinal directions (16-wind)
  'compass.dir.n': 'उ',
  'compass.dir.nne': 'उ-उपू',
  'compass.dir.ne': 'उपू',
  'compass.dir.ene': 'पू-उपू',
  'compass.dir.e': 'पू',
  'compass.dir.ese': 'पू-दपू',
  'compass.dir.se': 'दपू',
  'compass.dir.sse': 'द-दपू',
  'compass.dir.s': 'द',
  'compass.dir.ssw': 'द-दप',
  'compass.dir.sw': 'दप',
  'compass.dir.wsw': 'प-दप',
  'compass.dir.w': 'प',
  'compass.dir.wnw': 'प-उप',
  'compass.dir.nw': 'उप',
  'compass.dir.nnw': 'उ-उप',

  // Share — fallback location name
  'share.currentLocation': 'वर्तमान स्थान',

  // Share — buttons
  'share.quickShare': 'त्वरित साझा',
  'share.customizeShare': 'साझाकरण अनुकूलित करें',
  'share.shareButton': 'मौसम रिपोर्ट साझा करें',

  // Share — options modal
  'share.optionsTitle': 'साझा विकल्प',
  'share.contentSection': 'शामिल करने योग्य सामग्री',
  'share.detailsSection': 'मौसम विवरण',
  'share.option.location': 'स्थान',
  'share.option.locationSubtitle': 'साझा मौसम में स्थान का नाम शामिल करें',
  'share.option.current': 'वर्तमान मौसम',
  'share.option.currentSubtitle': 'तापमान और वर्तमान स्थितियां',
  'share.option.hourly': 'प्रति घंटा पूर्वानुमान',
  'share.option.hourlySubtitle': 'अगले 12 घंटों का पूर्वानुमान',
  'share.option.daily': 'दैनिक पूर्वानुमान',
  'share.option.dailySubtitle': '7 दिनों का मौसम पूर्वानुमान',
  'share.option.astronomy': 'खगोलीय जानकारी',
  'share.option.astronomySubtitle': 'सूर्योदय, सूर्यास्त और चंद्र कला',
  'share.option.feelsLike': 'महसूस होने वाला तापमान',
  'share.option.humidity': 'आर्द्रता',
  'share.option.pressure': 'वायुमंडलीय दाब',
  'share.option.visibility': 'दृश्यता',
  'share.option.uv': 'UV इंडेक्स',
  'share.option.wind': 'हवा की जानकारी',

  // Share — share sheet title and errors
  'share.shareTitle': 'मौसम रिपोर्ट - {location}',
  'share.errorTitle': 'साझा करने में त्रुटि',
  'share.errorMessage': 'मौसम डेटा साझा करने में विफल',

  // Share — generated share text
  'share.text.header': 'मौसम रिपोर्ट',
  'share.text.location': 'स्थान: {location}',
  'share.text.currentWeather': 'वर्तमान मौसम:',
  'share.text.temperature': 'तापमान: {temp}',
  'share.text.feelsLike': '(महसूस होता है {temp})',
  'share.text.condition': 'स्थिति: {condition}',
  'share.text.humidity': 'आर्द्रता: {humidity}%',
  'share.text.pressure': 'वायुदाब: {pressure} hPa',
  'share.text.visibility': 'दृश्यता: {visibility} km',
  'share.text.uvIndex': 'UV इंडेक्स: {uvIndex}',
  'share.text.wind': 'हवा: {speed} km/h {direction}',
  'share.text.next12Hours': 'अगले 12 घंटे:',
  'share.text.nextHours': 'अगले घंटे:',
  'share.text.hourLine': '{time}: {temp} - {condition}',
  'share.text.dailyForecast': 'आगामी पूर्वानुमान:',
  'share.text.dayLine': '{day}: {max}/{min} - {condition}',
  'share.text.rainChance': '({chance}% बारिश)',
  'share.text.astronomy': 'खगोलीय जानकारी:',
  'share.text.sunrise': 'सूर्योदय: {time}',
  'share.text.sunset': 'सूर्यास्त: {time}',
  'share.text.moon': 'चंद्रमा: {phase}',
  'share.text.moonIllumination': '({percent}% प्रकाशित)',
  'share.text.footer': 'WeatherWell से साझा किया गया',

  // Share — temperature formats
  'share.text.tempC': '{temp}°C',
  'share.text.tempF': '{temp}°F',

  // Notifications — Android notification channels
  'notif.channel.weatherAlerts': 'मौसम अलर्ट',
  'notif.channel.dailyForecast': 'दैनिक पूर्वानुमान',

  // Notifications — time-of-day markers
  'notif.time.am': 'AM',
  'notif.time.pm': 'PM',

  // Notifications — daily forecast
  'notif.daily.title': '📅 दैनिक मौसम पूर्वानुमान',
  'notif.daily.fallbackTitle': '🌤️ दैनिक मौसम पूर्वानुमान',
  'notif.daily.fallbackBody': 'आज का पूरा पूर्वानुमान देखने के लिए WeatherWell खोलें।',
  'notif.daily.today': 'आज: {high}°/{low}°, {condition}',
  'notif.daily.tomorrow': 'कल: {high}°/{low}°, {condition}',
  'notif.daily.rainChance': '🌧️ {chance}% बारिश',
  'notif.daily.highUv': '☀️ अधिक UV ({uv})',
  'notif.daily.strongWind': '💨 तेज़ हवा {speed} km/h',
  'notif.daily.heavyRain': '🌊 भारी बारिश {mm}mm',

  // Notifications — hourly forecast
  'notif.hourly.title': '⏰ अगले घंटों का मौसम',
  'notif.hourly.updateTitle': '⏰ प्रति घंटा मौसम अपडेट',
  'notif.hourly.fallbackBody': 'अगले कुछ घंटों का पूर्वानुमान देखने के लिए WeatherWell खोलें।',
  'notif.hourly.rainAt': '🌧️ {times} पर बारिश',
  'notif.hourly.windUpTo': '💨 हवा {speed} km/h तक',

  // Notifications — umbrella / rain alerts
  'notif.umbrella.title': '☂️ छाता अलर्ट',
  'notif.umbrella.body': 'आगे {chance}% बारिश की संभावना। छाता ले जाना न भूलें!',
  'notif.umbrella.upcomingBody': '{time} के आसपास {chance}% बारिश की संभावना। छाता ले जाना न भूलें!',

  // Notifications — wind alerts
  'notif.wind.title': '💨 तेज़ हवा अलर्ट',
  'notif.wind.body': 'हवा की गति {speed} km/h है। बाहर जाते समय सावधानी बरतें।',
  'notif.wind.expectedTitle': '💨 तेज़ हवा की संभावना',
  'notif.wind.expectedBody': '{time} के आसपास {speed} km/h तक की हवाएं संभावित।',

  // Notifications — UV alerts
  'notif.uv.title': '☀️ अधिक UV अलर्ट',
  'notif.uv.body': 'UV इंडेक्स {uv} है - सनस्क्रीन और सुरक्षात्मक कपड़े पहनें!',
  'notif.uv.indexTitle': '☀️ UV इंडेक्स अलर्ट',
  'notif.uv.indexBody': 'UV इंडेक्स {uv} ({level}) है। सनस्क्रीन और सुरक्षात्मक कपड़े पहनें!',
  'notif.uv.expectedTitle': '☀️ अधिक UV की संभावना',
  'notif.uv.expectedBody': '{time} के आसपास UV इंडेक्स {uv} रहने की संभावना। सनस्क्रीन लगाएं!',
  'notif.uvLevel.extreme': 'चरम',
  'notif.uvLevel.veryHigh': 'बहुत अधिक',
  'notif.uvLevel.high': 'अधिक',

  // Notifications — temperature alerts
  'notif.temp.highTitle': '🔥 तापमान उच्च सीमा अलर्ट',
  'notif.temp.lowTitle': '🥶 तापमान निम्न सीमा अलर्ट',
  'notif.temp.highBody': 'तापमान {temp}°C है, आपकी {threshold}°C सीमा से ऊपर',
  'notif.temp.lowBody': 'तापमान {temp}°C है, आपकी {threshold}°C सीमा से नीचे',
  'notif.temp.highAlertTitle': '🔥 उच्च तापमान अलर्ट',
  'notif.temp.highAlertBody': 'तापमान {temp}°C है। पानी पीते रहें और लंबे समय तक धूप में रहने से बचें।',
  'notif.temp.lowAlertTitle': '❄️ निम्न तापमान अलर्ट',
  'notif.temp.lowAlertBody': 'तापमान {temp}°C है। गर्म कपड़े पहनें और खुद को गर्म रखें!',
  'notif.temp.aheadHighTitle': '🔥 आगे उच्च तापमान',
  'notif.temp.aheadHighBody': '{time} के आसपास {temp}°C की संभावना। पानी पीते रहें!',
  'notif.temp.aheadLowTitle': '❄️ आगे ठंडा तापमान',
  'notif.temp.aheadLowBody': '{time} के आसपास {temp}°C की संभावना। गर्म कपड़े पहनें!',

  // Notifications — air quality alerts
  'notif.aqi.title': '🌫️ वायु गुणवत्ता अलर्ट',
  'notif.aqi.body': 'AQI {aqi} ({level}) है। बाहरी गतिविधियां सीमित करने पर विचार करें।',
  'notif.aqiLevel.hazardous': 'खतरनाक',
  'notif.aqiLevel.veryUnhealthy': 'बहुत अस्वास्थ्यकर',
  'notif.aqiLevel.unhealthy': 'अस्वास्थ्यकर',
  'notif.aqiLevel.sensitive': 'संवेदनशील समूहों के लिए अस्वास्थ्यकर',

  // Notifications — severe weather alerts
  'notif.severe.title': '🚨 {type} अलर्ट',
  'notif.severe.windDetected': '💨 तेज़ हवाएं दर्ज: {speed} km/h। बाहर जाते समय सावधानी बरतें।',
  'notif.severe.conditionsDetected': '{emoji} {location} में {type} की स्थिति दर्ज। सुरक्षित रहें!',
  'notif.severe.bgTitle': '{emoji} गंभीर मौसम: {type}',
  'notif.severe.bgBody': 'आपके क्षेत्र में {type} दर्ज। आवश्यक सावधानियां बरतें।',
  'notif.severe.expectedTitle': '{emoji} जल्द {type} की संभावना',
  'notif.severe.expectedBody': '{time} के आसपास {type} का पूर्वानुमान। सावधानी बरतें।',
  'notif.severeType.thunderstorm': 'आंधी-तूफ़ान',
  'notif.severeType.heavyRain': 'भारी बारिश',
  'notif.severeType.snow': 'बर्फबारी',
  'notif.severeType.hail': 'ओलावृष्टि',
  'notif.severeType.fog': 'कोहरा',
  'notif.severeType.strongWind': 'तेज़ हवा',

  // Widget
  'widget.openAppToLoad': 'मौसम लोड करने के लिए ऐप खोलें',
  'widget.feels': 'महसूस {value}',
  'widget.high': 'अधि: {value}',
  'widget.low': 'न्यून: {value}',
  'widget.tapToOpen': 'WeatherWell खोलने के लिए टैप करें',
  'widget.tomorrow': 'कल',
  'widget.tomorrowCondition': 'कल: {condition}',
};
