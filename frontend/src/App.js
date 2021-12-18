import './App.css';
import getPath from './api/get-path';

function App() {
  async function test() {
    const res = getPath('Kanye West', 'Coldplay');
    console.log(res);
  }

  test();

  return (
    <>
      <div>Pls work</div>
    </>
  );
}

export default App;
