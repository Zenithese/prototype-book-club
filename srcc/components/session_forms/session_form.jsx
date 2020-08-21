import React, { useState } from 'react'

function SessionForm(props) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClose = (e) => {
        e.preventDefault()
        props.closeModal()
    }

    const update = (field) => {
        return e => {
            if (field === 'username or email') {
                setUsername(e.target.value)
                setEmail(e.target.value)
            } else if (field === 'username') {
                setUsername(e.target.value)
            } else if (field === 'email') {
                setEmail(e.target.value)
            } else if (field === 'password') {
                setPassword(e.target.value)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
            email,
            password,
        }
        props.processForm(user);
    }

    let appropriateCredentials = props.formType === 'login' ? (
        <div>
            <label>Username or email:</label>
            <input type="text" value={username} onChange={update('username or email')} />
        </div>
    ) : (
        <div>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={update('username')} />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={update('email')} />
            </div>
        </div>
    )

    return (
        <div>
            <form className="session-form" onSubmit={(e) => handleSubmit(e)}>
                <div onClick={handleClose}>X</div>
                {appropriateCredentials}
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={update('password')} />
                </div>
                <input className="btn waves-effect waves-light" type="submit" value={props.formType} />
                <br />
                <div>or</div>
                {props.otherForm}
            </form>
        </div>
    )
}

export default SessionForm;