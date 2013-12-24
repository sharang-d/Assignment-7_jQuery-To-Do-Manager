treeToDos = [];
currentListIndex = 0;
$(document).ready(function() {
	//alert('in jquery');
	$('#listNotes').on('click', 'li', function () {
		//alert(listToDos[0][0]);
		loadPopupBox($(this).index());
	});
	$('#btnAddNote').on('click', function() {
		var text = $.trim($('#txtnoteName').val());
		if(!$('#txtnoteName').is(':visible')) 
			$('#txtnoteName').show();
		else if(text!='') {
			$('#txtnoteName').hide();
			$('#txtnoteName').val('');
			var liStr = '<li>' + text + '</li>';
			//alert(liStr);
			$('#listNotes').append(liStr);
			treeToDos.push([text]);
		}
	});

	$('#popup_box').on('click', '#btnAddToDo', function () {
		var str = $.trim($('#txtAddToDo').val());
		if(str=='') return;
		treeToDos[currentListIndex].push(str);
		$('#listToDos li:last').before('<li>' + str + '</li>');
	})

	//closePopupBox();
	$('#popupBoxClose').click(function () {
	    unloadPopupBox();
	});

	function unloadPopupBox() { // TO Unload the Popupbox
	    $('#popup_box').fadeOut("slow");

	}

	function loadPopupBox(idx) { // To Load the Popupbox
		$('#listToDos').html('');
		$('#popup_box').fadeIn("slow");
		var liStr = '';
		for (var i = 1; i < treeToDos[idx].length ; i++) {
			liStr += '<li>' + treeToDos[idx][i] + '</li>';
		};
		liStr += '<li><input type="text" id="txtAddToDo"><input type="button" id="btnAddToDo" value="Add"></li>';
		$('#listToDos').html(liStr);
		currentListIndex = idx;
	}
});	