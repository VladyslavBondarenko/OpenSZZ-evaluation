# OpenSZZ-evaluation

A tool to compare results of [OpenSZZ](https://github.com/VladyslavBondarenko/OpenSZZ) or [OpenSZZ-Cloud-Native](https://github.com/VladyslavBondarenko/OpenSZZ-Cloud-Native) with [benchmark datasets](https://github.com/justinwm/InduceBenchmark).

## Installation

`yarn install`

## Usage

### Browser version

1. Run `yarn start`.
2. Open http://localhost:3001/
3. Select .csv files:
   Dataset from OpenSZZ should have the same structure as [this example file](https://github.com/VladyslavBondarenko/OpenSZZ-evaluation/blob/main/example/OOZIE-openszz.csv).
   Benchmark dataset should have the same structure as [this example file](https://github.com/VladyslavBondarenko/OpenSZZ-evaluation/blob/main/example/OOZIE-benchmark.csv).
4. Press "compare".

### Command line version

`yarn compare <path-to-openszz.csv> <path-to-benchmark.csv>`

Example: `yarn compare ./example/OOZIE-openszz.csv ./example/OOZIE-benchmark.csv`

In command line version you can also count number of bug-fixing commits that don't have bug-introducing commits found because the bug was fixed with only line additions:

`node line-additions.js <path-to-openszz.csv>`
