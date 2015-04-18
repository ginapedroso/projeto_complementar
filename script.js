$(function(){

	var indice_selecionado = -1; //Índice do item selecionado na lista 
	var tabela = localStorage.getItem("tabela");// Recupera os dados armazenados 
	tabela = JSON.parse(tabela); // Converte string para objeto 
	if(tabela == null){ // Caso não haja conteúdo, iniciamos um vetor vazio 
		tabela = [];
	}else{
		Listar();
	}

 	
 	// carregando
	$(document).ready(function(){

		$('#meu_form').submit(function(){
			var $this = $( this );
 
 			var i = indice_selecionado + 1;

			var tr = '<tr>'+
				'<td>'+$this.find("input[name='nome']").val()+'</td>'+
				'<td>'+$this.find("input[name='email']").val()+'</td>'+
				'<td>'+$this.find("input[name='data']").val()+'</td>'+
				'<td>'+$this.find("input[name='compromisso']").val()+'</td>'+
				'<td>'+'<img src="images/delete.png" class="btnDeletar" alt="'+i+'" >'+'</td>'+
				'</tr>';

				//adicionar na tabela temporaria
				$('#minha_tabela').find('tbody').append( tr );

				// adicionar no localstorage
				Adicionar();

// incrementa o indice
indice_selecionado = i;

				$(".btnDeletar").bind("click", Excluir);

			return false;
		});

		// botao para limpar o banco
		$('#form_tabela').submit(function(){
			localStorage.clear();
			tabela = [];
			Listar();
		});

	});

	function Adicionar(){ 

		var registro = JSON.stringify({ 
			Nome : $("input[name='nome']").val(),
			Email : $("input[name='email']").val(),
			Data : $("input[name='data']").val(),
			Compromisso : $("input[name='compromisso']").val(),
		}); 

		tabela.push(registro); 
		localStorage.setItem("tabela", JSON.stringify(tabela)); 
		return true;
	}

	function Excluir(){ 

		indice_selecionado = parseInt($(this).attr("alt"));
		tabela.splice(indice_selecionado, 1);
		localStorage.setItem("tabela", JSON.stringify(tabela)); 
		alert("Registro excluído." + indice_selecionado); 

		//apagando da tela
		//var par = $(this).parent().parent(); //tr
    	//par.remove();

    	//Listar();
    	return true;
	}

	function Listar(){ 

		var linhas = tabela.length;
		if(linhas==0){
			alert("tabela vazia !!!");
		}

		for(var i in tabela){
	 		var registro = JSON.parse(tabela[i]); 

	 		$("#minha_tabela tbody").append("<tr>"); 
	 		$("#minha_tabela tbody").append("<td>"+registro.Nome+"</td>"); 
	 		$("#minha_tabela tbody").append("<td>"+registro.Email+"</td>"); 
	 		$("#minha_tabela tbody").append("<td>"+registro.Data+"</td>"); 
	 		$("#minha_tabela tbody").append("<td>"+registro.Compromisso+"</td>"); 
	 		$("#minha_tabela tbody").append("<td>"+'<img src="images/delete.png" class="btnDeletar" id="btnDeletar" alt="'+i+'" >'+"</td>");

	 		$("#minha_tabela tbody").append("</tr>"); 

	 	} 
	 	return false;
	} 



	$(".btnDeletar").bind("click", Excluir);	

});