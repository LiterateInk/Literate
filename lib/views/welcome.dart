import 'package:flutter/material.dart';
import 'package:mix/mix.dart';

import 'package:scroll_loop_auto_scroll/scroll_loop_auto_scroll.dart';
import 'package:literate/widgets/welcome/patterns.dart';

class Welcome extends StatelessWidget {
  const Welcome({super.key});

  void _navigateToCreateAccount() {
    print('todo');
    // Navigator.push(
    //   context,
    //   MaterialPageRoute(builder: (context) => const CreateAccountPage()),
    // );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
    	  child: VBox(
            style: Style(
              $flex.mainAxisAlignment.spaceBetween(),
              $box.padding(32, 0)
            ),
            children: [
              VBox(
                style: Style(
                  $flex.gap(32)
                ),
                children: [
                  VBox(
                    style: Style(
                      $flex.gap(10)
                    ),
                    children: const [
                      ScrollLoopAutoScroll(
                        scrollDirection: Axis.horizontal,
                        gap: 10,
                        enableScrollInput: false,
                        duplicateChild: 8,
                        child: WelcomePattern1(),
                      ),
                      ScrollLoopAutoScroll(
                        scrollDirection: Axis.horizontal,
                        gap: 10,
                        enableScrollInput: false,
                        duplicateChild: 6,
                        child: WelcomePattern2(),
                      ),
                      ScrollLoopAutoScroll(
                        scrollDirection: Axis.horizontal,
                        gap: 10,
                        enableScrollInput: false,
                        duplicateChild: 4,
                        child: WelcomePattern3(),
                      ),
                      ScrollLoopAutoScroll(
                        scrollDirection: Axis.horizontal,
                        gap: 10,
                        enableScrollInput: false,
                        duplicateChild: 5,
                        child: WelcomePattern4(),
                      ),
                    ],
                  ),
                  VBox(
                    style: Style(
                      $flex.crossAxisAlignment.start(),
                      $flex.gap(6),
                      $box.padding(0, 32)
                    ),
                    children: [
                      StyledText(
                        'Bienvenue dans Literate',
                        style: Style(
                          $text.style.fontWeight(FontWeight.bold),
                          $text.style.fontSize(42),
                          $text.style.height(1.1)
                        ),
                      ),
                      StyledText(
                        'Réinventons ensemble l\'apprentissage avec une interface sur mesure pour chaque élève.',
                        style: Style(
                          $text.style.fontWeight(FontWeight.w500),
                          $text.style.fontSize(15),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              FilledButton(onPressed: _navigateToCreateAccount, child: const Text('Créer et personnaliser mon espace')),
            ],
          )
      )
    );
  }
}
