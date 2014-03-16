
var Board = function(size, table_id) {

	var make_table = function(size) {

		var $table = $("<table>");
		$table.attr("id", table_id);

		var tr_id_template = "tr";
		var td_id_template = "td";

		_(size).times(function (r) {

			var tr_id = tr_id_template + r;
			var $tr = $("<tr>");
			$tr.attr("id", tr_id);

			_(size).times(function (c) {

				var td_id = td_id_template + c;
				var $td = $("<td></td>");
				$td.attr("id", td_id);
				$td.appendTo($tr);

			});
			$tr.appendTo($table);

		});
		return $table;

	}

	var make_empty_grid = function(size) {
		var grid = [];
		_(size).times(function() {
			var arr = [];
			_(size).times(function() {
				arr.push(0);
			});
			grid.push(arr);
		});
		return grid;
	}


	var init = function() {
		$table 	= make_table(size);
		
		// attach click handler
		$table.on("click", "td", function() {
			var $square = $(this);
			if($square.hasClass("alive")) {
				$square.removeClass("alive");
			} else {
				$(this).addClass("alive");
			}
		});
		$("#"+table_id).remove();
		$table.appendTo("body");
	}

	var self = Object.create(Board.prototype);


	self.parse_table_to_grid = function() {
		var $table = $("#"+table_id);
		var size = $("tr", $table).length;
		var grid = make_empty_grid(size);

		var squares = $("td", $table);
		_.each(squares, function(elem) {
			if ($(elem).hasClass("alive")) {
				var col = $(elem).attr("id").substr(2);
				var row = $(elem).parent().attr("id").substr(2);
				grid[row][col] = 1;
			}
		});
		return grid;
	}

	self.show = function(grid) {
		_.each(grid, function(row, row_index) {
			_.each(row, function(square, col_index) {
				var $square = $("#tr"+row_index + " > #td"+col_index);
				var cell_alive = grid[row_index][col_index];
				if(cell_alive) {
					$square.addClass("alive");
				} else {
					$square.removeClass("alive");
				}
			});
		});
	}

	init();
	Object.freeze(self);
	return self;
}
