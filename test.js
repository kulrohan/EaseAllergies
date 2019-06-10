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



  console.log('Patient trigger ' + num_patient_trigger);
  console.log('Pollen level today ' + num_plevel_today);

  if (num_patient_trigger <= num_plevel_today){  //the level today is more than the trigger
    console.log('you will fall sick');
  }
  else {
    console.log('you will not fall sick');
  }

  //numerize the patient trigger and today's pollen level

}

trigger_analysis('Very High', 'High');
