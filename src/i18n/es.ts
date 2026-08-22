/** Spanish translations. */
export const es: Record<string, string> = {
  // Common
  'common.ok': 'OK',
  'common.cancel': 'Cancelar',
  'common.close': 'Cerrar',
  'common.retry': 'Reintentar',
  'common.loading': 'Cargando...',
  'common.error': 'Error',
  'common.save': 'Guardar',
  'common.reset': 'Restablecer',
  'common.notAvailable': 'Datos no disponibles',

  // Canonical weather conditions
  'conditions.clear': 'Despejado',
  'conditions.clear.night': 'Noche despejada',
  'conditions.partly': 'Parcialmente nublado',
  'conditions.cloudy': 'Nublado',
  'conditions.overcast': 'Cubierto',
  'conditions.fog': 'Niebla',
  'conditions.drizzle': 'Llovizna',
  'conditions.rain': 'Lluvia',
  'conditions.heavy-rain': 'Lluvia intensa',
  'conditions.sleet': 'Aguanieve',
  'conditions.snow': 'Nieve',
  'conditions.heavy-snow': 'Nevada intensa',
  'conditions.hail': 'Granizo',
  'conditions.thunder': 'Tormenta eléctrica',
  'conditions.thunder-rain': 'Tormenta con lluvia',
  'conditions.windy': 'Ventoso',

  // Language picker (names are endonyms — identical in every dictionary)
  'language.title': 'Idioma',
  'language.system': 'Sistema',
  'language.en': 'English',
  'language.zh': '中文',
  'language.es': 'Español',
  'language.hi': 'हिन्दी',
  'language.ar': 'العربية',
  'language.fa': 'فارسی',
  'language.it': 'Italiano',
  'language.restartTitle': 'Reinicio necesario',
  'language.restartMessage': 'Cierra y vuelve a abrir WeatherWell para aplicar la nueva dirección de la interfaz.',

  // Tutorial
  'tutorial.title': 'Bienvenido a WeatherWell',
  'tutorial.skip': 'Omitir',
  'tutorial.next': 'Siguiente',
  'tutorial.back': 'Atrás',
  'tutorial.done': 'Comenzar',
  'tutorial.sectionTitle': 'Tutorial',
  'tutorial.settingsRow': 'Tutorial de la app',
  'tutorial.settingsRowSubtitle': 'Vuelve a ver la introducción a WeatherWell',
  'tutorial.page1.title': 'Tu clima, a tu manera',
  'tutorial.page1.body': 'WeatherWell muestra las condiciones actuales y pronósticos por hora y de 7 días para tu ubicación, sin anuncios y respetando tu privacidad.',
  'tutorial.page2.title': 'Busca y fija ubicaciones',
  'tutorial.page2.body': 'Busca cualquier ciudad y fíjala como tu ubicación principal. La app y el widget seguirán el lugar fijado; quita el pin para volver a tu ubicación actual.',
  'tutorial.page3.title': 'Elige tu proveedor',
  'tutorial.page3.body': 'Elige entre seis proveedores de clima, compáralos lado a lado o crea una mezcla personalizada: cada métrica del proveedor en el que más confías.',
  'tutorial.page4.title': 'Funciones inteligentes',
  'tutorial.page4.body': 'Recibe sugerencias de ropa, recordatorios de paraguas, calidad del aire, datos astronómicos y alertas meteorológicas, además de un widget para la pantalla de inicio.',
  'tutorial.page5.title': 'Hazla tuya',
  'tutorial.page5.body': 'Temas en cinco colores de acento, modos claro y oscuro, animaciones de clima y varios idiomas. Encuentra todo en Ajustes.',

  // Settings — header
  'settings.title': 'Ajustes',

  // Settings — appearance
  'settings.appearance': 'Apariencia',
  'settings.modeSystem': 'Sistema',
  'settings.modeLight': 'Claro',
  'settings.modeDark': 'Oscuro',
  'settings.weatherAnimations': 'Animaciones de clima',
  'settings.weatherAnimationsSubtitle': 'Efectos ambientales de lluvia, nieve y nubes en la pantalla principal',
  'settings.themeColor': 'Color del tema',

  // Settings — weather data / provider
  'settings.weatherData': 'Datos meteorológicos',
  'settings.weatherProvider': 'Proveedor de clima',
  'settings.providerWeatherApiDesc': 'WeatherAPI - El más preciso, con datos astronómicos completos',
  'settings.providerOpenWeatherMapDesc': 'OpenWeatherMap - Pronósticos confiables, astronomía limitada',
  'settings.providerVisualCrossingDesc': 'Visual Crossing - Buenos datos, sin astronomía',
  'settings.providerOpenMeteoDesc': 'Open-Meteo - Gratuito, sin datos de fase lunar',
  'settings.providerQWeatherDesc': '⚠ QWeather - Puede requerir un plan de pago',
  'settings.providerMeteostatDesc': '⚠ Meteostat - Solo datos históricos, no sirve para pronósticos',
  'settings.providerCustomDesc': 'Personalizado - Elige un proveedor para cada métrica más abajo',
  'settings.providerCustom': 'Personalizado (mezclar proveedores)',
  'settings.providerHint': 'WA WeatherAPI · OW OpenWeather · VC Visual Crossing · OM Open-Meteo · QW QWeather · MS Meteostat',

  // Settings — custom source metric labels
  'settings.metricForecast': 'Pronóstico (por hora y diario)',
  'settings.metricTemperature': 'Temperatura',
  'settings.metricCondition': 'Condición',
  'settings.metricHumidity': 'Humedad',
  'settings.metricWind': 'Viento',
  'settings.metricPressure': 'Presión',
  'settings.metricUvIndex': 'Índice UV',
  'settings.metricVisibility': 'Visibilidad',
  'settings.metricAirQuality': 'Calidad del aire',
  'settings.metricAstronomy': 'Astronomía',

  // Settings — units and refresh
  'settings.temperatureUnit': 'Unidad de temperatura',
  'settings.refreshInterval': 'Intervalo de actualización',
  'settings.refreshIntervalSubtitle': 'Actualizar cada {minutes} minutos',
  'settings.minutesShort': '{minutes} min',

  // Settings — API keys
  'settings.weatherApiKey': 'Clave de WeatherAPI',
  'settings.openWeatherMapKey': 'Clave de OpenWeatherMap',
  'settings.visualCrossingKey': 'Clave de Visual Crossing',
  'settings.qweatherKey': 'Clave de QWeather',
  'settings.meteostatKey': 'Clave de Meteostat (RapidAPI)',
  'settings.customKeyConfigured': 'Clave personalizada configurada',
  'settings.usingDefaultKey': 'Usando la clave predeterminada',
  'settings.apiKeyModalSubtitle': 'Ingresa tu clave de API o deja el campo vacío para usar la clave de demostración',
  'settings.apiKeyPlaceholder': 'Ingresar clave de API...',
  'settings.apiKeyUpdated': 'Clave de API actualizada correctamente',

  // Settings — display options
  'settings.displayOptions': 'Opciones de visualización',
  'settings.showFeelsLike': 'Mostrar sensación térmica',
  'settings.showHumidity': 'Mostrar humedad',
  'settings.showPressure': 'Mostrar presión',
  'settings.showVisibility': 'Mostrar visibilidad',
  'settings.showUvIndex': 'Mostrar índice UV',
  'settings.showWindSpeed': 'Mostrar velocidad del viento',
  'settings.showWindDirection': 'Mostrar dirección del viento',
  'settings.showAirQuality': 'Mostrar calidad del aire',

  // Settings — notifications
  'settings.notifications': 'Notificaciones',
  'settings.notificationNote': 'Las alertas programadas (diaria/por hora) se envían a la hora que elijas.\nLas alertas dinámicas se comprueban según tu intervalo de actualización ({minutes} min) y avisan antes de condiciones peligrosas.',
  'settings.enableNotifications': 'Activar notificaciones',
  'settings.enableNotificationsSubtitle': 'Activa o desactiva todas las alertas meteorológicas programadas y dinámicas',
  'settings.severeWeatherAlerts': 'Alertas de clima severo',
  'settings.severeWeatherAlertsSubtitle': 'Avisa sobre tormentas eléctricas, lluvia intensa, nieve y granizo',
  'settings.dailyForecast': 'Pronóstico diario',
  'settings.dailyForecastSubtitle': 'Resumen diario programado a las {time} con condiciones y consejos',
  'settings.hourlyForecast': 'Pronóstico por hora',
  'settings.hourlyForecastSubtitle': 'Panorama de 6 horas programado a las {time} con lluvia y temperatura',
  'settings.temperatureAlerts': 'Alertas de temperatura',
  'settings.temperatureAlertsSubtitle': 'Alerta cuando la temperatura baja de {low}°C o supera {high}°C',
  'settings.tempLowShort': 'Mín:{value}°',
  'settings.tempHighShort': 'Máx:{value}°',
  'settings.uvAlerts': 'Alertas de índice UV',
  'settings.uvAlertsSubtitle': 'Avisa cuando el índice UV llega a {value}+ para proteger tu piel',
  'settings.umbrellaAlerts': 'Alertas de paraguas',
  'settings.umbrellaAlertsSubtitle': 'Te recuerda llevar paraguas cuando la probabilidad de lluvia alcanza {value}%+',
  'settings.windAlerts': 'Alertas de viento',
  'settings.windAlertsSubtitle': 'Avisa cuando la velocidad del viento supera {value} km/h',
  'settings.aqiAlerts': 'Alertas de calidad del aire',
  'settings.aqiAlertsSubtitle': 'Alerta cuando el AQI llega a {value}+ (niveles dañinos)',
  'settings.percentValue': '{value}%',

  // Settings — time picker modal
  'settings.dailyForecastTimeTitle': 'Hora del pronóstico diario',
  'settings.hourlyForecastTimeTitle': 'Hora del pronóstico por hora',

  // Settings — threshold editor modal
  'settings.thresholdRain': 'Umbral de lluvia (%)',
  'settings.thresholdWind': 'Umbral de velocidad del viento (km/h)',
  'settings.thresholdUv': 'Umbral de índice UV',
  'settings.thresholdTempHigh': 'Umbral de temperatura alta (°C)',
  'settings.thresholdTempLow': 'Umbral de temperatura baja (°C)',
  'settings.thresholdAqi': 'Umbral de AQI',
  'settings.thresholdModalSubtitle': 'Ingresa el valor umbral para las alertas',
  'settings.thresholdPlaceholder': 'Ingresar valor...',
  'settings.invalidValueTitle': 'Valor no válido',
  'settings.invalidValueMessage': 'Ingresa un número válido',

  // Settings — widget
  'settings.homeScreenWidget': 'Widget de pantalla de inicio',
  'settings.addWidget': 'Agregar widget a la pantalla de inicio',
  'settings.addWidgetSubtitle': 'Toca para agregar el widget del clima directamente',
  'settings.widgetAlertTitle': 'Widget',
  'settings.widgetPinHint': 'Para agregar el widget, mantén pulsada la pantalla de inicio → Widgets → WeatherWell',
  'settings.widgetOpacity': 'Opacidad del widget',
  'settings.widgetShowFeelsLike': 'Mostrar sensación térmica',
  'settings.widgetShowFeelsLikeSubtitle': 'Muestra la temperatura de sensación',
  'settings.widgetShowHighLow': 'Mostrar máxima/mínima',
  'settings.widgetShowHighLowSubtitle': 'Muestra las temperaturas máxima y mínima del día',
  'settings.widgetShowRainChance': 'Mostrar probabilidad de lluvia',
  'settings.widgetShowRainChanceSubtitle': 'Muestra la probabilidad de precipitación',
  'settings.widgetShowConditions': 'Mostrar condiciones',
  'settings.widgetShowConditionsSubtitle': 'Muestra el texto de la condición del clima',
  'settings.widgetShowTomorrow': 'Mostrar mañana',
  'settings.widgetShowTomorrowSubtitle': 'Muestra la máxima/mínima prevista para mañana',

  // Settings — privacy
  'settings.privacy': 'Privacidad',
  'settings.shareLocation': 'Compartir ubicación en los datos del clima',
  'settings.shareLocationSubtitle': 'Incluir la ubicación al compartir el clima',

  // Settings — advanced (backup / reset)
  'settings.advanced': 'Avanzado',
  'settings.exportBackup': 'Exportar copia de seguridad',
  'settings.exportBackupSubtitle': 'Guarda todos los ajustes y favoritos',
  'settings.importBackup': 'Importar copia de seguridad',
  'settings.importBackupSubtitle': 'Restaura ajustes y favoritos',
  'settings.resetToDefaults': 'Restablecer valores predeterminados',
  'settings.resetToDefaultsSubtitle': 'Restablece todos los ajustes a sus valores originales',
  'settings.successTitle': 'Listo',
  'settings.resetTitle': 'Restablecer ajustes',
  'settings.resetConfirm': '¿Seguro que quieres restablecer todos los ajustes a los valores predeterminados?',
  'settings.resetDone': 'Ajustes restablecidos a los valores predeterminados',
  'settings.exportDialogTitle': 'Exportar copia de seguridad de WeatherWell',
  'settings.backupExported': 'Copia de seguridad exportada correctamente',
  'settings.sharingUnavailable': 'Compartir no está disponible en este dispositivo',
  'settings.exportFailed': 'No se pudo exportar la copia de seguridad: {error}',
  'settings.unknownError': 'Error desconocido',
  'settings.backupRestored': 'Copia de seguridad restaurada (ajustes y favoritos)',
  'settings.restoreFailed': 'No se pudieron restaurar los ajustes desde la copia de seguridad',
  'settings.settingsImported': 'Ajustes importados correctamente',
  'settings.invalidBackupFile': 'Archivo de copia de seguridad no válido',
  'settings.importFailed': 'No se pudo importar la copia de seguridad. Asegúrate de seleccionar un archivo .weatherwell válido.',

  // Settings — testers
  'settings.testers': 'Probadores',
  'settings.testersThanks': '¡Gracias por sus valiosos comentarios!',

  // Settings — about
  'settings.about': 'Acerca de',
  'settings.appTagline': 'Pronósticos del clima sin anuncios',
  'settings.version': 'Versión',
  'settings.developer': 'Desarrollador',
  'settings.privacyPolicy': 'Política de privacidad',
  'settings.privacyPolicySubtitle': 'No se recopilan ni comparten datos personales',

  // Settings — more from SeMo Lab
  'settings.moreFromSemoLab': 'Más de SeMo Lab',
  'settings.feedwellDesc': 'Lector RSS sin anuncios. Lectura limpia, sin distracciones.',
  'settings.ledgerwellDesc': 'Controla deudas y créditos personales, con varias monedas.',
  'settings.allSemoLabApps': 'Todas las apps de SeMo Lab',
  'settings.allSemoLabAppsSubtitle': 'Descubre todo lo que hacemos en Google Play',

  // Settings — footer
  'settings.footerText': 'WeatherWell ofrece pronósticos del clima precisos con la privacidad como prioridad. No se recopilan ni comparten datos personales.',
  'settings.copyright': '© 2026 SeMo Lab',

  // HomeScreen
  'home.loadingTitle': 'Cargando WeatherWell...',
  'home.loadingSubtext': 'Obteniendo tu ubicación y datos del clima',
  'home.errorTitle': '⚠️ Error',
  'home.tryAgain': 'Intentar de nuevo',
  'home.retry': 'Reintentar',
  'home.noWeatherData': 'No hay datos del clima disponibles',
  'home.locationPermissionRequired': 'Se requiere permiso de ubicación para obtener los datos del clima',
  'home.failedToLoad': 'No se pudieron cargar los datos del clima',
  'home.currentLocation': 'Ubicación actual',
  'home.locationFormat': '{name}, {country}',
  'home.pinned': 'Fijada',
  'home.pinAsMain': 'Fijar como principal',
  'home.useCurrentLocation': 'Usar ubicación actual',

  // SearchScreen
  'search.title': 'Buscar ubicación',
  'search.placeholder': 'Busca una ciudad o ubicación...',
  'search.searching': 'Buscando ubicaciones...',
  'search.noResults': 'No se encontraron ubicaciones para "{query}"',
  'search.tryDifferent': 'Prueba con otro término de búsqueda',
  'search.favoritePlaces': 'Lugares favoritos',
  'search.recentSearches': 'Búsquedas recientes',
  'search.clearAll': 'Borrar todo',
  'search.searchResults': 'Resultados de búsqueda',
  'search.popularCities': 'Ciudades populares que coinciden con tu búsqueda',
  'search.searchAnyLocation': 'Busca cualquier ubicación',
  'search.startTyping': 'Empieza a escribir para encontrar ciudades de todo el mundo',
  'search.regionCountry': '{region}, {country}',
  'search.clearRecentTitle': 'Borrar búsquedas recientes',
  'search.clearRecentMessage': '¿Seguro que quieres borrar todas las búsquedas recientes?',
  'search.clear': 'Borrar',

  // Compare
  'compare.title': 'Comparar proveedores',
  'compare.hint': 'Toca un proveedor para usarlo como tu fuente de clima',
  'compare.inUse': 'En uso',
  'compare.unavailable': 'No disponible por ahora',
  'compare.humidityValue': '{value}%',
  'compare.windValue': '{value} km/h',
  'compare.aqiValue': 'AQI {value}',

  // Weather — section titles
  'weather.hourlyForecast': 'Pronóstico por hora',
  'weather.dailyForecast': 'Próximos días',

  // Weather — relative day/time labels
  'weather.now': 'Ahora',
  'weather.today': 'Hoy',
  'weather.tomorrow': 'Mañana',

  // Weather — current conditions card
  'weather.feelsLike': 'Sensación de {temp}',
  'weather.humidity': 'Humedad',
  'weather.wind': 'Viento',
  'weather.uvIndex': 'Índice UV',
  'weather.pressure': 'Presión',
  'weather.windDir': 'Dir. viento',
  'weather.visibility': 'Visibilidad',
  'weather.airQuality': 'Calidad del aire',

  // Weather — unit-bearing value formats
  'weather.percentValue': '{value}%',
  'weather.kmhValue': '{value} km/h',
  'weather.hpaValue': '{value} hPa',
  'weather.kmValue': '{value} km',
  'weather.aqiValue': 'AQI {value}',

  // SmartFeaturesCard — sections and cards
  'smart.recommendations': 'Recomendaciones',
  'smart.umbrellaAlert': 'Alerta de paraguas',
  'smart.umbrellaChance': 'Hasta {percent}% de probabilidad de lluvia en las próximas 24 horas',
  'smart.clothingSuggestion': 'Sugerencia de ropa',
  'smart.tempFeelsLike': '{temp}°C, sensación de {feels}°C',
  'smart.uvProtection': 'Protección UV',
  'smart.uvIndexLabel': 'Índice UV: {value}',
  'smart.airQuality': 'Calidad del aire',
  'smart.aqiPmDetail': 'AQI: {aqi} • PM2.5: {pm25}μg/m³',
  'smart.na': 'N/D',

  // SmartFeaturesCard — umbrella advice
  'smart.umbrella.definitely': '¡Lleva paraguas sin falta!',
  'smart.umbrella.consider': 'Considera llevar paraguas',
  'smart.umbrella.none': 'Hoy no necesitas paraguas',

  // SmartFeaturesCard — clothing suggestions
  'smart.clothing.winter': 'Abrigo de invierno, bufanda y guantes',
  'smart.clothing.jacket': 'Chaqueta o suéter abrigado',
  'smart.clothing.sweater': 'Suéter ligero o manga larga',
  'smart.clothing.tshirt': 'Camiseta o ropa ligera',

  // SmartFeaturesCard — UV advice
  'smart.uv.high': 'Usa lentes de sol y protector solar FPS 30+',
  'smart.uv.medium': 'Considera lentes de sol y protector solar',
  'smart.uv.light': 'Se recomienda protección solar ligera',
  'smart.uv.none': 'No se necesita protección solar',

  // SmartFeaturesCard — mask advice
  'smart.mask.wear': 'Usa mascarilla al aire libre',
  'smart.mask.consider': 'Considera usar mascarilla',
  'smart.mask.none': 'No se necesita mascarilla',

  // SmartFeaturesCard — air quality levels
  'smart.air.good': 'La calidad del aire es buena',
  'smart.air.moderate': 'Calidad del aire moderada',
  'smart.air.sensitive': 'Dañina para grupos sensibles',
  'smart.air.unhealthy': 'Calidad del aire dañina',

  // SmartFeaturesCard — hourly detail modals
  'smart.dailyAirQuality': 'Calidad del aire diaria',
  'smart.aqiValue': 'AQI {value}',
  'smart.hourlyRain': 'Pronóstico de lluvia por hora',
  'smart.hourlyTemperature': 'Temperatura por hora',
  'smart.hourlyUvIndex': 'Índice UV por hora',
  'smart.now': 'Ahora',
  'smart.tempC': '{temp}°C',
  'smart.uvValue': 'UV {value}',
  'smart.uvLevel.veryHigh': 'Muy alto',
  'smart.uvLevel.high': 'Alto',
  'smart.uvLevel.moderate': 'Moderado',
  'smart.uvLevel.low': 'Bajo',

  // SmartFeaturesCard — astronomy
  'smart.astronomy': 'Astronomía',
  'smart.sunTimes': 'Horarios del sol',
  'smart.sunriseSunset': 'Amanecer: {sunrise} • Atardecer: {sunset}',
  'smart.daylightLabel': 'Luz diurna: {duration}',
  'smart.daylightDuration': '{hours}h {minutes}m',
  'smart.dailySunTimes': 'Horarios del sol por día',
  'smart.moonPhases': 'Fases lunares',
  'smart.moonPhase': 'Fase lunar',
  'smart.illumination': 'Iluminación: {percent}%',
  'smart.illuminationUnavailable': 'Iluminación: datos no disponibles',
  'smart.illuminatedPercent': '{percent}% iluminada',

  // SmartFeaturesCard — moon phase names
  'smart.moon.newMoon': 'Luna nueva',
  'smart.moon.waxingCrescent': 'Luna creciente',
  'smart.moon.firstQuarter': 'Cuarto creciente',
  'smart.moon.waxingGibbous': 'Gibosa creciente',
  'smart.moon.fullMoon': 'Luna llena',
  'smart.moon.waningGibbous': 'Gibosa menguante',
  'smart.moon.lastQuarter': 'Cuarto menguante',
  'smart.moon.waningCrescent': 'Luna menguante',

  // WeatherDetailModal — titles
  'detail.title.humidity': 'Tendencia de humedad',
  'detail.title.wind': 'Tendencia de velocidad del viento',
  'detail.title.uv': 'Tendencia del índice UV',
  'detail.title.pressure': 'Presión atmosférica',
  'detail.title.windDir': 'Dirección del viento',
  'detail.title.visibility': 'Tendencia de visibilidad',
  'detail.title.airquality': 'Índice de calidad del aire',
  'detail.title.default': 'Detalles del clima',

  // WeatherDetailModal — descriptions
  'detail.desc.humidity': 'Niveles de humedad relativa durante las próximas 12 horas. Valores más altos indican más humedad en el aire.',
  'detail.desc.wind': 'Variaciones de la velocidad del viento a lo largo del día. Útil para planear actividades al aire libre.',
  'detail.desc.uv': 'Pronóstico del índice UV que muestra la intensidad del sol. Usa protección solar cuando los valores superen 3.',
  'detail.desc.pressure': 'Los cambios de presión atmosférica pueden indicar cambios en el patrón del clima.',
  'detail.desc.windDir': 'Dirección y velocidad actuales del viento con visualización de brújula.',
  'detail.desc.visibility': 'La visibilidad afecta la conducción, las actividades al aire libre y la seguridad aérea. Una visibilidad clara indica buenas condiciones.',
  'detail.desc.airquality': 'El índice de calidad del aire mide los niveles de contaminación. Valores más bajos indican mejor calidad del aire.',

  // WeatherDetailModal — current values
  'detail.windDirAt': '{direction} a {speed} km/h',
  'detail.na': 'N/D',

  // WeatherDetailModal — health tips
  'detail.tipTitle': 'Consejo',
  'detail.tip.humidityHigh': 'Humedad alta: mantente hidratado y fresco',
  'detail.tip.humidityLow': 'Humedad baja: usa crema hidratante y bebe agua',
  'detail.tip.humidityComfort': 'Nivel de humedad confortable',
  'detail.tip.windStrong': 'Vientos fuertes: asegura los objetos sueltos',
  'detail.tip.windModerate': 'Vientos moderados: buenos para actividades al aire libre',
  'detail.tip.windLight': 'Vientos suaves: perfectos para cualquier plan al aire libre',
  'detail.tip.uvVeryHigh': 'UV muy alto: usa protector solar FPS 30+',
  'detail.tip.uvHigh': 'UV alto: considera protección solar',
  'detail.tip.uvModerate': 'UV moderado: se recomienda protección ligera',
  'detail.tip.uvLow': 'UV bajo: se necesita protección mínima',
  'detail.tip.pressureHigh': 'Presión alta: se espera clima estable',
  'detail.tip.pressureLow': 'Presión baja: posibles cambios de clima',
  'detail.tip.pressureNormal': 'Presión normal: condiciones estables',
  'detail.tip.windDir': 'Viento proveniente del {direction}',
  'detail.tip.visibilityExcellent': 'Visibilidad excelente: perfecta para toda actividad',
  'detail.tip.visibilityGood': 'Buena visibilidad: segura para conducir y estar al aire libre',
  'detail.tip.visibilityReduced': 'Visibilidad reducida: conduce con cuidado y usa las luces',
  'detail.tip.visibilityPoor': 'Visibilidad escasa: evita viajes innecesarios y extrema la precaución',
  'detail.tip.aqiGood': 'Buena calidad del aire: segura para actividades al aire libre',
  'detail.tip.aqiModerate': 'Moderada: aceptable para la mayoría de las personas',
  'detail.tip.aqiSensitive': 'Dañina para grupos sensibles: limita las actividades prolongadas al aire libre',
  'detail.tip.aqiUnhealthy': 'Dañina: todos deberían limitar las actividades al aire libre',
  'detail.tip.aqiVeryUnhealthy': 'Muy dañina: evita las actividades al aire libre',

  // WeatherDetailModal — insight cards
  'detail.insight.humidityTitle': '🌡️ Guía de confort de humedad',
  'detail.insight.humidityBody':
    '• Menos de 30%: muy seco, puede irritar la piel y la garganta\n' +
    '• 30-50%: zona de confort ideal, condiciones perfectas\n' +
    '• 50-65%: cómodo para la mayoría de las personas\n' +
    '• 65-75%: algo húmedo, puede sentirse cálido\n' +
    '• Más de 75%: muy húmedo, ambiente bochornoso y pegajoso',
  'detail.insight.windTitle': 'Guía de velocidad del viento',
  'detail.insight.windBody':
    '• 0-5 km/h: calma, el humo sube en vertical\n' +
    '• 6-11 km/h: aire leve, las hojas apenas se mueven\n' +
    '• 12-19 km/h: brisa ligera, perfecta para actividades al aire libre\n' +
    '• 20-28 km/h: brisa suave, se mueven las ramas y ondean las banderas\n' +
    '• 29-38 km/h: brisa moderada, se mecen los árboles pequeños\n' +
    '• 39-49 km/h: brisa fresca, se mueven las ramas grandes\n' +
    '• 50-61 km/h: brisa fuerte, difícil usar paraguas\n' +
    '• 62+ km/h: viento fuerte, evita las actividades al aire libre',
  'detail.insight.uvTitle': '☀️ Guía del índice UV',
  'detail.insight.uvBody':
    '• 0-2: Bajo - no se necesita protección\n' +
    '• 3-5: Moderado - busca sombra al mediodía\n' +
    '• 6-7: Alto - protección necesaria\n' +
    '• 8-10: Muy alto - se necesita protección extra\n' +
    '• 11+: Extremo - evita la exposición al sol',
  'detail.insight.pressureTitle': 'Tendencias de presión',
  'detail.insight.pressureBody':
    '• Presión en aumento: se acerca buen tiempo\n' +
    '• Presión en descenso: posibles tormentas\n' +
    '• Presión estable: condiciones constantes\n' +
    '• Rango normal: 1000-1020 hPa',
  'detail.insight.visibilityTitle': '👁️ Guía de visibilidad',
  'detail.insight.visibilityBody':
    '• 10+ km: excelente, perfecta para toda actividad\n' +
    '• 5-10 km: buena, condiciones seguras para conducir\n' +
    '• 2-5 km: moderada, precaución y luces encendidas\n' +
    '• 1-2 km: escasa, conducción peligrosa\n' +
    '• <1 km: muy escasa, evita viajar si es posible',
  'detail.insight.airTitle': '🌫️ Detalles de calidad del aire',
  'detail.air.currentAqi': 'AQI actual: {value}',
  'detail.air.pollutantValue': '{name}: {value} μg/m³',
  'detail.air.scaleTitle': 'Escala AQI:',
  'detail.air.scaleBody':
    '• 0-50: Buena - calidad del aire satisfactoria\n' +
    '• 51-100: Moderada - aceptable para la mayoría\n' +
    '• 101-150: Dañina para grupos sensibles\n' +
    '• 151-200: Dañina - todos pueden notar efectos\n' +
    '• 201-300: Muy dañina - alerta sanitaria\n' +
    '• 301+: Peligrosa - condiciones de emergencia',

  // RealCompass
  'compass.title': 'Brújula',
  'compass.windLabel': 'Viento: {direction}',
  'compass.deviceHeading': 'Rumbo del dispositivo: {value}°',
  'compass.instruction': 'Para mayor precisión: sostén el teléfono en horizontal, lejos de objetos metálicos, y muévelo en forma de 8 para calibrar',

  // RealCompass — calibration status
  'compass.status.initializing': 'Iniciando...',
  'compass.status.noSensorsStatic': 'Sensores no disponibles: se muestra brújula estática',
  'compass.status.calibratingDevice': 'Calibrando sensores del dispositivo...',
  'compass.status.calibratedDevice': '✓ Calibrado - Brújula real activa',
  'compass.status.calibratingMagnetometer': 'Calibrando magnetómetro...',
  'compass.status.calibratedMagnetometer': '✓ Calibrado - Magnetómetro activo',
  'compass.status.noSensors': '⚠️ Sin sensores disponibles - Brújula estática',
  'compass.status.sensorError': '⚠️ Error del sensor - Brújula estática',

  // RealCompass — heading accuracy
  'compass.accuracy.high': '● Precisión alta',
  'compass.accuracy.medium': '● Precisión media',
  'compass.accuracy.low': '● Precisión baja - aléjate de objetos metálicos',

  // RealCompass — cardinal directions (16-wind)
  'compass.dir.n': 'N',
  'compass.dir.nne': 'NNE',
  'compass.dir.ne': 'NE',
  'compass.dir.ene': 'ENE',
  'compass.dir.e': 'E',
  'compass.dir.ese': 'ESE',
  'compass.dir.se': 'SE',
  'compass.dir.sse': 'SSE',
  'compass.dir.s': 'S',
  'compass.dir.ssw': 'SSO',
  'compass.dir.sw': 'SO',
  'compass.dir.wsw': 'OSO',
  'compass.dir.w': 'O',
  'compass.dir.wnw': 'ONO',
  'compass.dir.nw': 'NO',
  'compass.dir.nnw': 'NNO',

  // Share — fallback location name
  'share.currentLocation': 'Ubicación actual',

  // Share — buttons
  'share.quickShare': 'Compartir rápido',
  'share.customizeShare': 'Personalizar y compartir',
  'share.shareButton': 'Compartir reporte del clima',

  // Share — options modal
  'share.optionsTitle': 'Opciones para compartir',
  'share.contentSection': 'Contenido a incluir',
  'share.detailsSection': 'Detalles del clima',
  'share.option.location': 'Ubicación',
  'share.option.locationSubtitle': 'Incluir el nombre de la ubicación al compartir el clima',
  'share.option.current': 'Clima actual',
  'share.option.currentSubtitle': 'Temperatura y condiciones actuales',
  'share.option.hourly': 'Pronóstico por hora',
  'share.option.hourlySubtitle': 'Pronóstico de las próximas 12 horas',
  'share.option.daily': 'Pronóstico diario',
  'share.option.dailySubtitle': 'Pronóstico del clima de 7 días',
  'share.option.astronomy': 'Astronomía',
  'share.option.astronomySubtitle': 'Amanecer, atardecer y fase lunar',
  'share.option.feelsLike': 'Sensación térmica',
  'share.option.humidity': 'Humedad',
  'share.option.pressure': 'Presión atmosférica',
  'share.option.visibility': 'Visibilidad',
  'share.option.uv': 'Índice UV',
  'share.option.wind': 'Información del viento',

  // Share — sheet title and errors
  'share.shareTitle': 'Reporte del clima - {location}',
  'share.errorTitle': 'Error al compartir',
  'share.errorMessage': 'No se pudieron compartir los datos del clima',

  // Share — generated share text
  'share.text.header': 'Reporte del clima',
  'share.text.location': 'Ubicación: {location}',
  'share.text.currentWeather': 'Clima actual:',
  'share.text.temperature': 'Temperatura: {temp}',
  'share.text.feelsLike': '(sensación de {temp})',
  'share.text.condition': 'Condición: {condition}',
  'share.text.humidity': 'Humedad: {humidity}%',
  'share.text.pressure': 'Presión: {pressure} hPa',
  'share.text.visibility': 'Visibilidad: {visibility} km',
  'share.text.uvIndex': 'Índice UV: {uvIndex}',
  'share.text.wind': 'Viento: {speed} km/h {direction}',
  'share.text.next12Hours': 'Próximas 12 horas:',
  'share.text.nextHours': 'Próximas horas:',
  'share.text.hourLine': '{time}: {temp} - {condition}',
  'share.text.dailyForecast': 'Próximos días:',
  'share.text.dayLine': '{day}: {max}/{min} - {condition}',
  'share.text.rainChance': '({chance}% de lluvia)',
  'share.text.astronomy': 'Astronomía:',
  'share.text.sunrise': 'Amanecer: {time}',
  'share.text.sunset': 'Atardecer: {time}',
  'share.text.moon': 'Luna: {phase}',
  'share.text.moonIllumination': '({percent}% iluminada)',
  'share.text.footer': 'Compartido desde WeatherWell',

  // Share — temperature formats
  'share.text.tempC': '{temp}°C',
  'share.text.tempF': '{temp}°F',

  // Notifications — Android channels
  'notif.channel.weatherAlerts': 'Alertas meteorológicas',
  'notif.channel.dailyForecast': 'Pronóstico diario',

  // Notifications — time-of-day markers
  'notif.time.am': 'a.m.',
  'notif.time.pm': 'p.m.',

  // Notifications — daily forecast
  'notif.daily.title': '📅 Pronóstico diario del clima',
  'notif.daily.fallbackTitle': '🌤️ Pronóstico diario del clima',
  'notif.daily.fallbackBody': 'Abre WeatherWell para ver el pronóstico completo de hoy.',
  'notif.daily.today': 'Hoy: {high}°/{low}°, {condition}',
  'notif.daily.tomorrow': 'Mañana: {high}°/{low}°, {condition}',
  'notif.daily.rainChance': '🌧️ {chance}% de lluvia',
  'notif.daily.highUv': '☀️ UV alto ({uv})',
  'notif.daily.strongWind': '💨 Viento fuerte de {speed} km/h',
  'notif.daily.heavyRain': '🌊 Lluvia intensa de {mm} mm',

  // Notifications — hourly forecast
  'notif.hourly.title': '⏰ Clima de las próximas horas',
  'notif.hourly.updateTitle': '⏰ Actualización del clima por hora',
  'notif.hourly.fallbackBody': 'Abre WeatherWell para consultar el pronóstico de las próximas horas.',
  'notif.hourly.rainAt': '🌧️ Lluvia a las {times}',
  'notif.hourly.windUpTo': '💨 Viento de hasta {speed} km/h',

  // Notifications — umbrella / rain alerts
  'notif.umbrella.title': '☂️ Alerta de paraguas',
  'notif.umbrella.body': '{chance}% de probabilidad de lluvia próximamente. ¡No olvides tu paraguas!',
  'notif.umbrella.upcomingBody': '{chance}% de probabilidad de lluvia alrededor de las {time}. ¡No olvides tu paraguas!',

  // Notifications — wind alerts
  'notif.wind.title': '💨 Alerta de viento fuerte',
  'notif.wind.body': 'La velocidad del viento es de {speed} km/h. Toma precauciones al salir.',
  'notif.wind.expectedTitle': '💨 Se espera viento fuerte',
  'notif.wind.expectedBody': 'Se esperan vientos de hasta {speed} km/h alrededor de las {time}.',

  // Notifications — UV alerts
  'notif.uv.title': '☀️ Alerta de UV alto',
  'notif.uv.body': 'El índice UV es {uv}. ¡Usa protector solar y ropa protectora!',
  'notif.uv.indexTitle': '☀️ Alerta de índice UV',
  'notif.uv.indexBody': 'El índice UV es {uv} ({level}). ¡Usa protector solar y ropa protectora!',
  'notif.uv.expectedTitle': '☀️ Se espera UV alto',
  'notif.uv.expectedBody': 'Se espera un índice UV de {uv} alrededor de las {time}. ¡Aplícate protector solar!',
  'notif.uvLevel.extreme': 'Extremo',
  'notif.uvLevel.veryHigh': 'Muy alto',
  'notif.uvLevel.high': 'Alto',

  // Notifications — temperature alerts
  'notif.temp.highTitle': '🔥 Alerta: temperatura alta',
  'notif.temp.lowTitle': '🥶 Alerta: temperatura baja',
  'notif.temp.highBody': 'La temperatura es de {temp}°C, por encima de tu umbral de {threshold}°C',
  'notif.temp.lowBody': 'La temperatura es de {temp}°C, por debajo de tu umbral de {threshold}°C',
  'notif.temp.highAlertTitle': '🔥 Alerta de temperatura alta',
  'notif.temp.highAlertBody': 'La temperatura es de {temp}°C. Mantente hidratado y evita la exposición prolongada al sol.',
  'notif.temp.lowAlertTitle': '❄️ Alerta de temperatura baja',
  'notif.temp.lowAlertBody': 'La temperatura es de {temp}°C. ¡Abrígate bien!',
  'notif.temp.aheadHighTitle': '🔥 Se acerca temperatura alta',
  'notif.temp.aheadHighBody': 'Se esperan {temp}°C alrededor de las {time}. ¡Mantente hidratado!',
  'notif.temp.aheadLowTitle': '❄️ Se acerca temperatura baja',
  'notif.temp.aheadLowBody': 'Se esperan {temp}°C alrededor de las {time}. ¡Abrígate!',

  // Notifications — air quality alerts
  'notif.aqi.title': '🌫️ Alerta de calidad del aire',
  'notif.aqi.body': 'El AQI es {aqi} ({level}). Considera limitar las actividades al aire libre.',
  'notif.aqiLevel.hazardous': 'Peligrosa',
  'notif.aqiLevel.veryUnhealthy': 'Muy dañina',
  'notif.aqiLevel.unhealthy': 'Dañina',
  'notif.aqiLevel.sensitive': 'Dañina para grupos sensibles',

  // Notifications — severe weather alerts
  'notif.severe.title': '🚨 Alerta de {type}',
  'notif.severe.windDetected': '💨 Vientos fuertes detectados: {speed} km/h. Toma precauciones al salir.',
  'notif.severe.conditionsDetected': '{emoji} Se detectaron condiciones de {type} en {location}. ¡Cuídate!',
  'notif.severe.bgTitle': '{emoji} Clima severo: {type}',
  'notif.severe.bgBody': 'Se detectó {type} en tu zona. Toma las precauciones necesarias.',
  'notif.severe.expectedTitle': '{emoji} Se espera {type} pronto',
  'notif.severe.expectedBody': 'Se pronostica {type} alrededor de las {time}. Toma precauciones.',
  'notif.severeType.thunderstorm': 'Tormenta eléctrica',
  'notif.severeType.heavyRain': 'Lluvia intensa',
  'notif.severeType.snow': 'Nieve',
  'notif.severeType.hail': 'Granizo',
  'notif.severeType.fog': 'Niebla',
  'notif.severeType.strongWind': 'Viento fuerte',

  // Widget
  'widget.openAppToLoad': 'Abre la app para cargar el clima',
  'widget.feels': 'Sensación {value}',
  'widget.high': 'Máx: {value}',
  'widget.low': 'Mín: {value}',
  'widget.tapToOpen': 'Toca para abrir WeatherWell',
  'widget.tomorrow': 'Mañana',
  'widget.tomorrowCondition': 'Mañana: {condition}',
};
