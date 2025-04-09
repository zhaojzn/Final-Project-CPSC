const User = (email, password) => {
    return {
        email: email,
        password: password,
        role: 'member',  // Default role is 'member'
        createdAt: new Date().toUTCString()
    }
}

module.exports = User
