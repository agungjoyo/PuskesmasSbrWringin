import 'package:flutter/material.dart';
import 'package:projectpkm/helpers/style.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomButton extends StatelessWidget {
  final String? teks;

  const CustomButton({Key? key, this.teks}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:
          BoxDecoration(color: active, borderRadius: BorderRadius.circular(30)),
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
      child: Text(
        teks!,
        style: GoogleFonts.roboto(
            fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
      ),
    );
  }
}
