const express = require('express');
const router  = express.Router();

//require Mold model here

/**				index				**/
router.get('/', async (req, res) => {
	console.log(req.body, '<-------body from react');

	try {
		const allMolds = await Mold.find();

		res.json({
			status: 200,
			data: allMolds
		});

	} catch(err){
		res.send(err)
	}
});

/**				post				**/
router.post('/', async (req, res) => {
	
	try {
		console.log(req.body, '<------body from react');
		const createdMold = await Mold.create(req.body);

		res.json({
			status: 200,
			data: createdMold
		});
	} catch(err){
		res.send(err)
	}
});

/** 			show				**/
router.get('/:id', async (req, res) => {
	
	try {
		const foundMold = await Mold.findById(req.params.id);

		res.json({
			status: 200,
			data: foundMovie
		})
	} catch(err){
		res.send(err)
	}
});

/**				put					**/
router.put('/:id', async (req, res) => {
	
	try {
		const updatedMold = await Mold.findByIdAndUpdate(req.params.id, req.body, {new: true});
	
		res.json({
			status: 200,
			data: updatedMold
		});
	} catch(err){
		res.send(err)
	}
});

/** 			delete				**/
router.delete('/:id', async (req, res) => {
	
	try {
		const deteledMold = await Mold.findByIdAndRemove(req.params.id);

		res.json({
			status: 200,
			data: deletedMold
		})
	} catch(err){
		res.send(err)
	}
});

module.exports = router; 




