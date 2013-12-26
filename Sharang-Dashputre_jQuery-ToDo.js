treeToDos = [];
currentListIndex = 0;
$(document).ready(function () {
    //alert('in jquery');

    // Note clicked
    $('#listNotes').on('click', 'li', function () {
        $('#txtAddToDo').val('');
        var idx = $(this).index();
        $('#listToDos').html('');
        $('#popup_box').fadeIn("slow"); // show pop-up
        $("#container").fadeTo("fast", 0.3); //fade the rest
        var liStr = '';
        // populate list
        for (var i = 1; i < treeToDos[idx].length; i++) {
            liStr += '<li>' + treeToDos[idx][i] + ' <button id="btnEdit' + i + '">Edit</button><button id="btnDelete' + i + '">Delete</button></li>';
        };
        $('#listToDos').html(liStr);
        currentListIndex = idx;
    });

    // Add button clicked
    $('#btnAddNote').on('click', function () {
        var text = $.trim($('#txtnoteName').val()); // trim whitespace
        if (!$('#txtnoteName').is(':visible'))
        {
	    $('#txtnoteName').show();
            $('#txtnoteName').focus();
	}
        else if (text != '') {
            $('#txtnoteName').hide();
            $('#txtnoteName').val('');
            var liStr = '<li>' + text + '</li>';
            $('#listNotes').append(liStr);
            treeToDos.push([text]);
        }
    });

    // Add button in pop-up clicked
    $('#popup_box').on('click', '#btnAddToDo', function () {
        var str = $.trim($('#txtAddToDo').val());
        if (str == '') return;
        treeToDos[currentListIndex].push(str);
        var temp = treeToDos[currentListIndex].length - 1;
        var liStr = '<li>' + str + ' <button id="btnEdit' + temp + '">Edit</button><button id="btnDelete' + temp + '">Delete</button></li>';
        $('#listToDos').append(liStr);
        $('#txtAddToDo').focus();
    })


    // "Edit", "Delete" or "Done" is clicked
    $('#listToDos').on('click', 'li button', function () {
        var patt1 = /btnEdit([0-9]+)/;
        var patt2 = /btnDone([0-9]+)/;
        if (patt1.test(this.id)) { // Edit
            var temp = this.id.match(patt1)[1]; // find index of element
            var newLi = '<input id="txtEdit' + temp + '" value="' + treeToDos[currentListIndex][temp] + '"><button id="btnDone' + temp + '">Done</button>';
            $(this).parent().html(newLi);
        } else if (patt2.test(this.id)) { //Done
            var done_id = this.id.match(patt2)[1];
            var text = $.trim($('#txtEdit' + done_id).val());
            if (text == '') return;
            treeToDos[currentListIndex][done_id] = text;
            var newLi = text + '<button id="btnEdit' + done_id + '">Edit</button><button id="btnDelete' + done_id + '">Delete</button>';
            $(this).parent().html(newLi);
        } else { // Delete
            var _id = $(this).parent().index() + 1; // get position of li in ul. When added with 1 it becomes position of element in array
            treeToDos[currentListIndex].splice(_id, 1);
            $(this).parent().remove();
        }
    });


    //closePopupBox();
    $('#popupBoxClose').click(function () {
        $('#popup_box').fadeOut("fast");
        $("#container").fadeTo("fast", 1);
    });

});
