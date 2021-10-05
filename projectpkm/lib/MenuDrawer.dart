import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:projectpkm/view/constants/style.dart';

class MenuDrawer extends StatelessWidget {
  const MenuDrawer({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: Color(0xfffffff),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              InkWell(
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Text(
                          'Home',
                          style: GoogleFonts.mcLaren(
                          color: Colors.green,
                          fontSize: 16,
                   ),
                 ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 3.0),
                child: Divider(
                  color: lightGrey,
                  thickness: 1,
                  indent: 100,
                  endIndent: 97
                ),
              ),
              InkWell(
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Text(
                          'Tentang Kami',
                          style: GoogleFonts.mcLaren(
                          color: Colors.green,
                          fontSize: 16,
                   ),
                 ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 3.0),
                child: Divider(
                  color: lightGrey,
                  thickness: 1,
                  indent: 85,
                  endIndent: 82
                ),
              ),
              InkWell(
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Text(
                          'Grafik',
                          style: GoogleFonts.mcLaren(
                          color: Colors.green,
                          fontSize: 16,
                   ),
                 ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 3.0),
                child: Divider(
                  color: lightGrey,
                  thickness: 1,
                  indent: 100,
                  endIndent: 97
                ),
              ),
              InkWell(
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Text(
                          'Kontak',
                          style: GoogleFonts.mcLaren(
                          color: Colors.green,
                          fontSize: 16,
                   ),
                 ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 3.0),
                child: Divider(
                  color: lightGrey,
                  thickness: 1,
                  indent: 100,
                  endIndent: 97
                ),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Text(
                    'Copyright © 2021 | PKM SB',
                    style: TextStyle(
                      color: Colors.greenAccent,
                      fontSize: 14,
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
