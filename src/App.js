import Header from "./Components/Header/Header";
import Banner from "./Container/Banner/Banner";
import MovieCollection from "./Container/MovieCollection/MovieCollection";

function App() {
  return (
    <div className="App">
      <Header />
      <MovieCollection />
      <Banner />
    </div>
  );
}

export default App;
