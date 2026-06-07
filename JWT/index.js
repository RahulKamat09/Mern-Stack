// Encode

const jwt = require("jsonwebtoken");

// const json = {"Id":"123","name":"dalla"};
// const secret = "secretKey";

// const result = jwt.sign(json, secret);

// console.log("Token =",result);


//Decode 

const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjEyMyIsIm5hbWUiOiJkYWxsYSIsImlhdCI6MTc4MDIxMzc3NX0.Y2aHWx8zLhHL46iidvTrqgAidHooIl18NG6VAjjHXqg";
const secret = "secretKey";

const result = jwt.verify(jwtToken, secret);

console.log("Data=",result);