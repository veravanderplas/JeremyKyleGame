$(document).ready(function () {
    var score = 0;
    //Hides all elements at start of game
    $("p,img, button.restart, #postScore, #name").hide();


    //shows first Q after button is clicked
    $(".getStarted").on('click', () => {
        $(".getStarted").hide();
        $(".intro").show();
        $(".one").show();
        $(".opendoor, .nothome, .daftcunt").show();
        $("#score").html(score);
        $("#score").show();
    });

//correct answer Q1
    $(".opendoor").on('click', () => {
        $(".answer").hide();
        $(".two").show();
        $(".givehamster, .ransome, .alreadydead").show();
        updateScore();
    });

    //correct answer Q2
    $(".ransome").on('click', () => {
        $(".answer").hide();
        $(".three").show();
        $(".shove, .giveup, .pickup ").show();
        updateScore();
    });

    //correct answer Q3
    $(".pickup").on('click', () => {
        $(".answer").hide();
        $(".four").show();
        $(".cry, .beg, .hurl ").show();
        updateScore()
    });

    // wrong answers
    $("p.wrong").on('click', () => {
        wrongAnswer()
    });


//this function restarts the game
    function wrongAnswer() {
        $(".intro, .question, .answer").hide();
        $('button.restart, #name, #postScore, img').show();
        $('button.restart').on('click', () => {
            $("p, img, button.restart,#name, #postScore").hide();
            $('.getStarted').show();
            score = 0;
        })
    }

// Posting scores to database
    $('#postScore').on('click', () => {
        const data = {
            name: $('#name').val(),
            score: $('#score').text(),
        };
        var self = $(this);
        if (!self.data('add')) {
            self.data('add', true);
            self.text('Saved!');
            setTimeout(function () {
                self.text('Save').data('add', false);
            }, 1000);

            $('#name').val(" ");

            $.ajax({
                url: 'http://localhost:3000/newScores',
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    console.log('Saved to database');
                }

            })
        }
    });

    $('#postScore').click(function () {
        var self = $(this);
        if (!self.data('add')) {
            self.data('add', true);
            self.text('Saved!');
            setTimeout(function () {
                self.text('Save').data('add', false);
            }, 1000);
        }
    });

    $('.restart').click(function () {
        location.reload(true);
    });

    // keeps the score
    function updateScore() {
        score++;
        $("#score").html(score);
        $("#score").show();
    }

    $.get('http://localhost:3000/scoreboard', function (result) {
        $('#firstPlaceName.firstplace').html(JSON.parse(result)[0].name);
        $('#secondPlaceName.secondplace').html(JSON.parse(result)[1].name);
        $('#thirdPlaceName.thirdplace').html(JSON.parse(result)[2].name);
        $('#firstPlaceScore.firstplace').html(JSON.parse(result)[0].score);
        $('#secondPlaceScore.secondplace').html(JSON.parse(result)[1].score);
        $('#thirdPlaceScore.thirdplace').html(JSON.parse(result)[2].score);
    });

});
