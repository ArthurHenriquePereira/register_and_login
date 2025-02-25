module.exports = (app, db, bcrypt) => {
    app.post('/register', async (req, res) => {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length > 0) {
                res.json({failed:true, message: 'Este e-mail já possui uma conta cadastrada!'});
            } else {
                await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
                res.json({failed:false, message: 'Cadastro realizado com sucesso!'});
            }
        } catch (error) {
            res.json({failed:true, message: 'Ocorreu um erro ao cadastrar o usuário!'});
        }
    });
};