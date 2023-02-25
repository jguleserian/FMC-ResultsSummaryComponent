/*-----Set Test Data, Category Names, and Avg. Score Upon Load-----*/
$(() => {
    const data = `[
  {
    "category": "Reaction",
    "score": 80,
  "icon": "./assets/images/icon-reaction.svg"
},
{
  "category": "Memory",
  "score": 92,
  "icon": "./assets/images/icon-memory.svg"
},
{
  "category": "Verbal",
  "score": 61,
  "icon": "./assets/images/icon-verbal.svg"
},
{
  "category": "Visual",
  "score": 72,
  "icon": "./assets/images/icon-visual.svg"
}
]
`;
    const testData = JSON.parse(data);
    $(".reIcon").attr("src", testData[0].icon);
    $(".meIcon").attr("src", testData[1].icon);
    $(".veIcon").attr("src", testData[2].icon);
    $(".viIcon").attr("src", testData[3].icon);
    $("p.reaction").text(testData[0].category);
    $("p.memory").text(testData[1].category);
    $("p.verbal").text(testData[2].category);
    $("p.visual").text(testData[3].category);
    $(".reac").text(testData[0].score);
    $(".memo").text(testData[1].score);
    $(".verb").text(testData[2].score);
    $(".visu").text(testData[3].score);

    /*-Creat a Click Event Listener-*/
    /*-NOTE: Inside the listener: Fade original score, show animation, generate new scores/average, populate fields with numbers and feedback-*/

    $("button").click((e) => {
        e.preventDefault();
        runEffect("#animation");
        displayResults(testData);

        /*-Display Animation Effect-*/
        function runEffect(id) {
            $(".group")
                .fadeOut(1)
                .delay(100);
            $(id)
                .fadeIn(100)
                .animate({ rotate: "360deg" }, 1000, "linear")
                .fadeOut(100)
                .animate({ rotate: "0deg" }, 100, "linear");
            $(".group")
                .delay(1000)
                .fadeIn("slow");
        };

        /*---Generate Random Test Scores---*/
        /*-Store randomly-generated test scores in an array, find the tests' sum and avg.-*/
        function displayResults(testData) {
            const newScores = [];
            let total = 0;
            for (let i = 0; i < testData.length; i++) {
                nextScore = Math.round(Math.random() * 100);

                /*-since scores below 50 are unrealistic, add 50 to low scores to make them simulate reality-*/
                if (nextScore < 50) {
                    nextScore += 50;
                }
                testData[i].score = nextScore;
                newScores.push(nextScore);
            }

            /*-find the sum and average of the members of the array-*/
            for (let i = 0; i < newScores.length; i++) {
                total += newScores[i];
            }
            let average = Math.round(total / newScores.length);

            /*-Supply feedback text to the user in 3 areas-*/
            /*-titular summary-*/
            if (average > 75) {
                $("h3").text("Great")
            } else if (average > 65) {
                $("h3").text("Good")
            } else { $("h3").text("Poor") };

            /*-comparison to other text-takers-*/
            let fillAmt = Math.round(average * .86);
            $(".fill").text(fillAmt);

            /*-populate the average and the individual test batteries by category-*/
            $("p.total").text(average);
            $(".reac").text(testData[0].score);
            $(".memo").text(testData[1].score);
            $(".verb").text(testData[2].score);
            $(".visu").text(testData[3].score);
        };
    });

});