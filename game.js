/**
This Constructor defines a Game of Life with all its methods (rules)
as well as necessary helper functions to be used in support of these methods.

**/

var GOL = function(grid, $board) {


	var size = grid.length;
	var clock_step = 200;
	var continue_flag = true;
	var evolved_grid;

  /**
    helper function that returns the number of neighbor cells of a square
    **/

	var count_neighbor_cells = function(square) {
		var valid_neighbors = get_valid_neighbors(square);
		var alive_neighbors_count = 0;
		_.each(valid_neighbors, function(sq) {
			if (has_cell(sq)) { alive_neighbors_count += 1 }
		})
		return alive_neighbors_count;
	}

	 /**
    checks whether a neighbor is valid
    **/

	var get_valid_neighbors = function(square) {
		
		var x = square.x;
		var y = square.y;

		var poss_rows_index = [x-1, x, x+1];
		var poss_cols_index = [y-1, y, y+1];

		var possible_neighbors = []
		_.each(poss_rows_index, function(elem_x) {
			_.each(poss_cols_index, function(elem_y) {
				if (! (x === elem_x && y === elem_y)) { 
					var neb_sq = { x : elem_x, y : elem_y };
					possible_neighbors.push(neb_sq);
				}
			});
		});
		var valid_neighbors = _.filter(possible_neighbors, function(square) {
			return is_valid_square(square);
		});
		return valid_neighbors;
	}

	/*
	helper function
	*/

	var is_valid_square = function(square) {
		var x = square.x;
		var y = square.y;
		if (x<0 || y<0 || x>=size || y>=size) { return false; }
		return true;
	}

	/*
	helper function
	*/


	var has_cell = function(square) {
		var bit = grid[square.x][square.y]===1 ? true : false;
		return bit
	}

	 /**
    an encompassing function to apply all the rules on each sqaure. First ensures there's a cell
    in the square
    **/

	var apply_rules_on_square = function(square) {
		
		var neighbor_count = count_neighbor_cells(square)
		var is_alive = has_cell(square)

		// die too few
		if (is_alive && neighbor_count<2) { evolved_grid[square.x][square.y] = 0; return; }

		// live on
		if (is_alive && (neighbor_count===2 || neighbor_count===3)) { evolved_grid[square.x][square.y] = 1; return; }

		// die too many
		if (is_alive && neighbor_count>3) { evolved_grid[square.x][square.y] = 0; return; }

		// come alive
		if ((!is_alive) && neighbor_count===3) { evolved_grid[square.x][square.y] = 1; return; }
	}

   /**
    encompassing function that applies the rules on the entire grid and resets the
    var grid to its clone in order to allow for updating the original grid
    **/

	var apply_rules_on_grid = function() {
		evolved_grid = clone_grid(grid)
		_.each(grid, function(row, row_index) {
			_.each(row, function(square, col_index){
				var square = { x: row_index, y: col_index }
				apply_rules_on_square(square);
			});
		});
		grid =  evolved_grid;
	}

 /**
    helper method that clones an existing grid for purpose of 
    allowing for updation while having the original grid maintained
    **/

	var clone_grid = function(grid) {
		var clone = [];
		_.each(grid, function(row, row_index) {
			var arr = [];
			_.each(row, function(square, col_index){
				arr.push(grid[row_index][col_index]);
			});
			clone.push(arr);
		});
		return clone;
	}


 /**
    helper function to make an empty grid with only 0s. returns a grid that
    then has 1s pushed to it where the cells are alive. (achieved elsewhere in the program)
    **/
    
	var step = function() {
		apply_rules_on_grid();
		if ($board) {
			var new_grid = get_game_state();
			$board.show(new_grid);
		}
		console.log(clock_step);
	}


	var get_game_state = function() {
		return clone_grid(grid);
	}


	var self = Object.create(GOL.prototype);


	self.evolve = function(flag) {
		if (continue_flag) {
			step();
			setTimeout(function() { self.evolve() }, clock_step);
		} else if (flag) {
			continue_flag = true;
			step();
			setTimeout(function() { self.evolve() }, clock_step);
		}
	}

	self.stop = function() {
		continue_flag = false;
	}


	self.speedup = function() {
		clock_step = clock_step/2;
		clock_step = Math.max(clock_step, 10);
	}

	self.slowdown = function() {
		clock_step = clock_step*2;
		clock_step = Math.min(clock_step, 2000);
	}


// ------------------------------------Unit Tests---------------------------------------


/* 
	Unit tests suites to be supplied as array of 
		arrays of state_change_fns with requisite args(as array) and
			and
		arrays of test_fns with requisite args(as array) and expected_result.


	run_unit_tests applies all state_change_fns to game and then goes through all test_condns,
	and checks for expected results for each one of them

	Please see sample tests in tests.js

		[[state_change_fn, args], [state_change_fn, args], ..]

		[[test_fn, args, expected_result], [test_fn, args, expected_result], ..]

*/
	self.run_unit_tests = function(unit_tests_suite) {

		// step is the only allowed way of changing state
		// 4 permissible methods to inspect state 
		var lookup = {
			'is_valid_square'	  : is_valid_square,
			'has_cell'			  : has_cell,
			'get_valid_neighbors' : get_valid_neighbors,
			'count_neighbor_cells': count_neighbor_cells,
			'step'				  : step
		};

		var state_change_fns;
		var test_condns;
		
		state_change_fns = unit_tests_suite[0];
		test_condns		 = unit_tests_suite[1];


		_.each(state_change_fns, function(elem) {
			var state_change_fn = elem[0];
			var args 			= elem[1];
			lookup[state_change_fn].apply(this, args);
		});

		_.each(test_condns, function(elem) {
			var test_condn_fn 	= elem[0];
			var args 		  	= elem[1];
			var expected_result = elem[2];
			var result 			= lookup[test_condn_fn].apply(this, args);

			if(result===expected_result) {
				console.log("Test: " + test_condn_fn + " passed");
				console.log("Result was " + result);
			} else {
				console.log("Test: " + test_condn_fn + " failed");
				console.log("expected: " + expected_result + "; got: " + result);
			}
		});

	}


	Object.freeze(self);
	return self;
}