/*
Test suite
*/

/*
format for test suite

	[[fn, args], [fn, args], ..], [[test_fn, args, expected_result], [test_fn, args, expected_result], ..]

*/

var test_suite1 = function() {

	var grid = [[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			   ]

	var game = GOL(grid, null)


//-------------------------------------
	var state_change_fns1 = []
	state_change_fn1 = ["step", []]
	state_change_fn2 = ["step", []]
	state_change_fn3 = ["step", []]
	state_change_fn4 = ["step", []]
	state_change_fn5 = ["step", []]
	state_change_fns1.push(state_change_fn1, state_change_fn2, state_change_fn3, state_change_fn4, state_change_fn5)

	var test_condns1 = []
	var test_condn1 = ["has_cell", [{x:0, y:0}], false]
	var test_condn2 = ["has_cell", [{x:15, y:15}], false]
	var test_condn3 = ["has_cell", [{x:2, y:1}], true]
	var test_condn4 = ["has_cell", [{x:3, y:2}], true]
	var test_condn5 = ["has_cell", [{x:4, y:2}], true]
	var test_condn6 = ["has_cell", [{x:3, y:3}], true]
	test_condns1.push(test_condn1, test_condn2, test_condn3, test_condn4, test_condn5, test_condn6)



	var unit_tests_suite = []
	unit_tests_suite.push(state_change_fns1)
	unit_tests_suite.push(test_condns1)

	game.run_unit_tests(unit_tests_suite)
}


var test_suite2 = function() {

	var grid = [[0,0,1,0,0],
				[0,0,0,1,0],
				[0,1,1,1,0],
				[0,0,0,0,0],
				[0,0,0,0,0]]

	var game = GOL(grid, null)

	var state_change_fns = []

	var test_condns = []
	var test_condn1 = ["count_neighbor_cells", [{x:0, y:0}], 0]
	var test_condn2 = ["has_cell", [{x:4, y:4}], false]
	var test_condn3 = ["is_valid_square", [{x:-1, y:5}], false]

	test_condns.push(test_condn1, test_condn2, test_condn3)


	var unit_tests_suite = []
	unit_tests_suite.push(state_change_fns)
	unit_tests_suite.push(test_condns)
	game.run_unit_tests(unit_tests_suite)

}


var test_suite3 = function() {

	var grid = [[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			   ];

	var game = GOL(grid, null);

	var unit_tests_suite = [];

	var state_change_fns2 = [];
	state_change_fn6 = ["step", []];
	state_change_fn7 = ["step", []];
	state_change_fns2.push(state_change_fn6, state_change_fn7);

	var test_condns2 = [];
	var test_condn7  = ["has_cell", [{x:0, y:0}], false];
	var test_condn8  = ["has_cell", [{x:15, y:15}], false];
	var test_condn9  = ["has_cell", [{x:2, y:1}], false];
	var test_condn10 = ["has_cell", [{x:3, y:2}], true];
	var test_condn11 = ["has_cell", [{x:4, y:2}], false];
	var test_condn12 = ["has_cell", [{x:3, y:3}], false];
	test_condns2.push(test_condn7, test_condn8, test_condn9, test_condn10, test_condn11, test_condn12);


	unit_tests_suite.push(state_change_fns2);
	unit_tests_suite.push(test_condns2);

	game.run_unit_tests(unit_tests_suite)
}
test_suite1();
test_suite2();
test_suite3();
