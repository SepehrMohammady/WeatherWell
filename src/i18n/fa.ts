/** Farsi (Persian) translations. */
export const fa: Record<string, string> = {
  // Common
  'common.ok': 'تأیید',
  'common.cancel': 'لغو',
  'common.close': 'بستن',
  'common.retry': 'تلاش دوباره',
  'common.loading': 'در حال بارگذاری...',
  'common.error': 'خطا',
  'common.save': 'ذخیره',
  'common.reset': 'بازنشانی',
  'common.notAvailable': 'داده در دسترس نیست',

  // Canonical weather conditions
  'conditions.clear': 'صاف',
  'conditions.clear.night': 'شب صاف',
  'conditions.partly': 'نیمه‌ابری',
  'conditions.cloudy': 'ابری',
  'conditions.overcast': 'تمام‌ابری',
  'conditions.fog': 'مه',
  'conditions.drizzle': 'نم‌نم باران',
  'conditions.rain': 'باران',
  'conditions.heavy-rain': 'باران شدید',
  'conditions.sleet': 'برف و باران',
  'conditions.snow': 'برف',
  'conditions.heavy-snow': 'برف سنگین',
  'conditions.hail': 'تگرگ',
  'conditions.thunder': 'رعد و برق',
  'conditions.thunder-rain': 'رعد و برق همراه با باران',
  'conditions.windy': 'بادی',

  // Language picker (language names are endonyms — identical in every dictionary)
  'language.title': 'زبان',
  'language.system': 'سیستم',
  'language.en': 'English',
  'language.zh': '中文',
  'language.es': 'Español',
  'language.hi': 'हिन्दी',
  'language.ar': 'العربية',
  'language.fa': 'فارسی',
  'language.it': 'Italiano',
  'language.restartTitle': 'نیاز به راه‌اندازی مجدد',
  'language.restartMessage': 'لطفاً WeatherWell را ببندید و دوباره باز کنید تا جهت چیدمان جدید اعمال شود.',

  // Tutorial
  'tutorial.title': 'به WeatherWell خوش آمدید',
  'tutorial.skip': 'رد کردن',
  'tutorial.next': 'بعدی',
  'tutorial.back': 'قبلی',
  'tutorial.done': 'شروع کنید',
  'tutorial.settingsRow': 'آموزش برنامه',
  'tutorial.settingsRowSubtitle': 'پخش دوباره معرفی WeatherWell',
  'tutorial.page1.title': 'هوای شما، به سبک شما',
  'tutorial.page1.body': 'WeatherWell وضعیت فعلی و پیش‌بینی ساعتی و 7 روزه را برای موقعیت شما نمایش می‌دهد — بدون تبلیغ و با حفظ حریم خصوصی.',
  'tutorial.page2.title': 'جستجو و سنجاق مکان‌ها',
  'tutorial.page2.body': 'هر شهری را جستجو کنید و آن را به‌عنوان مکان اصلی سنجاق کنید. برنامه و ابزارک مکان سنجاق‌شده را دنبال می‌کنند؛ با برداشتن سنجاق به موقعیت فعلی برمی‌گردید.',
  'tutorial.page3.title': 'ارائه‌دهنده خود را انتخاب کنید',
  'tutorial.page3.body': 'از میان شش ارائه‌دهنده هواشناسی انتخاب کنید، آن‌ها را کنار هم مقایسه کنید یا ترکیبی سفارشی بسازید — هر سنجه از ارائه‌دهنده‌ای که بیشتر به آن اعتماد دارید.',
  'tutorial.page4.title': 'امکانات هوشمند',
  'tutorial.page4.body': 'پیشنهاد پوشش، یادآور چتر، کیفیت هوا، داده‌های نجومی و هشدارهای هواشناسی دریافت کنید — به‌علاوه ابزارک صفحه اصلی.',
  'tutorial.page5.title': 'به سلیقه خودتان',
  'tutorial.page5.body': 'پوسته در پنج رنگ، حالت روشن و تاریک، انیمیشن‌های آب‌وهوا و چند زبان. همه را در تنظیمات بیابید.',

  // Settings — header
  'settings.title': 'تنظیمات',

  // Settings — appearance
  'settings.appearance': 'ظاهر',
  'settings.modeSystem': 'سیستم',
  'settings.modeLight': 'روشن',
  'settings.modeDark': 'تاریک',
  'settings.weatherAnimations': 'انیمیشن‌های آب‌وهوا',
  'settings.weatherAnimationsSubtitle': 'جلوه‌های محیطی باران، برف و ابر در صفحه اصلی',
  'settings.themeColor': 'رنگ پوسته',

  // Settings — weather data / provider
  'settings.weatherData': 'داده‌های هواشناسی',
  'settings.weatherProvider': 'ارائه‌دهنده هواشناسی',
  'settings.providerWeatherApiDesc': 'WeatherAPI - دقیق‌ترین، با داده‌های نجومی کامل',
  'settings.providerOpenWeatherMapDesc': 'OpenWeatherMap - پیش‌بینی‌های قابل‌اعتماد، داده نجومی محدود',
  'settings.providerVisualCrossingDesc': 'Visual Crossing - داده‌های خوب، بدون اطلاعات نجومی',
  'settings.providerOpenMeteoDesc': 'Open-Meteo - رایگان، بدون داده فاز ماه',
  'settings.providerQWeatherDesc': '⚠ QWeather - ممکن است به طرح پولی نیاز داشته باشد',
  'settings.providerMeteostatDesc': '⚠ Meteostat - فقط داده‌های تاریخی، نه برای پیش‌بینی',
  'settings.providerCustomDesc': 'سفارشی - برای هر سنجه در پایین یک ارائه‌دهنده انتخاب کنید',
  'settings.providerCustom': 'سفارشی (ترکیب ارائه‌دهنده‌ها)',
  'settings.providerHint': 'WA WeatherAPI · OWM OpenWeather · VC Visual Crossing · OM Open-Meteo · QW QWeather · MS Meteostat',

  // Settings — custom source metric labels
  'settings.metricForecast': 'پیش‌بینی (ساعتی و روزانه)',
  'settings.metricTemperature': 'دما',
  'settings.metricCondition': 'وضعیت هوا',
  'settings.metricHumidity': 'رطوبت',
  'settings.metricWind': 'باد',
  'settings.metricPressure': 'فشار',
  'settings.metricUvIndex': 'شاخص UV',
  'settings.metricVisibility': 'دید',
  'settings.metricAirQuality': 'کیفیت هوا',
  'settings.metricAstronomy': 'نجوم',

  // Settings — units and refresh
  'settings.temperatureUnit': 'واحد دما',
  'settings.refreshInterval': 'بازه به‌روزرسانی',
  'settings.refreshIntervalSubtitle': 'به‌روزرسانی هر {minutes} دقیقه',
  'settings.minutesShort': '{minutes} دقیقه',

  // Settings — API keys
  'settings.weatherApiKey': 'کلید WeatherAPI',
  'settings.openWeatherMapKey': 'کلید OpenWeatherMap',
  'settings.visualCrossingKey': 'کلید Visual Crossing',
  'settings.qweatherKey': 'کلید QWeather',
  'settings.meteostatKey': 'کلید Meteostat (RapidAPI)',
  'settings.customKeyConfigured': 'کلید سفارشی تنظیم شده است',
  'settings.usingDefaultKey': 'استفاده از کلید پیش‌فرض',
  'settings.apiKeyModalSubtitle': 'کلید API خود را وارد کنید یا برای استفاده از کلید آزمایشی خالی بگذارید',
  'settings.apiKeyPlaceholder': 'کلید API را وارد کنید...',
  'settings.apiKeyUpdated': 'کلید API با موفقیت به‌روزرسانی شد',

  // Settings — display options
  'settings.displayOptions': 'گزینه‌های نمایش',
  'settings.showFeelsLike': 'نمایش دمای محسوس',
  'settings.showHumidity': 'نمایش رطوبت',
  'settings.showPressure': 'نمایش فشار',
  'settings.showVisibility': 'نمایش دید',
  'settings.showUvIndex': 'نمایش شاخص UV',
  'settings.showWindSpeed': 'نمایش سرعت باد',
  'settings.showWindDirection': 'نمایش جهت باد',
  'settings.showAirQuality': 'نمایش کیفیت هوا',

  // Settings — notifications
  'settings.notifications': 'اعلان‌ها',
  'settings.notificationNote': 'هشدارهای زمان‌بندی‌شده (روزانه/ساعتی) در زمان انتخابی شما ارسال می‌شوند.\nهشدارهای پویا بر اساس بازه به‌روزرسانی شما ({minutes} دقیقه) بررسی انجام می‌دهند و پیش از شرایط خطرناک هشدار می‌دهند.',
  'settings.enableNotifications': 'فعال‌سازی اعلان‌ها',
  'settings.enableNotificationsSubtitle': 'روشن/خاموش کردن همه هشدارهای زمان‌بندی‌شده و پویا',
  'settings.severeWeatherAlerts': 'هشدارهای هوای شدید',
  'settings.severeWeatherAlertsSubtitle': 'درباره رعد و برق، باران شدید، برف و تگرگ هشدار می‌دهد',
  'settings.dailyForecast': 'پیش‌بینی روزانه',
  'settings.dailyForecastSubtitle': 'خلاصه روزانه زمان‌بندی‌شده در ساعت {time} با وضعیت هوا و نکته‌ها',
  'settings.hourlyForecast': 'پیش‌بینی ساعتی',
  'settings.hourlyForecastSubtitle': 'چشم‌انداز 6 ساعته زمان‌بندی‌شده در ساعت {time} با اطلاعات باران و دما',
  'settings.temperatureAlerts': 'هشدارهای دما',
  'settings.temperatureAlertsSubtitle': 'هشدار وقتی دما به زیر {low}°C برسد یا از {high}°C فراتر رود',
  'settings.tempLowShort': 'ک:{value}°',
  'settings.tempHighShort': 'ب:{value}°',
  'settings.uvAlerts': 'هشدارهای شاخص UV',
  'settings.uvAlertsSubtitle': 'وقتی شاخص UV به {value}+ برسد برای محافظت از پوست شما هشدار می‌دهد',
  'settings.umbrellaAlerts': 'هشدارهای چتر',
  'settings.umbrellaAlertsSubtitle': 'وقتی احتمال باران به {value}%+ برسد، همراه بردن چتر را یادآوری می‌کند',
  'settings.windAlerts': 'هشدارهای باد',
  'settings.windAlertsSubtitle': 'وقتی سرعت باد از {value} کیلومتر بر ساعت فراتر رود هشدار می‌دهد',
  'settings.aqiAlerts': 'هشدارهای کیفیت هوا',
  'settings.aqiAlertsSubtitle': 'هشدار وقتی AQI به {value}+ برسد (سطوح ناسالم)',
  'settings.percentValue': '{value}%',

  // Settings — time picker modal
  'settings.dailyForecastTimeTitle': 'زمان پیش‌بینی روزانه',
  'settings.hourlyForecastTimeTitle': 'زمان پیش‌بینی ساعتی',

  // Settings — threshold editor modal
  'settings.thresholdRain': 'آستانه باران (%)',
  'settings.thresholdWind': 'آستانه سرعت باد (کیلومتر بر ساعت)',
  'settings.thresholdUv': 'آستانه شاخص UV',
  'settings.thresholdTempHigh': 'آستانه دمای بالا (°C)',
  'settings.thresholdTempLow': 'آستانه دمای پایین (°C)',
  'settings.thresholdAqi': 'آستانه AQI',
  'settings.thresholdModalSubtitle': 'مقدار آستانه هشدارها را وارد کنید',
  'settings.thresholdPlaceholder': 'مقدار را وارد کنید...',
  'settings.invalidValueTitle': 'مقدار نامعتبر',
  'settings.invalidValueMessage': 'لطفاً یک عدد معتبر وارد کنید',

  // Settings — widget
  'settings.homeScreenWidget': 'ابزارک صفحه اصلی',
  'settings.addWidget': 'افزودن ابزارک به صفحه اصلی',
  'settings.addWidgetSubtitle': 'برای افزودن مستقیم ابزارک هواشناسی ضربه بزنید',
  'settings.widgetAlertTitle': 'ابزارک',
  'settings.widgetPinHint': 'برای افزودن ابزارک، صفحه اصلی را لمس طولانی کنید ← ابزارک‌ها ← WeatherWell',
  'settings.widgetOpacity': 'شفافیت ابزارک',
  'settings.widgetShowFeelsLike': 'نمایش دمای محسوس',
  'settings.widgetShowFeelsLikeSubtitle': 'نمایش دمای محسوس هوا',
  'settings.widgetShowHighLow': 'نمایش بیشینه/کمینه',
  'settings.widgetShowHighLowSubtitle': 'نمایش دمای بیشینه و کمینه روزانه',
  'settings.widgetShowRainChance': 'نمایش احتمال باران',
  'settings.widgetShowRainChanceSubtitle': 'نمایش احتمال بارش',
  'settings.widgetShowConditions': 'نمایش وضعیت هوا',
  'settings.widgetShowConditionsSubtitle': 'نمایش متن وضعیت آب‌وهوا',
  'settings.widgetShowTomorrow': 'نمایش فردا',
  'settings.widgetShowTomorrowSubtitle': 'نمایش پیش‌بینی بیشینه/کمینه فردا',

  // Settings — privacy
  'settings.privacy': 'حریم خصوصی',
  'settings.shareLocation': 'گنجاندن موقعیت در داده‌های آب‌وهوا',
  'settings.shareLocationSubtitle': 'گنجاندن موقعیت هنگام اشتراک‌گذاری آب‌وهوا',

  // Settings — advanced (backup / reset)
  'settings.advanced': 'پیشرفته',
  'settings.exportBackup': 'برون‌برد نسخه پشتیبان',
  'settings.exportBackupSubtitle': 'ذخیره همه تنظیمات و علاقه‌مندی‌ها',
  'settings.importBackup': 'درون‌برد نسخه پشتیبان',
  'settings.importBackupSubtitle': 'بازیابی تنظیمات و علاقه‌مندی‌ها',
  'settings.resetToDefaults': 'بازنشانی به پیش‌فرض',
  'settings.resetToDefaultsSubtitle': 'بازنشانی همه تنظیمات به مقادیر اولیه',
  'settings.successTitle': 'انجام شد',
  'settings.resetTitle': 'بازنشانی تنظیمات',
  'settings.resetConfirm': 'آیا مطمئن هستید که می‌خواهید همه تنظیمات به پیش‌فرض بازنشانی شوند؟',
  'settings.resetDone': 'تنظیمات به پیش‌فرض بازنشانی شد',
  'settings.exportDialogTitle': 'برون‌برد نسخه پشتیبان WeatherWell',
  'settings.backupExported': 'نسخه پشتیبان با موفقیت ذخیره شد',
  'settings.sharingUnavailable': 'اشتراک‌گذاری در این دستگاه در دسترس نیست',
  'settings.exportFailed': 'برون‌برد نسخه پشتیبان ناموفق بود: {error}',
  'settings.unknownError': 'خطای ناشناخته',
  'settings.backupRestored': 'نسخه پشتیبان بازیابی شد (تنظیمات و علاقه‌مندی‌ها)',
  'settings.restoreFailed': 'بازیابی تنظیمات از نسخه پشتیبان ناموفق بود',
  'settings.settingsImported': 'تنظیمات با موفقیت درون‌برد شد',
  'settings.invalidBackupFile': 'فایل پشتیبان نامعتبر است',
  'settings.importFailed': 'درون‌برد نسخه پشتیبان ناموفق بود. مطمئن شوید یک فایل ‎.weatherwell معتبر انتخاب کرده‌اید.',

  // Settings — testers
  'settings.testers': 'آزمایش‌کنندگان',
  'settings.testersThanks': 'از بازخورد ارزشمند شما سپاسگزاریم!',

  // Settings — about
  'settings.about': 'درباره',
  'settings.appTagline': 'پیش‌بینی آب‌وهوا بدون تبلیغ',
  'settings.version': 'نسخه',
  'settings.developer': 'توسعه‌دهنده',
  'settings.privacyPolicy': 'سیاست حریم خصوصی',
  'settings.privacyPolicySubtitle': 'هیچ داده شخصی جمع‌آوری یا به اشتراک گذاشته نمی‌شود',

  // Settings — more from SeMo Lab
  'settings.moreFromSemoLab': 'محصولات دیگر SeMo Lab',
  'settings.feedwellDesc': 'خبرخوان RSS بدون تبلیغ. مطالعه‌ای پاک، بدون حواس‌پرتی.',
  'settings.ledgerwellDesc': 'پیگیری بدهی‌ها و طلب‌های شخصی، با پشتیبانی چند ارز.',
  'settings.allSemoLabApps': 'همه برنامه‌های SeMo Lab',
  'settings.allSemoLabAppsSubtitle': 'همه ساخته‌های ما را در Google Play ببینید',

  // Settings — footer
  'settings.footerText': 'WeatherWell پیش‌بینی‌های دقیق آب‌وهوا را با رویکرد حریم‌خصوصی‌محور ارائه می‌دهد. هیچ داده شخصی جمع‌آوری یا به اشتراک گذاشته نمی‌شود.',
  'settings.copyright': '© 2026 SeMo Lab',

  // HomeScreen
  'home.loadingTitle': 'در حال بارگذاری WeatherWell...',
  'home.loadingSubtext': 'در حال دریافت موقعیت و داده‌های آب‌وهوای شما',
  'home.errorTitle': '⚠️ خطا',
  'home.tryAgain': 'دوباره تلاش کنید',
  'home.retry': 'تلاش دوباره',
  'home.noWeatherData': 'داده آب‌وهوایی در دسترس نیست',
  'home.locationPermissionRequired': 'برای دریافت داده‌های آب‌وهوا، مجوز موقعیت مکانی لازم است',
  'home.failedToLoad': 'بارگذاری داده‌های آب‌وهوا ناموفق بود',
  'home.currentLocation': 'موقعیت فعلی',
  'home.locationFormat': '{name}، {country}',
  'home.pinned': 'سنجاق‌شده',
  'home.pinAsMain': 'سنجاق به‌عنوان مکان اصلی',
  'home.useCurrentLocation': 'استفاده از موقعیت فعلی',

  // SearchScreen
  'search.title': 'جستجوی مکان',
  'search.placeholder': 'جستجوی شهر یا مکان...',
  'search.searching': 'در حال جستجوی مکان‌ها...',
  'search.noResults': 'مکانی برای «{query}» پیدا نشد',
  'search.tryDifferent': 'عبارت جستجوی دیگری را امتحان کنید',
  'search.favoritePlaces': 'مکان‌های موردعلاقه',
  'search.recentSearches': 'جستجوهای اخیر',
  'search.clearAll': 'پاک کردن همه',
  'search.searchResults': 'نتایج جستجو',
  'search.popularCities': 'شهرهای محبوب مطابق جستجوی شما',
  'search.searchAnyLocation': 'هر مکانی را جستجو کنید',
  'search.startTyping': 'برای یافتن شهرها در سراسر جهان شروع به نوشتن کنید',
  'search.regionCountry': '{region}، {country}',
  'search.clearRecentTitle': 'پاک کردن جستجوهای اخیر',
  'search.clearRecentMessage': 'آیا مطمئن هستید که می‌خواهید همه جستجوهای اخیر پاک شوند؟',
  'search.clear': 'پاک کردن',

  // Compare
  'compare.title': 'مقایسه ارائه‌دهنده‌ها',
  'compare.hint': 'برای انتخاب یک ارائه‌دهنده به‌عنوان منبع آب‌وهوا روی آن ضربه بزنید',
  'compare.inUse': 'در حال استفاده',
  'compare.unavailable': 'اکنون در دسترس نیست',
  'compare.humidityValue': '{value}%',
  'compare.windValue': '{value} کیلومتر/ساعت',
  'compare.aqiValue': 'AQI {value}',

  // Weather — section titles
  'weather.hourlyForecast': 'پیش‌بینی ساعتی',
  'weather.dailyForecast': 'پیش‌بینی روزهای آینده',

  // Weather — relative day/time labels
  'weather.now': 'اکنون',
  'weather.today': 'امروز',
  'weather.tomorrow': 'فردا',

  // Weather — current conditions card
  'weather.feelsLike': 'دمای محسوس {temp}',
  'weather.humidity': 'رطوبت',
  'weather.wind': 'باد',
  'weather.uvIndex': 'شاخص UV',
  'weather.pressure': 'فشار',
  'weather.windDir': 'جهت باد',
  'weather.visibility': 'دید',
  'weather.airQuality': 'کیفیت هوا',

  // Weather — unit-bearing value formats
  'weather.percentValue': '{value}%',
  'weather.kmhValue': '{value} کیلومتر/ساعت',
  'weather.hpaValue': '{value} هکتوپاسکال',
  'weather.kmValue': '{value} کیلومتر',
  'weather.aqiValue': 'AQI {value}',

  // SmartFeaturesCard — sections and cards
  'smart.recommendations': 'توصیه‌ها',
  'smart.umbrellaAlert': 'هشدار چتر',
  'smart.umbrellaChance': 'تا {percent}% احتمال باران در 24 ساعت آینده',
  'smart.clothingSuggestion': 'پیشنهاد پوشش',
  'smart.tempFeelsLike': '{temp}°C، دمای محسوس {feels}°C',
  'smart.uvProtection': 'محافظت در برابر UV',
  'smart.uvIndexLabel': 'شاخص UV: {value}',
  'smart.airQuality': 'کیفیت هوا',
  'smart.aqiPmDetail': 'AQI: {aqi} • PM2.5: {pm25}μg/m³',
  'smart.na': 'نامشخص',

  // SmartFeaturesCard — umbrella advice
  'smart.umbrella.definitely': 'حتماً چتر همراه ببرید!',
  'smart.umbrella.consider': 'بهتر است چتر همراه داشته باشید',
  'smart.umbrella.none': 'امروز نیازی به چتر نیست',

  // SmartFeaturesCard — clothing suggestions
  'smart.clothing.winter': 'پالتوی زمستانی ضخیم، شال‌گردن، دستکش',
  'smart.clothing.jacket': 'کاپشن یا پلیور گرم',
  'smart.clothing.sweater': 'پلیور نازک یا لباس آستین‌بلند',
  'smart.clothing.tshirt': 'تی‌شرت یا لباس سبک',

  // SmartFeaturesCard — UV advice
  'smart.uv.high': 'عینک آفتابی و ضدآفتاب SPF 30+ استفاده کنید',
  'smart.uv.medium': 'عینک آفتابی و ضدآفتاب توصیه می‌شود',
  'smart.uv.light': 'محافظت سبک در برابر آفتاب توصیه می‌شود',
  'smart.uv.none': 'نیازی به محافظت در برابر آفتاب نیست',

  // SmartFeaturesCard — mask advice
  'smart.mask.wear': 'در فضای باز ماسک بزنید',
  'smart.mask.consider': 'استفاده از ماسک را در نظر بگیرید',
  'smart.mask.none': 'نیازی به ماسک نیست',

  // SmartFeaturesCard — air quality levels
  'smart.air.good': 'کیفیت هوا خوب است',
  'smart.air.moderate': 'کیفیت هوا متوسط است',
  'smart.air.sensitive': 'ناسالم برای گروه‌های حساس',
  'smart.air.unhealthy': 'کیفیت هوا ناسالم است',

  // SmartFeaturesCard — hourly detail modals
  'smart.dailyAirQuality': 'کیفیت هوای روزانه',
  'smart.aqiValue': 'AQI {value}',
  'smart.hourlyRain': 'پیش‌بینی ساعتی باران',
  'smart.hourlyTemperature': 'دمای ساعتی',
  'smart.hourlyUvIndex': 'شاخص UV ساعتی',
  'smart.now': 'اکنون',
  'smart.tempC': '{temp}°C',
  'smart.uvValue': 'UV {value}',
  'smart.uvLevel.veryHigh': 'خیلی زیاد',
  'smart.uvLevel.high': 'زیاد',
  'smart.uvLevel.moderate': 'متوسط',
  'smart.uvLevel.low': 'کم',

  // SmartFeaturesCard — astronomy
  'smart.astronomy': 'نجوم',
  'smart.sunTimes': 'اوقات خورشید',
  'smart.sunriseSunset': 'طلوع: {sunrise} • غروب: {sunset}',
  'smart.daylightLabel': 'طول روز: {duration}',
  'smart.daylightDuration': '{hours} ساعت و {minutes} دقیقه',
  'smart.dailySunTimes': 'اوقات روزانه خورشید',
  'smart.moonPhases': 'فازهای ماه',
  'smart.moonPhase': 'فاز ماه',
  'smart.illumination': 'روشنایی: {percent}%',
  'smart.illuminationUnavailable': 'روشنایی: داده در دسترس نیست',
  'smart.illuminatedPercent': '{percent}% روشن',

  // SmartFeaturesCard — moon phase names
  'smart.moon.newMoon': 'ماه نو',
  'smart.moon.waxingCrescent': 'هلال فزاینده',
  'smart.moon.firstQuarter': 'تربیع اول',
  'smart.moon.waxingGibbous': 'کوژماه فزاینده',
  'smart.moon.fullMoon': 'ماه کامل',
  'smart.moon.waningGibbous': 'کوژماه کاهنده',
  'smart.moon.lastQuarter': 'تربیع آخر',
  'smart.moon.waningCrescent': 'هلال کاهنده',

  // WeatherDetailModal — titles
  'detail.title.humidity': 'روند رطوبت',
  'detail.title.wind': 'روند سرعت باد',
  'detail.title.uv': 'روند شاخص UV',
  'detail.title.pressure': 'فشار هوا',
  'detail.title.windDir': 'جهت باد',
  'detail.title.visibility': 'روند دید',
  'detail.title.airquality': 'شاخص کیفیت هوا',
  'detail.title.default': 'جزئیات آب‌وهوا',

  // WeatherDetailModal — descriptions
  'detail.desc.humidity': 'سطح رطوبت نسبی در 12 ساعت آینده. مقادیر بالاتر نشان‌دهنده رطوبت بیشتر هواست.',
  'detail.desc.wind': 'تغییرات سرعت باد در طول روز. به برنامه‌ریزی فعالیت‌های بیرون از خانه کمک می‌کند.',
  'detail.desc.uv': 'پیش‌بینی شاخص UV که شدت آفتاب را نشان می‌دهد. در مقادیر بالای 3 از محافظت آفتابی استفاده کنید.',
  'detail.desc.pressure': 'تغییرات فشار هوا می‌تواند نشانه تغییر الگوهای جوی باشد.',
  'detail.desc.windDir': 'جهت و سرعت فعلی باد همراه با نمایش قطب‌نما.',
  'detail.desc.visibility': 'شرایط دید بر رانندگی، فعالیت‌های بیرونی و ایمنی پرواز اثر می‌گذارد. دید خوب نشانه شرایط جوی مساعد است.',
  'detail.desc.airquality': 'شاخص کیفیت هوا میزان آلودگی هوا را می‌سنجد. مقادیر پایین‌تر یعنی هوای پاک‌تر.',

  // WeatherDetailModal — current values
  'detail.windDirAt': '{direction} با سرعت {speed} کیلومتر/ساعت',
  'detail.na': 'نامشخص',

  // WeatherDetailModal — health tips
  'detail.tipTitle': 'نکته',
  'detail.tip.humidityHigh': 'رطوبت بالا - آب کافی بنوشید و خنک بمانید',
  'detail.tip.humidityLow': 'رطوبت پایین - از مرطوب‌کننده استفاده کنید و آب بنوشید',
  'detail.tip.humidityComfort': 'سطح رطوبت مطلوب است',
  'detail.tip.windStrong': 'باد شدید - اشیای سبک را محکم کنید',
  'detail.tip.windModerate': 'باد متوسط - مناسب فعالیت‌های بیرونی',
  'detail.tip.windLight': 'باد ملایم - عالی برای هر برنامه بیرونی',
  'detail.tip.uvVeryHigh': 'UV خیلی زیاد - ضدآفتاب SPF 30+ بزنید',
  'detail.tip.uvHigh': 'UV زیاد - محافظت آفتابی را در نظر بگیرید',
  'detail.tip.uvModerate': 'UV متوسط - محافظت سبک توصیه می‌شود',
  'detail.tip.uvLow': 'UV کم - نیاز به محافظت اندک',
  'detail.tip.pressureHigh': 'فشار بالا - انتظار هوای پایدار می‌رود',
  'detail.tip.pressureLow': 'فشار پایین - احتمال تغییر هوا وجود دارد',
  'detail.tip.pressureNormal': 'فشار عادی - شرایط پایدار',
  'detail.tip.windDir': 'باد از سمت {direction} می‌وزد',
  'detail.tip.visibilityExcellent': 'دید عالی - مناسب همه فعالیت‌ها',
  'detail.tip.visibilityGood': 'دید خوب - رانندگی و فعالیت بیرونی ایمن است',
  'detail.tip.visibilityReduced': 'دید کاهش‌یافته - با احتیاط برانید و چراغ‌ها را روشن کنید',
  'detail.tip.visibilityPoor': 'دید ضعیف - از سفر غیرضروری بپرهیزید و بسیار محتاط باشید',
  'detail.tip.aqiGood': 'کیفیت هوا خوب - فعالیت بیرونی بی‌خطر است',
  'detail.tip.aqiModerate': 'متوسط - برای بیشتر افراد قابل قبول',
  'detail.tip.aqiSensitive': 'ناسالم برای گروه‌های حساس - فعالیت طولانی در بیرون را محدود کنید',
  'detail.tip.aqiUnhealthy': 'ناسالم - همه باید فعالیت بیرونی را محدود کنند',
  'detail.tip.aqiVeryUnhealthy': 'بسیار ناسالم - از فعالیت بیرونی بپرهیزید',

  // WeatherDetailModal — insight cards
  'detail.insight.humidityTitle': '🌡️ راهنمای آسایش رطوبتی',
  'detail.insight.humidityBody':
    '• زیر 30%: خیلی خشک - ممکن است پوست یا گلو را تحریک کند\n' +
    '• 30-50%: محدوده آسایش ایدئال - شرایط عالی\n' +
    '• 50-65%: برای بیشتر افراد راحت\n' +
    '• 65-75%: کمی مرطوب - ممکن است گرم حس شود\n' +
    '• بالای 75%: بسیار مرطوب - هوای دم‌کرده و شرجی',
  'detail.insight.windTitle': 'راهنمای سرعت باد',
  'detail.insight.windBody':
    '• 0-5 کیلومتر/ساعت: آرام - دود عمودی بالا می‌رود\n' +
    '• 6-11 کیلومتر/ساعت: هوای سبک - برگ‌ها به‌آرامی خش‌خش می‌کنند\n' +
    '• 12-19 کیلومتر/ساعت: نسیم سبک - عالی برای فعالیت‌های بیرونی\n' +
    '• 20-28 کیلومتر/ساعت: نسیم ملایم - شاخه‌ها تکان می‌خورند و پرچم‌ها به اهتزاز درمی‌آیند\n' +
    '• 29-38 کیلومتر/ساعت: باد متوسط - درختان کوچک تاب می‌خورند\n' +
    '• 39-49 کیلومتر/ساعت: باد نسبتاً تند - شاخه‌های بزرگ حرکت می‌کنند\n' +
    '• 50-61 کیلومتر/ساعت: باد تند - استفاده از چتر دشوار است\n' +
    '• 62+ کیلومتر/ساعت: باد شدید - از فعالیت بیرونی بپرهیزید',
  'detail.insight.uvTitle': '☀️ راهنمای شاخص UV',
  'detail.insight.uvBody':
    '• 0-2: کم - نیازی به محافظت نیست\n' +
    '• 3-5: متوسط - هنگام ظهر در سایه بمانید\n' +
    '• 6-7: زیاد - محافظت لازم است\n' +
    '• 8-10: خیلی زیاد - محافظت بیشتری لازم است\n' +
    '• 11+: بسیار شدید - از قرار گرفتن در آفتاب بپرهیزید',
  'detail.insight.pressureTitle': 'روند فشار',
  'detail.insight.pressureBody':
    '• فشار رو به افزایش: هوای خوب در راه است\n' +
    '• فشار رو به کاهش: احتمال طوفان\n' +
    '• فشار پایدار: شرایط ثابت\n' +
    '• محدوده عادی: 1000-1020 هکتوپاسکال',
  'detail.insight.visibilityTitle': '👁️ راهنمای دید',
  'detail.insight.visibilityBody':
    '• 10+ کیلومتر: عالی - مناسب همه فعالیت‌ها\n' +
    '• 5-10 کیلومتر: خوب - شرایط رانندگی ایمن\n' +
    '• 2-5 کیلومتر: متوسط - احتیاط کنید و چراغ‌ها را روشن کنید\n' +
    '• 1-2 کیلومتر: ضعیف - شرایط رانندگی خطرناک\n' +
    '• کمتر از 1 کیلومتر: بسیار ضعیف - در صورت امکان از سفر بپرهیزید',
  'detail.insight.airTitle': '🌫️ جزئیات کیفیت هوا',
  'detail.air.currentAqi': 'AQI فعلی: {value}',
  'detail.air.pollutantValue': '{name}: {value} μg/m³',
  'detail.air.scaleTitle': 'مقیاس AQI:',
  'detail.air.scaleBody':
    '• 0-50: خوب - کیفیت هوا رضایت‌بخش است\n' +
    '• 51-100: متوسط - برای بیشتر افراد قابل قبول\n' +
    '• 101-150: ناسالم برای گروه‌های حساس\n' +
    '• 151-200: ناسالم - ممکن است همه اثراتی را تجربه کنند\n' +
    '• 201-300: بسیار ناسالم - هشدار سلامتی\n' +
    '• 301+: خطرناک - شرایط اضطراری',

  // RealCompass
  'compass.title': 'قطب‌نما',
  'compass.windLabel': 'باد: {direction}',
  'compass.deviceHeading': 'جهت دستگاه: {value}°',
  'compass.instruction': 'برای بهترین دقت: گوشی را صاف نگه دارید، از اجسام فلزی دور باشید و برای کالیبره شدن، آن را به شکل عدد 8 حرکت دهید',

  // RealCompass — calibration status
  'compass.status.initializing': 'در حال راه‌اندازی...',
  'compass.status.noSensorsStatic': 'حسگرها در دسترس نیستند - نمایش قطب‌نمای ثابت',
  'compass.status.calibratingDevice': 'در حال کالیبره کردن حسگرهای دستگاه...',
  'compass.status.calibratedDevice': '✓ کالیبره شد - قطب‌نمای واقعی فعال است',
  'compass.status.calibratingMagnetometer': 'در حال کالیبره کردن مغناطیس‌سنج...',
  'compass.status.calibratedMagnetometer': '✓ کالیبره شد - مغناطیس‌سنج فعال است',
  'compass.status.noSensors': '⚠️ حسگری در دسترس نیست - قطب‌نمای ثابت',
  'compass.status.sensorError': '⚠️ خطای حسگر - قطب‌نمای ثابت',

  // RealCompass — heading accuracy
  'compass.accuracy.high': '● دقت زیاد',
  'compass.accuracy.medium': '● دقت متوسط',
  'compass.accuracy.low': '● دقت کم - از اجسام فلزی فاصله بگیرید',

  // RealCompass — cardinal directions (16-wind)
  'compass.dir.n': 'شمال',
  'compass.dir.nne': 'شمال شمال‌شرقی',
  'compass.dir.ne': 'شمال‌شرقی',
  'compass.dir.ene': 'شرق شمال‌شرقی',
  'compass.dir.e': 'شرق',
  'compass.dir.ese': 'شرق جنوب‌شرقی',
  'compass.dir.se': 'جنوب‌شرقی',
  'compass.dir.sse': 'جنوب جنوب‌شرقی',
  'compass.dir.s': 'جنوب',
  'compass.dir.ssw': 'جنوب جنوب‌غربی',
  'compass.dir.sw': 'جنوب‌غربی',
  'compass.dir.wsw': 'غرب جنوب‌غربی',
  'compass.dir.w': 'غرب',
  'compass.dir.wnw': 'غرب شمال‌غربی',
  'compass.dir.nw': 'شمال‌غربی',
  'compass.dir.nnw': 'شمال شمال‌غربی',

  // Share — fallback location name
  'share.currentLocation': 'موقعیت فعلی',

  // Share — buttons
  'share.quickShare': 'اشتراک سریع',
  'share.customizeShare': 'اشتراک سفارشی',
  'share.shareButton': 'اشتراک‌گذاری گزارش آب‌وهوا',

  // Share — options modal
  'share.optionsTitle': 'گزینه‌های اشتراک‌گذاری',
  'share.contentSection': 'محتوای گزارش',
  'share.detailsSection': 'جزئیات آب‌وهوا',
  'share.option.location': 'موقعیت',
  'share.option.locationSubtitle': 'گنجاندن نام مکان در گزارش اشتراکی',
  'share.option.current': 'وضعیت فعلی هوا',
  'share.option.currentSubtitle': 'دما و وضعیت فعلی',
  'share.option.hourly': 'پیش‌بینی ساعتی',
  'share.option.hourlySubtitle': 'پیش‌بینی 12 ساعت آینده',
  'share.option.daily': 'پیش‌بینی روزانه',
  'share.option.dailySubtitle': 'پیش‌بینی 7 روزه آب‌وهوا',
  'share.option.astronomy': 'نجوم',
  'share.option.astronomySubtitle': 'طلوع، غروب و فاز ماه',
  'share.option.feelsLike': 'دمای محسوس',
  'share.option.humidity': 'رطوبت',
  'share.option.pressure': 'فشار هوا',
  'share.option.visibility': 'دید',
  'share.option.uv': 'شاخص UV',
  'share.option.wind': 'اطلاعات باد',

  // Share — share sheet title and errors
  'share.shareTitle': 'گزارش آب‌وهوا - {location}',
  'share.errorTitle': 'خطای اشتراک‌گذاری',
  'share.errorMessage': 'اشتراک‌گذاری داده‌های آب‌وهوا ناموفق بود',

  // Share — generated share text
  'share.text.header': 'گزارش آب‌وهوا',
  'share.text.location': 'موقعیت: {location}',
  'share.text.currentWeather': 'وضعیت فعلی هوا:',
  'share.text.temperature': 'دما: {temp}',
  'share.text.feelsLike': '(دمای محسوس {temp})',
  'share.text.condition': 'وضعیت: {condition}',
  'share.text.humidity': 'رطوبت: {humidity}%',
  'share.text.pressure': 'فشار: {pressure} هکتوپاسکال',
  'share.text.visibility': 'دید: {visibility} کیلومتر',
  'share.text.uvIndex': 'شاخص UV: {uvIndex}',
  'share.text.wind': 'باد: {speed} کیلومتر/ساعت {direction}',
  'share.text.next12Hours': '12 ساعت آینده:',
  'share.text.nextHours': 'ساعات آینده:',
  'share.text.hourLine': '{time}: {temp} - {condition}',
  'share.text.dailyForecast': 'پیش‌بینی روزهای آینده:',
  'share.text.dayLine': '{day}: {max}/{min} - {condition}',
  'share.text.rainChance': '({chance}% باران)',
  'share.text.astronomy': 'نجوم:',
  'share.text.sunrise': 'طلوع آفتاب: {time}',
  'share.text.sunset': 'غروب آفتاب: {time}',
  'share.text.moon': 'ماه: {phase}',
  'share.text.moonIllumination': '({percent}% روشن)',
  'share.text.footer': 'ارسال‌شده از WeatherWell',

  // Share — temperature formats
  'share.text.tempC': '{temp}°C',
  'share.text.tempF': '{temp}°F',

  // Notifications — Android notification channels
  'notif.channel.weatherAlerts': 'هشدارهای آب‌وهوا',
  'notif.channel.dailyForecast': 'پیش‌بینی روزانه',

  // Notifications — time-of-day markers
  'notif.time.am': 'ق.ظ',
  'notif.time.pm': 'ب.ظ',

  // Notifications — daily forecast
  'notif.daily.title': '📅 پیش‌بینی روزانه آب‌وهوا',
  'notif.daily.fallbackTitle': '🌤️ پیش‌بینی روزانه آب‌وهوا',
  'notif.daily.fallbackBody': 'برای دیدن پیش‌بینی کامل امروز، WeatherWell را باز کنید.',
  'notif.daily.today': 'امروز: {high}°/{low}°، {condition}',
  'notif.daily.tomorrow': 'فردا: {high}°/{low}°، {condition}',
  'notif.daily.rainChance': '🌧️ {chance}% باران',
  'notif.daily.highUv': '☀️ UV زیاد ({uv})',
  'notif.daily.strongWind': '💨 باد شدید {speed} کیلومتر/ساعت',
  'notif.daily.heavyRain': '🌊 باران شدید {mm} میلی‌متر',

  // Notifications — hourly forecast
  'notif.hourly.title': '⏰ هوای ساعات آینده',
  'notif.hourly.updateTitle': '⏰ به‌روزرسانی ساعتی هوا',
  'notif.hourly.fallbackBody': 'برای بررسی پیش‌بینی چند ساعت آینده، WeatherWell را باز کنید.',
  'notif.hourly.rainAt': '🌧️ باران در ساعت {times}',
  'notif.hourly.windUpTo': '💨 باد تا {speed} کیلومتر/ساعت',

  // Notifications — umbrella / rain alerts
  'notif.umbrella.title': '☂️ هشدار چتر',
  'notif.umbrella.body': '{chance}% احتمال باران در راه است. چترتان را فراموش نکنید!',
  'notif.umbrella.upcomingBody': '{chance}% احتمال باران حدود ساعت {time}. چترتان را فراموش نکنید!',

  // Notifications — wind alerts
  'notif.wind.title': '💨 هشدار باد شدید',
  'notif.wind.body': 'سرعت باد {speed} کیلومتر/ساعت است. در فضای باز احتیاط کنید.',
  'notif.wind.expectedTitle': '💨 باد شدید در راه است',
  'notif.wind.expectedBody': 'حدود ساعت {time} بادهایی تا سرعت {speed} کیلومتر/ساعت پیش‌بینی می‌شود.',

  // Notifications — UV alerts
  'notif.uv.title': '☀️ هشدار UV زیاد',
  'notif.uv.body': 'شاخص UV برابر {uv} است - ضدآفتاب بزنید و لباس محافظ بپوشید!',
  'notif.uv.indexTitle': '☀️ هشدار شاخص UV',
  'notif.uv.indexBody': 'شاخص UV برابر {uv} ({level}) است. ضدآفتاب بزنید و لباس محافظ بپوشید!',
  'notif.uv.expectedTitle': '☀️ UV زیاد در راه است',
  'notif.uv.expectedBody': 'حدود ساعت {time} شاخص UV برابر {uv} پیش‌بینی می‌شود. ضدآفتاب بزنید!',
  'notif.uvLevel.extreme': 'بسیار شدید',
  'notif.uvLevel.veryHigh': 'خیلی زیاد',
  'notif.uvLevel.high': 'زیاد',

  // Notifications — temperature alerts
  'notif.temp.highTitle': '🔥 هشدار دمای بالا',
  'notif.temp.lowTitle': '🥶 هشدار دمای پایین',
  'notif.temp.highBody': 'دما {temp}°C است، بالاتر از آستانه {threshold}°C شما',
  'notif.temp.lowBody': 'دما {temp}°C است، پایین‌تر از آستانه {threshold}°C شما',
  'notif.temp.highAlertTitle': '🔥 هشدار گرما',
  'notif.temp.highAlertBody': 'دما {temp}°C است. آب کافی بنوشید و از ماندن طولانی زیر آفتاب بپرهیزید.',
  'notif.temp.lowAlertTitle': '❄️ هشدار سرما',
  'notif.temp.lowAlertBody': 'دما {temp}°C است. لباس گرم بپوشید و گرم بمانید!',
  'notif.temp.aheadHighTitle': '🔥 گرما در راه است',
  'notif.temp.aheadHighBody': 'حدود ساعت {time} دمای {temp}°C پیش‌بینی می‌شود. آب کافی بنوشید!',
  'notif.temp.aheadLowTitle': '❄️ سرما در راه است',
  'notif.temp.aheadLowBody': 'حدود ساعت {time} دمای {temp}°C پیش‌بینی می‌شود. گرم بپوشید!',

  // Notifications — air quality alerts
  'notif.aqi.title': '🌫️ هشدار کیفیت هوا',
  'notif.aqi.body': 'AQI برابر {aqi} ({level}) است. فعالیت‌های بیرون از خانه را محدود کنید.',
  'notif.aqiLevel.hazardous': 'خطرناک',
  'notif.aqiLevel.veryUnhealthy': 'بسیار ناسالم',
  'notif.aqiLevel.unhealthy': 'ناسالم',
  'notif.aqiLevel.sensitive': 'ناسالم برای گروه‌های حساس',

  // Notifications — severe weather alerts
  'notif.severe.title': '🚨 هشدار {type}',
  'notif.severe.windDetected': '💨 باد شدید مشاهده شد: {speed} کیلومتر/ساعت. در فضای باز احتیاط کنید.',
  'notif.severe.conditionsDetected': '{emoji} شرایط {type} در {location} مشاهده شد. مراقب باشید!',
  'notif.severe.bgTitle': '{emoji} هوای شدید: {type}',
  'notif.severe.bgBody': '{type} در منطقه شما مشاهده شد. اقدامات احتیاطی لازم را انجام دهید.',
  'notif.severe.expectedTitle': '{emoji} {type} به‌زودی در راه است',
  'notif.severe.expectedBody': '{type} حدود ساعت {time} پیش‌بینی می‌شود. احتیاط کنید.',
  'notif.severeType.thunderstorm': 'رعد و برق',
  'notif.severeType.heavyRain': 'باران شدید',
  'notif.severeType.snow': 'برف',
  'notif.severeType.hail': 'تگرگ',
  'notif.severeType.fog': 'مه',
  'notif.severeType.strongWind': 'باد شدید',

  // Widget
  'widget.openAppToLoad': 'برای بارگیری آب‌وهوا برنامه را باز کنید',
  'widget.feels': 'محسوس {value}',
  'widget.high': 'ب: {value}',
  'widget.low': 'ک: {value}',
  'widget.tapToOpen': 'برای باز کردن WeatherWell ضربه بزنید',
  'widget.tomorrow': 'فردا',
  'widget.tomorrowCondition': 'فردا: {condition}',
};
