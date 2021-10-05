import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TopBarContents extends StatefulWidget {
  TopBarContents();

  @override
  _TopBarContentsState createState() => _TopBarContentsState();
}

class _TopBarContentsState extends State<TopBarContents> {
  final List _isHovering = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;
    return Container(
      color: Colors.white.withOpacity(0.5),
      child: Padding(
        padding: EdgeInsets.all(20),
        child: Expanded(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(
                width: 20,
              ),
              Image.asset("images/pkm.png"),
              Padding(
                padding: const EdgeInsets.fromLTRB(10,0,0,0),
                child:  Column(
                  children: [
                    Text(
                    "SAS-KIA Sumber Wringin",
                      style: GoogleFonts.mcLaren(
                        textStyle: TextStyle(
                          fontSize: 26,
                          color: Color(0xff128612),
                          fontWeight: FontWeight.w900),
                      ) 
                    ),
                  ]
                ),
              ),
              SizedBox(width: screenSize.width / 15),
              InkWell(
                onHover: (value) {
                  setState(() {
                    value ? _isHovering[0] = true : _isHovering[0] = false;
                  });
                },
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Home',
                      style: GoogleFonts.mcLaren(
                        textStyle: TextStyle(
                          color: _isHovering[0]
                              ? Color(0xff128612)
                              : Color(0xff128612),
                          fontWeight: FontWeight.bold,
                          fontSize: 20)
                      ),
                    ),
                    SizedBox(height: 5),
                    Visibility(
                      maintainAnimation: true,
                      maintainState: true,
                      maintainSize: true,
                      visible: _isHovering[0],
                      child: Container(
                        height: 2,
                        width: 20,
                        color: Color(0xFF051441),
                      ),
                    )
                  ],
                ),
              ),
              SizedBox(width: screenSize.width / 15),
              InkWell(
                onHover: (value) {
                  setState(() {
                    value ? _isHovering[1] = true : _isHovering[1] = false;
                  });
                },
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Tentang Kami',
                      style: GoogleFonts.mcLaren(
                        textStyle:  TextStyle(
                          color: _isHovering[1]
                              ? Color(0xff128612)
                              : Color(0xff128612),
                          fontWeight: FontWeight.bold,
                          fontSize: 20)
                      ),
                    ),
                    SizedBox(height: 5),
                    Visibility(
                      maintainAnimation: true,
                      maintainState: true,
                      maintainSize: true,
                      visible: _isHovering[1],
                      child: Container(
                        height: 2,
                        width: 20,
                        color: Color(0xFF051441),
                      ),
                    )
                  ],
                ),
              ),
              SizedBox(width: screenSize.width / 15),
              InkWell(
                onHover: (value) {
                  setState(() {
                    value ? _isHovering[2] = true : _isHovering[2] = false;
                  });
                },
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Grafik',
                      style: GoogleFonts.mcLaren(
                        textStyle: TextStyle(
                          color: _isHovering[2]
                              ? Color(0xff128612)
                              : Color(0xff128612),
                          fontWeight: FontWeight.bold,
                          fontSize: 20),
                      )
                    ),
                    SizedBox(height: 5),
                    Visibility(
                      maintainAnimation: true,
                      maintainState: true,
                      maintainSize: true,
                      visible: _isHovering[2],
                      child: Container(
                        height: 2,
                        width: 20,
                        color: Color(0xFF051441),
                      ),
                    )
                  ],
                ),
              ),
              SizedBox(width: screenSize.width / 15),
              InkWell(
                onHover: (value) {
                  setState(() {
                    value ? _isHovering[3] = true : _isHovering[3] = false;
                  });
                },
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Kontak',
                      style: GoogleFonts.mcLaren(
                        textStyle: TextStyle(
                          color: _isHovering[3]
                              ? Color(0xff128612)
                              : Color(0xff128612),
                          fontWeight: FontWeight.bold,
                          fontSize: 20),
                      ),
                    ),
                    SizedBox(height: 5),
                    Visibility(
                      maintainAnimation: true,
                      maintainState: true,
                      maintainSize: true,
                      visible: _isHovering[3],
                      child: Container(
                        height: 2,
                        width: 20,
                        color: Color(0xFF051441),
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
    //);
  }
}
