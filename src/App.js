import './App.css';
import Portfolio from './components/Porfolio';
import SplashCursor from './components/SplashCursor';

function App() {
  return (
    <>
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        SPLAT_RADIUS={0.2}
        RAINBOW_MODE={true}
        TRANSPARENT={true}
      />
      <Portfolio />
    </>
  );
}

export default App;
