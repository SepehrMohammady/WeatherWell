/** Simplified Chinese (简体中文) translations. */
export const zh: Record<string, string> = {
  // Common
  'common.ok': '确定',
  'common.cancel': '取消',
  'common.close': '关闭',
  'common.retry': '重试',
  'common.loading': '加载中...',
  'common.error': '错误',
  'common.save': '保存',
  'common.reset': '重置',
  'common.notAvailable': '暂无数据',

  // Canonical weather conditions (keyed by ConditionCode)
  'conditions.clear': '晴',
  'conditions.clear.night': '晴夜',
  'conditions.partly': '晴间多云',
  'conditions.cloudy': '多云',
  'conditions.overcast': '阴',
  'conditions.fog': '雾',
  'conditions.drizzle': '毛毛雨',
  'conditions.rain': '雨',
  'conditions.heavy-rain': '大雨',
  'conditions.sleet': '雨夹雪',
  'conditions.snow': '雪',
  'conditions.heavy-snow': '大雪',
  'conditions.hail': '冰雹',
  'conditions.thunder': '雷暴',
  'conditions.thunder-rain': '雷阵雨',
  'conditions.windy': '大风',

  // Language picker (language names are endonyms — identical in every dictionary)
  'language.title': '语言',
  'language.system': '跟随系统',
  'language.en': 'English',
  'language.zh': '中文',
  'language.es': 'Español',
  'language.hi': 'हिन्दी',
  'language.ar': 'العربية',
  'language.fa': 'فارسی',
  'language.it': 'Italiano',
  'language.restartTitle': '需要重启',
  'language.restartMessage': '请关闭并重新打开 WeatherWell 以应用新的界面方向。',

  // Tutorial
  'tutorial.title': '欢迎使用 WeatherWell',
  'tutorial.skip': '跳过',
  'tutorial.next': '下一步',
  'tutorial.back': '上一步',
  'tutorial.done': '开始使用',
  'tutorial.sectionTitle': '教程',
  'tutorial.settingsRow': '应用教程',
  'tutorial.settingsRowSubtitle': '重新观看 WeatherWell 的功能介绍',
  'tutorial.page1.title': '你的天气，由你做主',
  'tutorial.page1.body': 'WeatherWell 为您的位置提供实时天气、逐小时和7天预报——无广告，保护隐私。',
  'tutorial.page2.title': '搜索并固定地点',
  'tutorial.page2.body': '搜索任意城市并将其固定为主位置。应用和小部件会跟随固定的地点；取消固定即可回到当前位置。',
  'tutorial.page3.title': '选择数据源',
  'tutorial.page3.body': '从六家天气服务商中任选其一、并排对比，或自定义组合——每项指标都来自您最信任的服务商。',
  'tutorial.page4.title': '智能功能',
  'tutorial.page4.body': '获取穿衣建议、雨伞提醒、空气质量、天文数据和天气预警——还有主屏幕小部件。',
  'tutorial.page5.title': '个性定制',
  'tutorial.page5.body': '五种主题色、浅色与深色模式、天气动画和多语言支持。所有选项均在设置中。',

  // Settings — header
  'settings.title': '设置',

  // Settings — appearance
  'settings.appearance': '外观',
  'settings.modeSystem': '跟随系统',
  'settings.modeLight': '浅色',
  'settings.modeDark': '深色',
  'settings.weatherAnimations': '天气动画',
  'settings.weatherAnimationsSubtitle': '主界面的雨、雪和云动态效果',
  'settings.themeColor': '主题色',

  // Settings — weather data / provider
  'settings.weatherData': '天气数据',
  'settings.weatherProvider': '天气服务商',
  'settings.providerWeatherApiDesc': 'WeatherAPI - 最准确，天文数据齐全',
  'settings.providerOpenWeatherMapDesc': 'OpenWeatherMap - 预报可靠，天文数据有限',
  'settings.providerVisualCrossingDesc': 'Visual Crossing - 数据良好，无天文数据',
  'settings.providerOpenMeteoDesc': 'Open-Meteo - 免费，无月相数据',
  'settings.providerQWeatherDesc': '⚠ QWeather - 可能需要付费套餐',
  'settings.providerMeteostatDesc': '⚠ Meteostat - 仅历史数据，不适用于预报',
  'settings.providerCustomDesc': '自定义 - 为下方每项指标选择服务商',
  'settings.providerCustom': '自定义（混合服务商）',
  'settings.providerHint': 'WA WeatherAPI · OW OpenWeather · VC Visual Crossing · OM Open-Meteo · QW QWeather · MS Meteostat',

  // Settings — custom source metric labels
  'settings.metricForecast': '预报（逐小时和逐日）',
  'settings.metricTemperature': '气温',
  'settings.metricCondition': '天气状况',
  'settings.metricHumidity': '湿度',
  'settings.metricWind': '风',
  'settings.metricPressure': '气压',
  'settings.metricUvIndex': '紫外线指数',
  'settings.metricVisibility': '能见度',
  'settings.metricAirQuality': '空气质量',
  'settings.metricAstronomy': '天文',

  // Settings — units and refresh
  'settings.temperatureUnit': '温度单位',
  'settings.refreshInterval': '刷新间隔',
  'settings.refreshIntervalSubtitle': '每 {minutes} 分钟更新一次',
  'settings.minutesShort': '{minutes}分',

  // Settings — API keys
  'settings.weatherApiKey': 'WeatherAPI 密钥',
  'settings.openWeatherMapKey': 'OpenWeatherMap 密钥',
  'settings.visualCrossingKey': 'Visual Crossing 密钥',
  'settings.qweatherKey': 'QWeather 密钥',
  'settings.meteostatKey': 'Meteostat 密钥（RapidAPI）',
  'settings.customKeyConfigured': '已配置自定义密钥',
  'settings.usingDefaultKey': '使用默认密钥',
  'settings.apiKeyModalSubtitle': '输入您的 API 密钥，留空则使用演示密钥',
  'settings.apiKeyPlaceholder': '输入 API 密钥...',
  'settings.apiKeyUpdated': 'API 密钥更新成功',

  // Settings — display options
  'settings.displayOptions': '显示选项',
  'settings.showFeelsLike': '显示体感温度',
  'settings.showHumidity': '显示湿度',
  'settings.showPressure': '显示气压',
  'settings.showVisibility': '显示能见度',
  'settings.showUvIndex': '显示紫外线指数',
  'settings.showWindSpeed': '显示风速',
  'settings.showWindDirection': '显示风向',
  'settings.showAirQuality': '显示空气质量',

  // Settings — notifications
  'settings.notifications': '通知',
  'settings.notificationNote': '定时提醒（每日/逐小时）会在您设定的时间发送。\n动态预警按刷新间隔（{minutes} 分钟）检查，并在恶劣天气来临前提醒。',
  'settings.enableNotifications': '启用通知',
  'settings.enableNotificationsSubtitle': '开启/关闭所有定时和动态天气提醒',
  'settings.severeWeatherAlerts': '恶劣天气预警',
  'settings.severeWeatherAlertsSubtitle': '雷暴、大雨、降雪和冰雹预警',
  'settings.dailyForecast': '每日预报',
  'settings.dailyForecastSubtitle': '每天 {time} 定时发送天气概况和贴心建议',
  'settings.hourlyForecast': '逐小时预报',
  'settings.hourlyForecastSubtitle': '每天 {time} 发送未来6小时降雨和气温信息',
  'settings.temperatureAlerts': '气温提醒',
  'settings.temperatureAlertsSubtitle': '气温低于 {low}°C 或高于 {high}°C 时提醒',
  'settings.tempLowShort': '低:{value}°',
  'settings.tempHighShort': '高:{value}°',
  'settings.uvAlerts': '紫外线提醒',
  'settings.uvAlertsSubtitle': '紫外线指数达到 {value}+ 时提醒，保护您的皮肤',
  'settings.umbrellaAlerts': '雨伞提醒',
  'settings.umbrellaAlertsSubtitle': '降雨概率达到 {value}% 以上时提醒您带伞',
  'settings.windAlerts': '大风提醒',
  'settings.windAlertsSubtitle': '风速超过 {value} km/h 时提醒',
  'settings.aqiAlerts': '空气质量提醒',
  'settings.aqiAlertsSubtitle': 'AQI 达到 {value}+（不健康水平）时提醒',
  'settings.percentValue': '{value}%',

  // Settings — time picker modal
  'settings.dailyForecastTimeTitle': '每日预报时间',
  'settings.hourlyForecastTimeTitle': '逐小时预报时间',

  // Settings — threshold editor modal
  'settings.thresholdRain': '降雨阈值（%）',
  'settings.thresholdWind': '风速阈值（km/h）',
  'settings.thresholdUv': '紫外线指数阈值',
  'settings.thresholdTempHigh': '高温阈值（°C）',
  'settings.thresholdTempLow': '低温阈值（°C）',
  'settings.thresholdAqi': 'AQI 阈值',
  'settings.thresholdModalSubtitle': '输入触发提醒的阈值',
  'settings.thresholdPlaceholder': '输入数值...',
  'settings.invalidValueTitle': '数值无效',
  'settings.invalidValueMessage': '请输入有效数字',

  // Settings — widget
  'settings.homeScreenWidget': '主屏幕小部件',
  'settings.addWidget': '添加小部件到主屏幕',
  'settings.addWidgetSubtitle': '点按直接添加天气小部件',
  'settings.widgetAlertTitle': '小部件',
  'settings.widgetPinHint': '添加方法：长按主屏幕 → 小部件 → WeatherWell',
  'settings.widgetOpacity': '小部件不透明度',
  'settings.widgetShowFeelsLike': '显示体感温度',
  'settings.widgetShowFeelsLikeSubtitle': '显示体感温度数值',
  'settings.widgetShowHighLow': '显示最高/最低温',
  'settings.widgetShowHighLowSubtitle': '显示每日最高和最低气温',
  'settings.widgetShowRainChance': '显示降雨概率',
  'settings.widgetShowRainChanceSubtitle': '显示降水概率',
  'settings.widgetShowConditions': '显示天气状况',
  'settings.widgetShowConditionsSubtitle': '显示天气状况文字',
  'settings.widgetShowTomorrow': '显示明日预报',
  'settings.widgetShowTomorrowSubtitle': '显示明天的最高/最低温预报',

  // Settings — privacy
  'settings.privacy': '隐私',
  'settings.shareLocation': '分享天气时包含位置',
  'settings.shareLocationSubtitle': '分享天气时附带位置信息',

  // Settings — advanced (backup / reset)
  'settings.advanced': '高级',
  'settings.exportBackup': '导出备份',
  'settings.exportBackupSubtitle': '保存所有设置和收藏',
  'settings.importBackup': '导入备份',
  'settings.importBackupSubtitle': '恢复设置和收藏',
  'settings.resetToDefaults': '恢复默认设置',
  'settings.resetToDefaultsSubtitle': '将所有设置恢复为初始值',
  'settings.successTitle': '成功',
  'settings.resetTitle': '重置设置',
  'settings.resetConfirm': '确定要将所有设置恢复为默认值吗？',
  'settings.resetDone': '设置已恢复为默认值',
  'settings.exportDialogTitle': '导出 WeatherWell 备份',
  'settings.backupExported': '备份导出成功',
  'settings.sharingUnavailable': '此设备不支持分享',
  'settings.exportFailed': '导出备份失败：{error}',
  'settings.unknownError': '未知错误',
  'settings.backupRestored': '备份已恢复（设置和收藏）',
  'settings.restoreFailed': '从备份恢复设置失败',
  'settings.settingsImported': '设置导入成功',
  'settings.invalidBackupFile': '备份文件无效',
  'settings.importFailed': '导入备份失败。请确认选择的是有效的 .weatherwell 文件。',

  // Settings — testers
  'settings.testers': '测试人员',
  'settings.testersThanks': '感谢你们宝贵的反馈！',

  // Settings — about
  'settings.about': '关于',
  'settings.appTagline': '无广告天气预报',
  'settings.version': '版本',
  'settings.developer': '开发者',
  'settings.privacyPolicy': '隐私政策',
  'settings.privacyPolicySubtitle': '不收集或分享任何个人数据',

  // Settings — more from SeMo Lab
  'settings.moreFromSemoLab': 'SeMo Lab 的更多应用',
  'settings.feedwellDesc': '无广告 RSS 阅读器，纯净阅读无干扰。',
  'settings.ledgerwellDesc': '记录个人借入借出，支持多币种。',
  'settings.allSemoLabApps': '全部 SeMo Lab 应用',
  'settings.allSemoLabAppsSubtitle': '在 Google Play 查看我们的所有作品',

  // Settings — footer
  'settings.footerText': 'WeatherWell 以隐私优先的方式提供准确的天气预报，不收集或分享任何个人数据。',
  'settings.copyright': '© 2026 SeMo Lab',

  // HomeScreen
  'home.loadingTitle': '正在加载 WeatherWell...',
  'home.loadingSubtext': '正在获取您的位置和天气数据',
  'home.errorTitle': '⚠️ 错误',
  'home.tryAgain': '再试一次',
  'home.retry': '重试',
  'home.noWeatherData': '暂无天气数据',
  'home.locationPermissionRequired': '需要位置权限才能获取天气数据',
  'home.failedToLoad': '天气数据加载失败',
  'home.currentLocation': '当前位置',
  'home.locationFormat': '{name}，{country}',
  'home.pinned': '已固定',
  'home.pinAsMain': '固定为主位置',
  'home.useCurrentLocation': '使用当前位置',

  // SearchScreen
  'search.title': '搜索地点',
  'search.placeholder': '搜索城市或地点...',
  'search.searching': '正在搜索地点...',
  'search.noResults': '未找到与“{query}”相关的地点',
  'search.tryDifferent': '试试其他关键词',
  'search.favoritePlaces': '收藏地点',
  'search.recentSearches': '最近搜索',
  'search.clearAll': '全部清除',
  'search.searchResults': '搜索结果',
  'search.popularCities': '与您的搜索匹配的热门城市',
  'search.searchAnyLocation': '搜索任意地点',
  'search.startTyping': '输入即可查找全球城市',
  'search.regionCountry': '{region}，{country}',
  'search.clearRecentTitle': '清除最近搜索',
  'search.clearRecentMessage': '确定要清除所有最近搜索记录吗？',
  'search.clear': '清除',

  // Compare
  'compare.title': '服务商对比',
  'compare.hint': '点按服务商即可将其设为天气数据源',
  'compare.inUse': '使用中',
  'compare.unavailable': '暂时不可用',
  'compare.humidityValue': '{value}%',
  'compare.windValue': '{value} km/h',
  'compare.aqiValue': 'AQI {value}',

  // Weather — section titles
  'weather.hourlyForecast': '逐小时预报',
  'weather.dailyForecast': '未来预报',

  // Weather — relative day/time labels
  'weather.now': '现在',
  'weather.today': '今天',
  'weather.tomorrow': '明天',

  // Weather — current conditions card
  'weather.feelsLike': '体感 {temp}',
  'weather.humidity': '湿度',
  'weather.wind': '风速',
  'weather.uvIndex': '紫外线指数',
  'weather.pressure': '气压',
  'weather.windDir': '风向',
  'weather.visibility': '能见度',
  'weather.airQuality': '空气质量',

  // Weather — unit-bearing value formats
  'weather.percentValue': '{value}%',
  'weather.kmhValue': '{value} km/h',
  'weather.hpaValue': '{value} hPa',
  'weather.kmValue': '{value} km',
  'weather.aqiValue': 'AQI {value}',

  // SmartFeaturesCard — sections and cards
  'smart.recommendations': '生活建议',
  'smart.umbrellaAlert': '雨伞提醒',
  'smart.umbrellaChance': '未来24小时降雨概率最高 {percent}%',
  'smart.clothingSuggestion': '穿衣建议',
  'smart.tempFeelsLike': '{temp}°C，体感 {feels}°C',
  'smart.uvProtection': '防晒建议',
  'smart.uvIndexLabel': '紫外线指数：{value}',
  'smart.airQuality': '空气质量',
  'smart.aqiPmDetail': 'AQI：{aqi} • PM2.5：{pm25}μg/m³',
  'smart.na': '暂无',

  // SmartFeaturesCard — umbrella advice
  'smart.umbrella.definitely': '今天务必带伞！',
  'smart.umbrella.consider': '建议带上雨伞',
  'smart.umbrella.none': '今天无需带伞',

  // SmartFeaturesCard — clothing suggestions
  'smart.clothing.winter': '厚冬衣、围巾、手套',
  'smart.clothing.jacket': '夹克或保暖毛衣',
  'smart.clothing.sweater': '薄毛衣或长袖',
  'smart.clothing.tshirt': 'T恤或轻薄衣物',

  // SmartFeaturesCard — UV advice
  'smart.uv.high': '佩戴太阳镜并涂 SPF 30+ 防晒霜',
  'smart.uv.medium': '建议佩戴太阳镜和防晒霜',
  'smart.uv.light': '建议做轻度防晒',
  'smart.uv.none': '无需防晒',

  // SmartFeaturesCard — mask advice
  'smart.mask.wear': '外出请佩戴口罩',
  'smart.mask.consider': '建议佩戴口罩',
  'smart.mask.none': '无需佩戴口罩',

  // SmartFeaturesCard — air quality levels
  'smart.air.good': '空气质量优',
  'smart.air.moderate': '空气质量良',
  'smart.air.sensitive': '对敏感人群不健康',
  'smart.air.unhealthy': '空气质量不健康',

  // SmartFeaturesCard — hourly detail modals
  'smart.dailyAirQuality': '每日空气质量',
  'smart.aqiValue': 'AQI {value}',
  'smart.hourlyRain': '逐小时降雨预报',
  'smart.hourlyTemperature': '逐小时气温',
  'smart.hourlyUvIndex': '逐小时紫外线指数',
  'smart.now': '现在',
  'smart.tempC': '{temp}°C',
  'smart.uvValue': 'UV {value}',
  'smart.uvLevel.veryHigh': '很高',
  'smart.uvLevel.high': '高',
  'smart.uvLevel.moderate': '中等',
  'smart.uvLevel.low': '低',

  // SmartFeaturesCard — astronomy
  'smart.astronomy': '天文',
  'smart.sunTimes': '日出日落',
  'smart.sunriseSunset': '日出：{sunrise} • 日落：{sunset}',
  'smart.daylightLabel': '白昼时长：{duration}',
  'smart.daylightDuration': '{hours}小时{minutes}分',
  'smart.dailySunTimes': '每日日出日落',
  'smart.moonPhases': '月相',
  'smart.moonPhase': '月相',
  'smart.illumination': '照亮比例：{percent}%',
  'smart.illuminationUnavailable': '照亮比例：暂无数据',
  'smart.illuminatedPercent': '照亮 {percent}%',

  // SmartFeaturesCard — moon phase names
  'smart.moon.newMoon': '新月',
  'smart.moon.waxingCrescent': '娥眉月',
  'smart.moon.firstQuarter': '上弦月',
  'smart.moon.waxingGibbous': '盈凸月',
  'smart.moon.fullMoon': '满月',
  'smart.moon.waningGibbous': '亏凸月',
  'smart.moon.lastQuarter': '下弦月',
  'smart.moon.waningCrescent': '残月',

  // WeatherDetailModal — titles
  'detail.title.humidity': '湿度趋势',
  'detail.title.wind': '风速趋势',
  'detail.title.uv': '紫外线指数趋势',
  'detail.title.pressure': '大气压',
  'detail.title.windDir': '风向',
  'detail.title.visibility': '能见度趋势',
  'detail.title.airquality': '空气质量指数',
  'detail.title.default': '天气详情',

  // WeatherDetailModal — descriptions
  'detail.desc.humidity': '未来12小时的相对湿度变化。数值越高，空气中的水汽越多。',
  'detail.desc.wind': '全天风速变化，便于安排户外活动。',
  'detail.desc.uv': '紫外线指数预报，反映日照强度。数值高于3时请注意防晒。',
  'detail.desc.pressure': '大气压的变化可能预示天气形势转变。',
  'detail.desc.windDir': '当前风向和风速，并以罗盘直观显示。',
  'detail.desc.visibility': '能见度影响驾驶、户外活动和飞行安全。能见度好通常意味着天气良好。',
  'detail.desc.airquality': '空气质量指数（AQI）衡量空气污染程度，数值越低空气质量越好。',

  // WeatherDetailModal — current values
  'detail.windDirAt': '{direction}风 {speed} km/h',
  'detail.na': '暂无',

  // WeatherDetailModal — health tips
  'detail.tipTitle': '小贴士',
  'detail.tip.humidityHigh': '湿度高 - 注意补水降温',
  'detail.tip.humidityLow': '湿度低 - 请使用保湿霜并多喝水',
  'detail.tip.humidityComfort': '湿度舒适',
  'detail.tip.windStrong': '风力强 - 请固定易被吹落的物品',
  'detail.tip.windModerate': '风力适中 - 适合户外活动',
  'detail.tip.windLight': '微风 - 适合任何户外安排',
  'detail.tip.uvVeryHigh': '紫外线很强 - 请涂 SPF 30+ 防晒霜',
  'detail.tip.uvHigh': '紫外线强 - 建议防晒',
  'detail.tip.uvModerate': '紫外线中等 - 建议轻度防晒',
  'detail.tip.uvLow': '紫外线弱 - 基本无需防护',
  'detail.tip.pressureHigh': '高气压 - 天气预计稳定',
  'detail.tip.pressureLow': '低气压 - 天气可能变化',
  'detail.tip.pressureNormal': '气压正常 - 天气稳定',
  'detail.tip.windDir': '风从{direction}方向吹来',
  'detail.tip.visibilityExcellent': '能见度极佳 - 适合各类活动',
  'detail.tip.visibilityGood': '能见度好 - 驾驶和户外活动安全',
  'detail.tip.visibilityReduced': '能见度下降 - 小心驾驶，开启车灯',
  'detail.tip.visibilityPoor': '能见度差 - 避免不必要的出行，务必谨慎',
  'detail.tip.aqiGood': '空气质量优 - 可放心户外活动',
  'detail.tip.aqiModerate': '良 - 对多数人可接受',
  'detail.tip.aqiSensitive': '对敏感人群不健康 - 减少长时间户外活动',
  'detail.tip.aqiUnhealthy': '不健康 - 所有人都应减少户外活动',
  'detail.tip.aqiVeryUnhealthy': '非常不健康 - 避免户外活动',

  // WeatherDetailModal — insight cards
  'detail.insight.humidityTitle': '🌡️ 湿度舒适度指南',
  'detail.insight.humidityBody':
    '• 低于30%：过于干燥 - 可能引起皮肤/咽喉不适\n' +
    '• 30-50%：理想舒适区间\n' +
    '• 50-65%：多数人感觉舒适\n' +
    '• 65-75%：略潮湿 - 可能感觉闷热\n' +
    '• 高于75%：非常潮湿 - 闷热黏腻',
  'detail.insight.windTitle': '风速指南',
  'detail.insight.windBody':
    '• 0-5 km/h：无风 - 烟垂直上升\n' +
    '• 6-11 km/h：软风 - 树叶轻微作响\n' +
    '• 12-19 km/h：轻风 - 适合户外活动\n' +
    '• 20-28 km/h：微风 - 树枝摇动，旗帜飘动\n' +
    '• 29-38 km/h：和风 - 小树摇摆\n' +
    '• 39-49 km/h：清风 - 大枝摇动\n' +
    '• 50-61 km/h：强风 - 举伞困难\n' +
    '• 62+ km/h：大风 - 避免户外活动',
  'detail.insight.uvTitle': '☀️ 紫外线指数指南',
  'detail.insight.uvBody':
    '• 0-2：低 - 无需防护\n' +
    '• 3-5：中等 - 正午请寻找阴凉\n' +
    '• 6-7：高 - 需要防护\n' +
    '• 8-10：很高 - 需加强防护\n' +
    '• 11+：极高 - 避免日晒',
  'detail.insight.pressureTitle': '气压趋势',
  'detail.insight.pressureBody':
    '• 气压上升：天气转好\n' +
    '• 气压下降：可能有风雨\n' +
    '• 气压平稳：天气稳定\n' +
    '• 正常范围：1000-1020 hPa',
  'detail.insight.visibilityTitle': '👁️ 能见度指南',
  'detail.insight.visibilityBody':
    '• 10+ km：极佳 - 适合各类活动\n' +
    '• 5-10 km：好 - 驾驶安全\n' +
    '• 2-5 km：中等 - 请谨慎，开启车灯\n' +
    '• 1-2 km：差 - 驾驶危险\n' +
    '• <1 km：极差 - 尽量避免出行',
  'detail.insight.airTitle': '🌫️ 空气质量详情',
  'detail.air.currentAqi': '当前 AQI：{value}',
  'detail.air.pollutantValue': '{name}：{value} μg/m³',
  'detail.air.scaleTitle': 'AQI 等级：',
  'detail.air.scaleBody':
    '• 0-50：优 - 空气质量令人满意\n' +
    '• 51-100：良 - 对多数人可接受\n' +
    '• 101-150：对敏感人群不健康\n' +
    '• 151-200：不健康 - 所有人都可能受影响\n' +
    '• 201-300：非常不健康 - 健康警报\n' +
    '• 301+：危险 - 紧急状况',

  // RealCompass
  'compass.title': '罗盘',
  'compass.windLabel': '风向：{direction}',
  'compass.deviceHeading': '设备朝向：{value}°',
  'compass.instruction': '为获得最佳精度：将手机水平放置，远离金属物体，并按8字形晃动校准',

  // RealCompass — calibration status
  'compass.status.initializing': '正在初始化...',
  'compass.status.noSensorsStatic': '传感器不可用 - 显示静态罗盘',
  'compass.status.calibratingDevice': '正在校准设备传感器...',
  'compass.status.calibratedDevice': '✓ 校准完成 - 真实罗盘已启用',
  'compass.status.calibratingMagnetometer': '正在校准磁力计...',
  'compass.status.calibratedMagnetometer': '✓ 校准完成 - 磁力计已启用',
  'compass.status.noSensors': '⚠️ 无可用传感器 - 静态罗盘',
  'compass.status.sensorError': '⚠️ 传感器错误 - 静态罗盘',

  // RealCompass — heading accuracy
  'compass.accuracy.high': '● 精度高',
  'compass.accuracy.medium': '● 精度中等',
  'compass.accuracy.low': '● 精度低 - 请远离金属物体',

  // RealCompass — cardinal directions (16-wind)
  'compass.dir.n': '北',
  'compass.dir.nne': '东北偏北',
  'compass.dir.ne': '东北',
  'compass.dir.ene': '东北偏东',
  'compass.dir.e': '东',
  'compass.dir.ese': '东南偏东',
  'compass.dir.se': '东南',
  'compass.dir.sse': '东南偏南',
  'compass.dir.s': '南',
  'compass.dir.ssw': '西南偏南',
  'compass.dir.sw': '西南',
  'compass.dir.wsw': '西南偏西',
  'compass.dir.w': '西',
  'compass.dir.wnw': '西北偏西',
  'compass.dir.nw': '西北',
  'compass.dir.nnw': '西北偏北',

  // Share — fallback location name
  'share.currentLocation': '当前位置',

  // Share — buttons
  'share.quickShare': '快速分享',
  'share.customizeShare': '自定义分享',
  'share.shareButton': '分享天气报告',

  // Share — options modal
  'share.optionsTitle': '分享选项',
  'share.contentSection': '包含内容',
  'share.detailsSection': '天气详情',
  'share.option.location': '位置',
  'share.option.locationSubtitle': '分享天气时包含位置名称',
  'share.option.current': '当前天气',
  'share.option.currentSubtitle': '气温和当前天气状况',
  'share.option.hourly': '逐小时预报',
  'share.option.hourlySubtitle': '未来12小时预报',
  'share.option.daily': '每日预报',
  'share.option.dailySubtitle': '7天天气预报',
  'share.option.astronomy': '天文',
  'share.option.astronomySubtitle': '日出、日落和月相',
  'share.option.feelsLike': '体感温度',
  'share.option.humidity': '湿度',
  'share.option.pressure': '大气压',
  'share.option.visibility': '能见度',
  'share.option.uv': '紫外线指数',
  'share.option.wind': '风力信息',

  // Share — share sheet title and errors
  'share.shareTitle': '天气报告 - {location}',
  'share.errorTitle': '分享出错',
  'share.errorMessage': '分享天气数据失败',

  // Share — generated share text
  'share.text.header': '天气报告',
  'share.text.location': '位置：{location}',
  'share.text.currentWeather': '当前天气：',
  'share.text.temperature': '气温：{temp}',
  'share.text.feelsLike': '（体感 {temp}）',
  'share.text.condition': '天气：{condition}',
  'share.text.humidity': '湿度：{humidity}%',
  'share.text.pressure': '气压：{pressure} hPa',
  'share.text.visibility': '能见度：{visibility} km',
  'share.text.uvIndex': '紫外线指数：{uvIndex}',
  'share.text.wind': '风：{speed} km/h {direction}',
  'share.text.next12Hours': '未来12小时：',
  'share.text.nextHours': '未来数小时：',
  'share.text.hourLine': '{time}：{temp} - {condition}',
  'share.text.dailyForecast': '未来预报：',
  'share.text.dayLine': '{day}：{max}/{min} - {condition}',
  'share.text.rainChance': '（降雨概率 {chance}%）',
  'share.text.astronomy': '天文：',
  'share.text.sunrise': '日出：{time}',
  'share.text.sunset': '日落：{time}',
  'share.text.moon': '月相：{phase}',
  'share.text.moonIllumination': '（照亮 {percent}%）',
  'share.text.footer': '来自 WeatherWell 的分享',

  // Share — temperature formats
  'share.text.tempC': '{temp}°C',
  'share.text.tempF': '{temp}°F',

  // Notifications — Android notification channels
  'notif.channel.weatherAlerts': '天气预警',
  'notif.channel.dailyForecast': '每日预报',

  // Notifications — time-of-day markers
  'notif.time.am': '上午',
  'notif.time.pm': '下午',

  // Notifications — daily forecast
  'notif.daily.title': '📅 每日天气预报',
  'notif.daily.fallbackTitle': '🌤️ 每日天气预报',
  'notif.daily.fallbackBody': '打开 WeatherWell 查看今天的完整预报。',
  'notif.daily.today': '今天：{high}°/{low}°，{condition}',
  'notif.daily.tomorrow': '明天：{high}°/{low}°，{condition}',
  'notif.daily.rainChance': '🌧️ 降雨概率 {chance}%',
  'notif.daily.highUv': '☀️ 紫外线强（{uv}）',
  'notif.daily.strongWind': '💨 大风 {speed} km/h',
  'notif.daily.heavyRain': '🌊 强降雨 {mm}mm',

  // Notifications — hourly forecast
  'notif.hourly.title': '⏰ 未来数小时天气',
  'notif.hourly.updateTitle': '⏰ 逐小时天气更新',
  'notif.hourly.fallbackBody': '打开 WeatherWell 查看未来几小时的预报。',
  'notif.hourly.rainAt': '🌧️ {times} 有雨',
  'notif.hourly.windUpTo': '💨 风速最高 {speed} km/h',

  // Notifications — umbrella / rain alerts
  'notif.umbrella.title': '☂️ 雨伞提醒',
  'notif.umbrella.body': '即将降雨，概率 {chance}%。别忘了带伞！',
  'notif.umbrella.upcomingBody': '{time} 前后降雨概率 {chance}%。别忘了带伞！',

  // Notifications — wind alerts
  'notif.wind.title': '💨 大风预警',
  'notif.wind.body': '当前风速 {speed} km/h，户外请注意安全。',
  'notif.wind.expectedTitle': '💨 预计有大风',
  'notif.wind.expectedBody': '{time} 前后预计风速可达 {speed} km/h。',

  // Notifications — UV alerts
  'notif.uv.title': '☀️ 强紫外线预警',
  'notif.uv.body': '紫外线指数为 {uv} - 请涂防晒霜并穿防晒衣物！',
  'notif.uv.indexTitle': '☀️ 紫外线指数提醒',
  'notif.uv.indexBody': '紫外线指数为 {uv}（{level}）。请涂防晒霜并穿防晒衣物！',
  'notif.uv.expectedTitle': '☀️ 预计紫外线强',
  'notif.uv.expectedBody': '{time} 前后紫外线指数预计达 {uv}，请提前防晒！',
  'notif.uvLevel.extreme': '极高',
  'notif.uvLevel.veryHigh': '很高',
  'notif.uvLevel.high': '高',

  // Notifications — temperature alerts
  'notif.temp.highTitle': '🔥 高温提醒',
  'notif.temp.lowTitle': '🥶 低温提醒',
  'notif.temp.highBody': '当前气温 {temp}°C，已超过您设定的 {threshold}°C 阈值',
  'notif.temp.lowBody': '当前气温 {temp}°C，已低于您设定的 {threshold}°C 阈值',
  'notif.temp.highAlertTitle': '🔥 高温预警',
  'notif.temp.highAlertBody': '当前气温 {temp}°C。请多补水，避免长时间日晒。',
  'notif.temp.lowAlertTitle': '❄️ 低温预警',
  'notif.temp.lowAlertBody': '当前气温 {temp}°C。请注意保暖！',
  'notif.temp.aheadHighTitle': '🔥 即将高温',
  'notif.temp.aheadHighBody': '{time} 前后预计 {temp}°C，注意补水！',
  'notif.temp.aheadLowTitle': '❄️ 即将降温',
  'notif.temp.aheadLowBody': '{time} 前后预计 {temp}°C，注意保暖！',

  // Notifications — air quality alerts
  'notif.aqi.title': '🌫️ 空气质量预警',
  'notif.aqi.body': 'AQI 为 {aqi}（{level}）。建议减少户外活动。',
  'notif.aqiLevel.hazardous': '危险',
  'notif.aqiLevel.veryUnhealthy': '非常不健康',
  'notif.aqiLevel.unhealthy': '不健康',
  'notif.aqiLevel.sensitive': '对敏感人群不健康',

  // Notifications — severe weather alerts
  'notif.severe.title': '🚨 {type}预警',
  'notif.severe.windDetected': '💨 检测到强风：{speed} km/h。户外请注意安全。',
  'notif.severe.conditionsDetected': '{emoji} {location}出现{type}天气，注意安全！',
  'notif.severe.bgTitle': '{emoji} 恶劣天气：{type}',
  'notif.severe.bgBody': '您所在地区出现{type}，请做好防范。',
  'notif.severe.expectedTitle': '{emoji} {type}即将来临',
  'notif.severe.expectedBody': '{time} 前后预计有{type}，请做好防范。',
  'notif.severeType.thunderstorm': '雷暴',
  'notif.severeType.heavyRain': '大雨',
  'notif.severeType.snow': '降雪',
  'notif.severeType.hail': '冰雹',
  'notif.severeType.fog': '大雾',
  'notif.severeType.strongWind': '大风',

  // Widget
  'widget.openAppToLoad': '打开应用加载天气',
  'widget.feels': '体感 {value}',
  'widget.high': '高: {value}',
  'widget.low': '低: {value}',
  'widget.tapToOpen': '点按打开 WeatherWell',
  'widget.tomorrow': '明天',
  'widget.tomorrowCondition': '明天：{condition}',
};
