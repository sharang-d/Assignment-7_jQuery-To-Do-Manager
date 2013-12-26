treeToDos = [];
currentListIndex = 0;
$(document).ready(function() {
	//alert('in jquery');
	
	$('#listNotes').on('click', 'li', function () {
		$('#txtAddToDo').val('');
		var idx = $(this).index();
		$('#listToDos').html('');
		$('#popup_box').fadeIn("slow");
		var liStr = '';
		for (var i = 1; i < treeToDos[idx].length ; i++) {
			liStr += '<li>' + treeToDos[idx][i] + ' <input type="button" id="btnEdit' + i + '" value="Edit"> <input type="button" id="btnDelete' + i + '" value="Delete"></li>';
		};
		$('#listToDos').html(liStr);
		currentListIndex = idx;
	});
	
	$('#btnAddNote').on('click', function() {
		var text = $.trim($('#txtnoteName').val());
		if(!$('#txtnoteName').is(':visible')) 
			$('#txtnoteName').show();
		else if(text!='') {
			$('#txtnoteName').hide();
			$('#txtnoteName').val('');
			var liStr = '<li>' + text + '</li>';
			$('#listNotes').append(liStr);
			treeToDos.push([text]);
		}
	});

	$('#popup_box').on('click', '#btnAddToDo', function () {
		var str = $.trim($('#txtAddToDo').val());
		if(str=='') return;
		treeToDos[currentListIndex].push(str);
		var temp = treeToDos[currentListIndex].length - 1;
		var liStr = '<li>' + str + ' <input type="button" id="btnEdit' + temp + '" value="Edit"> <input type="button" id="btnDelete' + temp + '" value="Delete"></li>';
		if($('#items li').length >= 1 )
			$('#listToDos li:last').before(liStr);
		else
			$('#listToDos').append(liStr);
		$('#txtAddToDo').focus();
	})

	
	$('#listToDos').on('click', 'li input', function () {
		var patt1 = /btnEdit.+/;	
		if(patt1.test(this.id))	return; // if edit button is clicked don't do anything for now
		var _id = $(this).parent().index() + 1; // get position of li in ul when added with 1 becomes position of element in array
		treeToDos[currentListIndex].splice(_id, 1);		
		$(this).parent().remove();
	});
	
	
	//closePopupBox();
	$('#popupBoxClose').click(function () {
	    $('#popup_box').fadeOut("fast");
		
	});
});	
