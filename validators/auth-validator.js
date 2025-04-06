//zod
const zod = require('zod');

const userRegisterSchema = zod.object({
    fullname: zod.object({
        firstName: zod.string({message: "FirstName should be String"}) 
        .min(3, {message: "First name should be atleast 3 characters"})
        .max(15, {message: "First name should be atmost 15 characters"}),

        lastName: zod.string({message: "LastName should be String"})
        .min(3, {message: "Last name should be atleast 3 characters"})
        .max(15, {message: "Last name should be atmost 15 characters"})
    }),

    email: zod
    .string({message: "Email should be String"})
    .email({message: "Invalid email"}),

    password: zod.string({message: "Password should be String"})
    .min(8, {message: "Password should be atleast 8 characters"}),

    phoneNo: zod
    .number({message: "Phone number should be a number"})
    .min(1000000000, {message: "Phone number should be atleast 10 digits"})
    .max(9999999999, {message: "Phone number should be atmost 10 digits"}),

})

const userLoginSchema = zod.object({
    email: zod
    .string({message: "Email should be String"})
    .email({message: "Invalid email"}),

    password: zod  .string({message: "Password should be String"})
    .min(8, {message: "Password should be atleast 8 characters"}),
})


const captainRegisterSchema = zod.object({
    fullname: zod.object({
        firstName: zod.string({message: "Firstname should be String"}) 
        .min(3, {message: "First name should be atleast 3 characters"})
        .max(15, {message: "First name should be atmost 15 characters"}),

        lastName: zod.string({message: "LastName should be String"}) 
        .min(3, {message: "Last name should be atleast 3 characters"})
        .max(15, {message: "Last name should be atmost 15 characters"})
    }).strict(),

    email: zod
    .string({message: "Email should be String"}) 
    .email({message: "Invalid email"}),

    password: zod.string({message: "Password should be String"}) 
    .min(8, {message: "Password should be atleast 8 characters"}),

    phoneNo: zod
    .number({message: "Phone number should be Number"}) 
    .min(1000000000, {message: "Phone number should be atleast 10 digits"})
    .max(9999999999, {message: "Phone number should be atmost 10 digits"}),


    vehicle: zod.object({
        color: zod
        .string({message: "Color of vehilce should be String"}) 
        .min(1, {message: "Color of vehilce is required"}),

        plate: zod
        .string({message: "Plate number of vehicle should be String"}) 
        .min(12, {message: "Plate number should be atleast 12 characters"})
        .max(12, {message: "Plate number should be atmost 12 characters"}),

        vehicleType: zod
        .string({message: "Vehicle type should be String"}) 
        .min(1, {message: "Vehicle type is required"}),

        capacity: zod
        .number({message: "Capacity of vehicle should be a number"}) 
        .min(1, {message: "Capacity should be atleast 1"})
        .max(4, {message: "Capacity should be atmost 4"})
    }),      
})

const captainLoginSchema = zod.object({
    email: zod
    .string({message: "Email should be String"}) 
    .email({message: "Invalid email"}),

    password: zod.string({message: "Password should be String"}) 
    .min(8, {message: "Password should be atleast 8 characters"}),
})

const rideSchema = zod.object({
    origin: zod.string({message: "PickUp should be String"}) 
    .min(3, {message: "PickUp should be atleast 3 characters"}),

     destination: zod.string({message: "Destination should be String"}) 
    .min(3, {message: "Destination should be atleast 3 characters"}),

     vehicleType: zod.string({message: "VehicleType should be String"}) 
     .min(1, {message: "vehicleType  is required"}),
})

const searchDataSchema = zod.object({
      searchData: zod.string({message: "SearchData should be String"}) 
      .min(1, {message: "searchData  is required"}),
});

const confirmRideSchema = zod.object({
     captainId: zod.string({message: "captainId should be String"}) 
     .min(1, {message: "captainId is required"}),

      rideId: zod.string({message: " rideId should be String"}) 
     .min(1, {message: " rideId is required"}),
});



module.exports = {
    userRegisterSchema, userLoginSchema, captainRegisterSchema, 
    captainLoginSchema, rideSchema, searchDataSchema, confirmRideSchema
}