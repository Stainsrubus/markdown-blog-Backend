import userModel from '../models/users.js'
import Auth from '../common/auth.js'

const create = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({
                message:"User Created Successfully"
             })
        }
        else
        {
            res.status(400).send({message:`User with ${req.body.email} already exists`})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
const signup = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(!user){
            req.body.password = await Auth.hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(201).send({
                message:"User Created Successfully"
             })
        }
        else
        {
            res.status(400).send({message:`User with ${req.body.email} already exists`})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const login = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
        if(user)
        {
            let hashCompare = await Auth.hashCompare(req.body.password,user.password)
            if(hashCompare)
            {
                let token = await Auth.createToken({
                    id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    role:user.role
                })
                let userData = await userModel.findOne({email:req.body.email},{_id:0,password:0,status:0,createdAt:0,email:0})
                res.status(200).send({
                    message:"Login Successfull",
                    token,
                    userData
                })
            }
            else
            {
                res.status(400).send({
                    message:`Invalid Password`
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`Account with ${req.body.email} does not exists!`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find({},{password:0,status:0,createdAt:0});
       
        
        res.status(200).send({
            message: "Users retrieved successfully",
            users
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
const editUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email, role } = req.body;
        let user = await userModel.findById(userId);
        if(user)
        {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.role = role;
            user.modifiedAt = Date.now();

            await user.save()
            res.status(200).send({
                message:"user Edited Successfully"
            })}
        
        else
        {
            res.status(400).send({message:"user Id Not found"})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }

}
const deleteUserById = async (req, res) => {
    try {
      const userId = req.params.id;
        const user = await userModel.findByIdAndDelete(userId);

        if (user) {
            res.status(200).send({
                message: "User Deleted Successfully"
            });
        } else {
            res.status(404).send({ message: "User Not found" });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId, { password: 0, status: 0, createdAt: 0 }); // Excluding sensitive fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).send({
        message: 'User retrieved successfully',
        user
    });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



export default {
    create,
    signup,
    login,
    getAllUsers,
    getUserById ,
    editUser,
    deleteUserById
}