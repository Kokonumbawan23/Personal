const {userCreateSchema, userUpdateSchema, userLoginSchema} = require('./schema')

const validateUserCreatePayload = (payload)=>{

    const validateResult = userCreateSchema.validate(payload)
    if(validateResult.error){
        throw new Error(validateResult.error.message)
    }
}
const validateUserUpdatePayload = (payload)=>{

    const validateResult = userUpdateSchema.validate(payload)
    if(validateResult.error){
        throw new Error(validateResult.error.message)
    }
}

const validateUserLoginPayload = (payload) => {
    const validateResult = userLoginSchema.validate(payload)
    if(validateResult.error){
        throw new Error(validateResult.error.message)
    }
}

const validateUserRegisterPayload = (payload)=>{

    const validateResult = userCreateSchema.validate(payload)
    if(validateResult.error){
        throw new Error(validateResult.error.message)
    }
}

module.exports = {
    validateUserCreatePayload,
    validateUserUpdatePayload,
    validateUserLoginPayload,
    validateUserRegisterPayload
}