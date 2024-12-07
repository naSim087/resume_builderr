const dotenv=require("dotenv")

dotenv.config();
module.exports={
  PORT:process.env.PORT,
  CONECTIONSTRING:process.env.CONECTIONSTRING,
  OPENAIKEY:process.env.OPENAIKEY,
  SECRETKEY:process.env.SECRETKEY,
  CLIENT_ID:process.env.CLIENT_ID,
  CLIENT_SECRET:process.env.CLIENT_SECRET,

}

