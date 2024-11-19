const dotenv=require("dotenv")

dotenv.config();
module.exports={
  PORT:process.env.PORT,
  CONECTIONSTRING:process.env.CONECTIONSTRING,
  OPENAIKEY:process.env.OPENAIKEY,
  SECRETKEY:process.env.SECRETKEY
}

