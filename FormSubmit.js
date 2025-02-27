function onFormSubmit(e) {
  try {
    var resposta = e.response.getItemResponses();
    var nome = resposta[0].getResponse();        
    var empresa = resposta[1].getResponse();     
    var dataAniversario = new Date(resposta[2].getResponse());

    var calendarioId = 'id.calendário';

    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    var dataEvento = new Date(dataAniversario);
    dataEvento.setFullYear(anoAtual);
    dataEvento.setHours(0, 0, 0, 0);

        if (dataEvento < dataAtual) {
      dataEvento.setFullYear(anoAtual + 1);
    }

    var calendario = CalendarApp.getCalendarById(calendarioId);

    calendario.createAllDayEvent(
      `Aniversário: ${nome} (${empresa})`,
      dataEvento
    );

    for (var i = 1; i <= 10; i++) {
      var proximoAno = anoAtual + i;
      var novaData = new Date(dataEvento);
      novaData.setFullYear(proximoAno);
      calendario.createAllDayEvent(
        `Aniversário: ${nome} (${empresa})`,
        novaData
      );
    }

    Logger.log(`Eventos criados para ${nome}`);
  } catch (error) {
    Logger.log('Erro: ' + error);
  }
}
