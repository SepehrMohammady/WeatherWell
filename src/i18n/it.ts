/** Italian translations. */
export const it: Record<string, string> = {
  // Common
  'common.ok': 'OK',
  'common.cancel': 'Annulla',
  'common.close': 'Chiudi',
  'common.retry': 'Riprova',
  'common.loading': 'Caricamento...',
  'common.error': 'Errore',
  'common.save': 'Salva',
  'common.reset': 'Ripristina',
  'common.notAvailable': 'Dati non disponibili',

  // Canonical weather conditions
  'conditions.clear': 'Sereno',
  'conditions.clear.night': 'Notte serena',
  'conditions.partly': 'Parzialmente nuvoloso',
  'conditions.cloudy': 'Nuvoloso',
  'conditions.overcast': 'Coperto',
  'conditions.fog': 'Nebbia',
  'conditions.drizzle': 'Pioviggine',
  'conditions.rain': 'Pioggia',
  'conditions.heavy-rain': 'Pioggia intensa',
  'conditions.sleet': 'Nevischio',
  'conditions.snow': 'Neve',
  'conditions.heavy-snow': 'Neve intensa',
  'conditions.hail': 'Grandine',
  'conditions.thunder': 'Temporale',
  'conditions.thunder-rain': 'Temporale con pioggia',
  'conditions.windy': 'Ventoso',

  // Language picker (language names are endonyms — identical in every dictionary)
  'language.title': 'Lingua',
  'language.system': 'Sistema',
  'language.en': 'English',
  'language.zh': '中文',
  'language.es': 'Español',
  'language.hi': 'हिन्दी',
  'language.ar': 'العربية',
  'language.fa': 'فارسی',
  'language.it': 'Italiano',
  'language.restartTitle': 'Riavvio necessario',
  'language.restartMessage': 'Chiudi e riapri WeatherWell per applicare la nuova direzione del layout.',

  // Tutorial
  'tutorial.title': 'Benvenuto in WeatherWell',
  'tutorial.skip': 'Salta',
  'tutorial.next': 'Avanti',
  'tutorial.back': 'Indietro',
  'tutorial.done': 'Inizia',
  'tutorial.sectionTitle': 'Tutorial',
  'tutorial.settingsRow': 'Tutorial dell\'app',
  'tutorial.settingsRowSubtitle': 'Rivedi l\'introduzione a WeatherWell',
  'tutorial.page1.title': 'Il tuo meteo, a modo tuo',
  'tutorial.page1.body': 'WeatherWell mostra condizioni attuali, previsioni orarie e a 7 giorni per la tua posizione — senza pubblicità e nel rispetto della privacy.',
  'tutorial.page2.title': 'Cerca e fissa località',
  'tutorial.page2.body': 'Cerca qualsiasi città e fissala come località principale. L\'app e il widget seguiranno il luogo fissato; rimuovilo per tornare alla posizione attuale.',
  'tutorial.page3.title': 'Scegli il tuo provider',
  'tutorial.page3.body': 'Scegli tra sei provider meteo, confrontali fianco a fianco o crea una combinazione personalizzata — ogni dato dal provider di cui ti fidi di più.',
  'tutorial.page4.title': 'Funzioni smart',
  'tutorial.page4.body': 'Ricevi consigli sull\'abbigliamento, promemoria ombrello, qualità dell\'aria, dati astronomici e allerte meteo — più un widget per la schermata Home.',
  'tutorial.page5.title': 'Personalizzala',
  'tutorial.page5.body': 'Temi in cinque colori, modalità chiara e scura, animazioni meteo e più lingue. Trovi tutto nelle Impostazioni.',

  // Settings — header
  'settings.title': 'Impostazioni',

  // Settings — appearance
  'settings.appearance': 'Aspetto',
  'settings.modeSystem': 'Sistema',
  'settings.modeLight': 'Chiaro',
  'settings.modeDark': 'Scuro',
  'settings.weatherAnimations': 'Animazioni meteo',
  'settings.weatherAnimationsSubtitle': 'Effetti ambientali di pioggia, neve e nuvole nella schermata principale',
  'settings.themeColor': 'Colore del tema',

  // Settings — weather data / provider
  'settings.weatherData': 'Dati meteo',
  'settings.weatherProvider': 'Provider meteo',
  'settings.providerWeatherApiDesc': 'WeatherAPI - Il più preciso, con dati astronomici completi',
  'settings.providerOpenWeatherMapDesc': 'OpenWeatherMap - Previsioni affidabili, astronomia limitata',
  'settings.providerVisualCrossingDesc': 'Visual Crossing - Buoni dati, senza astronomia',
  'settings.providerOpenMeteoDesc': 'Open-Meteo - Gratuito, senza dati sulle fasi lunari',
  'settings.providerQWeatherDesc': '⚠ QWeather - Può richiedere un piano a pagamento',
  'settings.providerMeteostatDesc': '⚠ Meteostat - Solo dati storici, non per previsioni',
  'settings.providerCustomDesc': 'Personalizzato - Scegli un provider per ogni dato qui sotto',
  'settings.providerCustom': 'Personalizzato (combina provider)',
  'settings.providerHint': 'WA WeatherAPI · OW OpenWeather · VC Visual Crossing · OM Open-Meteo · QW QWeather · MS Meteostat',

  // Settings — custom source metric labels
  'settings.metricForecast': 'Previsioni (orarie e giornaliere)',
  'settings.metricTemperature': 'Temperatura',
  'settings.metricCondition': 'Condizione',
  'settings.metricHumidity': 'Umidità',
  'settings.metricWind': 'Vento',
  'settings.metricPressure': 'Pressione',
  'settings.metricUvIndex': 'Indice UV',
  'settings.metricVisibility': 'Visibilità',
  'settings.metricAirQuality': 'Qualità dell\'aria',
  'settings.metricAstronomy': 'Astronomia',

  // Settings — units and refresh
  'settings.temperatureUnit': 'Unità di temperatura',
  'settings.refreshInterval': 'Intervallo di aggiornamento',
  'settings.refreshIntervalSubtitle': 'Aggiorna ogni {minutes} minuti',
  'settings.minutesShort': '{minutes} min',

  // Settings — API keys
  'settings.weatherApiKey': 'Chiave WeatherAPI',
  'settings.openWeatherMapKey': 'Chiave OpenWeatherMap',
  'settings.visualCrossingKey': 'Chiave Visual Crossing',
  'settings.qweatherKey': 'Chiave QWeather',
  'settings.meteostatKey': 'Chiave Meteostat (RapidAPI)',
  'settings.customKeyConfigured': 'Chiave personalizzata configurata',
  'settings.usingDefaultKey': 'Chiave predefinita in uso',
  'settings.apiKeyModalSubtitle': 'Inserisci la tua chiave API o lascia vuoto per usare quella demo',
  'settings.apiKeyPlaceholder': 'Inserisci chiave API...',
  'settings.apiKeyUpdated': 'Chiave API aggiornata correttamente',

  // Settings — display options
  'settings.displayOptions': 'Opzioni di visualizzazione',
  'settings.showFeelsLike': 'Mostra temperatura percepita',
  'settings.showHumidity': 'Mostra umidità',
  'settings.showPressure': 'Mostra pressione',
  'settings.showVisibility': 'Mostra visibilità',
  'settings.showUvIndex': 'Mostra indice UV',
  'settings.showWindSpeed': 'Mostra velocità del vento',
  'settings.showWindDirection': 'Mostra direzione del vento',
  'settings.showAirQuality': 'Mostra qualità dell\'aria',

  // Settings — notifications
  'settings.notifications': 'Notifiche',
  'settings.notificationNote': 'Gli avvisi programmati (giornalieri/orari) arrivano all\'orario scelto.\nGli avvisi dinamici si basano sull\'intervallo di aggiornamento ({minutes} min) e avvertono prima di condizioni pericolose.',
  'settings.enableNotifications': 'Attiva notifiche',
  'settings.enableNotificationsSubtitle': 'Attiva o disattiva tutti gli avvisi meteo programmati e dinamici',
  'settings.severeWeatherAlerts': 'Allerte per maltempo',
  'settings.severeWeatherAlertsSubtitle': 'Avvisa in caso di temporali, piogge intense, neve e grandine',
  'settings.dailyForecast': 'Previsioni giornaliere',
  'settings.dailyForecastSubtitle': 'Riepilogo giornaliero programmato alle {time} con condizioni e consigli',
  'settings.hourlyForecast': 'Previsioni orarie',
  'settings.hourlyForecastSubtitle': 'Previsione a 6 ore programmata alle {time} con pioggia e temperature',
  'settings.temperatureAlerts': 'Avvisi temperatura',
  'settings.temperatureAlertsSubtitle': 'Avvisa quando la temperatura scende sotto {low}°C o supera {high}°C',
  'settings.tempLowShort': 'Min:{value}°',
  'settings.tempHighShort': 'Max:{value}°',
  'settings.uvAlerts': 'Avvisi indice UV',
  'settings.uvAlertsSubtitle': 'Avvisa quando l\'indice UV raggiunge {value}+ per proteggere la pelle',
  'settings.umbrellaAlerts': 'Avvisi ombrello',
  'settings.umbrellaAlertsSubtitle': 'Ti ricorda di portare l\'ombrello quando la probabilità di pioggia raggiunge il {value}% o più',
  'settings.windAlerts': 'Avvisi vento',
  'settings.windAlertsSubtitle': 'Avvisa quando la velocità del vento supera {value} km/h',
  'settings.aqiAlerts': 'Avvisi qualità dell\'aria',
  'settings.aqiAlertsSubtitle': 'Avvisa quando l\'AQI raggiunge {value}+ (livelli nocivi)',
  'settings.percentValue': '{value}%',

  // Settings — time picker modal
  'settings.dailyForecastTimeTitle': 'Orario previsioni giornaliere',
  'settings.hourlyForecastTimeTitle': 'Orario previsioni orarie',

  // Settings — threshold editor modal
  'settings.thresholdRain': 'Soglia pioggia (%)',
  'settings.thresholdWind': 'Soglia velocità del vento (km/h)',
  'settings.thresholdUv': 'Soglia indice UV',
  'settings.thresholdTempHigh': 'Soglia temperatura massima (°C)',
  'settings.thresholdTempLow': 'Soglia temperatura minima (°C)',
  'settings.thresholdAqi': 'Soglia AQI',
  'settings.thresholdModalSubtitle': 'Inserisci il valore soglia per gli avvisi',
  'settings.thresholdPlaceholder': 'Inserisci valore...',
  'settings.invalidValueTitle': 'Valore non valido',
  'settings.invalidValueMessage': 'Inserisci un numero valido',

  // Settings — widget
  'settings.homeScreenWidget': 'Widget schermata Home',
  'settings.addWidget': 'Aggiungi widget alla schermata Home',
  'settings.addWidgetSubtitle': 'Tocca per aggiungere direttamente il widget meteo',
  'settings.widgetAlertTitle': 'Widget',
  'settings.widgetPinHint': 'Per aggiungere il widget, tieni premuto sulla schermata Home → Widget → WeatherWell',
  'settings.widgetOpacity': 'Opacità del widget',
  'settings.widgetShowFeelsLike': 'Mostra percepita',
  'settings.widgetShowFeelsLikeSubtitle': 'Mostra la temperatura percepita',
  'settings.widgetShowHighLow': 'Mostra max/min',
  'settings.widgetShowHighLowSubtitle': 'Mostra le temperature massime e minime giornaliere',
  'settings.widgetShowRainChance': 'Mostra probabilità di pioggia',
  'settings.widgetShowRainChanceSubtitle': 'Mostra la probabilità di precipitazioni',
  'settings.widgetShowConditions': 'Mostra condizioni',
  'settings.widgetShowConditionsSubtitle': 'Mostra il testo delle condizioni meteo',
  'settings.widgetShowTomorrow': 'Mostra domani',
  'settings.widgetShowTomorrowSubtitle': 'Mostra le previsioni max/min di domani',

  // Settings — privacy
  'settings.privacy': 'Privacy',
  'settings.shareLocation': 'Condividi posizione nei dati meteo',
  'settings.shareLocationSubtitle': 'Includi la posizione quando condividi il meteo',

  // Settings — advanced (backup / reset)
  'settings.advanced': 'Avanzate',
  'settings.exportBackup': 'Esporta backup',
  'settings.exportBackupSubtitle': 'Salva tutte le impostazioni e i preferiti',
  'settings.importBackup': 'Importa backup',
  'settings.importBackupSubtitle': 'Ripristina impostazioni e preferiti',
  'settings.resetToDefaults': 'Ripristina predefiniti',
  'settings.resetToDefaultsSubtitle': 'Riporta tutte le impostazioni ai valori originali',
  'settings.successTitle': 'Operazione riuscita',
  'settings.resetTitle': 'Ripristina impostazioni',
  'settings.resetConfirm': 'Vuoi davvero ripristinare tutte le impostazioni predefinite?',
  'settings.resetDone': 'Impostazioni ripristinate ai valori predefiniti',
  'settings.exportDialogTitle': 'Esporta backup WeatherWell',
  'settings.backupExported': 'Backup esportato correttamente',
  'settings.sharingUnavailable': 'La condivisione non è disponibile su questo dispositivo',
  'settings.exportFailed': 'Esportazione del backup non riuscita: {error}',
  'settings.unknownError': 'Errore sconosciuto',
  'settings.backupRestored': 'Backup ripristinato (impostazioni e preferiti)',
  'settings.restoreFailed': 'Ripristino delle impostazioni dal backup non riuscito',
  'settings.settingsImported': 'Impostazioni importate correttamente',
  'settings.invalidBackupFile': 'File di backup non valido',
  'settings.importFailed': 'Importazione del backup non riuscita. Assicurati di aver selezionato un file .weatherwell valido.',

  // Settings — testers
  'settings.testers': 'Tester',
  'settings.testersThanks': 'Grazie per il vostro prezioso feedback!',

  // Settings — about
  'settings.about': 'Informazioni',
  'settings.appTagline': 'Previsioni meteo senza pubblicità',
  'settings.version': 'Versione',
  'settings.developer': 'Sviluppatore',
  'settings.privacyPolicy': 'Informativa sulla privacy',
  'settings.privacyPolicySubtitle': 'Nessun dato personale viene raccolto o condiviso',

  // Settings — more from SeMo Lab
  'settings.moreFromSemoLab': 'Altro da SeMo Lab',
  'settings.feedwellDesc': 'Lettore RSS senza pubblicità. Lettura pulita, senza distrazioni.',
  'settings.ledgerwellDesc': 'Tieni traccia di debiti e crediti personali, multivaluta.',
  'settings.thinkwellDesc': 'Chat IA offline. Modelli locali, totalmente privata.',
  'settings.allSemoLabApps': 'Tutte le app SeMo Lab',
  'settings.allSemoLabAppsSubtitle': 'Scopri tutto ciò che creiamo su Google Play',

  // Settings — footer
  'settings.footerText': 'WeatherWell offre previsioni meteo accurate con un approccio incentrato sulla privacy. Nessun dato personale viene raccolto o condiviso.',
  'settings.copyright': '© 2026 SeMo Lab',

  // HomeScreen
  'home.loadingTitle': 'Caricamento di WeatherWell...',
  'home.loadingSubtext': 'Recupero di posizione e dati meteo',
  'home.errorTitle': '⚠️ Errore',
  'home.tryAgain': 'Riprova',
  'home.retry': 'Riprova',
  'home.noWeatherData': 'Nessun dato meteo disponibile',
  'home.locationPermissionRequired': 'È necessaria l\'autorizzazione alla posizione per ottenere i dati meteo',
  'home.failedToLoad': 'Impossibile caricare i dati meteo',
  'home.currentLocation': 'Posizione attuale',
  'home.locationFormat': '{name}, {country}',
  'home.pinned': 'Fissata',
  'home.pinAsMain': 'Fissa come principale',
  'home.useCurrentLocation': 'Usa posizione attuale',

  // SearchScreen
  'search.title': 'Cerca località',
  'search.placeholder': 'Cerca una città o una località...',
  'search.searching': 'Ricerca delle località...',
  'search.noResults': 'Nessuna località trovata per "{query}"',
  'search.tryDifferent': 'Prova con un altro termine di ricerca',
  'search.favoritePlaces': 'Luoghi preferiti',
  'search.recentSearches': 'Ricerche recenti',
  'search.clearAll': 'Cancella tutto',
  'search.searchResults': 'Risultati della ricerca',
  'search.popularCities': 'Città popolari corrispondenti alla tua ricerca',
  'search.searchAnyLocation': 'Cerca qualsiasi località',
  'search.startTyping': 'Inizia a digitare per trovare città in tutto il mondo',
  'search.regionCountry': '{region}, {country}',
  'search.clearRecentTitle': 'Cancella ricerche recenti',
  'search.clearRecentMessage': 'Vuoi davvero cancellare tutte le ricerche recenti?',
  'search.clear': 'Cancella',

  // Compare
  'compare.title': 'Confronta provider',
  'compare.hint': 'Tocca un provider per usarlo come fonte meteo',
  'compare.inUse': 'In uso',
  'compare.unavailable': 'Al momento non disponibile',
  'compare.humidityValue': '{value}%',
  'compare.windValue': '{value} km/h',
  'compare.aqiValue': 'AQI {value}',

  // Weather — section titles
  'weather.hourlyForecast': 'Previsioni orarie',
  'weather.dailyForecast': 'Prossimi giorni',

  // Weather — relative day/time labels
  'weather.now': 'Adesso',
  'weather.today': 'Oggi',
  'weather.tomorrow': 'Domani',

  // Weather — current conditions card
  'weather.feelsLike': 'Percepita {temp}',
  'weather.humidity': 'Umidità',
  'weather.wind': 'Vento',
  'weather.uvIndex': 'Indice UV',
  'weather.pressure': 'Pressione',
  'weather.windDir': 'Dir. vento',
  'weather.visibility': 'Visibilità',
  'weather.airQuality': 'Qualità aria',

  // Weather — unit-bearing value formats
  'weather.percentValue': '{value}%',
  'weather.kmhValue': '{value} km/h',
  'weather.hpaValue': '{value} hPa',
  'weather.kmValue': '{value} km',
  'weather.aqiValue': 'AQI {value}',

  // SmartFeaturesCard — sections and cards
  'smart.recommendations': 'Consigli',
  'smart.umbrellaAlert': 'Avviso ombrello',
  'smart.umbrellaChance': 'Fino al {percent}% di probabilità di pioggia nelle prossime 24 ore',
  'smart.clothingSuggestion': 'Abbigliamento consigliato',
  'smart.tempFeelsLike': '{temp}°C, percepiti {feels}°C',
  'smart.uvProtection': 'Protezione UV',
  'smart.uvIndexLabel': 'Indice UV: {value}',
  'smart.airQuality': 'Qualità dell\'aria',
  'smart.aqiPmDetail': 'AQI: {aqi} • PM2.5: {pm25}μg/m³',
  'smart.na': 'N/D',

  // SmartFeaturesCard — umbrella advice
  'smart.umbrella.definitely': 'Porta assolutamente l\'ombrello!',
  'smart.umbrella.consider': 'Valuta di portare l\'ombrello',
  'smart.umbrella.none': 'Oggi l\'ombrello non serve',

  // SmartFeaturesCard — clothing suggestions
  'smart.clothing.winter': 'Cappotto invernale pesante, sciarpa, guanti',
  'smart.clothing.jacket': 'Giacca o maglione caldo',
  'smart.clothing.sweater': 'Maglione leggero o maniche lunghe',
  'smart.clothing.tshirt': 'T-shirt o abiti leggeri',

  // SmartFeaturesCard — UV advice
  'smart.uv.high': 'Indossa occhiali da sole e crema solare SPF 30+',
  'smart.uv.medium': 'Valuta occhiali da sole e crema solare',
  'smart.uv.light': 'Consigliata una leggera protezione solare',
  'smart.uv.none': 'Nessuna protezione solare necessaria',

  // SmartFeaturesCard — mask advice
  'smart.mask.wear': 'Indossa una mascherina all\'aperto',
  'smart.mask.consider': 'Valuta di indossare una mascherina',
  'smart.mask.none': 'Mascherina non necessaria',

  // SmartFeaturesCard — air quality levels
  'smart.air.good': 'La qualità dell\'aria è buona',
  'smart.air.moderate': 'Qualità dell\'aria moderata',
  'smart.air.sensitive': 'Nociva per i soggetti sensibili',
  'smart.air.unhealthy': 'Qualità dell\'aria nociva',

  // SmartFeaturesCard — hourly detail modals
  'smart.dailyAirQuality': 'Qualità dell\'aria giornaliera',
  'smart.aqiValue': 'AQI {value}',
  'smart.hourlyRain': 'Previsione pioggia oraria',
  'smart.hourlyTemperature': 'Temperatura oraria',
  'smart.hourlyUvIndex': 'Indice UV orario',
  'smart.now': 'Adesso',
  'smart.tempC': '{temp}°C',
  'smart.uvValue': 'UV {value}',
  'smart.uvLevel.veryHigh': 'Molto alto',
  'smart.uvLevel.high': 'Alto',
  'smart.uvLevel.moderate': 'Moderato',
  'smart.uvLevel.low': 'Basso',

  // SmartFeaturesCard — astronomy
  'smart.astronomy': 'Astronomia',
  'smart.sunTimes': 'Orari del sole',
  'smart.sunriseSunset': 'Alba: {sunrise} • Tramonto: {sunset}',
  'smart.daylightLabel': 'Ore di luce: {duration}',
  'smart.daylightDuration': '{hours}h {minutes}m',
  'smart.dailySunTimes': 'Orari del sole giornalieri',
  'smart.moonPhases': 'Fasi lunari',
  'smart.moonPhase': 'Fase lunare',
  'smart.illumination': 'Illuminazione: {percent}%',
  'smart.illuminationUnavailable': 'Illuminazione: dati non disponibili',
  'smart.illuminatedPercent': '{percent}% illuminata',

  // SmartFeaturesCard — moon phase names
  'smart.moon.newMoon': 'Luna nuova',
  'smart.moon.waxingCrescent': 'Luna crescente',
  'smart.moon.firstQuarter': 'Primo quarto',
  'smart.moon.waxingGibbous': 'Gibbosa crescente',
  'smart.moon.fullMoon': 'Luna piena',
  'smart.moon.waningGibbous': 'Gibbosa calante',
  'smart.moon.lastQuarter': 'Ultimo quarto',
  'smart.moon.waningCrescent': 'Luna calante',

  // WeatherDetailModal — titles
  'detail.title.humidity': 'Andamento umidità',
  'detail.title.wind': 'Andamento velocità del vento',
  'detail.title.uv': 'Andamento indice UV',
  'detail.title.pressure': 'Pressione atmosferica',
  'detail.title.windDir': 'Direzione del vento',
  'detail.title.visibility': 'Andamento visibilità',
  'detail.title.airquality': 'Indice di qualità dell\'aria',
  'detail.title.default': 'Dettagli meteo',

  // WeatherDetailModal — descriptions
  'detail.desc.humidity': 'Livelli di umidità relativa nelle prossime 12 ore. Valori più alti indicano più umidità nell\'aria.',
  'detail.desc.wind': 'Variazioni della velocità del vento durante la giornata. Utile per pianificare le attività all\'aperto.',
  'detail.desc.uv': 'Previsione dell\'indice UV che mostra l\'intensità del sole. Usa una protezione solare con valori sopra 3.',
  'detail.desc.pressure': 'Le variazioni della pressione atmosferica possono indicare cambiamenti del tempo.',
  'detail.desc.windDir': 'Direzione e velocità attuali del vento con visualizzazione a bussola.',
  'detail.desc.visibility': 'Le condizioni di visibilità influiscono su guida, attività all\'aperto e sicurezza dei voli. Una visibilità nitida indica condizioni meteo favorevoli.',
  'detail.desc.airquality': 'L\'indice di qualità dell\'aria misura i livelli di inquinamento atmosferico. Valori più bassi indicano aria migliore.',

  // WeatherDetailModal — current values
  'detail.windDirAt': '{direction} a {speed} km/h',
  'detail.na': 'N/D',

  // WeatherDetailModal — health tips
  'detail.tipTitle': 'Consiglio',
  'detail.tip.humidityHigh': 'Umidità elevata - resta idratato e al fresco',
  'detail.tip.humidityLow': 'Umidità bassa - usa una crema idratante e bevi acqua',
  'detail.tip.humidityComfort': 'Livello di umidità confortevole',
  'detail.tip.windStrong': 'Venti forti - fissa gli oggetti che possono volare via',
  'detail.tip.windModerate': 'Venti moderati - buoni per le attività all\'aperto',
  'detail.tip.windLight': 'Venti deboli - perfetti per qualsiasi attività all\'aperto',
  'detail.tip.uvVeryHigh': 'UV molto alto - applica crema solare SPF 30+',
  'detail.tip.uvHigh': 'UV alto - valuta una protezione solare',
  'detail.tip.uvModerate': 'UV moderato - consigliata una protezione leggera',
  'detail.tip.uvLow': 'UV basso - protezione minima necessaria',
  'detail.tip.pressureHigh': 'Alta pressione - tempo stabile in vista',
  'detail.tip.pressureLow': 'Bassa pressione - possibili cambiamenti del tempo',
  'detail.tip.pressureNormal': 'Pressione normale - condizioni stabili',
  'detail.tip.windDir': 'Vento proveniente da {direction}',
  'detail.tip.visibilityExcellent': 'Visibilità eccellente - perfetta per ogni attività',
  'detail.tip.visibilityGood': 'Buona visibilità - sicura per guida e attività all\'aperto',
  'detail.tip.visibilityReduced': 'Visibilità ridotta - guida con prudenza, accendi i fari',
  'detail.tip.visibilityPoor': 'Scarsa visibilità - evita spostamenti non necessari, massima prudenza',
  'detail.tip.aqiGood': 'Buona qualità dell\'aria - sicura per le attività all\'aperto',
  'detail.tip.aqiModerate': 'Moderata - accettabile per la maggior parte delle persone',
  'detail.tip.aqiSensitive': 'Nociva per i gruppi sensibili - limita le attività prolungate all\'aperto',
  'detail.tip.aqiUnhealthy': 'Nociva - tutti dovrebbero limitare le attività all\'aperto',
  'detail.tip.aqiVeryUnhealthy': 'Molto nociva - evita le attività all\'aperto',

  // WeatherDetailModal — insight cards
  'detail.insight.humidityTitle': '🌡️ Guida al comfort dell\'umidità',
  'detail.insight.humidityBody':
    '• Sotto il 30%: troppo secco - può irritare pelle e gola\n' +
    '• 30-50%: zona di comfort ideale - condizioni perfette\n' +
    '• 50-65%: confortevole per la maggior parte delle persone\n' +
    '• 65-75%: leggermente umido - può sembrare caldo\n' +
    '• Oltre il 75%: molto umido - afoso e appiccicoso',
  'detail.insight.windTitle': 'Guida alla velocità del vento',
  'detail.insight.windBody':
    '• 0-5 km/h: calma - il fumo sale in verticale\n' +
    '• 6-11 km/h: bava di vento - le foglie frusciano appena\n' +
    '• 12-19 km/h: brezza leggera - perfetta per le attività all\'aperto\n' +
    '• 20-28 km/h: brezza tesa - i rami si muovono, le bandiere sventolano\n' +
    '• 29-38 km/h: vento moderato - gli alberelli oscillano\n' +
    '• 39-49 km/h: vento teso - si muovono i rami grandi\n' +
    '• 50-61 km/h: vento fresco - difficile usare l\'ombrello\n' +
    '• 62+ km/h: vento forte - evita le attività all\'aperto',
  'detail.insight.uvTitle': '☀️ Guida all\'indice UV',
  'detail.insight.uvBody':
    '• 0-2: basso - nessuna protezione necessaria\n' +
    '• 3-5: moderato - cerca l\'ombra a mezzogiorno\n' +
    '• 6-7: alto - protezione necessaria\n' +
    '• 8-10: molto alto - serve una protezione extra\n' +
    '• 11+: estremo - evita l\'esposizione al sole',
  'detail.insight.pressureTitle': 'Andamento della pressione',
  'detail.insight.pressureBody':
    '• Pressione in aumento: tempo bello in arrivo\n' +
    '• Pressione in calo: possibili temporali\n' +
    '• Pressione stabile: condizioni costanti\n' +
    '• Intervallo normale: 1000-1020 hPa',
  'detail.insight.visibilityTitle': '👁️ Guida alla visibilità',
  'detail.insight.visibilityBody':
    '• 10+ km: eccellente - perfetta per ogni attività\n' +
    '• 5-10 km: buona - condizioni di guida sicure\n' +
    '• 2-5 km: moderata - prudenza, fari accesi\n' +
    '• 1-2 km: scarsa - condizioni di guida pericolose\n' +
    '• <1 km: molto scarsa - evita di metterti in viaggio se possibile',
  'detail.insight.airTitle': '🌫️ Dettagli qualità dell\'aria',
  'detail.air.currentAqi': 'AQI attuale: {value}',
  'detail.air.pollutantValue': '{name}: {value} μg/m³',
  'detail.air.scaleTitle': 'Scala AQI:',
  'detail.air.scaleBody':
    '• 0-50: buona - qualità dell\'aria soddisfacente\n' +
    '• 51-100: moderata - accettabile per la maggior parte\n' +
    '• 101-150: nociva per i gruppi sensibili\n' +
    '• 151-200: nociva - tutti possono risentirne\n' +
    '• 201-300: molto nociva - allerta sanitaria\n' +
    '• 301+: pericolosa - condizioni di emergenza',

  // RealCompass
  'compass.title': 'Bussola',
  'compass.windLabel': 'Vento: {direction}',
  'compass.deviceHeading': 'Orientamento dispositivo: {value}°',
  'compass.instruction': 'Per la massima precisione: tieni il telefono in piano, lontano da oggetti metallici, e muovilo disegnando un 8 per calibrarlo',

  // RealCompass — calibration status
  'compass.status.initializing': 'Inizializzazione...',
  'compass.status.noSensorsStatic': 'Sensori non disponibili - bussola statica',
  'compass.status.calibratingDevice': 'Calibrazione dei sensori del dispositivo...',
  'compass.status.calibratedDevice': '✓ Calibrata - Bussola reale attiva',
  'compass.status.calibratingMagnetometer': 'Calibrazione del magnetometro...',
  'compass.status.calibratedMagnetometer': '✓ Calibrata - Magnetometro attivo',
  'compass.status.noSensors': '⚠️ Nessun sensore disponibile - Bussola statica',
  'compass.status.sensorError': '⚠️ Errore del sensore - Bussola statica',

  // RealCompass — heading accuracy
  'compass.accuracy.high': '● Precisione alta',
  'compass.accuracy.medium': '● Precisione media',
  'compass.accuracy.low': '● Precisione bassa - allontanati da oggetti metallici',

  // RealCompass — cardinal directions (16-wind, Italian: O = Ovest)
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
  'share.currentLocation': 'Posizione attuale',

  // Share — buttons
  'share.quickShare': 'Condivisione rapida',
  'share.customizeShare': 'Personalizza condivisione',
  'share.shareButton': 'Condividi bollettino meteo',

  // Share — options modal
  'share.optionsTitle': 'Opzioni di condivisione',
  'share.contentSection': 'Contenuti da includere',
  'share.detailsSection': 'Dettagli meteo',
  'share.option.location': 'Posizione',
  'share.option.locationSubtitle': 'Includi il nome della località nel meteo condiviso',
  'share.option.current': 'Meteo attuale',
  'share.option.currentSubtitle': 'Temperatura e condizioni attuali',
  'share.option.hourly': 'Previsioni orarie',
  'share.option.hourlySubtitle': 'Previsioni per le prossime 12 ore',
  'share.option.daily': 'Previsioni giornaliere',
  'share.option.dailySubtitle': 'Previsioni meteo a 7 giorni',
  'share.option.astronomy': 'Astronomia',
  'share.option.astronomySubtitle': 'Alba, tramonto e fase lunare',
  'share.option.feelsLike': 'Temperatura percepita',
  'share.option.humidity': 'Umidità',
  'share.option.pressure': 'Pressione atmosferica',
  'share.option.visibility': 'Visibilità',
  'share.option.uv': 'Indice UV',
  'share.option.wind': 'Informazioni sul vento',

  // Share — share sheet title and errors
  'share.shareTitle': 'Bollettino meteo - {location}',
  'share.errorTitle': 'Errore di condivisione',
  'share.errorMessage': 'Impossibile condividere i dati meteo',

  // Share — generated share text
  'share.text.header': 'Bollettino meteo',
  'share.text.location': 'Località: {location}',
  'share.text.currentWeather': 'Meteo attuale:',
  'share.text.temperature': 'Temperatura: {temp}',
  'share.text.feelsLike': '(percepiti {temp})',
  'share.text.condition': 'Condizione: {condition}',
  'share.text.humidity': 'Umidità: {humidity}%',
  'share.text.pressure': 'Pressione: {pressure} hPa',
  'share.text.visibility': 'Visibilità: {visibility} km',
  'share.text.uvIndex': 'Indice UV: {uvIndex}',
  'share.text.wind': 'Vento: {speed} km/h {direction}',
  'share.text.next12Hours': 'Prossime 12 ore:',
  'share.text.nextHours': 'Prossime ore:',
  'share.text.hourLine': '{time}: {temp} - {condition}',
  'share.text.dailyForecast': 'Prossimi giorni:',
  'share.text.dayLine': '{day}: {max}/{min} - {condition}',
  'share.text.rainChance': '({chance}% pioggia)',
  'share.text.astronomy': 'Astronomia:',
  'share.text.sunrise': 'Alba: {time}',
  'share.text.sunset': 'Tramonto: {time}',
  'share.text.moon': 'Luna: {phase}',
  'share.text.moonIllumination': '({percent}% illuminata)',
  'share.text.footer': 'Condiviso da WeatherWell',

  // Share — temperature formats
  'share.text.tempC': '{temp}°C',
  'share.text.tempF': '{temp}°F',

  // Notifications — Android notification channels
  'notif.channel.weatherAlerts': 'Allerte meteo',
  'notif.channel.dailyForecast': 'Previsioni giornaliere',

  // Notifications — time-of-day markers
  'notif.time.am': 'AM',
  'notif.time.pm': 'PM',

  // Notifications — daily forecast
  'notif.daily.title': '📅 Previsioni meteo del giorno',
  'notif.daily.fallbackTitle': '🌤️ Previsioni meteo del giorno',
  'notif.daily.fallbackBody': 'Apri WeatherWell per vedere le previsioni complete di oggi.',
  'notif.daily.today': 'Oggi: {high}°/{low}°, {condition}',
  'notif.daily.tomorrow': 'Domani: {high}°/{low}°, {condition}',
  'notif.daily.rainChance': '🌧️ {chance}% di pioggia',
  'notif.daily.highUv': '☀️ UV alto ({uv})',
  'notif.daily.strongWind': '💨 Vento forte {speed} km/h',
  'notif.daily.heavyRain': '🌊 Pioggia intensa {mm} mm',

  // Notifications — hourly forecast
  'notif.hourly.title': '⏰ Meteo delle prossime ore',
  'notif.hourly.updateTitle': '⏰ Aggiornamento meteo orario',
  'notif.hourly.fallbackBody': 'Apri WeatherWell per controllare le previsioni delle prossime ore.',
  'notif.hourly.rainAt': '🌧️ Pioggia alle {times}',
  'notif.hourly.windUpTo': '💨 Vento fino a {speed} km/h',

  // Notifications — umbrella / rain alerts
  'notif.umbrella.title': '☂️ Avviso ombrello',
  'notif.umbrella.body': '{chance}% di probabilità di pioggia in arrivo. Non dimenticare l\'ombrello!',
  'notif.umbrella.upcomingBody': '{chance}% di probabilità di pioggia verso le {time}. Non dimenticare l\'ombrello!',

  // Notifications — wind alerts
  'notif.wind.title': '💨 Allerta vento forte',
  'notif.wind.body': 'La velocità del vento è di {speed} km/h. Fai attenzione all\'aperto.',
  'notif.wind.expectedTitle': '💨 Vento forte in arrivo',
  'notif.wind.expectedBody': 'Previsto vento fino a {speed} km/h verso le {time}.',

  // Notifications — UV alerts
  'notif.uv.title': '☀️ Allerta UV alto',
  'notif.uv.body': 'L\'indice UV è {uv} - Applica la crema solare e indossa indumenti protettivi!',
  'notif.uv.indexTitle': '☀️ Allerta indice UV',
  'notif.uv.indexBody': 'L\'indice UV è {uv} ({level}). Applica la crema solare e indossa indumenti protettivi!',
  'notif.uv.expectedTitle': '☀️ UV alto in arrivo',
  'notif.uv.expectedBody': 'Indice UV di {uv} previsto verso le {time}. Applica la crema solare!',
  'notif.uvLevel.extreme': 'Estremo',
  'notif.uvLevel.veryHigh': 'Molto alto',
  'notif.uvLevel.high': 'Alto',

  // Notifications — temperature alerts
  'notif.temp.highTitle': '🔥 Allerta temperatura alta',
  'notif.temp.lowTitle': '🥶 Allerta temperatura bassa',
  'notif.temp.highBody': 'La temperatura è di {temp}°C, sopra la tua soglia di {threshold}°C',
  'notif.temp.lowBody': 'La temperatura è di {temp}°C, sotto la tua soglia di {threshold}°C',
  'notif.temp.highAlertTitle': '🔥 Allerta caldo',
  'notif.temp.highAlertBody': 'La temperatura è di {temp}°C. Resta idratato ed evita l\'esposizione prolungata al sole.',
  'notif.temp.lowAlertTitle': '❄️ Allerta freddo',
  'notif.temp.lowAlertBody': 'La temperatura è di {temp}°C. Copriti bene e stai al caldo!',
  'notif.temp.aheadHighTitle': '🔥 Caldo in arrivo',
  'notif.temp.aheadHighBody': 'Previsti {temp}°C verso le {time}. Resta idratato!',
  'notif.temp.aheadLowTitle': '❄️ Freddo in arrivo',
  'notif.temp.aheadLowBody': 'Previsti {temp}°C verso le {time}. Copriti bene!',

  // Notifications — air quality alerts
  'notif.aqi.title': '🌫️ Allerta qualità dell\'aria',
  'notif.aqi.body': 'L\'AQI è {aqi} ({level}). Valuta di limitare le attività all\'aperto.',
  'notif.aqiLevel.hazardous': 'Pericolosa',
  'notif.aqiLevel.veryUnhealthy': 'Molto nociva',
  'notif.aqiLevel.unhealthy': 'Nociva',
  'notif.aqiLevel.sensitive': 'Nociva per i gruppi sensibili',

  // Notifications — severe weather alerts
  'notif.severe.title': '🚨 Allerta {type}',
  'notif.severe.windDetected': '💨 Rilevati venti forti: {speed} km/h. Fai attenzione all\'aperto.',
  'notif.severe.conditionsDetected': '{emoji} {type} in corso a {location}. Stai al sicuro!',
  'notif.severe.bgTitle': '{emoji} Maltempo: {type}',
  'notif.severe.bgBody': '{type} nella tua zona. Prendi le dovute precauzioni.',
  'notif.severe.expectedTitle': '{emoji} {type} in arrivo',
  'notif.severe.expectedBody': 'Si prevede {type} verso le {time}. Prendi precauzioni.',
  'notif.severeType.thunderstorm': 'Temporale',
  'notif.severeType.heavyRain': 'Pioggia intensa',
  'notif.severeType.snow': 'Neve',
  'notif.severeType.hail': 'Grandine',
  'notif.severeType.fog': 'Nebbia',
  'notif.severeType.strongWind': 'Vento forte',

  // Widget
  'widget.openAppToLoad': 'Apri l\'app per caricare il meteo',
  'widget.feels': 'Percepita {value}',
  'widget.high': 'Max: {value}',
  'widget.low': 'Min: {value}',
  'widget.tapToOpen': 'Tocca per aprire WeatherWell',
  'widget.tomorrow': 'Domani',
  'widget.tomorrowCondition': 'Domani: {condition}',
};
