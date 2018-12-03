




const handleSignin =(db,bcrypt)=>(req,res)=>{/*LOOK NEW SHORTCUT*/

	const {email,password}=req.body;
		if (!email||!password){
			return res.status(400).json('Incorrect form submission');
		}

	db.select('email','hash').from('login')
	.where('email','=',email)
	.then(data=>{
		const isValid=bcrypt.compareSync(password,data[0].hash);
		if (isValid){
			return db.select('*').from('users')
			.where('email','=',email)
			.then(user=>{
				res.json(user[0])
			})
			.catch(err=>res.status(400).json('unable to get user'))
			}else{
				res.status(400).json('wrong credentials')
			}
			})
		.catch(err=>res.status(400).json('wrong credentials'))
	
// 	bcrypt.compare("apples",
// 	 '$2a$10$4GyJ/J/QcPWaj8z0DU1Rn.IQT1u1SJDoVApkAgcPw5Ts5D9dctlLK',
// 	  function(err, res) {
//     	console.log('first guess',res)
// });
// bcrypt.compare("veggies",
//  '$2a$10$4GyJ/J/QcPWaj8z0DU1Rn.IQT1u1SJDoVApkAgcPw5Ts5D9dctlLK',
//   function(err, res) {
//     console.log('second guess',res)
// });
// 	if (req.body.email===database.users[0].email &&
// 		req.body.password===database.users[0].password){
// 		res.json(database.users[0]);
// 		// res.json('success');
// 	}else{
// 		res.status(400).json('error logging in');
// 	}
}

module.exports={
		handleSignin:handleSignin
	};