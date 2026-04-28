// ============================================================
// WILD TRAIL GEAR — Main App
// ============================================================

function App() {
  const [page, setPage] = React.useState('home');

  // Scroll to top on page change
  React.useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home':    return <HomePage setPage={setPage}/>;
      case 'catalog': return <CatalogPage/>;
      case 'about':   return <AboutPage/>;
      case 'contact': return <ContactPage/>;
      default:        return <HomePage setPage={setPage}/>;
    }
  };

  return (
    <div>
      <Nav page={page} setPage={setPage}/>
      {renderPage()}
      <Footer setPage={setPage}/>
      <FloatingWA/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
