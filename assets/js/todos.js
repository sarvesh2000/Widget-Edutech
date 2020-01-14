var id;

// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(event){
	$(this).toggleClass("completed");
	const Todos = Parse.Object.extend('Todos');
			const query1 = new Parse.Query(Todos);
			query1.equalTo("Todo",$(this).html());
			console.log("Value "+$(this).html());
			query1.find().then((results) => {
			// You can use the "get" method to get the value of an attribute
			// Ex: response.get("<ATTRIBUTE_NAME>")
			if (typeof document !== 'undefined') {
				//document.write(`Error while fetching Todos: ${JSON.stringify(results)}`);
				for(var i=0;i<results.length;i++)
				id=results[i]._getId();
				console.log(id);	
				const query = new Parse.Query(Todos);
			// here you put the objectId that you want to delete
			console.log("Id in query "+id);
			query.get(id).then((object) => {
			object.destroy().then((response) => {
				if (typeof document !== 'undefined') //document.write(`Deleted Todos: ${JSON.stringify(response)}`);
				//console.log('Deleted Todos', response);
				document.location.href="index.html"
			}, (error) => {
				if (typeof document !== 'undefined') document.write(`Error while deleting Todos: ${JSON.stringify(error)}`);
				console.error('Error while deleting Todos', error);
			});
			});
			}
			}, (error) => {
			if (typeof document !== 'undefined') document.write(`Error while fetching Todos: ${JSON.stringify(error)}`);
			console.error('Error while fetching Todos', error);
			});
			
			$(this).parent().fadeOut(500,function(){
				$(this).remove();
			});
			event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text from input
		var todoText = $(this).val();
		$(this).val("");
		//create a new li and add to ul
		$("ul").append("<li value='"+todoText+"'>" + todoText + "</li>");
		//save to DB
		const Todos = Parse.Object.extend('Todos');
		const myNewObject = new Todos();
		const currentUser = Parse.User.current();
		myNewObject.set('username', currentUser.getUsername());
		myNewObject.set('Todo',todoText);

		myNewObject.save().then(
		(result) => {
			if (typeof document !== 'undefined') //document.write(`Todos created: ${JSON.stringify(result)}`);
			//console.log('Todos created', result);
			document.location.href="index.html"
		},
		(error) => {
			if (typeof document !== 'undefined') document.write(`Error while creating Todos: ${JSON.stringify(error)}`);
			console.error('Error while creating Todos: ', error);
		}
		);
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});