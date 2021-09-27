import 'package:flutter/material.dart';

// Declare Screen Size
const int largeScreenSize = 720;
const int smallScreenSize = 360;

class ResponsivenessWidgets extends StatelessWidget {
  
  // Declare final Widget
    final Widget largeScreen;
    final Widget smallScreen;

  const ResponsivenessWidgets(
      {Key? key, 
      required this.largeScreen,
      required this.smallScreen
      }
    ) : super(key: key);

  static bool isSmallScreen(BuildContext context) =>
    MediaQuery.of(context).size.width < largeScreenSize;
  static bool isLargeScreen(BuildContext context) =>
    MediaQuery.of(context).size.width >= largeScreenSize;
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double _width = constraints.maxWidth;
        debugPrint('width:$_width');
        if (_width >= largeScreenSize){
          return largeScreen;
        }
        else{
          return smallScreen;
        }
      },
    );
  }
}