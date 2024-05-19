import 'package:google_fonts/google_fonts.dart';
import 'package:flutter/material.dart';
import 'package:literate/views/welcome.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Literate',
      theme: ThemeData(
        textTheme: GoogleFonts.lexendTextTheme(Theme.of(context).textTheme),
        colorScheme: ColorScheme.fromSeed(seedColor: const Color.fromRGBO(132, 31, 253, 1.0)),
        useMaterial3: true,
      ),
      home: const Welcome(),
    );
  }
}
