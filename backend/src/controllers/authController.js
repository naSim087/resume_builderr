const jwt = require('jsonwebtoken');
const {SECRETKEY}=  require("../config/serverconfig")
console.log(SECRETKEY);
exports.login = (req, res) => {
 
    const { username, password } = req.body;

    
    if (username === 'BT22CSD003' && password === 'Nasi9316') {
      
        const token = jwt.sign({ username }, SECRETKEY, { expiresIn: '1h' });
        return res.json({ success: true, token });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
};
