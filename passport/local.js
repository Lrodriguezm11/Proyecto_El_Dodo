//passport/local.js
const LocalStrategy = require('passport-local').Strategy,
{ _findByUsername} = require('../controllers/users'),
bcrypt = require('bcrypt');

module.exports = new LocalStrategy (    {
    usernameField: 'nombre_usuario', // Aquí defines el nombre del campo personalizado
    passwordField: 'password', // No es necesario cambiar si sigues usando 'password'
    session: false
}, async (nombre_usuario, password, done) => {
    try {
        const user = await _findByUsername(nombre_usuario);
        if (!user) return done(null, false, 'Usuario o password incorrecta');
        const match = bcrypt.compareSync(password, user.password);
        if (!match) return done(null, false, 'Usuario o password incorrecta');
        return done(null, {
            nombre_usuario: user.nombre_usuario,
            id: user.id,
            created_at: user.created_at,
            created_at: user.updated_at
        });
    } catch (e) {
        done(e);
    }
});