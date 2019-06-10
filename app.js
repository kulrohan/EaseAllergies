var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var shell = require('shelljs');
const { Pool, Client} = require('pg');

app = express();
app.use(express.static("public"));  //serves all static files on the localhost

//use the public folder bc you do not want to serve the app.js and package.json static files to users
app.use(bodyParser.json());


const pool = new Pool({
  user: 'ea',
  host: 'localhost',
  database: 'easeallergies',
  password: 'ea',
  port: 5431,
});

function trigger_analysis(patient_trigger, today_plevel){ //true = trigger yes, false = not sick too little plevel
  var num_plevel_today = null;
  var num_patient_trigger = null;

  if (patient_trigger == 'Low'){
    num_patient_trigger = 1;
  }
  else if (patient_trigger == 'Moderate'){
    num_patient_trigger = 2;
  }
  else if (patient_trigger == 'High'){
    num_patient_trigger = 3;
  }
  else if (patient_trigger == 'Very High'){
    num_patient_trigger = 4;
  }

  if (today_plevel == 'Low'){
    num_plevel_today = 1;
  }
  else if (today_plevel == 'Moderate'){
    num_plevel_today = 2;
  }
  else if (today_plevel == 'High'){
    num_plevel_today = 3;
  }
  else if (today_plevel == 'Very High'){
    num_plevel_today = 4;
  }



  // console.log('Patient trigger ' + num_patient_trigger);
  // console.log('Pollen level today ' + num_plevel_today);

  if (num_patient_trigger <= num_plevel_today){  //the level today is more than the trigger
    return true;
  }
  else {
    return false;
  }

  //numerize the patient trigger and today's pollen level

}

app.get('/', function(req, res){

  // shell.exec('python webs.py');
  pool.query("SELECT trigger FROM patient_info WHERE name='Rohan Kulkarni'", (err, response)=>{
    if (err){console.log(err);}
    if (response){
      shell.exec('python3 webs.py');
      var ptrigger = response.rows[0].trigger;
      // console.log(ptrigger);
      var f = fs.readFileSync('./result.json');
      f = JSON.parse(f);
      var today = f['Tonight'][1]; //outputs Very High
      var trigger_result = trigger_analysis(ptrigger, today); //this works!
      var analysis = {analysis: trigger_result}
      fs.writeFileSync('./tf.json', JSON.stringify(analysis));

      //update symptoms + drugs
      if (trigger_result == true){
        pool.query('SELECT symptoms, treatment FROM history WHERE ok=true', (err, yes)=>{
          if(err){console.log(err);}
          if(yes){ //last treatments implement
            var treatments = {t0:yes.rows[0].treatment, t1:yes.rows[1].treatment, t2:yes.rows[2].treatment}
            var symptoms = {symp0:yes.rows[0].symptoms, symp1:yes.rows[1].symptoms, symp2:yes.rows[2].symptoms}
            // console.log(treatments);
            // console.log(symptoms);
            var data = JSON.stringify(symptoms)
            var w = fs.writeFile('./s.json', data);
            var data = JSON.stringify(treatments)
            var w = fs.writeFile('./t.json', data);
          }
        });
      }


      shell.exec('python sms.py')
      res.sendFile(__dirname + '/public/views/intro.html'); //trigger my_result


    }
  });

});

app.get('/test', (req,res)=>{
  res.sendFile(__dirname + '/public/views/intro.html')
});

app.get('/pharma', (req, res)=>{
  res.sendFile(__dirname + '/public/views/pharma.html')
})

app.get('/patient', (req, res)=>{
  res.sendFile(__dirname + '/public/views/patient.html')
});

app.get('/doctor', (req, res)=>{
  res.sendFile(__dirname + '/public/views/doctor.html')
});

app.get('/doctor/ajax-get', (req, res)=>{
  pool.query("SELECT date,name,plevel,weather,symptoms,treatment,ok FROM history", (err, response)=>{
    res.send(response.rows)
  });
});

app.get('/ajax-post', (req, response)=>{
      // pool.query("INSERT INTO history VALUES(1, '8 June 2019', "+ req.query.name + "," + req.query.plevel + ",'" + req.query.weather + "','{'1':'Runny Nose'}''" + "," + req.query.drug + ",'" + "," + req.query.ok + "')", (err)=>{
      //   if (err){console.log(err);}
      // });
      pool.query("INSERT INTO history VALUES(7, '8 June 2019', '" + req.query.name + "', '" + req.query.plevel + "', '" + req.query.weather + "', '{\"1\":\"" + req.query.symptom + "\"}', '" + req.query.drug + "', " + req.query.ok+")");
});

app.listen(8080, ()=>{
  console.log('EaseAllergies is listening for web requests on TCP port 8080.');
});
