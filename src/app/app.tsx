import { DataProvider } from '../context/DataContext'
import { Header } from '../components/layout/Header'
import { Container } from '../components/layout/Container'
import { DataVisualizer } from '../components/data-display/DataVisualizer'

function App() {
  return (
    <DataProvider>
      <div className="fixed inset-0 bg-gradient-to-b from-slate-800 to-slate-900">
        <Header />
        <Container>
          <DataVisualizer />
        </Container>
      </div>
    </DataProvider>
  )
}

export default App