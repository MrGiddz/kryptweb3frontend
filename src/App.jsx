import {Navbar, Welcome, Footer, Loader, Transaction, Services} from './components'

const App = () => {


  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transaction />
      <Footer />
    </div>
  )
}

export default App
