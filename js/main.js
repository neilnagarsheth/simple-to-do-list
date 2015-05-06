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
			$(".shiftnav-content-wrap").append("<div class = 'list-item'><p hidden>" + key + "</p>" + "<div class = 'list-input' contenteditable="+ !checkMark + " style='text-decoration:"+strikeThrough+";'>" + listData.description[key] + "</div><p hidden>" + key + "</p><div class = 'remove-item'>X</div><p hidden>" + (listData.size-1) + "</p><div class = 'checkbox-item'>" + checkText + "</div></div>");
		}
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
    $(".shiftnav-content-wrap").append("<div class = 'list-item'><p hidden>" + (listData.size-1) + "</p>" + "<div class = 'list-input' contenteditable>" + "</div><p hidden>" + (listData.size-1) + "</p><div class = 'remove-item'>X</div><p hidden>" + (listData.size-1) + "</p><div class = 'checkbox-item'></div></div>");
		localStorage.setItem(descriptionText, JSON.stringify(listData.description));
		localStorage.setItem(checkedText, JSON.stringify(listData.checked));
		localStorage.setItem(sizeText,listData.size);
	});

	$(document).keypress(function(event){
		if (event.keyCode == 13) {
	        event.preventDefault();
	    }
	});

	$(document).on("keyup change",'.list-input',function(){
		listData.description[$(this).prev().text()] = $(this).text();
		localStorage.setItem(descriptionText, JSON.stringify(listData.description));
		localStorage.setItem(checkedText, JSON.stringify(listData.checked));
	});

	$(document).on("click",".remove-item",function(){
		delete listData.checked[$(this).prev().text()];
		delete listData.description[$(this).prev().text()];
		$(this).parent().remove();
		localStorage.setItem(descriptionText, JSON.stringify(listData.description));
		localStorage.setItem(checkedText, JSON.stringify(listData.checked));
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
    $(this).prevAll('div.list-input').css("text-decoration",strikeThrough);
    $(this).prevAll('div.list-input').attr('contentEditable',!checkMark);
    listData.checked[$(this).prev().text()] = checkMark;
    localStorage.setItem(checkedText, JSON.stringify(listData.checked));
  });

});
