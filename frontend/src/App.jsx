import { useEffect } from 'react'
import './App.css' 
import Dashboard from './components/Dashboard'


function App() {
useEffect(() =>{
  async function test() {
    const response = await fetch('http://localhost:8080')
    const result = await response.json()
    console.log(result)
  }
  test()
},[]);

return (
    <div className='App'>
      <Dashboard />
      </div>
  )
}

export default App
