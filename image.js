const mongoose=require("mongoose");
const imageDetailsSchema=new mongoose.Schema(
  {
        image:String
  },
{
  collection:"imageDetail",
}
);

mongoose.model("imageDetail",imageDetailsSchema);