
const designValidation = {
    city:{
        in:['body'],
        trim : true,
        exists : { errorMessage : 'city is required'},
        notEmpty : { errorMessage : 'city should not be empty'},
        isIn: {
            options: [["Bangalore", "Mumbai", "Kolkata", "Delhi"]],
            errorMessage: "Invalid city",
        },
    },
    facades : {
        in:['body'],
        exists: { errorMessage : 'atleast one facade is required'},
        notEmpty : { errorMessage : 'facade should not be empty'}
    },
    "facades.*.facadeDirection":{
        in:['body'],
        exists: { errorMessage : 'atleast one facade is required'},
        notEmpty : { errorMessage : 'facade should not be empty'},
        isIn: {
            options: [["north", "east", "south", "west"]],
            errorMessage: "Invalid facade direction",
        },
    },
    "facades.*.height": {
        in: ["body"],
        exists: { errorMessage: "Height is required" },
        isFloat: { 
            options: { min: 0 }, 
            errorMessage: "Height must be a positive number" 
        },
    },
    "facades.*.width": {
        in: ["body"],
        exists: { errorMessage: "Width is required" },
        isFloat: { options: { min: 0 }, errorMessage: "Width must be a positive number" },
    },
    "facades.*.wwr": {
        in: ["body"],
        exists: { errorMessage: "WWR is required" },
        isFloat: { 
            options: { min: 0, max: 1 }, 
            errorMessage: "WWR must be between 0 and 1" 
        },
    },
    "facades.*.shgc": {
        in: ["body"],
        exists: { errorMessage: "SHGC is required" },
        isFloat: { options: { min: 0, max: 1 }, errorMessage: "SHGC must be between 0 and 1" },
    },
    "facades.*.duration": {
        in: ["body"],
        exists: { errorMessage: "Duration is required" },
        isFloat: { options: { min: 0 }, errorMessage: "Duration must be a positive number" },
    },

}

export default designValidation