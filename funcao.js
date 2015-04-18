$(function(){

	$(document).ready(function(){

		$('#meu_form').submit(function(){
			var $this = $( this );
 
			var tr = '<tr>'+
				'<td>'+$this.find("input[name='nome']").val()+'</td>'+
				'<td>'+$this.find("input[name='email']").val()+'</td>'+
				'<td>'+$this.find("input[name='data']").val()+'</td>'+
				'<td>'+$this.find("input[name='compromisso']").val()+'</td>'+
				'<td>'+'<img src="images/disk.png" class="btnSalvar">'+
					'<img src="images/delete.png" class="btnDeletar">'+'</td>'+
				'</tr>';
				$('#minha_tabela').find('tbody').append( tr );
				return false;
		});
	});
});