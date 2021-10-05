import 'package:flutter/material.dart';
import 'package:projectpkm/homepage.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'SAS-KIA PUSWRIN',
      home: HomePage(),
    );
  }
}
