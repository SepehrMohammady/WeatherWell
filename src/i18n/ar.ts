/** Arabic translations. */
export const ar: Record<string, string> = {
  // Common
  'common.ok': 'حسناً',
  'common.cancel': 'إلغاء',
  'common.close': 'إغلاق',
  'common.retry': 'إعادة المحاولة',
  'common.loading': 'جارٍ التحميل...',
  'common.error': 'خطأ',
  'common.save': 'حفظ',
  'common.reset': 'إعادة تعيين',
  'common.notAvailable': 'البيانات غير متوفرة',

  // Canonical weather conditions
  'conditions.clear': 'صحو',
  'conditions.clear.night': 'ليلة صافية',
  'conditions.partly': 'غائم جزئياً',
  'conditions.cloudy': 'غائم',
  'conditions.overcast': 'ملبد بالغيوم',
  'conditions.fog': 'ضباب',
  'conditions.drizzle': 'رذاذ',
  'conditions.rain': 'مطر',
  'conditions.heavy-rain': 'أمطار غزيرة',
  'conditions.sleet': 'مطر ثلجي',
  'conditions.snow': 'ثلج',
  'conditions.heavy-snow': 'ثلوج كثيفة',
  'conditions.hail': 'بَرَد',
  'conditions.thunder': 'عاصفة رعدية',
  'conditions.thunder-rain': 'عاصفة رعدية ممطرة',
  'conditions.windy': 'عاصف',

  // Language picker (language names are endonyms — identical in every dictionary)
  'language.title': 'اللغة',
  'language.system': 'لغة النظام',
  'language.en': 'English',
  'language.zh': '中文',
  'language.es': 'Español',
  'language.hi': 'हिन्दी',
  'language.ar': 'العربية',
  'language.fa': 'فارسی',
  'language.it': 'Italiano',
  'language.restartTitle': 'إعادة التشغيل مطلوبة',
  'language.restartMessage': 'يرجى إغلاق WeatherWell وإعادة فتحه لتطبيق اتجاه الواجهة الجديد.',

  // Tutorial
  'tutorial.title': 'مرحباً بك في WeatherWell',
  'tutorial.skip': 'تخطي',
  'tutorial.next': 'التالي',
  'tutorial.back': 'السابق',
  'tutorial.done': 'ابدأ الآن',
  'tutorial.sectionTitle': 'الجولة التعريفية',
  'tutorial.settingsRow': 'جولة تعريفية بالتطبيق',
  'tutorial.settingsRowSubtitle': 'إعادة عرض المقدمة التعريفية بتطبيق WeatherWell',
  'tutorial.page1.title': 'طقسك، على طريقتك',
  'tutorial.page1.body': 'يعرض WeatherWell الأحوال الجوية الحالية والتوقعات بالساعة ولسبعة أيام لموقعك — بلا إعلانات ومع احترام خصوصيتك.',
  'tutorial.page2.title': 'ابحث عن المواقع وثبّتها',
  'tutorial.page2.body': 'ابحث عن أي مدينة وثبّتها كموقعك الرئيسي. سيتبع التطبيق والأداة الموقع المثبّت؛ ألغِ التثبيت للعودة إلى موقعك الحالي.',
  'tutorial.page3.title': 'اختر مزوّد البيانات',
  'tutorial.page3.body': 'اختر من بين ستة مزوّدي طقس، أو قارن بينهم جنباً إلى جنب، أو كوّن مزيجاً مخصصاً — كل مقياس من المزوّد الذي تثق به أكثر.',
  'tutorial.page4.title': 'ميزات ذكية',
  'tutorial.page4.body': 'احصل على اقتراحات الملابس وتذكيرات المظلة وجودة الهواء والبيانات الفلكية وتنبيهات الطقس — إضافةً إلى أداة للشاشة الرئيسية.',
  'tutorial.page5.title': 'خصّصه كما تشاء',
  'tutorial.page5.body': 'سمات بخمسة ألوان مميزة، ووضعان فاتح وداكن، ومؤثرات طقس متحركة، ولغات متعددة. ستجد كل ذلك في الإعدادات.',

  // Settings — header
  'settings.title': 'الإعدادات',

  // Settings — appearance
  'settings.appearance': 'المظهر',
  'settings.modeSystem': 'النظام',
  'settings.modeLight': 'فاتح',
  'settings.modeDark': 'داكن',
  'settings.weatherAnimations': 'مؤثرات الطقس المتحركة',
  'settings.weatherAnimationsSubtitle': 'مؤثرات المطر والثلج والغيوم على الشاشة الرئيسية',
  'settings.themeColor': 'لون السمة',

  // Settings — weather data / provider
  'settings.weatherData': 'بيانات الطقس',
  'settings.weatherProvider': 'مزوّد بيانات الطقس',
  'settings.providerWeatherApiDesc': 'WeatherAPI - الأكثر دقة مع بيانات فلكية كاملة',
  'settings.providerOpenWeatherMapDesc': 'OpenWeatherMap - توقعات موثوقة، بيانات فلكية محدودة',
  'settings.providerVisualCrossingDesc': 'Visual Crossing - بيانات جيدة، بلا بيانات فلكية',
  'settings.providerOpenMeteoDesc': 'Open-Meteo - مجاني، بلا بيانات لأطوار القمر',
  'settings.providerQWeatherDesc': '⚠ QWeather - قد يتطلب اشتراكاً مدفوعاً',
  'settings.providerMeteostatDesc': '⚠ Meteostat - بيانات تاريخية فقط، غير مناسب للتوقعات',
  'settings.providerCustomDesc': 'مخصص - اختر مزوّداً لكل مقياس أدناه',
  'settings.providerCustom': 'مخصص (مزيج من المزوّدين)',
  'settings.providerHint': 'WA WeatherAPI · OW OpenWeather · VC Visual Crossing · OM Open-Meteo · QW QWeather · MS Meteostat',

  // Settings — custom source metric labels
  'settings.metricForecast': 'التوقعات (بالساعة واليومية)',
  'settings.metricTemperature': 'درجة الحرارة',
  'settings.metricCondition': 'الحالة الجوية',
  'settings.metricHumidity': 'الرطوبة',
  'settings.metricWind': 'الرياح',
  'settings.metricPressure': 'الضغط الجوي',
  'settings.metricUvIndex': 'مؤشر الأشعة فوق البنفسجية',
  'settings.metricVisibility': 'مدى الرؤية',
  'settings.metricAirQuality': 'جودة الهواء',
  'settings.metricAstronomy': 'البيانات الفلكية',

  // Settings — units and refresh
  'settings.temperatureUnit': 'وحدة درجة الحرارة',
  'settings.refreshInterval': 'فترة التحديث',
  'settings.refreshIntervalSubtitle': 'تحديث كل {minutes} دقيقة',
  'settings.minutesShort': '{minutes} د',

  // Settings — API keys
  'settings.weatherApiKey': 'مفتاح WeatherAPI',
  'settings.openWeatherMapKey': 'مفتاح OpenWeatherMap',
  'settings.visualCrossingKey': 'مفتاح Visual Crossing',
  'settings.qweatherKey': 'مفتاح QWeather',
  'settings.meteostatKey': 'مفتاح Meteostat (RapidAPI)',
  'settings.customKeyConfigured': 'تم تعيين مفتاح مخصص',
  'settings.usingDefaultKey': 'يُستخدم المفتاح الافتراضي',
  'settings.apiKeyModalSubtitle': 'أدخل مفتاح API الخاص بك أو اتركه فارغاً لاستخدام المفتاح التجريبي',
  'settings.apiKeyPlaceholder': 'أدخل مفتاح API...',
  'settings.apiKeyUpdated': 'تم تحديث مفتاح API بنجاح',

  // Settings — display options
  'settings.displayOptions': 'خيارات العرض',
  'settings.showFeelsLike': 'عرض درجة الحرارة المحسوسة',
  'settings.showHumidity': 'عرض الرطوبة',
  'settings.showPressure': 'عرض الضغط الجوي',
  'settings.showVisibility': 'عرض مدى الرؤية',
  'settings.showUvIndex': 'عرض مؤشر الأشعة فوق البنفسجية',
  'settings.showWindSpeed': 'عرض سرعة الرياح',
  'settings.showWindDirection': 'عرض اتجاه الرياح',
  'settings.showAirQuality': 'عرض جودة الهواء',

  // Settings — notifications
  'settings.notifications': 'الإشعارات',
  'settings.notificationNote': 'التنبيهات المجدولة (اليومية/بالساعة) تصدر في الوقت الذي تحدده.\nأما التنبيهات الديناميكية فتُفحص وفق فترة التحديث ({minutes} دقيقة) وتحذّرك قبل الأحوال الخطرة.',
  'settings.enableNotifications': 'تفعيل الإشعارات',
  'settings.enableNotificationsSubtitle': 'تشغيل/إيقاف جميع تنبيهات الطقس المجدولة والديناميكية',
  'settings.severeWeatherAlerts': 'تنبيهات الطقس القاسي',
  'settings.severeWeatherAlertsSubtitle': 'يحذّر من العواصف الرعدية والأمطار الغزيرة والثلوج والبَرَد',
  'settings.dailyForecast': 'التوقعات اليومية',
  'settings.dailyForecastSubtitle': 'ملخص يومي مجدول في {time} مع الأحوال الجوية والنصائح',
  'settings.hourlyForecast': 'التوقعات بالساعة',
  'settings.hourlyForecastSubtitle': 'توقعات الساعات الست القادمة في {time} مع معلومات المطر والحرارة',
  'settings.temperatureAlerts': 'تنبيهات درجة الحرارة',
  'settings.temperatureAlertsSubtitle': 'تنبيهات عند انخفاض الحرارة دون {low}°C أو تجاوزها {high}°C',
  'settings.tempLowShort': 'ص:{value}°',
  'settings.tempHighShort': 'ع:{value}°',
  'settings.uvAlerts': 'تنبيهات الأشعة فوق البنفسجية',
  'settings.uvAlertsSubtitle': 'يحذّرك عندما يبلغ مؤشر الأشعة فوق البنفسجية {value}+ لحماية بشرتك',
  'settings.umbrellaAlerts': 'تنبيهات المظلة',
  'settings.umbrellaAlertsSubtitle': 'يذكّرك بحمل المظلة عندما يبلغ احتمال المطر {value}% أو أكثر',
  'settings.windAlerts': 'تنبيهات الرياح',
  'settings.windAlertsSubtitle': 'يحذّر عندما تتجاوز سرعة الرياح {value} كم/س',
  'settings.aqiAlerts': 'تنبيهات جودة الهواء',
  'settings.aqiAlertsSubtitle': 'تنبيهات عندما يبلغ مؤشر جودة الهواء {value}+ (مستويات غير صحية)',
  'settings.percentValue': '{value}%',

  // Settings — time picker modal
  'settings.dailyForecastTimeTitle': 'وقت التوقعات اليومية',
  'settings.hourlyForecastTimeTitle': 'وقت التوقعات بالساعة',

  // Settings — threshold editor modal
  'settings.thresholdRain': 'حد احتمال المطر (%)',
  'settings.thresholdWind': 'حد سرعة الرياح (كم/س)',
  'settings.thresholdUv': 'حد مؤشر الأشعة فوق البنفسجية',
  'settings.thresholdTempHigh': 'حد درجة الحرارة العظمى (°C)',
  'settings.thresholdTempLow': 'حد درجة الحرارة الصغرى (°C)',
  'settings.thresholdAqi': 'حد مؤشر جودة الهواء',
  'settings.thresholdModalSubtitle': 'أدخل قيمة الحد لإصدار التنبيهات',
  'settings.thresholdPlaceholder': 'أدخل القيمة...',
  'settings.invalidValueTitle': 'قيمة غير صالحة',
  'settings.invalidValueMessage': 'يرجى إدخال رقم صالح',

  // Settings — widget
  'settings.homeScreenWidget': 'أداة الشاشة الرئيسية',
  'settings.addWidget': 'إضافة الأداة إلى الشاشة الرئيسية',
  'settings.addWidgetSubtitle': 'انقر لإضافة أداة الطقس مباشرة',
  'settings.widgetAlertTitle': 'الأداة',
  'settings.widgetPinHint': 'لإضافة الأداة، اضغط مطولاً على الشاشة الرئيسية ← الأدوات ← WeatherWell',
  'settings.widgetOpacity': 'شفافية الأداة',
  'settings.widgetShowFeelsLike': 'عرض الحرارة المحسوسة',
  'settings.widgetShowFeelsLikeSubtitle': 'عرض درجة الحرارة المحسوسة',
  'settings.widgetShowHighLow': 'عرض العظمى/الصغرى',
  'settings.widgetShowHighLowSubtitle': 'عرض درجتي الحرارة العظمى والصغرى لليوم',
  'settings.widgetShowRainChance': 'عرض احتمال المطر',
  'settings.widgetShowRainChanceSubtitle': 'عرض احتمال هطول الأمطار',
  'settings.widgetShowConditions': 'عرض الحالة الجوية',
  'settings.widgetShowConditionsSubtitle': 'عرض نص الحالة الجوية',
  'settings.widgetShowTomorrow': 'عرض توقعات الغد',
  'settings.widgetShowTomorrowSubtitle': 'عرض العظمى/الصغرى المتوقعة غداً',

  // Settings — privacy
  'settings.privacy': 'الخصوصية',
  'settings.shareLocation': 'تضمين الموقع في بيانات الطقس',
  'settings.shareLocationSubtitle': 'تضمين الموقع عند مشاركة الطقس',

  // Settings — advanced (backup / reset)
  'settings.advanced': 'إعدادات متقدمة',
  'settings.exportBackup': 'تصدير نسخة احتياطية',
  'settings.exportBackupSubtitle': 'حفظ جميع الإعدادات والمواقع المفضلة',
  'settings.importBackup': 'استيراد نسخة احتياطية',
  'settings.importBackupSubtitle': 'استعادة الإعدادات والمواقع المفضلة',
  'settings.resetToDefaults': 'إعادة التعيين إلى الافتراضي',
  'settings.resetToDefaultsSubtitle': 'إعادة جميع الإعدادات إلى قيمها الأصلية',
  'settings.successTitle': 'تم بنجاح',
  'settings.resetTitle': 'إعادة تعيين الإعدادات',
  'settings.resetConfirm': 'هل أنت متأكد من إعادة جميع الإعدادات إلى الوضع الافتراضي؟',
  'settings.resetDone': 'تمت إعادة الإعدادات إلى الوضع الافتراضي',
  'settings.exportDialogTitle': 'تصدير نسخة WeatherWell الاحتياطية',
  'settings.backupExported': 'تم تصدير النسخة الاحتياطية بنجاح',
  'settings.sharingUnavailable': 'المشاركة غير متاحة على هذا الجهاز',
  'settings.exportFailed': 'فشل تصدير النسخة الاحتياطية: {error}',
  'settings.unknownError': 'خطأ غير معروف',
  'settings.backupRestored': 'تمت استعادة النسخة الاحتياطية (الإعدادات والمفضلة)',
  'settings.restoreFailed': 'فشلت استعادة الإعدادات من النسخة الاحتياطية',
  'settings.settingsImported': 'تم استيراد الإعدادات بنجاح',
  'settings.invalidBackupFile': 'ملف نسخة احتياطية غير صالح',
  'settings.importFailed': 'فشل استيراد النسخة الاحتياطية. تأكد من اختيار ملف ‎.weatherwell صالح.',

  // Settings — testers
  'settings.testers': 'المختبِرون',
  'settings.testersThanks': 'شكراً لكم على ملاحظاتكم القيّمة!',

  // Settings — about
  'settings.about': 'حول التطبيق',
  'settings.appTagline': 'توقعات طقس بلا إعلانات',
  'settings.version': 'الإصدار',
  'settings.developer': 'المطوّر',
  'settings.privacyPolicy': 'سياسة الخصوصية',
  'settings.privacyPolicySubtitle': 'لا يتم جمع أي بيانات شخصية أو مشاركتها',

  // Settings — more from SeMo Lab
  'settings.moreFromSemoLab': 'المزيد من SeMo Lab',
  'settings.feedwellDesc': 'قارئ RSS بلا إعلانات. قراءة نقية دون مشتتات.',
  'settings.ledgerwellDesc': 'تتبّع الديون والمستحقات الشخصية، بعملات متعددة.',
  'settings.thinkwellDesc': 'دردشة ذكاء اصطناعي دون إنترنت. نماذج محلية وخصوصية كاملة.',
  'settings.allSemoLabApps': 'جميع تطبيقات SeMo Lab',
  'settings.allSemoLabAppsSubtitle': 'اطّلع على كل ما نصنعه على Google Play',

  // Settings — footer
  'settings.footerText': 'يقدّم WeatherWell توقعات طقس دقيقة مع نهج يضع الخصوصية أولاً. لا يتم جمع أي بيانات شخصية أو مشاركتها.',
  'settings.copyright': '© 2026 SeMo Lab',

  // HomeScreen
  'home.loadingTitle': 'جارٍ تحميل WeatherWell...',
  'home.loadingSubtext': 'جارٍ تحديد موقعك وجلب بيانات الطقس',
  'home.errorTitle': '⚠️ خطأ',
  'home.tryAgain': 'حاول مجدداً',
  'home.retry': 'إعادة المحاولة',
  'home.noWeatherData': 'لا تتوفر بيانات طقس',
  'home.locationPermissionRequired': 'إذن الموقع مطلوب للحصول على بيانات الطقس',
  'home.failedToLoad': 'فشل تحميل بيانات الطقس',
  'home.currentLocation': 'الموقع الحالي',
  'home.locationFormat': '{name}، {country}',
  'home.pinned': 'مثبّت',
  'home.pinAsMain': 'تثبيت كموقع رئيسي',
  'home.useCurrentLocation': 'استخدام الموقع الحالي',

  // SearchScreen
  'search.title': 'البحث عن موقع',
  'search.placeholder': 'ابحث عن مدينة أو موقع...',
  'search.searching': 'جارٍ البحث عن المواقع...',
  'search.noResults': 'لم يتم العثور على مواقع لـ "{query}"',
  'search.tryDifferent': 'جرّب كلمة بحث مختلفة',
  'search.favoritePlaces': 'الأماكن المفضلة',
  'search.recentSearches': 'عمليات البحث الأخيرة',
  'search.clearAll': 'مسح الكل',
  'search.searchResults': 'نتائج البحث',
  'search.popularCities': 'مدن شهيرة مطابقة لبحثك',
  'search.searchAnyLocation': 'ابحث عن أي موقع',
  'search.startTyping': 'ابدأ الكتابة للعثور على مدن حول العالم',
  'search.regionCountry': '{region}، {country}',
  'search.clearRecentTitle': 'مسح عمليات البحث الأخيرة',
  'search.clearRecentMessage': 'هل أنت متأكد من مسح جميع عمليات البحث الأخيرة؟',
  'search.clear': 'مسح',

  // Compare
  'compare.title': 'مقارنة المزوّدين',
  'compare.hint': 'انقر على مزوّد لجعله مصدر بيانات الطقس',
  'compare.inUse': 'قيد الاستخدام',
  'compare.unavailable': 'غير متاح حالياً',
  'compare.humidityValue': '{value}%',
  'compare.windValue': '{value} كم/س',
  'compare.aqiValue': 'AQI {value}',

  // Weather — section titles
  'weather.hourlyForecast': 'التوقعات بالساعة',
  'weather.dailyForecast': 'توقعات الأيام القادمة',

  // Weather — relative day/time labels
  'weather.now': 'الآن',
  'weather.today': 'اليوم',
  'weather.tomorrow': 'غداً',

  // Weather — current conditions card
  'weather.feelsLike': 'تبدو كأنها {temp}',
  'weather.humidity': 'الرطوبة',
  'weather.wind': 'الرياح',
  'weather.uvIndex': 'الأشعة فوق البنفسجية',
  'weather.pressure': 'الضغط',
  'weather.windDir': 'اتجاه الرياح',
  'weather.visibility': 'الرؤية',
  'weather.airQuality': 'جودة الهواء',

  // Weather — unit-bearing value formats
  'weather.percentValue': '{value}%',
  'weather.kmhValue': '{value} كم/س',
  'weather.hpaValue': '{value} hPa',
  'weather.kmValue': '{value} كم',
  'weather.aqiValue': 'AQI {value}',

  // SmartFeaturesCard — sections and cards
  'smart.recommendations': 'التوصيات',
  'smart.umbrellaAlert': 'تنبيه المظلة',
  'smart.umbrellaChance': 'احتمال مطر يصل إلى {percent}% خلال الـ 24 ساعة القادمة',
  'smart.clothingSuggestion': 'اقتراح الملابس',
  'smart.tempFeelsLike': '{temp}°C، تبدو كأنها {feels}°C',
  'smart.uvProtection': 'الحماية من الشمس',
  'smart.uvIndexLabel': 'مؤشر الأشعة فوق البنفسجية: {value}',
  'smart.airQuality': 'جودة الهواء',
  'smart.aqiPmDetail': 'AQI: {aqi} • PM2.5: {pm25}μg/m³',
  'smart.na': 'غير متاح',

  // SmartFeaturesCard — umbrella advice
  'smart.umbrella.definitely': 'احمل المظلة بالتأكيد!',
  'smart.umbrella.consider': 'فكّر في حمل مظلة',
  'smart.umbrella.none': 'لا حاجة للمظلة اليوم',

  // SmartFeaturesCard — clothing suggestions
  'smart.clothing.winter': 'معطف شتوي ثقيل، وشاح وقفازات',
  'smart.clothing.jacket': 'سترة أو كنزة دافئة',
  'smart.clothing.sweater': 'كنزة خفيفة أو أكمام طويلة',
  'smart.clothing.tshirt': 'تي شيرت أو ملابس خفيفة',

  // SmartFeaturesCard — UV advice
  'smart.uv.high': 'ارتدِ نظارة شمسية وضع واقي شمس SPF 30+',
  'smart.uv.medium': 'يُنصح بنظارة شمسية وواقي شمس',
  'smart.uv.light': 'يُنصح بحماية خفيفة من الشمس',
  'smart.uv.none': 'لا حاجة للحماية من الشمس',

  // SmartFeaturesCard — mask advice
  'smart.mask.wear': 'ارتدِ كمامة في الخارج',
  'smart.mask.consider': 'فكّر في ارتداء كمامة',
  'smart.mask.none': 'لا حاجة للكمامة',

  // SmartFeaturesCard — air quality levels
  'smart.air.good': 'جودة الهواء جيدة',
  'smart.air.moderate': 'جودة هواء متوسطة',
  'smart.air.sensitive': 'غير صحي لأصحاب الحساسية',
  'smart.air.unhealthy': 'جودة هواء غير صحية',

  // SmartFeaturesCard — hourly detail modals
  'smart.dailyAirQuality': 'جودة الهواء اليومية',
  'smart.aqiValue': 'AQI {value}',
  'smart.hourlyRain': 'توقعات المطر بالساعة',
  'smart.hourlyTemperature': 'درجة الحرارة بالساعة',
  'smart.hourlyUvIndex': 'مؤشر الأشعة فوق البنفسجية بالساعة',
  'smart.now': 'الآن',
  'smart.tempC': '{temp}°C',
  'smart.uvValue': 'UV {value}',
  'smart.uvLevel.veryHigh': 'مرتفع جداً',
  'smart.uvLevel.high': 'مرتفع',
  'smart.uvLevel.moderate': 'متوسط',
  'smart.uvLevel.low': 'منخفض',

  // SmartFeaturesCard — astronomy
  'smart.astronomy': 'الفلك',
  'smart.sunTimes': 'مواقيت الشمس',
  'smart.sunriseSunset': 'الشروق: {sunrise} • الغروب: {sunset}',
  'smart.daylightLabel': 'ساعات النهار: {duration}',
  'smart.daylightDuration': '{hours} س {minutes} د',
  'smart.dailySunTimes': 'مواقيت الشمس اليومية',
  'smart.moonPhases': 'أطوار القمر',
  'smart.moonPhase': 'طور القمر',
  'smart.illumination': 'الإضاءة: {percent}%',
  'smart.illuminationUnavailable': 'الإضاءة: البيانات غير متوفرة',
  'smart.illuminatedPercent': 'مضاء بنسبة {percent}%',

  // SmartFeaturesCard — moon phase names
  'smart.moon.newMoon': 'محاق',
  'smart.moon.waxingCrescent': 'هلال متزايد',
  'smart.moon.firstQuarter': 'التربيع الأول',
  'smart.moon.waxingGibbous': 'أحدب متزايد',
  'smart.moon.fullMoon': 'بدر',
  'smart.moon.waningGibbous': 'أحدب متناقص',
  'smart.moon.lastQuarter': 'التربيع الأخير',
  'smart.moon.waningCrescent': 'هلال متناقص',

  // WeatherDetailModal — titles
  'detail.title.humidity': 'اتجاهات الرطوبة',
  'detail.title.wind': 'اتجاهات سرعة الرياح',
  'detail.title.uv': 'اتجاهات مؤشر الأشعة فوق البنفسجية',
  'detail.title.pressure': 'الضغط الجوي',
  'detail.title.windDir': 'اتجاه الرياح',
  'detail.title.visibility': 'اتجاهات مدى الرؤية',
  'detail.title.airquality': 'مؤشر جودة الهواء',
  'detail.title.default': 'تفاصيل الطقس',

  // WeatherDetailModal — descriptions
  'detail.desc.humidity': 'مستويات الرطوبة النسبية خلال الـ 12 ساعة القادمة. القيم الأعلى تعني رطوبة أكبر في الهواء.',
  'detail.desc.wind': 'تغيّرات سرعة الرياح على مدار اليوم. تساعدك في التخطيط للأنشطة الخارجية.',
  'detail.desc.uv': 'توقعات مؤشر الأشعة فوق البنفسجية تُظهر شدة الشمس. استخدم الحماية من الشمس عندما تتجاوز القيم 3.',
  'detail.desc.pressure': 'تغيّرات الضغط الجوي قد تدل على تحوّلات في أنماط الطقس.',
  'detail.desc.windDir': 'اتجاه الرياح وسرعتها حالياً مع عرض على البوصلة.',
  'detail.desc.visibility': 'تؤثر أحوال الرؤية على القيادة والأنشطة الخارجية وسلامة الطيران. الرؤية الصافية تدل على أحوال جوية جيدة.',
  'detail.desc.airquality': 'يقيس مؤشر جودة الهواء مستويات تلوث الهواء. القيم الأدنى تعني هواءً أنقى.',

  // WeatherDetailModal — current values
  'detail.windDirAt': '{direction} بسرعة {speed} كم/س',
  'detail.na': 'غير متاح',

  // WeatherDetailModal — health tips
  'detail.tipTitle': 'نصيحة',
  'detail.tip.humidityHigh': 'رطوبة مرتفعة - اشرب الماء وابقَ في مكان بارد',
  'detail.tip.humidityLow': 'رطوبة منخفضة - استخدم مرطباً واشرب الماء',
  'detail.tip.humidityComfort': 'مستوى رطوبة مريح',
  'detail.tip.windStrong': 'رياح قوية - ثبّت الأغراض غير المثبتة',
  'detail.tip.windModerate': 'رياح معتدلة - مناسبة للأنشطة الخارجية',
  'detail.tip.windLight': 'رياح خفيفة - مثالية لأي نشاط خارجي',
  'detail.tip.uvVeryHigh': 'أشعة مرتفعة جداً - ضع واقي شمس SPF 30+',
  'detail.tip.uvHigh': 'أشعة مرتفعة - يُنصح بالحماية من الشمس',
  'detail.tip.uvModerate': 'أشعة متوسطة - يُنصح بحماية خفيفة',
  'detail.tip.uvLow': 'أشعة منخفضة - الحماية اللازمة قليلة',
  'detail.tip.pressureHigh': 'ضغط مرتفع - يُتوقع طقس مستقر',
  'detail.tip.pressureLow': 'ضغط منخفض - تغيّرات جوية محتملة',
  'detail.tip.pressureNormal': 'ضغط طبيعي - أحوال مستقرة',
  'detail.tip.windDir': 'الرياح قادمة من جهة {direction}',
  'detail.tip.visibilityExcellent': 'رؤية ممتازة - مثالية لجميع الأنشطة',
  'detail.tip.visibilityGood': 'رؤية جيدة - آمنة للقيادة والأنشطة الخارجية',
  'detail.tip.visibilityReduced': 'رؤية منخفضة - قد بحذر واستخدم المصابيح الأمامية',
  'detail.tip.visibilityPoor': 'رؤية ضعيفة - تجنّب التنقل غير الضروري وتوخَّ أقصى درجات الحذر',
  'detail.tip.aqiGood': 'جودة هواء جيدة - آمنة للأنشطة الخارجية',
  'detail.tip.aqiModerate': 'متوسطة - مقبولة لمعظم الناس',
  'detail.tip.aqiSensitive': 'غير صحية للفئات الحساسة - قلّل الأنشطة الخارجية المطوّلة',
  'detail.tip.aqiUnhealthy': 'غير صحية - على الجميع تقليل الأنشطة الخارجية',
  'detail.tip.aqiVeryUnhealthy': 'غير صحية بشدة - تجنّب الأنشطة الخارجية',

  // WeatherDetailModal — insight cards
  'detail.insight.humidityTitle': '🌡️ دليل راحة الرطوبة',
  'detail.insight.humidityBody':
    '• أقل من 30%: جاف جداً - قد يسبب تهيّج الجلد والحلق\n' +
    '• 30-50%: نطاق الراحة المثالي - ظروف ممتازة\n' +
    '• 50-65%: مريح لمعظم الناس\n' +
    '• 65-75%: رطب قليلاً - قد تشعر بالدفء\n' +
    '• أكثر من 75%: رطب جداً - جو خانق ولزج',
  'detail.insight.windTitle': 'دليل سرعة الرياح',
  'detail.insight.windBody':
    '• 0-5 كم/س: ساكنة - الدخان يرتفع عمودياً\n' +
    '• 6-11 كم/س: هواء خفيف - الأوراق تتحرك بلطف\n' +
    '• 12-19 كم/س: نسيم خفيف - مثالي للأنشطة الخارجية\n' +
    '• 20-28 كم/س: نسيم لطيف - الأغصان تتحرك والأعلام ترفرف\n' +
    '• 29-38 كم/س: نسيم معتدل - الأشجار الصغيرة تتمايل\n' +
    '• 39-49 كم/س: نسيم نشط - الأغصان الكبيرة تتحرك\n' +
    '• 50-61 كم/س: رياح قوية - يصعب استخدام المظلات\n' +
    '• 62+ كم/س: رياح شديدة - تجنّب الأنشطة الخارجية',
  'detail.insight.uvTitle': '☀️ دليل مؤشر الأشعة فوق البنفسجية',
  'detail.insight.uvBody':
    '• 0-2: منخفض - لا حاجة للحماية\n' +
    '• 3-5: متوسط - الزم الظل وقت الظهيرة\n' +
    '• 6-7: مرتفع - الحماية ضرورية\n' +
    '• 8-10: مرتفع جداً - حماية إضافية مطلوبة\n' +
    '• 11+: متطرف - تجنّب التعرض للشمس',
  'detail.insight.pressureTitle': 'اتجاهات الضغط',
  'detail.insight.pressureBody':
    '• ضغط يرتفع: طقس معتدل قادم\n' +
    '• ضغط ينخفض: عواصف محتملة\n' +
    '• ضغط مستقر: أحوال ثابتة\n' +
    '• النطاق الطبيعي: 1000-1020 hPa',
  'detail.insight.visibilityTitle': '👁️ دليل مدى الرؤية',
  'detail.insight.visibilityBody':
    '• 10+ كم: ممتازة - مثالية لجميع الأنشطة\n' +
    '• 5-10 كم: جيدة - قيادة آمنة\n' +
    '• 2-5 كم: متوسطة - توخَّ الحذر وشغّل المصابيح\n' +
    '• 1-2 كم: ضعيفة - قيادة خطرة\n' +
    '• أقل من 1 كم: ضعيفة جداً - تجنّب التنقل إن أمكن',
  'detail.insight.airTitle': '🌫️ تفاصيل جودة الهواء',
  'detail.air.currentAqi': 'مؤشر جودة الهواء الحالي: {value}',
  'detail.air.pollutantValue': '{name}: {value} μg/m³',
  'detail.air.scaleTitle': 'مقياس AQI:',
  'detail.air.scaleBody':
    '• 0-50: جيد - جودة الهواء مُرضية\n' +
    '• 51-100: متوسط - مقبول لمعظم الناس\n' +
    '• 101-150: غير صحي للفئات الحساسة\n' +
    '• 151-200: غير صحي - قد يتأثر الجميع\n' +
    '• 201-300: غير صحي بشدة - إنذار صحي\n' +
    '• 301+: خطِر - حالة طوارئ',

  // RealCompass
  'compass.title': 'البوصلة',
  'compass.windLabel': 'الرياح: {direction}',
  'compass.deviceHeading': 'اتجاه الجهاز: {value}°',
  'compass.instruction': 'لأفضل دقة: أمسك الهاتف بشكل مستوٍ بعيداً عن الأجسام المعدنية، وحرّكه على شكل الرقم 8 للمعايرة',

  // RealCompass — calibration status
  'compass.status.initializing': 'جارٍ التهيئة...',
  'compass.status.noSensorsStatic': 'المستشعرات غير متاحة - عرض بوصلة ثابتة',
  'compass.status.calibratingDevice': 'جارٍ معايرة مستشعرات الجهاز...',
  'compass.status.calibratedDevice': '✓ تمت المعايرة - البوصلة الحقيقية نشطة',
  'compass.status.calibratingMagnetometer': 'جارٍ معايرة مقياس المغناطيسية...',
  'compass.status.calibratedMagnetometer': '✓ تمت المعايرة - مقياس المغناطيسية نشط',
  'compass.status.noSensors': '⚠️ لا مستشعرات متاحة - بوصلة ثابتة',
  'compass.status.sensorError': '⚠️ خطأ في المستشعر - بوصلة ثابتة',

  // RealCompass — heading accuracy
  'compass.accuracy.high': '● دقة عالية',
  'compass.accuracy.medium': '● دقة متوسطة',
  'compass.accuracy.low': '● دقة منخفضة - ابتعد عن الأجسام المعدنية',

  // RealCompass — cardinal directions (16-wind)
  'compass.dir.n': 'شمال',
  'compass.dir.nne': 'شمال شمال شرق',
  'compass.dir.ne': 'شمال شرق',
  'compass.dir.ene': 'شرق شمال شرق',
  'compass.dir.e': 'شرق',
  'compass.dir.ese': 'شرق جنوب شرق',
  'compass.dir.se': 'جنوب شرق',
  'compass.dir.sse': 'جنوب جنوب شرق',
  'compass.dir.s': 'جنوب',
  'compass.dir.ssw': 'جنوب جنوب غرب',
  'compass.dir.sw': 'جنوب غرب',
  'compass.dir.wsw': 'غرب جنوب غرب',
  'compass.dir.w': 'غرب',
  'compass.dir.wnw': 'غرب شمال غرب',
  'compass.dir.nw': 'شمال غرب',
  'compass.dir.nnw': 'شمال شمال غرب',

  // Share — fallback location name
  'share.currentLocation': 'الموقع الحالي',

  // Share — buttons
  'share.quickShare': 'مشاركة سريعة',
  'share.customizeShare': 'تخصيص المشاركة',
  'share.shareButton': 'مشاركة تقرير الطقس',

  // Share — options modal
  'share.optionsTitle': 'خيارات المشاركة',
  'share.contentSection': 'المحتوى المضمّن',
  'share.detailsSection': 'تفاصيل الطقس',
  'share.option.location': 'الموقع',
  'share.option.locationSubtitle': 'تضمين اسم الموقع في الطقس المشارَك',
  'share.option.current': 'الطقس الحالي',
  'share.option.currentSubtitle': 'درجة الحرارة والأحوال الحالية',
  'share.option.hourly': 'التوقعات بالساعة',
  'share.option.hourlySubtitle': 'توقعات الـ 12 ساعة القادمة',
  'share.option.daily': 'التوقعات اليومية',
  'share.option.dailySubtitle': 'توقعات الطقس لسبعة أيام',
  'share.option.astronomy': 'الفلك',
  'share.option.astronomySubtitle': 'الشروق والغروب وطور القمر',
  'share.option.feelsLike': 'درجة الحرارة المحسوسة',
  'share.option.humidity': 'الرطوبة',
  'share.option.pressure': 'الضغط الجوي',
  'share.option.visibility': 'مدى الرؤية',
  'share.option.uv': 'مؤشر الأشعة فوق البنفسجية',
  'share.option.wind': 'معلومات الرياح',

  // Share — share sheet title and errors
  'share.shareTitle': 'تقرير الطقس - {location}',
  'share.errorTitle': 'خطأ في المشاركة',
  'share.errorMessage': 'فشلت مشاركة بيانات الطقس',

  // Share — generated share text
  'share.text.header': 'تقرير الطقس',
  'share.text.location': 'الموقع: {location}',
  'share.text.currentWeather': 'الطقس الحالي:',
  'share.text.temperature': 'درجة الحرارة: {temp}',
  'share.text.feelsLike': '(تبدو كأنها {temp})',
  'share.text.condition': 'الحالة: {condition}',
  'share.text.humidity': 'الرطوبة: {humidity}%',
  'share.text.pressure': 'الضغط: {pressure} hPa',
  'share.text.visibility': 'الرؤية: {visibility} كم',
  'share.text.uvIndex': 'مؤشر الأشعة فوق البنفسجية: {uvIndex}',
  'share.text.wind': 'الرياح: {speed} كم/س {direction}',
  'share.text.next12Hours': 'الـ 12 ساعة القادمة:',
  'share.text.nextHours': 'الساعات القادمة:',
  'share.text.hourLine': '{time}: {temp} - {condition}',
  'share.text.dailyForecast': 'توقعات الأيام القادمة:',
  'share.text.dayLine': '{day}: {max}/{min} - {condition}',
  'share.text.rainChance': '(احتمال المطر {chance}%)',
  'share.text.astronomy': 'الفلك:',
  'share.text.sunrise': 'الشروق: {time}',
  'share.text.sunset': 'الغروب: {time}',
  'share.text.moon': 'القمر: {phase}',
  'share.text.moonIllumination': '(مضاء بنسبة {percent}%)',
  'share.text.footer': 'تمت المشاركة من WeatherWell',

  // Share — temperature formats
  'share.text.tempC': '{temp}°C',
  'share.text.tempF': '{temp}°F',

  // Notifications — Android notification channels
  'notif.channel.weatherAlerts': 'تنبيهات الطقس',
  'notif.channel.dailyForecast': 'التوقعات اليومية',

  // Notifications — time-of-day markers
  'notif.time.am': 'ص',
  'notif.time.pm': 'م',

  // Notifications — daily forecast
  'notif.daily.title': '📅 توقعات الطقس اليومية',
  'notif.daily.fallbackTitle': '🌤️ توقعات الطقس اليومية',
  'notif.daily.fallbackBody': 'افتح WeatherWell لعرض توقعات اليوم كاملة.',
  'notif.daily.today': 'اليوم: {high}°/{low}°، {condition}',
  'notif.daily.tomorrow': 'غداً: {high}°/{low}°، {condition}',
  'notif.daily.rainChance': '🌧️ مطر بنسبة {chance}%',
  'notif.daily.highUv': '☀️ أشعة مرتفعة ({uv})',
  'notif.daily.strongWind': '💨 رياح قوية {speed} كم/س',
  'notif.daily.heavyRain': '🌊 أمطار غزيرة {mm} ملم',

  // Notifications — hourly forecast
  'notif.hourly.title': '⏰ طقس الساعات القادمة',
  'notif.hourly.updateTitle': '⏰ تحديث الطقس بالساعة',
  'notif.hourly.fallbackBody': 'افتح WeatherWell للاطلاع على توقعات الساعات القادمة.',
  'notif.hourly.rainAt': '🌧️ مطر عند {times}',
  'notif.hourly.windUpTo': '💨 رياح تصل إلى {speed} كم/س',

  // Notifications — umbrella / rain alerts
  'notif.umbrella.title': '☂️ تنبيه المظلة',
  'notif.umbrella.body': 'احتمال مطر بنسبة {chance}% قريباً. لا تنسَ مظلتك!',
  'notif.umbrella.upcomingBody': 'احتمال مطر بنسبة {chance}% حوالي الساعة {time}. لا تنسَ مظلتك!',

  // Notifications — wind alerts
  'notif.wind.title': '💨 تنبيه رياح قوية',
  'notif.wind.body': 'سرعة الرياح {speed} كم/س. توخَّ الحذر في الخارج.',
  'notif.wind.expectedTitle': '💨 رياح قوية متوقعة',
  'notif.wind.expectedBody': 'رياح تصل سرعتها إلى {speed} كم/س متوقعة حوالي الساعة {time}.',

  // Notifications — UV alerts
  'notif.uv.title': '☀️ تنبيه أشعة مرتفعة',
  'notif.uv.body': 'مؤشر الأشعة فوق البنفسجية {uv} - ضع واقي الشمس وارتدِ ملابس واقية!',
  'notif.uv.indexTitle': '☀️ تنبيه مؤشر الأشعة',
  'notif.uv.indexBody': 'مؤشر الأشعة فوق البنفسجية {uv} ({level}). ضع واقي الشمس وارتدِ ملابس واقية!',
  'notif.uv.expectedTitle': '☀️ أشعة مرتفعة متوقعة',
  'notif.uv.expectedBody': 'مؤشر أشعة {uv} متوقع حوالي الساعة {time}. ضع واقي الشمس!',
  'notif.uvLevel.extreme': 'متطرف',
  'notif.uvLevel.veryHigh': 'مرتفع جداً',
  'notif.uvLevel.high': 'مرتفع',

  // Notifications — temperature alerts
  'notif.temp.highTitle': '🔥 تنبيه ارتفاع الحرارة',
  'notif.temp.lowTitle': '🥶 تنبيه انخفاض الحرارة',
  'notif.temp.highBody': 'درجة الحرارة {temp}°C، أعلى من الحد الذي عيّنته ({threshold}°C)',
  'notif.temp.lowBody': 'درجة الحرارة {temp}°C، أدنى من الحد الذي عيّنته ({threshold}°C)',
  'notif.temp.highAlertTitle': '🔥 تنبيه حرارة مرتفعة',
  'notif.temp.highAlertBody': 'درجة الحرارة {temp}°C. اشرب الماء وتجنّب التعرض الطويل للشمس.',
  'notif.temp.lowAlertTitle': '❄️ تنبيه حرارة منخفضة',
  'notif.temp.lowAlertBody': 'درجة الحرارة {temp}°C. ارتدِ ملابس دافئة!',
  'notif.temp.aheadHighTitle': '🔥 حرارة مرتفعة قادمة',
  'notif.temp.aheadHighBody': 'يُتوقع {temp}°C حوالي الساعة {time}. حافظ على شرب الماء!',
  'notif.temp.aheadLowTitle': '❄️ برد قادم',
  'notif.temp.aheadLowBody': 'يُتوقع {temp}°C حوالي الساعة {time}. ارتدِ ملابس دافئة!',

  // Notifications — air quality alerts
  'notif.aqi.title': '🌫️ تنبيه جودة الهواء',
  'notif.aqi.body': 'مؤشر جودة الهواء {aqi} ({level}). يُفضّل تقليل الأنشطة الخارجية.',
  'notif.aqiLevel.hazardous': 'خطِر',
  'notif.aqiLevel.veryUnhealthy': 'غير صحي بشدة',
  'notif.aqiLevel.unhealthy': 'غير صحي',
  'notif.aqiLevel.sensitive': 'غير صحي للفئات الحساسة',

  // Notifications — severe weather alerts
  'notif.severe.title': '🚨 تنبيه {type}',
  'notif.severe.windDetected': '💨 رُصدت رياح قوية: {speed} كم/س. توخَّ الحذر في الخارج.',
  'notif.severe.conditionsDetected': '{emoji} تم رصد {type} في {location}. حافظ على سلامتك!',
  'notif.severe.bgTitle': '{emoji} طقس قاسٍ: {type}',
  'notif.severe.bgBody': 'تم رصد {type} في منطقتك. اتخذ الاحتياطات اللازمة.',
  'notif.severe.expectedTitle': '{emoji} يُتوقع حدوث {type} قريباً',
  'notif.severe.expectedBody': 'يُتوقع حدوث {type} حوالي الساعة {time}. اتخذ الاحتياطات اللازمة.',
  'notif.severeType.thunderstorm': 'عاصفة رعدية',
  'notif.severeType.heavyRain': 'أمطار غزيرة',
  'notif.severeType.snow': 'ثلوج',
  'notif.severeType.hail': 'بَرَد',
  'notif.severeType.fog': 'ضباب',
  'notif.severeType.strongWind': 'رياح قوية',

  // Widget
  'widget.openAppToLoad': 'افتح التطبيق لتحميل الطقس',
  'widget.feels': 'محسوسة {value}',
  'widget.high': 'ع: {value}',
  'widget.low': 'ص: {value}',
  'widget.tapToOpen': 'انقر لفتح WeatherWell',
  'widget.tomorrow': 'غداً',
  'widget.tomorrowCondition': 'غداً: {condition}',
};
