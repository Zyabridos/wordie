[![Maintainability](https://api.codeclimate.com/v1/badges/1465d93f63f05a276f3f/maintainability)](https://codeclimate.com/github/Zyabridos/wordle/maintainability)

### Description

Wordie is a simple word-guessing game. The goal is to guess the correct five-letter word within five attempts.

### Minimum System Requirements

- Node.js v20.17.0 or higher

# 🎮 How to Play the Game

## Installation and Setup

To play the game locally, follow these steps:

### **Clone the repository**

```sh
git clone https://github.com/zyabridos/your-repo.git
cd your-repo
```

### **Install dependencies**

```sh
npm ci
```

### **Build the project**

```sh
make build

```

### **Run the game**

The game is only playable in development mode.

```sh
make dev
```

### **Open the game in your browser**

After running the game, check your terminal for the **localhost URL** (e.g., `http://localhost:3000`) and open it in your browser.

### \*\*Rules

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

## 🛠 Additional Commands

### 🔄 **Run in development mode**

```sh
npm run dev
```

### 🧪 **Run tests**

```sh
npx playwright test
```

### 🧹 **Format the code**

```sh
npx prettier --write .
```
