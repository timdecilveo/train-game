
  var config = {
    apiKey: "AIzaSyAopDnDrHGSK1jjB1hBhNdCOHhHiVMZeFU",
    authDomain: "train-project-85987.firebaseapp.com",
    databaseURL: "https://train-project-85987.firebaseio.com",
    projectId: "train-project-85987",
    storageBucket: "train-project-85987.appspot.com",
    messagingSenderId: "993457300178"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var trainDestination = "";
  var trainFirstTime = "";
  var trainFrequency = "";
  var trainArrivalTime = "";

// ------------------------------------------------------------------------------------

  $("#add-train-btn").on("click", function(event){

    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    trainDestination = $("#train-destination-input").val().trim();
    trainFirstTime = $("#train-first-time-input").val().trim();
    trainFrequency = $("#train-frequency-input").val().trim();
    trainArrivalTime = moment.utc(trainFirstTime,"hh:mm").add(trainFrequency,"minute").format("HH:mm");

    database.ref().push({
      trainName: trainName,
      trainDestination: trainDestination,
      trainFirstTime: trainFirstTime,
      trainFrequency: trainFrequency,
      trainArrivalTime: trainArrivalTime
    })

    $("#train-name-input").val("");
    $("#train-destination-input").val("");
    $("#train-first-time-input").val("");
    $("#train-frequency-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot){
    $("#train-table").prepend("<tr><td>" + childSnapshot.val().trainName + "</td>"
    + "<td>" + childSnapshot.val().trainDestination + "</td>"
    + "<td>" + childSnapshot.val().trainFirstTime + "</td>"
    + "<td>" + childSnapshot.val().trainFrequency + "</td>"
    + "<td>" + childSnapshot.val().trainArrivalTime + "</td></tr>");
  });