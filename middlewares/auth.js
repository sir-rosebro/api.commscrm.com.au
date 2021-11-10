import jwt from 'jsonwebtoken';

const shouldLoggedIn = (req, res, next) => {

    const token = req.header('x-access-token');
    if(!token) {
        res.status(401).json({
            status:'ERROR',
            message:'Unauthorized, Access Denied!'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRECT); 
        const { id, email, isAdmin} = decoded;
        req.user = {id, email, isAdmin};
        next();
    } catch(error) {
            console.log({ error });
            return res.status(201).send({
                status: "ERROR",
                message: "Invalid Token",
            });
    }
}

const adminOnly = (req, res, next) => {
    if(!req.user.isAdmin) {
        return res.status(403).json({
            status:'ERROR',
            message:'Admin resource!Access denied.'
        })
    }
    next();
}

export {
    shouldLoggedIn,
    adminOnly
}