define(
    [
        'text!samples/meteorites/meteorites.js', 'text!samples/meteorites/README.md',
        'text!samples/snake/snake.js', 'text!samples/snake/README.md',
        'text!samples/langton-ant/langton-ant.js', 'text!samples/langton-ant/README.md',
        'text!samples/rain-using-state/rain-using-state.js', 'text!samples/rain-using-state/README.md',
        'text!samples/rain-using-scan/rain-using-scan.js', 'text!samples/rain-using-scan/README.md',
        'text!samples/rain-using-generate/rain-using-generate.js', 'text!samples/rain-using-generate/README.md',
        'text!samples/rain-using-generator/rain-using-generator.js', 'text!samples/rain-using-generator/README.md',
        'text!samples/slither-using-latest-from/slither-using-latest-from.js', 'text!samples/slither-using-latest-from/README.md',
        'text!samples/slither-using-combine-latest/slither-using-combine-latest.js', 'text!samples/slither-using-combine-latest/README.md',
        'text!samples/slither-using-map-and-switch/slither-using-map-and-switch.js', 'text!samples/slither-using-map-and-switch/README.md',
        'text!samples/slither-using-join/slither-using-join.js', 'text!samples/slither-using-join/README.md'
    ],
    (meteoritesJS, meteoritesMD,
     snakeJS, snakeMD,
     langtonAntJS, langtonAntMD,
     rainUsingStateJS, rainUsingStateMD,
     rainUsingScanJS, rainUsingScanMD,
     rainUsingGenerateJS, rainUsingGenerateMD,
     rainUsingGeneratorJS, rainUsingGeneratorMD,
     slitherUsingLatestFromJS, slitherUsingLatestFromMD,
     slitherUsingCombineLatestJS, slitherUsingCombineLatestMD,
     slitherUsingMapAndSwitchJS, slitherUsingMapAndSwitchMD,
     slitherUsingJoinJS, slitherUsingJoinMD) => {

        'use strict';

        return [
            {
                title: 'meteorites',
                category: 'full-game',
                code: meteoritesJS,
                description: meteoritesMD
            },
            {
                title: 'snake',
                category: 'full-game',
                code: snakeJS,
                description: snakeMD
            },
            {
                title: 'Langton\'s ant',
                category: 'full-game',
                code: langtonAntJS,
                description: langtonAntMD
            },
            {
                title: 'rain-using-state',
                category: 'snippet',
                code: rainUsingStateJS,
                description: rainUsingStateMD
            },
            {
                title: 'rain-using-generate',
                category: 'snippet',
                code: rainUsingGenerateJS,
                description: rainUsingGenerateMD
            },
            {
                title: 'rain-using-scan',
                category: 'snippet',
                code: rainUsingScanJS,
                description: rainUsingScanMD
            },
            {
                title: 'rain-using-generator',
                category: 'snippet',
                code: rainUsingGeneratorJS,
                description: rainUsingGeneratorMD
            },
            {
                title: 'slither-using-latest-from',
                category: 'snippet',
                code: slitherUsingLatestFromJS,
                description: slitherUsingLatestFromMD
            },
            {
                title: 'slither-using-combine-latest',
                category: 'snippet',
                code: slitherUsingCombineLatestJS,
                description: slitherUsingCombineLatestMD
            },
            {
                title: 'slither-using-map-and-switch',
                category: 'snippet',
                code: slitherUsingMapAndSwitchJS,
                description: slitherUsingMapAndSwitchMD
            },
            {
                title: 'slither-using-join',
                category: 'snippet',
                code: slitherUsingJoinJS,
                description: slitherUsingJoinMD
            }
        ];
    }
);