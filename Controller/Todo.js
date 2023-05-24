const Todo =require("./../Modal/Todo")

const getList=async(req,res)=>{
    try {
        const list =await Todo.find({createdby:req.userId});

        if(list){
            res.json(list)
        }
    } catch (error) {
        console.log(error)
    }
}

const createList =async(req,res)=>{
    try {
        const List = new Todo({
            list:req.body.list,
            createdby:req.userId,
        })
        const createData=await List.save();
        if(createData){
            res.send(createData)
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteList=async (req,res)=>{
    try {
        const List =  await Todo.findByIdAndDelete(req.params.id)
        if(List){
            res.send("deleted Successfully")
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports={getList,createList,deleteList};