import 'package:flutter/material.dart';
import 'package:projectpkm/helpers/responsiveness.dart';
import 'package:projectpkm/widgets/large_screen.dart';
import 'package:projectpkm/widgets/small_screen.dart';
import 'package:projectpkm/widgets/top_navigation_bar.dart';

class SiteLayouts extends StatelessWidget {
  const SiteLayouts ({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey();
      return Scaffold(
        appBar: topNavigationBar(context, scaffoldKey),
        body: const ResponsivenessWidgets(largeScreen: LargeScreen(), smallScreen: SmallScreen())
      );
  }
}