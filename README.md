A small, calm mood check-in app. Pick the Pokémon companion that matches how you feel, set your energy, try one tiny suggested activity, and record the check-in as a MoodDex entry.

<!-- Add a screenshot or GIF once you have one: ![MoodDex screenshot](docs/screenshot.png) -->
<!-- Add your live demo link here after deploying (Vercel/Netlify). -->

> **Unofficial, non-commercial fan project made for learning.** Not affiliated with or endorsed by Nintendo, Game Freak, or The Pokémon Company. See [Credits & disclaimer](#credits--disclaimer).

## How it works

1. **Choose a companion.** Cubone (sad), Charizard (angry), Pikachu (happy) or Psyduck (anxious). The page theme changes with your mood.
2. **Energy check.** Low, medium or high.
3. **Activity suggestion.** Three small activities matched to your mood and energy, each with a short encouraging line.
4. **Summary and journal.** A quick reflection with an optional note.
5. **MoodDex entry.** A Pokédex-style screen records the check-in and adds to your count.

## Features

- Mood-based themes and companions with animated pixel sprites
- Light and dark mode
- Ambient sounds: rain, waves, forest and lofi
- Local weather, detected automatically
- Responsive layout for phones and desktop
- Check-in count saved in your browser (`localStorage`). Journal text is not saved.

## Tech stack

- [React 18](https://react.dev/) and [Vite 5](https://vitejs.dev/)
- Plain CSS, with no UI library
- [Open-Meteo](https://open-meteo.com/) for weather
- [BigDataCloud](https://www.bigdatacloud.com) for location and city names
- [PokéAPI sprites](https://github.com/PokeAPI/sprites) for the Pokémon art

## Getting started

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
git clone https://github.com/ajeerahazali/mood-tracker-meets-pokemon.git
cd mood-tracker-meets-pokemon
npm install
npm run dev
```

Open the local address Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```text
├── public/
│   └── audio/        # ambient sounds, select sound and CREDITS.txt
├── src/
│   ├── App.jsx       # components and app logic
│   ├── main.jsx      # entry point
│   └── styles.css    # all styling
├── index.html
└── package.json
```

## Privacy

The weather widget needs your approximate location:

1. It first guesses a city-level location from your IP address, with no permission prompt.
2. If that fails, it asks your browser for your location, with your permission.
3. The coordinates are used only to look up the weather and a city name. This app does not store them.

The only data kept is your check-in count, stored in your own browser.

## What I practised

- React state and a multi-step flow
- Responsive layout, including diagnosing and fixing a mobile scroll bug caused by a fixed-height container
- Calling public APIs (Open-Meteo, BigDataCloud) with graceful fallbacks
- Reading, debugging and understanding AI-assisted code
- Giving proper credit and respecting licenses for third-party assets

## Credits & disclaimer

This is an unofficial fan project made for learning, and it is **not** affiliated with or endorsed by Nintendo, Game Freak, or The Pokémon Company. Pokémon and Pokémon character names are trademarks of Nintendo. Please keep it non-commercial: no ads, donations or paywall, because the audio licenses below only allow non-commercial use.

| What | Source | Terms |
| --- | --- | --- |
| Pokémon sprites | [PokéAPI/sprites](https://github.com/PokeAPI/sprites) | Artwork belongs to Nintendo and its partners, used here as a fan project |
| Weather data | [Open-Meteo](https://open-meteo.com/) | See their [license page](https://open-meteo.com/en/license) |
| Location and city names | [BigDataCloud](https://www.bigdatacloud.com) | Free client-side reverse geocoding |
| Sound effects | [Orange Free Sounds](https://www.orangefreesounds.com) | [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/), no changes made |
| Background music | [Fesliyan Studios](https://www.FesliyanStudios.com) | Free for non-commercial use |

**Audio details**

- [Rain Sound, Summer Storm](https://orangefreesounds.com/rain-sound-summer-storm-725-min/), [Waves Sound Effect](https://orangefreesounds.com/waves-sound-effect/), [Forest Sound Effect](https://orangefreesounds.com/forest-sound-effect/) and [8 Bit Pop Sound Effect](https://orangefreesounds.com/8-bit-pop-sound-effect/) by [Orange Free Sounds](https://www.orangefreesounds.com), licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). No changes were made.
- Music in the background from https://www.FesliyanStudios.com, track "Chill Gaming" ([track page](https://www.fesliyanstudios.com/royalty-free-music/download/chill-gaming/350)).

The Pokémon sprites, names and the audio files are not covered by any license of this repository. They remain the property of their respective owners.
