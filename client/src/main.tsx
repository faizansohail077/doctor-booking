import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { ThemeProvider } from "@/components/theme-provider"
import { Provider } from 'react-redux'
import { store } from './store/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <ThemeProvider defaultTheme='light'>
  <Provider store={store}>
    <App />
  </Provider>

  // </ThemeProvider>,

)
