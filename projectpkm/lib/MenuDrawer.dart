import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
                hoverColor: Colors.greenAccent,
                onTap: () {},
                child: Text(
                  'Home',
                  style: GoogleFonts.roboto(
                    color: Colors.black,
                    fontSize: 17,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
                child: Divider(
                  color: Colors.white,
                  thickness: 2,
                ),
              ),
              InkWell(
                hoverColor: Colors.greenAccent,
                onTap: () {},
                child: Text(
                  'Tentang Kami',
                  style: GoogleFonts.roboto(
                    color: Colors.black,
                    fontSize: 17,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
                child: Divider(
                  color: Colors.white,
                  thickness: 2,
                ),
              ),
              InkWell(
                hoverColor: Colors.greenAccent,
                onTap: () {},
                child: Text(
                  'Grafik',
                  style: GoogleFonts.roboto(
                    color: Colors.black,
                    fontSize: 17,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
                child: Divider(
                  color: Colors.white,
                  thickness: 2,
                ),
              ),
              InkWell(
                hoverColor: Colors.greenAccent,
                onTap: () {},
                child: Text(
                  'Kontak',
                  style: GoogleFonts.roboto(
                    color: Colors.black,
                    fontSize: 17,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
                child: Divider(
                  color: Colors.white,
                  thickness: 2,
                ),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Text(
                    'Copyright © 2021 | PKM',
                    style: TextStyle(
                      color: Colors.white,
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
