

const rootDiv = document.querySelector('#root')
const root = ReactDOM.createRoot(rootDiv)


function App() {

    return (
        <>
            <Header />
            <h3>Welcome to testing</h3>
        </>
    )
}

function Header() {

    return (
        <header>
            <h3>Logo</h3>
            <button>Login</button>
        </header>
    )
}

root.render(
    <App />
)