import 'package:flutter/material.dart';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:projectpkm/controller/helpers/responsiveness.dart';
import 'package:projectpkm/top_bar_contents.dart';

import 'MenuDrawer.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ScrollController _scrollController = ScrollController();
  double _scrollPosition = 0;
  double _opacity = 0;

  _scrollListener() {
    setState(() {
      _scrollPosition = _scrollController.position.pixels;
    });
  }

  @override
  void initState() {
    _scrollController.addListener(_scrollListener);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;

    return Scaffold(
      appBar: ResponsiveWidget.isSmallScreen(context)
          ? AppBar(
              iconTheme: IconThemeData(color: Color(0xff128612)),
              backgroundColor: Colors.white,
              elevation: 0,
              centerTitle: true,
              title: Text(
                "SAS-KIA PUSWRIN",
                style: GoogleFonts.roboto(
                    fontSize: 20,
                    color: Color(0xff128612),
                    fontWeight: FontWeight.w900),
              ),
            )
          : PreferredSize(
              preferredSize: Size(screenSize.width, 78),
              child: TopBarContents(),
            ),
      drawer: MenuDrawer(),
      body: SingleChildScrollView(
        controller: _scrollController,
        physics: ClampingScrollPhysics(),
        child: Column(
          children: [
            Stack(
              children: [
                Container(
                  // child: SizedBox(
                  //   height: screenSize.height * .9,
                  //   width: screenSize.width,
                  // child: Image.asset(
                  //   'assets/images/background.png',
                  //   fit: BoxFit.cover,
                  
                  // ),
            decoration: BoxDecoration(
                      gradient: LinearGradient(
                          begin: Alignment.topRight,
                          end: Alignment.topLeft,
                          stops: [0.2, 0.9],
                          colors: [(Colors.white), Color(0xfffffff)])),
                  height: MediaQuery.of(context).size.height,
                  width: MediaQuery.of(context).size.width,

                  // decoration: BoxDecoration(
                  //     gradient: LinearGradient(
                  //         begin: Alignment.topRight,
                  //         end: Alignment.topLeft,
                  //         stops: [0.2, 0.9],
                  //         colors: [(Colors.white), Color(0xff128612)])),
                  // height: MediaQuery.of(context).size.height,
                  // width: MediaQuery.of(context).size.width,
                  // child: Padding(
                  //   padding: EdgeInsets.fromLTRB(40.0, 20.0, 40.0, 40.0),
                  //   child: ListView(
                  //     primary: false,
                  //     children: <Widget>[
                  //       Row(
                  //         children: <Widget>[
                  //           Image.asset(
                  //             "images/pkm.png",
                  //             height: 50.0,
                  //             width: 50.0,
                  //           )
                  //         ],
                  //       )
                  //     ],
                  //   ),
                  // ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
