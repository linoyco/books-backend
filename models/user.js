const userType = {
    permission: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    }
};

module.exports = userType;