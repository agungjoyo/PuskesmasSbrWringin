import 'dart:async';
import 'package:flutter/material.dart';
import 'package:projectpkm/view/widgets/bullet.dart';
import 'package:projectpkm/utils/theme_selector.dart';

class BulletPoint extends StatelessWidget {
  const BulletPoint(
      {Key key,
      @required this.text,
      @required this.animationController,
      @required this.index})
      : super(key: key);
  final String text;
  final AnimationController animationController;
  final int index;

  @override
  Widget build(BuildContext context) {
    double _animationStart = 0.1 * index;
    double _animationEnd = _animationStart + 0.4;
    return SlideTransition(
      position: Tween<Offset>(begin: Offset(2, 0), end: Offset(0, 0)).animate(
          CurvedAnimation(
              parent: animationController,
              curve: Interval(_animationStart, _animationEnd,
                  curve: Curves.ease))),
      child: FadeTransition(
        opacity: animationController,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              String.fromCharCode(0x2022),
              style: TextStyle(
                  color: Color(0xff21a179),
                  fontSize: ThemeSelector.selectBodyText(context).fontSize),
            ),
            SizedBox(width: MediaQuery.of(context).size.width * 0.01),
            Flexible(
              child: Text(
                text,
                style: ThemeSelector.selectBodyText(context),
              ),
            )
          ],
        ),
      ),
    );
  }
}

class BulletList extends StatefulWidget {
  const BulletList({Key key, @required this.strings}) : super(key: key);
  final List<String> strings;

  @override
  _BulletListState createState() => _BulletListState();
}

class _BulletListState extends State<BulletList>
    with SingleTickerProviderStateMixin {
  AnimationController _animationController;

  @override
  void initState() {
    _animationController = AnimationController(
        vsync: this, duration: Duration(milliseconds: 1000));
    Timer(Duration(milliseconds: 200), () => _animationController.forward());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(widget.strings.length * 2, (index) {
        if (index.isEven) {
          return Flexible(
              flex: 2,
              child: BulletPoint(
                text: widget.strings[index ~/ 2],
                animationController: _animationController,
                index: index ~/ 2,
              ));
        } else {
          return Spacer(flex: 1);
        }
      }),
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }
}
