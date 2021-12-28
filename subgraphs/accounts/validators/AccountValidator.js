const yup = require('yup');

const createSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
});

const authenticationSchema = yup.object({
    email: yup.string().email('It has to be an email!').required(),
    password: yup.string().min(5, 'It must have at least 5 characters!').required()
})


module.exports = {
    createSchema,
    authenticationSchema
}