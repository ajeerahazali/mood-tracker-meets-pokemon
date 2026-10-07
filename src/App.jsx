import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

const moods = [
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😔',
    tone: 'Cubone fits a softer, heavier mood and keeps the next step gentle.',
    themeClass: 'theme-sad',
    pokemonName: 'Cubone',
    pokemonPower: 'soft rain power',
    powerIcon: '🌧️',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/104.gif',
    auraClass: 'pokemon-sad',
    noticed: 'You noticed heaviness and chose a gentler pace.',
    reminder: 'A difficult day does not define your whole journey.',
    type: 'Water',
    dexNumber: '104',
    dexDescription: 'A quiet moment has been observed.',
  },
  {
    id: 'angry',
    label: 'Angry',
    emoji: '😠',
    tone: 'Charizard matches strong heat and helps turn it into a clearer direction.',
    themeClass: 'theme-angry',
    pokemonName: 'Charizard',
    pokemonPower: 'steady flame power',
    powerIcon: '🔥',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif',
    auraClass: 'pokemon-angry',
    noticed: 'You noticed strong pressure and looked for a steadier outlet.',
    reminder: 'Strong feelings can be real without leading the whole day.',
    type: 'Fire',
    dexNumber: '006',
    dexDescription: 'Strong feelings can be real without leading the whole day.',
  },
  {
    id: 'happy',
    label: 'Happy',
    emoji: '🙂',
    tone: 'Pikachu suits a bright mood and keeps that energy playful but steady.',
    themeClass: 'theme-happy',
    pokemonName: 'Pikachu',
    pokemonPower: 'bright spark power',
    powerIcon: '⚡',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif',
    auraClass: 'pokemon-happy',
    noticed: 'You noticed bright energy and gave it a calm direction.',
    reminder: 'A good moment grows stronger when you notice it clearly.',
    type: 'Electric',
    dexNumber: '025',
    dexDescription: 'A good moment grows stronger when you notice it clearly.',
  },
  {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😟',
    tone: 'Psyduck fits a restless mind and brings things back toward rhythm.',
    themeClass: 'theme-anxious',
    pokemonName: 'Psyduck',
    pokemonPower: 'ripple focus power',
    powerIcon: '🌀',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/54.gif',
    auraClass: 'pokemon-anxious',
    noticed: 'You noticed restless thoughts and chose a steadier rhythm.',
    reminder: 'An uneasy moment is only one part of a much larger story.',
    type: 'Psychic',
    dexNumber: '054',
    dexDescription: 'An uneasy moment is only one part of a much larger story.',
  },
];

const activityMap = {
  sad: {
    low: ['Wrap up in something soft', 'Take three slower breaths', 'Sit by a window for one minute'],
    medium: ['Write one kind sentence to yourself', 'Play one gentle song', 'Stretch your arms and hands'],
    high: ['Take a short outside walk', 'Message yourself one hopeful note', 'Tidy one small area nearby'],
  },
  angry: {
    low: ['Sit quietly for two minutes', 'Loosen your shoulders', 'Sip a glass of water'],
    medium: ['Take five slow breaths', 'Write one strong feeling on paper', 'Stretch your neck and hands'],
    high: ['Walk around the room', 'Do a one-minute shake-out', 'Name five things you can see'],
  },
  happy: {
    low: ['Stay still for a calm minute', 'Notice one thing going well', 'Keep breathing slowly'],
    medium: ['Write one kind note to yourself', 'Take a short stretch break', 'Choose your next small step'],
    high: ['Take a short energizing walk', 'Play one calming song', 'Tidy one small spot nearby'],
  },
  anxious: {
    low: ['Hold something warm', 'Count five slow breaths', 'Read a short calming line'],
    medium: ['Name three sounds around you', 'Relax your jaw and hands', 'Press your feet into the floor'],
    high: ['Do box breathing for one minute', 'Walk slowly for thirty seconds', 'Look around and name colors'],
  },
};

