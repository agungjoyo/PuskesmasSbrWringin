import 'package:flutter/material.dart';
import 'package:projectpkm/helpers/style.dart';

class MobileMenu extends StatelessWidget {
  const MobileMenu({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: bgColor,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              InkWell(
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Text(
                  'Home',
                  style: TextStyle(color: active, fontSize: 22),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
                child: Divider(),
              ),
              InkWell(
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Text(
                  'Tentang Kami',
                  style: TextStyle(color: active, fontSize: 22),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
                child: Divider(),
              ),
              InkWell(
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Text(
                  'Grafik',
                  style: TextStyle(color: active, fontSize: 22),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
                child: Divider(),
              ),
              InkWell(
                hoverColor: Colors.transparent,
                onTap: () {},
                child: Text(
                  'Kontak',
                  style: TextStyle(color: active, fontSize: 22),
                ),
              ),
              Expanded(
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Text(
                    'Copyright © 2021 | SAS-KIA',
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
