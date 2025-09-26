import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:weatherwell/providers/weather_provider.dart';
import 'package:weatherwell/screens/home_screen.dart';
import 'package:weatherwell/screens/search_screen.dart';
import 'package:weatherwell/screens/settings_screen.dart';

void main() {
  runApp(const WeatherWellApp());
}

class WeatherWellApp extends StatelessWidget {
  const WeatherWellApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => WeatherProvider()),
      ],
      builder: (context, child) => const WeatherApp(),
    );
  }
}

class WeatherApp extends StatelessWidget {
  const WeatherApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WeatherWell',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          brightness: Brightness.light,
        ),
        useMaterial3: true,
        scaffoldBackgroundColor: Colors.grey.shade50,
      ),
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      themeMode: context.watch<WeatherProvider>().themeMode,
      home: const HomeScreen(),
      routes: {
        '/search': (context) => const SearchScreen(),
        '/settings': (context) => const SettingsScreen(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}