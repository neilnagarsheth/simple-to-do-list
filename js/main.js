$(document).ready(function(){
	
	var listData = (function () {
	    function listData() {
	        this.size = 0;
	        this.checked = {};
	        this.description = {};
	    }
	    return listData;
	})();

	var listData = new listData();
	var descriptionText = 'description';
	var checkedText = 'checked';
	var checkedText = 'checked'
	var sizeText = 'listSize';

	if(localStorage.getItem(descriptionText) && localStorage.getItem(checkedText) && localStorage.getItem(sizeText)){
		listData.description = JSON.parse(localStorage.getItem(descriptionText));
		listData.checked = JSON.parse(localStorage.getItem(checkedText));
		listData.size = parseInt(localStorage.getItem(sizeText));
		for(var key in listData.description){
			var checkText = "";
			var checkMark = false;
			var strikeThrough = "none";
			if(listData.checked[key]){
				checkText = '\u2713';
				checkMark = true;
				strikeThrough = "line-through";
			}
			$(".shiftnav-content-wrap").append("<div class = 'list-item'><p hidden>" + key + "</p>" + "<input type = 'text' class = 'list-input' style='text-decoration:"+strikeThrough+";' value = '"+ listData.description[key] + "'><p hidden>" + key + "</p><div class = 'remove-item'>X</div><p hidden>" + key + "</p><div class = 'checkbox-item'>" + checkText + "</div></div>");
			$("input").last().prop('disabled',checkMark);
		}
    	appendToolTips();
	}
	else{
		localStorage.setItem(descriptionText, JSON.stringify(listData.description));
		localStorage.setItem(checkedText, JSON.stringify(listData.checked));
		localStorage.setItem(sizeText,listData.size);
	}


	$("#add-button").click(function(){
		listData.size += 1;
		listData.checked[listData.size - 1] = false;
	    listData.description[listData.size - 1] = "";
	    var addItem = $("<div class = 'list-item'><p hidden>" + (listData.size-1) + "</p>" + "<input type = 'text' class = 'list-input'>" + "<p hidden>" + (listData.size-1) + "</p><div class = 'remove-item'>X</div><p hidden>" + (listData.size-1) + "</p><div class = 'checkbox-item'></div></div>").hide();
	    $(".shiftnav-content-wrap").append(addItem);
	    addItem.show('slow');
	    appendToolTips();
		localStorage.setItem(descriptionText, JSON.stringify(listData.description));
		localStorage.setItem(checkedText, JSON.stringify(listData.checked));
		localStorage.setItem(sizeText,listData.size);
	});

	$(document).keypress(function(event){
		if (event.keyCode == 13) {
	        event.preventDefault();
	    }
	});

	$(document).on("keyup change",'input',function(){
		listData.description[$(this).prev().text()] = $(this).val();
		localStorage.setItem(descriptionText, JSON.stringify(listData.description));
		localStorage.setItem(checkedText, JSON.stringify(listData.checked));
	});

	$(document).on("click",".remove-item",function(){
	    if(confirm("Are you sure you want to remove this item from your list?")){
	      delete listData.checked[$(this).prev().text()];
	      delete listData.description[$(this).prev().text()];
	      $(this).parent().hide('slow', function(){ $(this).remove();});
	      localStorage.setItem(descriptionText, JSON.stringify(listData.description));
	      localStorage.setItem(checkedText, JSON.stringify(listData.checked));
	    }
	});
  
	$(document).on("click",".checkbox-item",function(){
		var checkText = "";
		var checkMark = false;
		var strikeThrough = "none";
		if(!listData.checked[$(this).prev().text()]){
		  checkText = "\u2713";
		  checkMark = true;
		  strikeThrough = "line-through";
		}
		$(this).text(checkText);
		$(this).prevAll('input').css("text-decoration",strikeThrough);
		$(this).prevAll('input').prop('disabled',checkMark);
		listData.checked[$(this).prev().text()] = checkMark;
		localStorage.setItem(checkedText, JSON.stringify(listData.checked));
	});

	function appendToolTips(){
		$(".remove-item").attr('title',"Remove this item from the list");
		$(".checkbox-item").attr('title',"Check off this item");
		$(".list-input").attr('title',"Add a description of the item");
	}
  
});
