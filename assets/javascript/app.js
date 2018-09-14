var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "assets/images/tune.mp3");

$(document).ready( function() {
    
    $("#content").hide()
    
    var questions = [
        { 
            question: "In what year did the first season take place?", 
            answers: ["1981", "1983", "1988", "1990"],
            values: [false, false, false, true],
        },{ 
            question: "How old was Bill Beyers when he disappeared?",
            answers: ["8", "10", "15", "12"],
            values: [false, false, false, true],
        },{ 
            question: "What is the name of the font used for the show's iconic title sequence?",
            answers: ["AK Light", "MT Light", "Helvetica", "ITC Benguiat"],
            values: [false, false, false, true],
        },{ 
            question: "Which of the show's character is affected by Cleidocranical Dysplasia?",
            answers: ["Mike","Will","Nancy","Dustin"],
            values: [false, false, false, true],
        },{ 
            question: "How did Eleven obtain her superhuman powers?",
            answers: ["Radiation","Evolution","The Upside Down", "Drugs"],
            values: [false, false, false, true],
        },{ 
            question: "Will's favorite song from the punk rock band The Clash is...",
            answers: ["Magnificent Seven","Straight to Hell", "Lost in the Supermarket", "Should I Stay or Should I Go"],
            values: [false, false, false, true],
        },{ 
            question: "What does Johnathan give Will as he recovers in the hospital?",
            answers: ["A movie ticket","A VHS tape","A rock band poster", "A Mixtape"],
            values: [false, false, false, true],
        },{ 
            question: "What does the number on Eleven's arm read?",
            answers: ["0011", "11","00011", "011"],
            values: [false, false, false, true],
        },{ 
            question: "What is the name of the boys' favorite board game.",
            answers: ["Ghost Castle","Hero Quest","Crossbows & Catapults", "Dungeons & Dragons"],
            values: [false, false, false, true],
        },{ 
            question: "Which character was the first to enter the Upside Down?",
            answers: ["Hopper","Joyce","Jonathan","Nancy"],
            values: [false, false, false, true],
        }]
  
    var currentQuestion = 0;
    var correct = 0; 
    var wrong = 0;
    var none = 0; 
  
    $("#start").on("click", function() {
        audioElement.play();
        $("#start").fadeToggle("slow", displayQ) 
        $('.background-image').css({'background-image':'url(https://vignette.wikia.nocookie.net/strangerthings8338/images/3/32/Upside-Down-S2.png/revision/latest?cb=20180321034242)'});   
    })
  
    function displayQ() {
        $(".message-content").remove();
        $("#start").remove();
        $("#content").show()
        $('.background-image').html({'background-image':'url(https://vignette.wikia.nocookie.net/strangerthings8338/images/3/32/Upside-Down-S2.png/revision/latest?cb=20180321034242)'});   
      
        var questionArea = $("<div>");
            questionArea.attr("id", "question-area")
            questionArea.appendTo("#content")
        var timer = $("<h2>")
            timer.appendTo(questionArea)
        var question = $("<p>")
            question.appendTo(questionArea)
        var time = 15;
            timer.html("<h3>" + time + " seconds...</h3>")
        
        var countDown = setInterval( function() {
            time--;
            timer.html("<h3>" + time + " seconds...</h3>")

        if (time === 0) {
            clearInterval(countDown)
            questionArea.fadeToggle("slow", timedOut)
            none++;
        }
    }, 1000);
  
    question.html(questions[currentQuestion].question)
  
        for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
            var answers = $("<button>")
            answers.html(questions[currentQuestion].answers[i])
            answers.addClass("answer-buttons")
            answers.attr("value", questions[currentQuestion].values[i])
            answers.appendTo(questionArea)
        };
  
    $(".answer-buttons").on("click", function() {

        if ($(this).attr("value") === "true") {
            questionArea.fadeToggle("slow", displayQ)
            clearInterval(countDown);
            correct++;
            currentQuestion++;
        };

        if ($(this).attr("value") === "false") {
            questionArea.fadeToggle("slow", displayQ)
            clearInterval(countDown)
            wrong++;
            currentQuestion++;
        };

        if (currentQuestion === 10) {
            gameOver ()
        }
    });
};

    function timedOut() {
      var cycle = setTimeout(displayQ, 0);
  
      if (currentQuestion === (questions.length)) { 
        clearTimeout(cycle);
        var gameEnd = setTimeout( gameOver, 0)
      }
      currentQuestion++;
    };
  

    function gameOver() {

        var totalCorrect = $("<h3>")
        var totalIncorrect = $("<h3>")
        var totalNone = $("<h3>")
        var restart = $("<button>")
        totalCorrect.appendTo($("#content"))
        totalCorrect.html("You got " + correct + " correct!")
        totalIncorrect.appendTo("#content")
        totalIncorrect.html("You got " + wrong + " wrong.")
        totalNone.appendTo("#content")
      
        if (none >= 1) {
        totalNone.html("You didn't answer " + none + " question.")
        }
        else if (none === 0) {
        totalNone.html("You answered every question!")
        }
      
        restart.addClass("restart")
        restart.text("LEAVE THE UPSIDEDOWN")
        restart.appendTo($("#content"))
  
        $(".restart").on("click", function() {

            location.reload().
            totalCorrect.remove();
            totalIncorrect.remove();
            totalNone.remove();
            restart.remove();
            currentQuestion = 0;
            correct = 0;
            wrong = 0; 
            none = 0;
            displayQ();
        
        })
  
    }
  
})