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


// import './main.css';

// function MainLayout({ children }) {
//   return (
//     <main className="main-layout">
//       <div className="container pt-4">
//         {children}
//       </div>
//     </main>
//   );
// }

// export default MainLayout;