const activityQuotes = {
  'Wrap up in something soft': 'Soft moments still count as progress.',
  'Take three slower breaths': 'A slower breath can make more room inside your mind.',
  'Sit by a window for one minute': 'Even a quiet pause can help the day feel lighter.',
  'Write one kind sentence to yourself': 'The way you speak to yourself matters.',
  'Play one gentle song': 'Small comfort is still real comfort.',
  'Stretch your arms and hands': 'A little movement can loosen a heavy moment.',
  'Take a short outside walk': 'A change of space can soften a hard feeling.',
  'Message yourself one hopeful note': 'Hope can start as one simple sentence.',
  'Tidy one small area nearby': 'A tiny reset can help your mind feel clearer.',
  'Sit quietly for two minutes': 'Stillness can be enough for now.',
  'Loosen your shoulders': 'Your body can help tell your mind it is safe to ease up.',
  'Sip a glass of water': 'Care can start with one basic step.',
  'Take five slow breaths': 'You do not have to solve everything in this minute.',
  'Write one strong feeling on paper': 'Naming the fire can help it cool into clarity.',
  'Stretch your neck and hands': 'Release often begins in small places.',
  'Walk around the room': 'Motion can help break the grip of stress.',
  'Do a one-minute shake-out': 'You can let some tension leave your body.',
  'Name five things you can see': 'Looking around can bring you back to right now.',
  'Hold something warm': 'Warmth can be a simple way back to calm.',
  'Count five slow breaths': 'Counting can give your thoughts a gentler rhythm.',
  'Read a short calming line': 'A few steady words can change the tone of a moment.',
  'Name three sounds around you': 'Listening can anchor you in the present.',
  'Relax your jaw and hands': 'When your body softens, your mind often follows.',
  'Press your feet into the floor': 'Grounding starts where you are.',
  'Do box breathing for one minute': 'Structure can help when things feel uncertain.',
  'Walk slowly for thirty seconds': 'Slow movement can quiet a racing mind.',
  'Look around and name colors': 'Simple noticing can calm the noise inside.',
  'Stay still for a calm minute': 'Peace grows in small steady moments.',
  'Notice one thing going well': 'One good thing is enough to notice today.',
  'Keep breathing slowly': 'Steady breathing helps steady you.',
  'Write one kind note to yourself': 'Kindness is strongest when you include yourself.',
  'Take a short stretch break': 'A short reset can keep calm going.',
  'Choose your next small step': 'Clarity often begins with just one next step.',
  'Take a short energizing walk': 'A little energy can carry you further than you think.',
  'Play one calming song': 'Let one calm thing shape the next few minutes.',
  'Tidy one small spot nearby': 'Order in one small place can create ease around you.',
};

    const weatherCodeLabels = {
      0: 'Clear sky',
      1: 'Mostly clear',
      2: 'Partly cloudy',
      3: 'Cloudy',
      45: 'Foggy',
      48: 'Foggy',
      51: 'Light drizzle',
      53: 'Drizzle',
      55: 'Heavy drizzle',
      56: 'Freezing drizzle',
      57: 'Freezing drizzle',
      61: 'Light rain',
      63: 'Rain',
      65: 'Heavy rain',
      66: 'Freezing rain',
      67: 'Freezing rain',
      71: 'Light snow',
      73: 'Snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Rain showers',
      81: 'Strong rain showers',
      82: 'Heavy rain showers',
      85: 'Snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with hail',
    };

const defaultView = {
  label: 'No mood yet',
  emoji: '🌱',
  tone: 'Choose the companion that best represents your current state.',
  themeClass: 'theme-neutral',
  pokemonName: 'Waiting guide',
  pokemonPower: 'unopened path',
  auraClass: 'pokemon-neutral',
  noticed: 'You paused long enough to notice what is present.',
  reminder: 'Showing up for yourself counts, even in small ways.',
};

