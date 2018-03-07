$(document).ready(function(){


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDoazbfGzZjwMnmU5beCX_-z04P2f3ykfc",
        authDomain: "train-times-87191.firebaseapp.com",
        databaseURL: "https://train-times-87191.firebaseio.com",
        projectId: "train-times-87191",
        storageBucket: "train-times-87191.appspot.com",
        messagingSenderId: "282861206439"
      };
      firebase.initializeApp(config);
    
      var database = firebase.database();
    
        // Button for adding Trains
        $("#addTrainBtn").on("click", function(){
    
            // Grabs user input and assign to variables
            var trainName = $("#trainNameInput").val().trim();
            var destination = $("#destinationInput").val().trim();
            var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
            var frequencyInput = $("#frequencyInput").val().trim();
    
            // Test for variables entered
            console.log(trainName);
            console.log(destination);
            console.log(trainTimeInput);
            console.log(frequencyInput);
    
            // pushing info to firebase and storing it
            firebase.database().ref().push({
                name:  trainName,
                destination: destination,
                trainTime: trainTimeInput,
                frequency: frequencyInput,
            })
    
            // // pushing trainInfo to Firebase
            // database.push(newTrain);
    
            // clear text-boxes
            $("#trainNameInput").val("");
            $("#destinationInput").val("");
            $("#trainTimeInput").val("");
            $("#frequencyInput").val("");
    
            // Prevents page from refreshing
            return false;
        });
    
        firebase.database().ref().on("child_added", function(childSnapshot, prevChildKey){
    
            console.log(childSnapshot.val());
    
            // assign firebase variables to snapshots
            var firebaseName = childSnapshot.val().name;
            var firebaseDestination = childSnapshot.val().destination;
            var firebaseTrainTimeInput = childSnapshot.val().trainTime;
            var firebaseFrequency = childSnapshot.val().frequency;
            
            var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
            var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
            var minutes = firebaseFrequency - timeRemainder;
    
            var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
            
            // Test for correct times and info
            console.log(minutes);
            console.log(nextTrainArrival);
            console.log(moment().format("hh:mm A"));
            console.log(nextTrainArrival);
            console.log(moment().format("X"));
    
            // Append train info to table on page
            $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
    
        });
    });