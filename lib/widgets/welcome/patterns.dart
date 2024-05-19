import 'package:flutter/widgets.dart';
import 'package:mix/mix.dart';

const _patternColor = Color(0xFF000000);

class WelcomePattern1 extends StatelessWidget {
  const WelcomePattern1({super.key});

  @override
  Widget build(BuildContext context) {
    return FlexBox(
      direction: Axis.horizontal,
      style: Style(
        $flex.gap(10),
      ),
      children: [
        Container(
          height: 45,
          width: 170,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(32),
              bottomRight: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 70,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topRight: Radius.circular(32),
              bottomLeft: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 45,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.all(Radius.circular(32))
          ),
        ),
        Container(
          height: 45,
          width: 90,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topRight: Radius.circular(32),
              topLeft: Radius.circular(32),
              bottomRight: Radius.circular(32)
            ),
          ),
        ),
      ],
    );
  }
}

class WelcomePattern2 extends StatelessWidget {
  const WelcomePattern2({super.key});

  @override
  Widget build(BuildContext context) {
    return FlexBox(
      direction: Axis.horizontal,
      style: Style(
        $flex.gap(10),
      ),
      children: [
        Container(
          height: 45,
          width: 90,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(32),
              bottomLeft: Radius.circular(32),
              bottomRight: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 115,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topRight: Radius.circular(32),
              bottomRight: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 115,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(32),
              bottomLeft: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 70,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topRight: Radius.circular(32),
              bottomLeft: Radius.circular(32),
            ),
          ),
        ),
      ],
    );
  }
}

class WelcomePattern3 extends StatelessWidget {
  const WelcomePattern3({super.key});

  @override
  Widget build(BuildContext context) {
    return FlexBox(
      direction: Axis.horizontal,
      style: Style(
        $flex.gap(10),
      ),
      children: [
        Container(
          height: 45,
          width: 115,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topRight: Radius.circular(32),
              bottomRight: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 45,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.all(Radius.circular(32)),
          ),
        ),
        Container(
          height: 45,
          width: 170,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(32),
              bottomRight: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 90,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(32),
              topRight: Radius.circular(32),
              bottomRight: Radius.circular(32),
            ),
          ),
        ),
      ],
    );
  }
}

class WelcomePattern4 extends StatelessWidget {
  const WelcomePattern4({super.key});

  @override
  Widget build(BuildContext context) {
    return FlexBox(
      direction: Axis.horizontal,
      style: Style(
        $flex.gap(10),
      ),
      children: [
        Container(
          height: 45,
          width: 45,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.all(Radius.circular(32)),
          ),
        ),
        Container(
          height: 45,
          width: 115,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(32),
              bottomLeft: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 40,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(32),
              bottomRight: Radius.circular(32)
            ),
          ),
        ),
        Container(
          height: 45,
          width: 170,
          decoration: const BoxDecoration(
            color: _patternColor,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(32),
            ),
          ),
        ),
      ],
    );
  }
}
