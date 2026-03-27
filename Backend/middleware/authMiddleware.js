import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({
            success: false,
            Message: "Access denied. No token provided.."
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decodedToken.userId
        req.userRole = decodedToken.role
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            Message: "Invalid token or token expired."
        })
    }
}


const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({
            success: false,
            Message: 'Access denied. Admin privileges required.'
        })
    }
    next()
}

export { verifyToken, isAdmin }