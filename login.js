module.exports = (app, db, bcrypt, jwt) => {
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });
            res.json({failed:false, message: 'Login efetuado com sucesso!', token: token});
        } else {
            res.json({failed:true, message: 'E-mail e/ou senha inválidos!'});
        }
    });
};