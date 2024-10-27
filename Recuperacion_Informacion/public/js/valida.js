$(document).ready(function(){
	$("#submit_inicio").click(function(){
		if($(".caja").val() == ""){
			$(".caja").addClass("error");
			alert("Escribe una consulta!");
		}else{
			$("#form-busqueda").submit();
		}
	});

	$(".caja").focus(function(){
		if($(this).hasClass("error")){
			$(this).removeClass("error");
		}
	});
});