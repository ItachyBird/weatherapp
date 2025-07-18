import { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';
import logo from './assets/images/skycast.png';

function App() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <img src={logo} alt="Weather App Logo" className='h-20 absolute top-4 left-4' />



        <div
          className='searchBar absolute top-4 right-4 w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'

          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Adjust transparency here
            backdropFilter: 'blur(10px)',
            border: '2px solid white',
            borderRadius: '10px',
          }}
        >
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                // submit the form
                submitCity();
              }
            }}
            type="text"
            placeholder='Search city'
            className='focus:outline-none w-full text-[#212121] text-lg bg-transparent' // Added bg-transparent for input
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>

      <BackgroundLayout></BackgroundLayout>
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wspd}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatindex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {values?.slice(1, 7).map(curr => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

//https://rapidapi.com/hub
