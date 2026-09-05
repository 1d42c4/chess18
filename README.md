# Endgames, Step by Step

**[Read the GitHub Pages collection](https://knightway8.github.io/chess18/)**

Sixteen clear explanations of promotion, king activity, and practical finishing methods.

For players who want to understand the small positions that decide many games.

## Format

- 16 direct lessons, each a self-contained HTML file with its own styles and embedded vector chess pieces.
- 32 lesson diagrams: the starting position and the result of the fully explained line.
- Visible explanations throughout: no answer inputs, hidden solutions, scores, progress controls, or client-side JavaScript.
- One printable collection, Markdown notes, and PGN move sequences.

A single lesson can be saved or copied on its own and read offline. Navigation to other lessons requires those neighboring files, but the lesson text and diagrams do not. Open [collection.html](collection.html) and use your browser’s Print command to print or save as PDF.

## Lessons

1. [The king becomes an active piece](lessons/01-the-king-becomes-an-active-piece.html)
2. [Opposition is a struggle over entry squares](lessons/02-opposition-is-a-struggle-over-entry-squares.html)
3. [A king in front can escort its pawn home](lessons/03-a-king-in-front-can-escort-its-pawn-home.html)
4. [Count the pawn race to its promotion square](lessons/04-count-the-pawn-race-to-its-promotion-square.html)
5. [A rook pawn can run out of room](lessons/05-a-rook-pawn-can-run-out-of-room.html)
6. [Connected pawns can support one another’s progress](lessons/06-connected-pawns-can-support-one-anothers-progress.html)
7. [An outside passer can distract the king](lessons/07-an-outside-passer-can-distract-the-king.html)
8. [A rook behind a passer protects its advance](lessons/08-a-rook-behind-a-passer-protects-its-advance.html)
9. [A rook can cut the defending king off](lessons/09-a-rook-can-cut-the-defending-king-off.html)
10. [A prepared rook can build a bridge against checks](lessons/10-a-prepared-rook-can-build-a-bridge-against-checks.html)
11. [The sixth-rank barrier delays the attacking king](lessons/11-the-sixth-rank-barrier-delays-the-attacking-king.html)
12. [The wrong-colored bishop cannot control the corner](lessons/12-the-wrong-colored-bishop-cannot-control-the-corner.html)
13. [Promotion with check wins an extra moment](lessons/13-promotion-with-check-wins-an-extra-moment.html)
14. [Exchange queens when the pawn ending supports the decision](lessons/14-exchange-queens-when-the-pawn-ending-supports-the-decision.html)
15. [Separated passed pawns stretch one king](lessons/15-separated-passed-pawns-stretch-one-king.html)
16. [Underpromote when a queen would stalemate](lessons/16-underpromote-when-a-queen-would-stalemate.html)

## Four companion collections

| Repository | Collection | Live site |
| --- | --- | --- |
| [chess15](https://github.com/knightway8/chess15) | Chess, Clearly | [Read](https://knightway8.github.io/chess15/) |
| [chess16](https://github.com/knightway8/chess16) | Openings, Explained | [Read](https://knightway8.github.io/chess16/) |
| [chess17](https://github.com/knightway8/chess17) | Tactics, Made Visible | [Read](https://knightway8.github.io/chess17/) |
| [chess18](https://github.com/knightway8/chess18) | Endgames, Step by Step | [Read](https://knightway8.github.io/chess18/) |

## Verification and maintenance

[Sources and verification](sources.html) explains the scope. [VERIFICATION.json](VERIFICATION.json) records legal move, diagram, PGN, self-containment, and directory-size checks. The endgame collection also includes exact tablebase results. Illustrative tactical continuations are not claims of exhaustive analysis.

Edit [source/course.json](source/course.json), run `node tools/build.mjs`, then run `node tools/verify.cjs`. All directories must remain below 1,000 entries.

GitHub Pages publishes the root of `main` through `.nojekyll`. Default-branch rules require pull requests and block force pushes and branch deletion, without bypass actors. An owner can still alter settings or delete a repository.

## Credits

Original AI-created lessons prepared for knightway8. Cburnett pieces by Colin M. L. Burnett are supplied under GPL-2.0-or-later, with [unmodified SVG sources, provenance, and license](source/pieces/README.md). The artwork’s full license is also embedded as a comment in each standalone HTML file. chess.js is used for authoring checks under its [BSD-2-Clause license](vendor/chess-LICENSE.txt).
