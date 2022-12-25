const cors = require('cors');
const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;
const cron = require("node-cron");
const { update } = require("lodash");
const app = express();
const { v4: uuidv4 } = require('uuid');
mongoose.set('strictQuery', false);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://admin-rehan:Rehan1234@cluster1.minscm3.mongodb.net/HabbitDB');

const habbitItemSchema = new Schema({
	Name:String,
	repatation:String,
	times:String,
	Description:String,
	color:String,
	Done:Boolean,
	count:Number,
	Increment:[Number],
	completedHistory:[Number]
});

const habbitItem = mongoose.model("habbitItem",habbitItemSchema);

app.get("/",function(req,res){
   res.send("hi")
})

app.get("/data",async (req,res) => {
	
	habbitItem.find({},(err, items ) => 
	{res.send(items)});

})



app.post("/input", async (req,res) => {

	var { trackerProps } = req.body;
	const newItem = new habbitItem (trackerProps);
	newItem.save();
	res.send(trackerProps);
	const today = new Date();
const dayOfWeek = today.getDay();
const dayOfMonth = today.getDate();
const dayOfYear = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
	// habbitItem.find({Name: name},(err, items) => {
	// 	let x = items[0].count ;
    //     let y = items[0].times ;
	// 	console.log(x + " " + y);
	// 	let time = "* * * * * *"
	// 	switch (items[0].repatation) {
	// 		case "Daily":
	// 		 time = "* * 23 * * *";
	// 		 console.log('suces')
	// 		  break;
	// 		case "Weekly":
	// 			time = "* * * * * " + dayOfWeek ;
	// 			console.log('suces');
	// 		  break;
	// 		case "Monthly":
	// 		  time ="* * * * " + dayOfMonth + " *";
	// 		  default:
	// 		  console.log("hi");
	// 	  }
	//      cron.schedule( time ,function(){
	// 		if(x == y){
	// 			habbitItem.updateOne({Name:name},{$push: {completedHistory: 1}},function(err){// console.log(err)
	// 			});
	// 	        habbitItem.updateOne({Name:name},{count:0},function(err){
	// 				// console.log(err) // 
	// 			})
	// 		}else{
	// 			habbitItem.updateOne({Name:trackeProps.Name},{$push: {completedHistory: 0}},function(err){// console.log(err)
	// 			});
	// 			habbitItem.updateOne({Name:trackeProps.Name},{count:0},function(err){// console.log(err)
	// 			});

	// 		}
	// 	 });
	// })

}) 

app.post("/count" , (req,res) => {
	let { id , Element } = req.body;
	habbitItem.find({_id:id},(err, items) => {
 	let x = items[0].count ;
    let y = items[0].times ;

	if(Element === "Add"){
		if(y > x){
		x++;
		habbitItem.updateOne({_id:id},{count:x},function(err){
			if(err){
				console.log(err)
			}else{
				habbitItem.find({_id:id},(err, items) => {
				});
			}
		});
	}else{
		x = x-1;
			habbitItem.updateOne({_id:id},{count:x},function(err){
				if(err){
					console.log(err)
				}else{
					habbitItem.find({_id:id},(err, items) => {
						 console.log(items);
					});
				}
			});
	}
}})});


app.get("/hi", (req,res) => {
	const id = "62ae249ab7c19aa6c85dbbc5";
	const today = new Date();
const dayOfWeek = today.getDay();
const dayOfMonth = today.getDate();
const dayOfYear = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
const checkRepeate  = () => {
	habbitItem.find({_id:id},(err, items) => {
		let x = items[0].count ;
        let y = items[0].times ;
		console.log(x + " " + y);
		res.send(items);
		let time = "* * * * * *"
		switch (items[0].repatation) {
			case "Daily":
			 time = "* * 23 * * *";
			 console.log('suces')
			  break;
			case "Weekly":
				time = "* * * * * " + dayOfWeek ;
				console.log('suces');
			  break;
			case "Monthly":
			  time ="* * * * " + dayOfMonth + " *";
			  default:
			  console.log("hi");
		  }
	     cron.schedule( time ,function(){
			if(x == y){
				habbitItem.updateOne({_id:id},{$push: {completedHistory: 1}},function(err){// console.log(err)
				});
		        habbitItem.updateOne({_id:id},{count:0},function(err){
					// console.log(err) // 
				})
				checkRepeate();
			}else{
				habbitItem.updateOne({_id:id},{$push: {completedHistory: 0}},function(err){// console.log(err)
				});
				habbitItem.updateOne({_id:id},{count:0},function(err){// console.log(err)
				});
				checkRepeate();
			}
		 });
	})}
})

app.post("/delete" , (req, res) => {
	let { id } = req.body;
	console.log(id)
	habbitItem.deleteOne({_id:id},function(err){console.log(err)} );
})

app.listen(port, () => console.log(`Server started at port: ${port}`));

