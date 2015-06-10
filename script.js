$(function(){

	var operacao = "add";
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

			// adicionar no localstorage
			Adicionar();

			// incrementa o indice apos inclusao	
			indice_selecionado = i;

			// habilitar os botoes
			$(".btnDeletar").bind("click", Excluir);
			$(".btnEditar").bind("click",Editar);

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

		if (operacao == "add"){
			tabela.push(registro); 
			localStorage.setItem("tabela", JSON.stringify(tabela)); 
			alert("Registro incluido com sucesso");
		}else{
			tabela[indice_selecionado] = registro;
			localStorage.setItem("tabela", JSON.stringify(tabela)); 
			alert("Registro alterado com sucesso");
			operacao = "add";
		}

		Listar();
		return true;
	}

	function Excluir(){ 

		indice_selecionado = parseInt($(this).attr("alt"));
		tabela.splice(indice_selecionado, 1);
		localStorage.setItem("tabela", JSON.stringify(tabela)); 
		alert("Registro excluído com sucesso"); 

		Listar();

		$(".btnDeletar").bind("click", Excluir);	
	$(".btnEditar").bind("click", Editar);

    	return true;
	}

	function Editar(){ 

		operacao = "up";

		indice_selecionado = parseInt($(this).attr("alt"));
		var registro = JSON.parse(tabela[indice_selecionado]); 

		$("input[name='nome']").val(registro.Nome);
		$("input[name='email']").val(registro.Email);
		$("input[name='data']").val(registro.Data);
		$("input[name='compromisso']").val(registro.Compromisso);

		return true; 
	}

	function Listar(){ 

		var linhas = tabela.length;

			$("#minha_tabela").html(""); 
			$("#minha_tabela").html( "<thead>"+ "	<tr>"+ 
				//"   <td>ID</th>"+
				"	<th>Nome</th>"+ 
				"	<th>Email</th>"+ 
				"	<th>Data</th>"+ 
				"	<th>Compromisso</th>"+ 
				"   <th>Ação</th>"+
				"	</tr>"+ "</thead>"+ "<tbody>"+ "</tbody>"
			);

		for(var i in tabela){
	 		var registro = JSON.parse(tabela[i]); 

	 		$("#minha_tabela tbody").append("<tr>"); 
	 		//$("#minha_tabela tbody").append("<td>"+i+"</td>");
	 		$("#minha_tabela tbody").append("<td>"+registro.Nome+"</td>"); 
	 		$("#minha_tabela tbody").append("<td>"+registro.Email+"</td>"); 
	 		$("#minha_tabela tbody").append("<td>"+registro.Data+"</td>"); 
	 		$("#minha_tabela tbody").append("<td>"+registro.Compromisso+"</td>"); 
	 		$("#minha_tabela tbody").append("<td>"+'<img src="images/delete.png" class="btnDeletar" id="btnDeletar" alt="'+i+'" >'+ " "+
	 		'<img src="images/pencil.png" class="btnEditar" id="btnEditar" alt="'+i+'" >'+"</td>");

	 		$("#minha_tabela tbody").append("</tr>"); 

	 	} 

	 	// atualiza o indice
	 	indice_selecionado = linhas - 1;

	 	//limpar o formulario
	 	Limpar();

	 	return true;
	} 

	function Limpar(){
		$("input[name='nome']").val("");
		$("input[name='email']").val("");
		$("input[name='data']").val("");
		$("input[name='compromisso']").val("");
		$("input[name='nome']").focus;
		operacao = "add";
	}

	$(".btnDeletar").bind("click", Excluir);	
	$(".btnEditar").bind("click", Editar);

});