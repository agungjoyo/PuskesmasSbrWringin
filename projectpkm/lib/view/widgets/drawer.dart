import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:projectpkm/view/constants/style.dart';

class sideMenu extends StatelessWidget {
  const sideMenu({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: active,
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            InkWell(
              onTap: (){},
              child: Text('Home', style: GoogleFonts.mcLaren(
                fontSize: 22,
                color: Colors.white
              ),),
            )

            Padding(padding: const EdgeInsets.symmetric(vertical: 5),
            child: Divider(),)

            InkWell(
              onTap: (){},
              child: Text('Login', style: GoogleFonts.mcLaren(
                fontSize: 22,
                color: Colors.white
              ),),
            )

            Expanded(child: Align(alignment: Alignment.bottomCenter,
            child: Text("Copyright 2021 | PKM", style: GoogleFonts.mcLaren(color: Colors.white, fontSize: 14 ),
            ),
            ),
            ),
          ],
        ),),
    );
  }
}
