import { useAppSelector } from './app/hooks';

function App() {
  const countries = useAppSelector(
    (state) => state.countries.countries,
  );

  return (
    <>
      <h1>React Forms</h1>

      <p>Countries: {countries.length}</p>
    </>
  );
}

export default App;