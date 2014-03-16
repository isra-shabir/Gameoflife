/**
	Script to attach handlers 
**/
$(document).ready(function() {

	var table_id = "board";
	var default_size = 30;

	var game, board;

	// event handlers for button clicks

	$("#draw").on("click", function() {
		
		var size = parseInt($("#size").val());
		if (!(size>4 && size<61)) {
			console.log("Size argument invalid or out of range. Using default of 25"); size = default_size;
		}
		$("#size").val(default_size);
		board = Board(size, table_id);

		disable(["#draw"]);
		enable(["#run"]);
	});


	$("#run").on("click", function() {
		var grid = board.parse_table_to_grid();
		game = GOL(grid, board);
		game.evolve(true);

		disable(["#run"]);
		enable(["#stop", "#speedup", "#slowdown"]);
	});


	$("#stop").on("click", function() {
		game.stop();
		enable(["#draw", "#run"]);
		disable(["#speedup", "#slowdown"]);
	});


	$("#speedup").on("click", function() {
		game.speedup();
	});


	$("#slowdown").on("click", function() {
		game.slowdown();
	});

	var disable = function(ids) {
		_.each(ids, function(id) {
			$(id).attr("disabled", "disabled");
		});
	}


	var enable = function(ids) {
		_.each(ids, function(id) {
			$(id).removeAttr("disabled");			
		});
	}

});