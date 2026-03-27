import User from '../modules/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            })
        }


        const hashPassword = await bcrypt.hash(password, 10)


        // Create user

        const createUser = await User.create({
            name,
            email,
            password: hashPassword,
            role: (email === 'ahamedhaden.r@gmail.com') || (email === 'hathin@gmail.com') ? 'admin' : 'user'
        })


        const token = jwt.sign(
            { userId: createUser._id, role: createUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )


        res.status(201).json({
            success: true,
            token,
            role: createUser.role,
            name: createUser.name,
            email: createUser.email
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Registraion Failed',
            error: error.message
        })

    }

}


//Login

const login = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Email'
            })
        }


        const validPassword = await bcrypt.compare(password, existingUser.password)

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign(
            { userId: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.status(201).json({
            sucess: true,
            token,
            role: existingUser.role,
            name: existingUser.name,
            email: existingUser.email

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });

    }
}



const getMe = async (req, res) => {
    try {

        const user = await User.findById(req.userId).select('-password').populate('wishlist')

        res.json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get user info',
            error: error.message
        });

    }
}

// Wishlist methods
const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.userId);
        
        const index = user.wishlist.indexOf(productId);
        if (index > -1) {
            user.wishlist.splice(index, 1);
        } else {
            user.wishlist.push(productId);
        }
        
        await user.save();
        await user.populate('wishlist');
        
        res.json({
            success: true,
            wishlist: user.wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to toggle wishlist',
            error: error.message
        });
    }
};

const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('wishlist');
        res.json({
            success: true,
            wishlist: user.wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch wishlist',
            error: error.message
        });
    }
};

export { register, login, getMe, toggleWishlist, getWishlist }