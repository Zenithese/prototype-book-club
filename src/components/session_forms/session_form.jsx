import React, { useState } from 'react'
import { connect } from 'react-redux'

function SessionForm() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClose = (e) => {
        e.preventDefault()
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

    let appropriateCredentials = this.props.formType === 'login' ? (
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
            {appropriateCredentials}
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={this.update('password')} />
            </div>
        </div>
    )
}