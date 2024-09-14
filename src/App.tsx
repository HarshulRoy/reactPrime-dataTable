import './App.css'
import { PrimeReactProvider } from 'primereact/api';
import Body from './component/body';
function App() {

  return (
    <PrimeReactProvider>
      <Body />
    </PrimeReactProvider>
  )
}

export default App