const energyOptions = [
  {
    id: 'low',
    label: 'Low energy',
    emoji: '😴',
    helper: 'Need softness',
    value: 2,
  },
  {
    id: 'medium',
    label: 'Medium energy',
    emoji: '🙂',
    helper: 'Can do a little',
    value: 5,
  },
  {
    id: 'high',
    label: 'High energy',
    emoji: '⚡',
    helper: 'Ready to move',
    value: 9,
  },
];

const ambientTracks = {
  off: {
    label: 'Off',
    emoji: '🔇',
    url: '',
  },
  rain: {
    label: 'Rain',
    emoji: '🌧️',
    url: '/audio/rain.mp3',
  },
  waves: {
    label: 'Waves',
    emoji: '🌊',
    url: '/audio/waves.mp3',
  },
  forest: {
    label: 'Forest',
    emoji: '🌳',
    url: '/audio/forest.mp3',
  },
  lofi: {
    label: 'Lofi',
    emoji: '🎶',
    url: '/audio/lofi.mp3',
  }
};

function getEnergyBand(energy) {
  if (energy <= 3) return 'low';
  if (energy <= 7) return 'medium';
  return 'high';
}

function App() {
  const [confirmedMoodId, setConfirmedMoodId] = useState('');
  const [energy, setEnergy] = useState(5);
  const [hasChosenEnergy, setHasChosenEnergy] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [colorMode, setColorMode] = useState('dark');
  const [ambientMode, setAmbientMode] = useState('off');
  const [currentStep, setCurrentStep] = useState('mood');
  const [noticedText, setNoticedText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [moodCount, setMoodCount] = useState(() => {
    try {
      const stored = localStorage.getItem('mooddex-count');
      return stored ? Number(stored) : 0;
    } catch {
      return 0;
    }
  });
  const [moodEntries, setMoodEntries] = useState(() => {
    try {
      const stored = localStorage.getItem('mooddex-entries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [weatherState, setWeatherState] = useState({
    status: 'loading',
    data: null,
    error: '',
  });
  const ambientAudioRef = useRef(null);
  const selectAudioRef = useRef(null);

  const playSelectSound = useCallback(() => {
    const audio = selectAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, []);

  const selectedMood = moods.find((mood) => mood.id === confirmedMoodId) ?? defaultView;
  const hasPickedMood = confirmedMoodId !== '';
  const energyBand = getEnergyBand(energy);
  const currentMoodCard = hasPickedMood ? selectedMood : defaultView;
  const hasPickedActivity = selectedActivity !== '';

  const activities = useMemo(() => {
    if (!hasPickedMood) {
      return [];
    }

    return activityMap[confirmedMoodId]?.[energyBand] ?? [];
  }, [confirmedMoodId, energyBand, hasPickedMood]);

  const energyLabel = useMemo(() => {
    if (energyBand === 'low') return 'Low energy';
    if (energyBand === 'medium') return 'Medium energy';
    return 'High energy';
  }, [energyBand]);

  const selectedEnergyOption = useMemo(() => {
    return energyOptions.find((option) => option.id === energyBand) ?? energyOptions[1];
  }, [energyBand]);

  const selectedQuote = useMemo(() => {
    if (!selectedActivity) return '';

    return activityQuotes[selectedActivity] || 'One kind step is enough for right now.';
  }, [selectedActivity]);

  const weatherSummary = useMemo(() => {
    if (!weatherState.data) return '';

    return weatherCodeLabels[weatherState.data.weatherCode] || 'Current weather';
  }, [weatherState.data]);

      useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        // Ask the browser for the device location (shows a permission prompt)
        const getBrowserPosition = () =>
          new Promise((resolve) => {
            if (!('geolocation' in navigator)) {
              resolve(null);
              return;
            }
            navigator.geolocation.getCurrentPosition(
              (position) =>
                resolve({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }),
              () => resolve(null),
              { timeout: 8000 },
            );
          });

        // Get a place name. With no coordinates, the service guesses
        // the location from the visitor's IP address instead.
        const lookupPlace = async (coords) => {
          const params = new URLSearchParams({ localityLanguage: 'en' });
          if (coords) {
            params.set('latitude', coords.latitude);
            params.set('longitude', coords.longitude);
          }
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`,
            { signal },
          );
          if (!response.ok) throw new Error('Location lookup failed.');
          const json = await response.json();
          return {
            latitude: json.latitude,
            longitude: json.longitude,
            name: json.city || json.locality || json.principalSubdivision || json.countryName || '',
          };
        };

        async function loadWeather() {
          try {
            setWeatherState({ status: 'loading', data: null, error: '' });

            let coords = null;
            let place = '';

            // 1) Silent: guess from the IP address (no permission prompt)
            try {
              const guess = await lookupPlace(null);
              if (typeof guess.latitude === 'number' && typeof guess.longitude === 'number') {
                coords = { latitude: guess.latitude, longitude: guess.longitude };
                place = guess.name;
              }
            } catch (error) {
              if (error.name === 'AbortError') return;
            }

            // 2) If that failed, ask the browser (shows a permission prompt)
            if (!coords) {
              coords = await getBrowserPosition();
              if (!coords) {
                throw new Error('Could not detect your location.');
              }
              try {
                place = (await lookupPlace(coords)).name;
              } catch {
                // weather still works; we just show a generic label
              }
            }

            const url =
              'https://api.open-meteo.com/v1/forecast' +
              `?latitude=${coords.latitude.toFixed(2)}&longitude=${coords.longitude.toFixed(2)}` +
              '&current=temperature_2m,weather_code';

            const response = await fetch(url, { signal });

            if (!response.ok) {
              throw new Error('Weather data could not load right now.');
            }

            const json = await response.json();
            const current = json.current;

            if (!current || typeof current.temperature_2m !== 'number') {
              throw new Error('Weather data is missing expected fields.');
            }

            setWeatherState({
              status: 'ready',
              data: {
                temperature: current.temperature_2m,
                weatherCode: current.weather_code,
                time: current.time,
                place: place || 'Your location',
              },
              error: '',
            });
          } catch (error) {
            if (error.name === 'AbortError') {
              return;
            }

            setWeatherState({
              status: 'error',
              data: null,
              error: error.message || 'Weather data could not load right now.',
            });
          }
        }

        loadWeather();

        return () => controller.abort();
      }, []);

  useEffect(() => {
    try {
      localStorage.setItem('mooddex-count', String(moodCount));
    } catch {
      // ignore storage errors
    }
  }, [moodCount]);

  useEffect(() => {
    try {
      localStorage.setItem('mooddex-entries', JSON.stringify(moodEntries));
    } catch {
      // ignore storage errors
    }
  }, [moodEntries]);

  useEffect(() => {
    const audio = ambientAudioRef.current;

    if (!audio) {
      return undefined;
    }

    if (ambientMode === 'off') {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute('src');
      audio.load();
      return undefined;
    }

    const track = ambientTracks[ambientMode];

    if (!track?.url) {
      return undefined;
    }

    audio.src = track.url;
    audio.loop = true;
    audio.volume = 0.35;
    audio.play().catch(() => {});

    return undefined;
  }, [ambientMode]);

  const handleChooseMood = (moodId) => {
    const hasChangedMood = confirmedMoodId !== moodId;
    setConfirmedMoodId(moodId);
    playSelectSound();
    if (hasChangedMood) {
      setHasChosenEnergy(false);
      setSelectedActivity('');
      setCurrentStep('energy');
    }
  };

  const handleEnergyCardPick = (value) => {
    const hasChangedEnergy = !hasChosenEnergy || energy !== value;
    setEnergy(value);
    setHasChosenEnergy(true);
    playSelectSound();
    if (hasChangedEnergy) {
      setSelectedActivity('');
    }
  };

  const completeCheckIn = useCallback(() => {
    setMoodCount((current) => current + 1);
    setConfirmedMoodId('');
    setHasChosenEnergy(false);
    setSelectedActivity('');
    setNoticedText('');
    setCurrentStep('mood');
  }, []);

  const stepConfig = {
    mood: { previous: null, next: 'energy', canContinue: hasPickedMood },
    energy: { previous: 'mood', next: 'activity', canContinue: hasChosenEnergy },
    activity: { previous: 'energy', next: 'reflection', canContinue: hasPickedActivity },
    reflection: { previous: 'activity', next: 'mooddex', canContinue: hasPickedActivity },
    mooddex: { previous: null, next: null, canContinue: true },
  };

  const goToStep = (step) => {
    if (step) {
      setCurrentStep(step);
    }
  };

  return (
    <main className={`app-shell ${selectedMood.themeClass} ${colorMode === 'dark' ? 'mode-dark' : 'mode-light'}`}>
      <div className="app-frame">
        <audio ref={ambientAudioRef} aria-hidden="true" />
        <audio ref={selectAudioRef} aria-hidden="true" preload="auto">
          <source src="/audio/select.mp3" type="audio/mpeg" />
        </audio>
      <div className="top-widgets">
        <aside className="mode-widget" aria-label="Display mode">
          <button
            type="button"
            className="mode-toggle"
            role="switch"
            aria-checked={colorMode === 'dark'}
            onClick={() => setColorMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'))}
            aria-label="Toggle light and dark mode"
          >
            <span className="mode-toggle-track">
              <span className="mode-toggle-thumb" />
            </span>
            <span className="mode-toggle-label">{colorMode === 'dark' ? 'Dark mode' : 'Light mode'}</span>
          </button>
        </aside>

        <aside className="weather-widget" aria-live="polite">
          <div className="weather-widget-head">
            <div>
              <h2 className="weather-widget-title">Live Weather</h2>
              <span className="weather-widget-badge">Live now</span>
            </div>
          </div>

          {weatherState.status === 'loading' && <p className="weather-widget-message">Loading...</p>}

          {weatherState.status === 'error' && (
            <p className="weather-widget-message weather-error">Unavailable right now</p>
          )}

            {weatherState.status === 'ready' && weatherState.data && (
              <div className="weather-widget-grid">
                <div>
                  <span>Location</span>
                  <strong>{weatherState.data.place}</strong>
                </div>
                <div>
                  <span>Condition</span>
                  <strong>{weatherSummary}</strong>
                </div>
                <div>
                  <span>Temperature</span>
                  <strong>{Math.round(weatherState.data.temperature)}°C</strong>
                </div>
              </div>
            )}
          </aside>

          <div className="sound-widget" aria-label="Sound options">
            <button
              type="button"
              className={`sound-toggle-main ${soundOpen ? 'open' : ''}`}
              onClick={() => setSoundOpen((current) => !current)}
              aria-expanded={soundOpen}
            >
              <span className="sound-toggle-icon" aria-hidden="true">{ambientMode === 'off' ? '🔇' : '🎵'}</span>
              <span className="sound-toggle-label">{ambientMode === 'off' ? 'Sound off' : 'Sound on'}</span>
              <span className="sound-toggle-arrow" aria-hidden="true">▾</span>
            </button>
            {soundOpen && (
              <div className="sound-chip-row">
                {Object.entries(ambientTracks).map(([key, track]) => {
                  const isSelected = ambientMode === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`sound-chip ${isSelected ? 'selected' : ''}`}
                      onClick={() => setAmbientMode(key)}
                    >
                      <span className="sound-chip-emoji" aria-hidden="true">{track.emoji}</span>
                      <span className="sound-chip-label">{track.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>



         <div className="step-frame section-reveal" key={currentStep}>
          {currentStep === 'mood' && (
            <section className="card mood-stage" aria-labelledby="mood-picker-heading">
                <div className="mood-stage-copy">
                  <p className="trainer-greeting">Welcome, Trainer.</p>
                  <h1 id="mood-picker-heading">Your feelings are waiting to be discovered. Record today's encounter and learn more about your emotional journey.</h1>
                </div>

              <div className="mood-stage-panel">
                <p className="mood-tone mood-tone-above-grid">{defaultView.tone}</p>
                <div className="mood-grid" role="radiogroup" aria-label="Choose a mood guide">
                  {moods.map((mood) => {
                    const isSelected = confirmedMoodId === mood.id;

                    return (
                       <button
                         key={mood.id}
                         type="button"
                         className={`mood-card pokedex-frame ${mood.auraClass} ${isSelected ? 'selected' : ''}`}
                         onClick={() => handleChooseMood(mood.id)}
                         aria-pressed={isSelected}
                       >
                          <span className="mood-card-power" aria-hidden="true">
                            <span className="mood-card-power-text">{mood.pokemonPower}</span>
                            {mood.powerIcon}
                          </span>
                         <div className={`companion-sprite-wrap mood-card-sprite ${mood.auraClass}`}>
                          <img
                            className="companion-sprite"
                            src={mood.sprite}
                            alt={`${mood.pokemonName} animated pixel companion`}
                          />
                        </div>
                        <div className="companion-copy">
                          <strong>{mood.pokemonName}</strong>
                          <p>{mood.tone}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

             {currentStep === 'energy' && hasPickedMood && (
              <section className="card section-grid section-grid-compact" aria-labelledby="energy-heading">
                <div className="section-copy">
                  <p className="page-greeting">Energy Check</p>
                </div>

                <div className="reflection-panel">
                  <div className="slider-wrap" aria-label="Choose your energy level">
                    <h2 id="energy-heading" className="page-heading" style={{marginBottom: '10px'}}>Choose the energy card that best matches how much momentum you have right now.</h2>
                    <div className="energy-card-grid">
                      {energyOptions.map((option) => {
                        const isSelected = option.id === selectedEnergyOption.id && hasChosenEnergy;

                        return (
                          <button
                            key={option.id}
                            type="button"
                            className={`energy-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleEnergyCardPick(option.value)}
                          >
                            <span className="energy-emoji" aria-hidden="true">
                              {option.emoji}
                            </span>
                            <strong>{option.label}</strong>
                            <span>{option.helper}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

               <div className="reflection-panel reflection-panel-left">
                <div className={`mood-card pokedex-frame ${currentMoodCard.auraClass} reflection-pokemon-hero`}>
                  <span className="mood-card-power" aria-hidden="true">
                    <span className="mood-card-power-text">{currentMoodCard.pokemonPower}</span>
                    {currentMoodCard.powerIcon && <span aria-hidden="true">{currentMoodCard.powerIcon}</span>}
                  </span>
                  <div className={`companion-sprite-wrap mood-card-sprite ${currentMoodCard.auraClass}`}>
                    <img
                      className="companion-sprite"
                      src={currentMoodCard.sprite}
                      alt={`${currentMoodCard.pokemonName} animated pixel companion`}
                    />
                  </div>
                  <div className="reflection-hero-copy reflection-hero-copy-left">
                    <strong>{currentMoodCard.pokemonName}</strong>
                    <p>{currentMoodCard.tone}</p>
                  </div>
                </div>
              </div>

              <div className="step-nav">
                <button type="button" className="step-button" onClick={() => goToStep(stepConfig.energy.previous)}>
                  Back
                </button>
                <button
                  type="button"
                  className="step-button step-button-primary"
                  onClick={() => goToStep(stepConfig.energy.next)}
                  disabled={!stepConfig.energy.canContinue}
                >
                  Continue
                </button>
              </div>
            </section>
          )}

             {currentStep === 'activity' && hasPickedMood && hasChosenEnergy && (
              <section className="card section-grid section-grid-compact" aria-labelledby="activity-suggestion-heading">
                <div className="section-copy">
                  <p className="page-greeting">Activity Suggestion</p>
                </div>

                <div className="reflection-panel">
                  <h2 id="activity-suggestion-heading" className="page-heading" style={{marginBottom: '10px'}}>Choose the activity that best fits your energy right now.</h2>
                  <div className="activity-list">
                    {activities.map((activity) => {
                      const isSelected = activity === selectedActivity;
                      const quote = activityQuotes[activity] || 'One kind step is enough for right now.';

                       return (
                          <button
                            key={activity}
                            type="button"
                            className={`activity-card ${isSelected ? 'selected' : ''}`}
                             onClick={() => { setSelectedActivity(activity); playSelectSound(); }}
                          >
                            <strong>{activity}</strong>
                            <span>{quote}</span>
                          </button>
                       );
                    })}
                  </div>
                </div>

                <div className="reflection-panel reflection-panel-left">
                 <div className={`mood-card pokedex-frame ${selectedMood.auraClass} reflection-pokemon-hero reflection-pokemon-hero-left`}>
                   <span className="mood-card-power" aria-hidden="true">
                     <span className="mood-card-power-text">{selectedMood.pokemonPower}</span>
                     {selectedMood.powerIcon && <span aria-hidden="true">{selectedMood.powerIcon}</span>}
                   </span>
                   <div className={`companion-sprite-wrap mood-card-sprite ${selectedMood.auraClass}`}>
                     <img
                       className="companion-sprite"
                       src={selectedMood.sprite}
                       alt={`${selectedMood.pokemonName} animated pixel companion`}
                     />
                   </div>
                   <div className="reflection-hero-copy reflection-hero-copy-left">
                     <strong>{selectedMood.pokemonName}</strong>
                     <p>{selectedMood.tone}</p>
                   </div>
                 </div>
               </div>

               <div className="step-nav">
                 <button type="button" className="step-button" onClick={() => goToStep(stepConfig.activity.previous)}>
                   Back
                 </button>
                 <button
                   type="button"
                   className="step-button step-button-primary"
                   onClick={() => goToStep(stepConfig.activity.next)}
                   disabled={!stepConfig.activity.canContinue}
                 >
                   Continue
                 </button>
               </div>
            </section>
          )}

           {currentStep === 'reflection' && hasPickedActivity && (
            <section className="card section-grid section-grid-compact" aria-labelledby="quick-reflection-heading">
              <div className="section-copy">
                <p className="page-greeting">Daily Check-in Summary</p>
                <h2 id="quick-reflection-heading" className="page-heading">{selectedMood.emoji} You showed up for yourself today.</h2>
              </div>

               <div className={`reflection-panel ${selectedMood.auraClass}`}>
                 <div className={`mood-card pokedex-frame ${selectedMood.auraClass} reflection-pokemon-hero reflection-pokemon-hero-centered`}>
                  <span className="mood-card-power" aria-hidden="true">
                    <span className="mood-card-power-text">{selectedMood.pokemonPower}</span>
                    {selectedMood.powerIcon && <span aria-hidden="true">{selectedMood.powerIcon}</span>}
                  </span>
                  <div className={`companion-sprite-wrap mood-card-sprite ${selectedMood.auraClass}`}>
                    <img
                      className="companion-sprite"
                      src={selectedMood.sprite}
                      alt={`${selectedMood.pokemonName} animated pixel companion`}
                    />
                  </div>
                  <div className="reflection-hero-copy">
                    <strong>{selectedMood.pokemonName}</strong>
                    <p>{selectedMood.tone}</p>
                  </div>
                </div>

                <div className="reflection-summary-list">
                  <div className="summary-card summary-card-wide">
                    <span>Energy</span>
                    <strong>{energyLabel}</strong>
                  </div>
                  <div className="summary-card summary-card-wide">
                    <span>Your chosen action</span>
                    <strong>{selectedActivity}</strong>
                  </div>
                  <div className="summary-card summary-card-wide">
                    <span>Journal</span>
                    <textarea
                      className="noticed-input"
                      rows="3"
                      value={noticedText}
                      onChange={(event) => setNoticedText(event.target.value)}
                      placeholder={selectedMood.noticed}
                      aria-label="Journal"
                    />
                  </div>
                </div>

                <div className="step-nav step-nav-single-left">
                  <button type="button" className="step-button" onClick={() => goToStep(stepConfig.reflection.previous)}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="step-button step-button-primary"
                    onClick={() => setCurrentStep('mooddex')}
                  >
                    Complete Check-in
                  </button>
                </div>
              </div>
            </section>
          )}

           {currentStep === 'mooddex' && hasPickedActivity && (
            <section className="card mooddex-stage" aria-labelledby="mooddex-heading">
               <div className="mooddex-copy">
                <p className="mooddex-notice">Your daily encounter has been recorded.</p>
                <h2 id="mooddex-heading" className="mooddex-title">
                  MoodDex Entry #{selectedMood.dexNumber}
                </h2>
              </div>

               <div className="pokedex-device">
                <div className="pokedex-led" aria-hidden="true">
                  <span className="pokedex-led-dot red" />
                  <span className="pokedex-led-dot yellow" />
                  <span className="pokedex-led-dot green" />
                </div>

                 <div className="pokedex-screen">
                   <div className="mooddex-entry">
                     <div className={`mooddex-hero mooddex-hero-centered`}>
                       <div className={`mooddex-pokemon ${selectedMood.auraClass}`}>
                         <img
                           className="mooddex-pokemon-sprite"
                           src={selectedMood.sprite}
                           alt={`${selectedMood.pokemonName} MoodDex sprite`}
                         />
                       </div>
                     </div>

                     <div className="mooddex-summary">
                       <div className="summary-card summary-card-wide">
                         <span>Energy</span>
                         <strong>{energyLabel}</strong>
                       </div>
                       <div className="summary-card summary-card-wide">
                         <span>Your chosen action</span>
                         <strong>{selectedActivity}</strong>
                       </div>
                       <div className="summary-card summary-card-wide">
                         <span>Remember</span>
                         <strong>{selectedMood.reminder}</strong>
                       </div>
                       <div className="summary-card summary-card-wide">
                         <span>Journal</span>
                         <textarea
                           className="noticed-input"
                           rows="3"
                           value={noticedText}
                           onChange={(event) => setNoticedText(event.target.value)}
                           placeholder={selectedMood.noticed}
                           aria-label="Journal"
                         />
                       </div>
                     </div>
                   </div>
                 </div>

                <div className="pokedex-badge" aria-label={`MoodDex entry ${selectedMood.dexNumber}`}>
                  #{selectedMood.dexNumber} Recorded
                </div>

                 <div className="mooddex-actions">
                   <button
                     type="button"
                     className="step-button step-button-primary pokedex-button"
                     onClick={completeCheckIn}
                   >
                     🏠
                   </button>
                 </div>
              </div>
            </section>
            )}
          </div> 
          <details className="credits">
          <summary aria-label="Credits" title="Credits">
            ⓘ<span className="credits-label"> Credits</span>
            {moodCount > 0 && <span className="credits-count"> · {moodCount} recorded</span>}
          </summary>
            <div className="credits-panel">
              <p>
                Unofficial fan project, not affiliated with Nintendo, Game Freak, or The Pokémon
                Company. Pokémon and Pokémon character names are trademarks of Nintendo. Sprites via{' '}
                <a href="https://github.com/PokeAPI/sprites" target="_blank" rel="noreferrer">PokéAPI</a>.
              </p>
              <p>
                Sounds (rain, waves, forest, 8-bit pop) by{' '}
                <a href="https://www.orangefreesounds.com" target="_blank" rel="noreferrer">Orange Free Sounds</a>,{' '}
                <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noreferrer">CC BY-NC 4.0</a>.
              </p>
              <p>
                Music in the background from{' '}
                <a href="https://www.FesliyanStudios.com" target="_blank" rel="noreferrer">https://www.FesliyanStudios.com</a>.
              </p>
              <p>
                Weather: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>.
                Your approximate location is guessed automatically from your IP address (or from your
                browser, with your permission, if that fails). City names come from{' '}
                <a href="https://www.bigdatacloud.com" target="_blank" rel="noreferrer">BigDataCloud</a>.
                This app doesn't store it.
              </p>
            </div>
         </details>
        </div>
      </main>
  );
}

export default App;
