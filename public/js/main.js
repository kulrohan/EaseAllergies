
$('#submit-post').on('click', function(){
  alert('Recorded successfully!');

  // var identification = document.getElementById("id").value;
  // var location = document.getElementById("loc").value;
  // var name = 'Dan';
  // var pollen = 'High';
  // var weath = 'Sunny';
  // var sy = 'Sneezing';
  // var tf = false;
  // window.location = '/ajax-post?name=' + name + '&plevel=' + pollen + '&weather=' + weath + '&symptom=' + sy + '&ok=' + tf

  // $.ajax({
  //   type: "GET",
  //   url : '/max-entry',
  //   success: function(result){
  //     console.log('success');
  //     console.log(result.max);
  //     var next_entry = result.max + 1;
  //     var identification = document.getElementById("id").value;
  //     var location = document.getElementById("loc").value;
  //     var post_json = {Entry: next_entry, id: identification, location: location, time: null}; //time is null, to be added in server
  //     console.log(post_json);
  //     window.location = '/ajax-post?entry=' + next_entry + '&id=' + identification + '&loc=' + location
  //     alert('Recorded successfully!')
  //
  //
  //   }
  // });


});

$('#sub').on('click', function(){
  alert('yo')
});



$.ajax({
  type: 'GET',
  url: '/doctor/ajax-get',
  success: function(result){
    console.log(result);
    google.charts.load('current', {'packages':['table']});
          google.charts.setOnLoadCallback(drawTable);

          function drawTable() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Date');
            data.addColumn('string', 'Name');
            data.addColumn('string', 'Pollen Level');
            data.addColumn('string', 'Weather');
            data.addColumn('string', 'Symptoms');
            data.addColumn('string', 'Treatment');
            data.addColumn('boolean', 'Ok?');

            for (i=0; i<result.length; i++){
                  data.addRows([
                    [result[i].date, result[i].name, result[i].plevel, result[i].weather, result[i].symptoms["1"], result[i].treatment, result[i].ok]
                  ]);
              }
            // for (i=0; i < result.length; i++) {
            //   data.addRows([[
            //     result[i].date, {v:result[i].id, f:result[i].id.toString()}, result[i].location, result[i].time
            //   ]]);
            //
            // }

            var table = new google.visualization.Table(document.getElementById('table_div'));

            table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
          }
  }
})
