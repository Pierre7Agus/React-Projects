import { createRoot } from 'react-dom/client'
import { React } from 'react/client'
import App from './App'

const root = createRoot(document.getElementById('app'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)