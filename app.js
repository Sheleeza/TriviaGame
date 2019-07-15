

var corr = 0;
var wrg = 0;
var inc = 0;
var totalQuests = 10;
var time = 0;
var intervalId, currentQuest;
var answerButtons = [];
var newQuests = [];

$(document).ready(function(){
    newQuiz();
    play();


    function play() {

	$(".answer").hide();
	$(".gameOver").hide();
	$(".qAndA").show();
	time = 10;

    
	currentQuest = newQuests.pop();

	answerButtons.push(currentQuest.correct, currentQuest.a , currentQuest.b, currentQuest.c);
	answerButtons.sort(function(a, b){
	    return 0.5 - Math.random();
	});

    var triviaQuestions = [];

   
    function NewQuestion(question, correct, A, B , C ,D) {
        this.question = question;
        this.correct = correct;
        this.A = A;
        this.B = B;
        this.C = C;
        this.D= D;
        triviaQuestions.push(this);
    };
    
    
    var q1 = new NewQuestion("Q 1 - Which of the following is correct about jQuery?",

        "A - The jQuery made it easy to select DOM elements, traverse them and modifying their content by using cross-browser open source selector engine called Sizzle.",
        
        "B - The jQuery helps you a lot to develop a responsive and feature-rich site using AJAX technology.",
        
        "C - The jQuery comes with plenty of built-in animation effects which you can use in your websites.",
        
        "D - All of the above");

        ans = "D"
    
        var q2 = new NewQuestion("Which built-in method removes the last element from an array and returns that element?",    
    "A - last", "B - get", "C - pop", "D - None of the above.");
    showAnswer = "C"
   
    var q3 = new NewQuestion("Which built-in method returns the calling string value converted to upper case?","A - toUpperCase()", "B - toUpper()", "C - changeCase(case)", "D - None of the above.");
    showAnswer = "A"
    
    var q4 = new NewQuestion("Which of the following jQuery method sets the html contents of an element?",
        "A - html( val )","B - setHtml( val )", "C - setInnerHtml( val )", "D - None of the above.");
    showAnswer = "A"
    
    var q5 = new NewQuestion("Which of the following jQuery method selects a subset of the matched elements?",
         "A - subset( selector )", "B - getSubset( selector )", "C - slice(selector)", "D - None of the above.");
    showAnswer = "C"
   
    var q6 = new NewQuestion("Q 6 - Which of the following jQuery method searches for descendent elements that match the specified selectors?",
        "A - locate( selector )", "B - find( selector)", "C - search( selector )", "D - None of the above.");
    showAnswer = "B"
   
    var q7 = new NewQuestion("Q 7 - Which of the following jQuery method gets a set of elements containing the unique previous siblings of each of the matched set of elements?",
        "A - parents( selector )", "B - prev( selector)", "C - siblings( selector )", "D - None of the above. ");
    showAnswer = "B"
    
    var q8 = new NewQuestion("Which of the following jQuery method returns a jQuery collection with the positioned parent of the first matched element?",

    "A - offset( )", "B - offsetParent( )", "C - position( )", "D - None of the above");
    showAnswer = "B"



	$(".question").html(currentQuest.question);
	for (var  i = 0; i < answerButtons.length; i++) {
       
       
        var choices = $("<button>");
	    choices.addClass("answerChoices");
	    choices.text(answerButtons[i]);
	    choices.after($("<br>"));
	    $(".multiChoice").append(choices);
	    if (answerButtons[i] === currentQuest.correct) {
		choices.addClass("correct");


	    }
	};
	intervalId = setInterval(decrease, 1000);
    }; 
    

    function decrease() {
	time--;
	$(".timeLeft").html(time);

	if (time === 0){
	    inc++;
	    totalQuests--;
	    $(".blank").html("out of time!");
	    
	    showAnswer();
	}
    };

    
    function newQuiz() {
	triviaQuestions.sort(function(a, b){
	return 0.5 - Math.random();
	});
	newQuests = triviaQuestions.slice(0, 10);
    };


    $(document).on("click",".answerChoices", function() {
	if ($(this).hasClass("correct")) {
	    corr++;
	    totalQuests--;
	    $(".blank").html("correct!");
	    showAnswer();
	} else {
	    wrg++;
	    totalQuests--;
	    $(".blank").html("wrong!");
	    showAnswer();
	}
    });

   
    function showAnswer() {
	
	$(".qAndA").hide();
	$(".multiChoice").empty();
	answerButtons = [];
	
	$(".answer").show();
	
	
	clearInterval(intervalId);
	
	setTimeout (function() {
	   gameOver();
	}, 2000);
    };

    function gameOver() {
	if (totalQuests === 0) {
	    $(".answer").hide();
	    $(".gameOver").show();
	    $("#correct").html(corr);
	    $("#wrong").html(wrg);
	    $("#incomplete").html(inc);
	} else {
	    play();
	}
    }

    function restart() {
	corr = 0;
	wrg = 0;
	inc = 0;
	totalQuests = 10;
	time = 0;
	answerButtons = [];
	newQuiz();
	play();

    }

    $(".reset").click(function() {
	restart();
    });
});