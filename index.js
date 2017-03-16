(function(){

	// Put functions namespace for convenience
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$players = $(".players");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartOverlay = $(".restart-modal");
			this.$cancelRestartOverlay = $("span.cancel-restart");
			this.$restartButton = $("button.restart");
			this.$restartMenuBarButton = $("button.restart-menu-bar");
			// Duplicate the cards so that we have matches
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();	
		},

		// Shuffles the array containing duplicated cards
		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		// Sets up the game
		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.choosePlayer();
			this.binding();
			this.paused = false;
     		this.guess = null;
		},

		// Randomly select either the Red or Blue player to begin the game
		choosePlayer: function(){
			var classes = ["active", ""];
        	$(".players-contain > div").removeClass("active");
			$(".players-contain > div").eq(Math.floor(Math.random()*classes.length)).addClass("active");
		},

		// Bind functions to click event
		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
			this.$restartMenuBarButton.on("click", Memory.showRestartModal);
			this.$cancelRestartOverlay.on("click", Memory.cancelRestartModal);
		},
		
		// Possible outcome when cards are clicked/selected
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("selected")){
				// Add the 'selected' class
				$card.find(".inside").addClass("selected");
				// Get the first guess 
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} 
				// Condition for when the selected cards match, i.e. "data-id"s are the same
				else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("selected")){
					$(".selected").addClass("matched");
					_.guess = null;
					_.score();
				} 
				// Condition for when the selected cards do not match
				else{
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".selected").removeClass("selected");
						_.turn();
						_.paused = false;
					}, 700);
				}
				// Condition for when all matches have been found and the game is complete
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		// Add to score of player who has found a match
		score: function(){
			// Get the player who is active. This is the player who has found the match.
			var playerScore = $(".players.active").find(".score");
			// Assign the player's score to new "number" var
			var number = playerScore.html();
			// Increment by one
    		number++;
    		// Add 1sec delay so that score change syncs with match animation
    		setTimeout(function(){
				playerScore.html(number);
			}, 1000);	
		},

		// Switch player turns
		// We only switch player turns when the player fails to get a match. 
		// If the player get a match on their turn they get to go again until they fail to get a match.
		turn: function(){
			$(".players").toggleClass("active");
		},

		// Determine which player won, give option to play again
		win: function(){
			this.paused = true;
			// Get player scores
			var red = $("#red").find(".score").html();
			var blue = $("#blue").find(".score").html();
			// Determine which player won and display the result
			// Red has a higher score
			if (red > blue){
				$(".winner").html("Red wins");
				$(".winner").addClass("red");
			}
			// Blue has a higher score
			else if (blue > red ){
				$(".winner").html("Blue wins");
				$(".winner").addClass("blue");
			}
			// Tie
			else{
				$(".winner").html("Tie");
			}
			// Slight delay, then display modal
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		// Display the restart modal/popup window (when player does not want to finish game)
		showRestartModal: function(){
			Memory.$game.fadeOut();
			Memory.$players.fadeOut();
			Memory.$restartOverlay.show();
			Memory.$modal.fadeIn("slow");
		},

		// Cancel a game restart and resume game
		cancelRestartModal: function(){
			Memory.$restartOverlay.hide();
			Memory.$modal.fadeOut("slow");
			Memory.$game.fadeIn();
			Memory.$players.fadeIn();
		},

		// Display modal/popup window
		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		// Hide modal/popup window
		hideModal: function(){
			this.$modal.hide();
			this.$overlay.hide();
			this.$restartOverlay.hide();
		},

		// Reset the game
		reset: function(){
			// Hide the modal/pop-up window
			this.hideModal();
			// Shuffle the cards for a new game
			this.shuffleCards(this.cardsArray);
			// Empty the "winner" class so it is ready for new winner
			$(".winner").empty();
			$(".winner").removeClass("red");
			$(".winner").removeClass("blue");
			// Setup game
			this.setup();
			// Opening animation
			this.$game.show("slow");
			this.$players.show("slow");
		},

		// Shuffle the cards
		// (Fisher-Yates Algorithm)
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		// Function that builds html, i.e. construct card front and back and fill them with the emoji
		buildHTML: function(){
			var gameCard = '';
			// Set initial scores at 0
			var score = 0;
			this.$players.find(".score").html(score);
			// Create card elements
			// Add the value of expression to var, then return whole thing
			this.$cards.each(function(k, v){
				gameCard += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><i class="'+ v.emoji +'"></i></div>\
				<div class="back"></div></div>\
				</div>';
			});
			return gameCard;
		}
	};

	// Memory cards, JS var holding JSON
	// (fun fact): All cards feature emoji I enjoy
	var cards = [
		{
			emoji: "em em-alien",
			id: 1,
		},
		{
			emoji: "em em-dragon_face",
			id: 2
		},
		{
			emoji: "em em-imp",
			id: 3
		},
		{
			emoji: "em em-octocat",
			id: 4
		}, 
		{
			emoji: "em em-ramen",
			id: 5
		},
		{
			emoji: "em em-sushi",
			id: 6
		},
		{
			emoji: "em em-japanese_goblin",
			id: 7
		},
		{
			emoji: "em em-astonished",
			id: 8
		},
		{
			emoji: "em em-full_moon_with_face",
			id: 9
		},
		{
			emoji: "em em-triumph",
			id: 10
		},
		{
			emoji: "em em-weary",
			id: 11
		},
		{
			emoji: "em em-tongue",
			id: 12
		},
	];

	Memory.init(cards);

})();