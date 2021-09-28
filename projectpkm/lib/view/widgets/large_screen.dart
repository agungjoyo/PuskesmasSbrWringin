import 'package:flutter/material.dart';

class LargeScreen extends StatelessWidget {
  const LargeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
        children: [
          Expanded(
            flex: 4,
              child: Container(
                color: Colors.red,
              )
          ),
          Expanded(
            flex: 2,
              child: Container(
                color: Colors.blue,
              )
          )
        ],
      );
  }
}