# Reflex Game

A fast-paced browser-based keyboard reflex game built with vanilla JavaScript. Press the key shown on screen before it changes — as your score climbs, the speed increases and harder characters get introduced.

## Preview
![Reeflex Preview](static/preview.png)

**[Play Now](https://abdullah-ghazi0.github.io/Reflex-Game/)**

## How to Play
 
1. Click **Start** and wait for the countdown
2. A character appears on screen — press that key immediately
3. Score points for correct inputs, the game speeds up as you go
4. Survive 30 seconds and aim for the highest score

## Features
- 30-second timed rounds
- Progressive difficulty — speed increases as your score grows
- Three character sets unlocked as you progress: letters → numbers → special characters
- High score saved locally across sessions
- Visual feedback for incorrect keypresses
- Playable on mobile with an on-screen keyboard

 
## Difficulty Scaling
 
| Score Range | Speed | Characters Available |
|-------------|-------|----------------------|
| 0 – 3       | Slow  | A–Z |
| 4 – 9       | Medium | A–Z |
| 10 – 12     | Fast  | A–Z + 0–9 |
| 13 – 18     | Faster | A–Z + 0–9 |
| 19+         | Max   | A–Z + 0–9 + Special Characters |


## Local Development

Just clone and open in a browser:
 
```bash
git clone https://github.com/Abdullah-Ghazi0/Reflex-Game.git
cd Reflex-Game
open index.html
```

## Tech Stack
- HTML
- CSS
- JavaScript (Vanilla)
- Umami Analytics

## Author

**Abdullah Ghazi** <br>
GitHub: https://github.com/Abdullah-Ghazi0 <br>
LinkedIn: https://www.linkedin.com/in/abdullah-ghazi-swe/