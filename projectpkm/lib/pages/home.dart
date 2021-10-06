// import 'package:flutter/material.dart';
// import 'package:projectpkm/helpers/responsive.dart';
// import 'package:projectpkm/helpers/style.dart';
// import 'package:projectpkm/pages/widgets/desktop.dart';
// import 'package:projectpkm/pages/widgets/mobile.dart';
// import 'package:projectpkm/widgets/navbar_desktop.dart';
// import 'package:projectpkm/widgets/drawer.dart';
// import 'package:projectpkm/widgets/mobile_navbar.dart';

// class HomePage extends StatefulWidget {
//   @override
//   _HomePageState createState() => _HomePageState();
// }

// class _HomePageState extends State<HomePage> {
//   GlobalKey<ScaffoldState> scaffoldKey = GlobalKey();

//   @override
//   Widget build(BuildContext context) {
//     var screenSize = MediaQuery.of(context).size;
//     return Scaffold(
//         key: scaffoldKey,
//         appBar: ResponsiveWidget.isSmallScreen(context)
//             ? AppBar()
//             : PreferredSize(
//                 preferredSize: Size(screenSize.width, 1000),
//                 child: NavBar(),
//               ),
//         drawer: MobileMenu(),
//         backgroundColor: bgColor,
//         body: ResponsiveWidget(
//           largeScreen: DesktopScreen(),
//           smallScreen: MobileScreen(),
//         ));
//   }
// }

import 'package:flutter/material.dart';
import 'package:projectpkm/helpers/responsive.dart';
import 'package:projectpkm/helpers/style.dart';
import 'package:projectpkm/pages/widgets/desktop.dart';
import 'package:projectpkm/pages/widgets/mobile.dart';
import 'package:projectpkm/widgets/navbar_desktop.dart';
import 'package:projectpkm/widgets/drawer.dart';
import 'package:projectpkm/widgets/mobile_navbar.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  GlobalKey<ScaffoldState> scaffoldKey = GlobalKey();

  get drawer => null;

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;
    return Scaffold(
        key: scaffoldKey,
        appBar: ResponsiveWidget.isSmallScreen(context)
            ? AppBar(
                leading: new IconButton(
                  icon: new Icon(Icons.menu, color: active),
                  onPressed: () => scaffoldKey.currentState?.openDrawer(),
                ),
                title: Image.asset("assets/images/logopkm.png"),
                centerTitle: true,
                elevation: 0,
                backgroundColor: Colors.transparent,
              )
            : PreferredSize(
                preferredSize: Size(screenSize.width, 1000),
                child: NavBar(),
              ),
        drawer: MobileMenu(),
        backgroundColor: bgColor,
        body: ResponsiveWidget(
          largeScreen: DesktopScreen(),
          smallScreen: MobileScreen(),
        ));
  }
}
