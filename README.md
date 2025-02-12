### Description

Wordie is a simple word-guessing game. The goal is to guess the correct five-letter word within five attempts.

### Minimum System Requirements

- Node.js v20.17.0 or higher

## Setup

To set up and start the game locally, run the following commands in your terminal:

```sh
$ git clone https://github.com/Zyabridos/wordie
$ cd wordie
$ make install
$ make play
```

## How to play:

1. You have 5 guesses.
2. All words consist of exactly 5 letters.

3. If the letter is correct and in the correct position, the letter will become green.
4. If the letter is correct, but in the wrong position, the letter will become yellow.
5. The yellow highlight will not show up if you have more of a letter than in the correct answer.

## Examples

**Correct word:** `FLOOD`  
**Your guess:** `FORCE`

- `F` → 🟩 (Correct letter in the correct position)
- `O` → 🟨 (Correct letter, but in the wrong position)
- `R`, `C`, `E` → No highlight (Incorrect letters)

---

### Another example:

**Correct word:** `WATER`  
**Your guess:** `OTTER`

- `T`, `E`, `R` → 🟩 (Correct letters in the correct positions)
- The first `T` in `OTTER` will not be yellow because `WATER` contains only **one** `T`.
