(function($){

	$('').css("border", "1px solid red");   //Одно свойство

	$('').css({
		border: "1px solid red",  //несколько свойств
		color: green
	});

	$('').addClass("active");     //Добавить класс "active"

	$('button').height(200);      //Задать высоту в пикселях


	var hbutton = $('button').height();   // Поместить значение высоты в переменную
	$('button').height(hbutton);           //Задать высоту как в "hbutton"


	function addHt() {

		var prTx = $('#gd').text();
		$('#pr2').text(prTx);
	}

	$('a').attr({href:"http//vk.com", title:"Вконтакте"}); //Добавить несколько атрибутов

	$('div').filter(".hello").css("color", "red"); //все div с классом hello окрасить в красный цвет

	$('div').not(".not").css("color", "green"); //все div с классом not окрасить в зеленный цвет

	var rt = $('p').parrent().is(".masonry"); //Если класс "masonry" является родителем для "p", то - true
	$('div.bl').text('rt');

});