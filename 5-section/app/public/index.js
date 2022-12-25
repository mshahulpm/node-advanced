
const { useState } = React
const rootDiv = document.querySelector('#root')
const root = ReactDOM.createRoot(rootDiv)


function App() {

    return (
        <>
            <Header />
            <h3>Welcome to testing</h3>
            <Login />
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


function Login() {

    const [value, setValue] = useState({
        username: '',
        password: ''
    })


    function handleLogin(e) {
        e.preventDefault()
        if (value.username !== 'shahul') setToast('Invalid username')
        else if (value.password !== 'shahul123') setToast('Invalid password')
        else setToast('Login success')
    }

    const [loginToast, setToast] = useState('')

    function onChange(e) {
        const { name, value } = e.target
        setValue(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form id='login' onSubmit={handleLogin}>
            <div id='login-toast'>{loginToast}</div>
            <input placeholder='username' name='username' onChange={onChange} value={value.username} />
            <input placeholder='password' name='password' onChange={onChange} value={value.password} type='password' />
            <button type='submit'>Login</button>
        </form>
    )
}

root.render(
    <App />
)