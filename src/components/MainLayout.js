import './main.css'
function MainLayout({children}) {
    return (
      <main style={{ marginTop: '68px',width:'90%' }}>
        <div style={{marginLeft:'10%',marginTop:'15%'}} className="container pt-4">
          {children}
        </div>
      </main>
    );
  }

  export default MainLayout;