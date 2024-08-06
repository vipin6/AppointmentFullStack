const User = require('../model/data');

exports.adduser = async (req, res) => {
    console.log('req.body', req.body);
    try {
        if (!req.body.number) {
            throw new Error('Phone number is mandatory');
        }
        
        const { name, email, number: phonenumber } = req.body;

        const data = await User.create({ name, email, phonenumber });

        res.status(201).json(data);
    } catch (err) {
        console.error('Error in adduser:', err); 
        res.status(500).json({ error: err.message });
    }
};

exports.getElement = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getElement:', error); 
        res.status(500).json({ error: error.message });
    }
};

exports.getDelete = async (req, res) => {
    try {
        const uId = req.params.id;

        if (!uId) {
            console.log('ID is missing');
            return res.status(400).json({ error: 'ID is missing' }); 
        }

        await User.destroy({ where: { id: uId } });

        res.status(204).send(); 
    } catch (err) {
        console.error('Error in getDelete:', err); 
        res.status(500).json({ error: err.message });
    }
};
