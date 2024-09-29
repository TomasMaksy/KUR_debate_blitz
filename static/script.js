let currentTopicIndex = 0;

const topics = [
    {
        title: "Runda Pierwsza",
        questions: [
            "Jaki jest skład narodowościowy mieszkańców rejonu solecznickiego – w procentach?",
            "Czy decyzja o wycięciu dużego fragmentu Puszczy Rudnickiej na potrzeby budowy tam infrastruktury wojskowej jest słuszna?",
            "Jakie jest największe niedociągnięcie Litwy w relacjach z Polską?",
            "Czy Józef Piłsudski był wrogiem Litwy?",
            "Czy przesunięcie kilku ministerstw z Wilna do Kowna byłoby słuszną decyzją?"
        ]
    },
    {
        title: "Runda Druga",
        questions: [
            "Czy Polska jest według Pana/Pani bardziej mostem czy murem?",
            "Jakie trzy rzeczy kojarzą się Panu/Pani z Polską?",
            "Czy Pana/Pani zdaniem jest coś i jeśli tak, to co wyróżnia Polaków spośród innych narodów europejskich?",
            "Gdyby miał Pan/Pani opisać Polskę w jednym słowie, jakie by to było i dlaczego te?",
            "Co najbardziej Pana/Panią zaskoczyło podczas pierwszej wizyty w Polsce?"
        ]
    },
    {
        title: "Runda Trzecia",
        questions: [
            "W Wilnie powinien stanąć pomnik Smetony czy raczej - Jagiełły?",
            "Gdyby miał/miała Pan/Pani możliwość dodania nowego święta do kalendarza, jakie by było to święto i jak by je Pan/Pani celebrowała?",
            "Gdyby mógł/mogła Pan/Pani zmienić jeden absurdalny przepis, jakiego nikt nie rozumie, co by to było?",
            "Jakie słowo lub fraza z polityki jest Pana/Pani zdaniem najbardziej nadużywane?",
            "Gdyby od Pana/Pani zależała pierwsza decyzja nowego Sejmu, jaka by to była decyzja i dlaczego akurat ta?"
        ]
    },
    {
        title: "Runda Czwarta",
        questions: [
            "Co uważa Pan/Pani za swoje największe życiowe osiągnięcie?",
            "Kiedy ma Pan/Pani wolne 5 minut w pracy, co Pan/Pani robi?",
            "Jaki jest Pana/Pani sposób na stres?",
            "Jaką radę dałby/dałaby Pan/Pani swojemu młodszemu „ja” sprzed 10 lat?",
            "Gdyby musiał/musiała Pan/Pani zaprosić jedną postać spoza Litwy na debatę polityczną, kogo by Pan/Pani wybrał/a i dlaczego?"
        ]
    },
    {
        title: "Runda Piąta",
        questions: [
            "Czy dysponuje Pan/Pani nieruchomością za granicą?",
            "Czy Pan/Pani uprawia sport? Jaki?",
            "Jaką postać historyczną chciałby/chciałaby Pan/Pani zabrać na kawę i o czym byście rozmawiali?",
            "Gdyby mógł/mogła Pan/Pani zamienić się miejscami z dowolną znaną postacią (polityka, film, teatr, życie społeczne) na jeden dzień, kogo by Pan/Pani wybrał/a i dlaczego?",
            "Jaką umiejętność chciałby/chciałaby Pan/Pani opanować, gdyby polityka dała Panu/Pani więcej wolnego czasu?"
        ]
    }
];

// Show the first question on initial load
function showQuestion() {
    const questionContainer = document.getElementById("question");
    const topicTitle = document.getElementById("topic-title");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    topicTitle.textContent = topics[currentTopicIndex].title;

    // Show "Question" instead of the actual question initially
    questionContainer.innerHTML = `<div style="font-weight: bold; text-align: center;">Losowanie pytania</div>`;


    // Enable/disable buttons based on the current topic index
    nextButton.disabled = currentTopicIndex === topics.length - 1; // Disable next button on last topic
    prevButton.disabled = currentTopicIndex === 0; // Disable prev button on first topic
}


function nextTopic() {
    if (currentTopicIndex < topics.length - 1) {
        currentTopicIndex++;
        usedQuestions.length = 0;
        showQuestion();
    }
}

function previousTopic() {
    if (currentTopicIndex > 0) {
        currentTopicIndex--;
        usedQuestions.length = 0;
        showQuestion();
    }
}

const usedQuestions = []; // Array to keep track of used questions

function drawQuestion() {
    const questionContainer = document.getElementById("question");
    const questions = topics[currentTopicIndex].questions;

    // Play the rolling sound
    const sound = new Audio('static/images/roll_sound.mp3');
    sound.play();

    // Check if all questions have been used
    if (usedQuestions.length === questions.length) {
        questionContainer.innerHTML = `<div style="font-weight: bold; text-align: center;">Koniec rundy.</div>`;
        return;
    }

    // Clear the container and display only the rolling message initially
    questionContainer.innerHTML = `
        <div class="question-number">Pytanie 0</div>
        <div class="question-text" style="opacity: 0;"></div>
    `;

    // Function to display random questions rapidly
    let rollCount = 28; // Number of questions to roll through
    let currentRollIndex = 0;

    const rollingInterval = setInterval(() => {
        // Randomly select a question index
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * questions.length);
        } while (usedQuestions.includes(randomIndex)); // Ensure the question hasn't been used

        // Get the question number (1-based index)
        const questionNumber = randomIndex + 1; // Add 1 to convert from 0-based index to 1-based

        // Update the number being displayed
        questionContainer.querySelector(".question-number").textContent = `Pytanie ${questionNumber}`;

        currentRollIndex++;

        // Stop rolling after a set number of rolls
        if (currentRollIndex >= rollCount) {
            clearInterval(rollingInterval);
            // Now select the final question
            let finalIndex;
            do {
                finalIndex = Math.floor(Math.random() * questions.length);
            } while (usedQuestions.includes(finalIndex)); // Ensure the final question hasn't been used

            usedQuestions.push(finalIndex); // Mark the final question as used

            // Get the final question text
            const questionTextDiv = questionContainer.querySelector(".question-text");
            questionTextDiv.textContent = questions[finalIndex];

            // Fade in effect for the question text only
            let opacity = 0;
            const fadeInInterval = setInterval(() => {
                if (opacity < 1) {
                    opacity += 0.05; // Increase opacity
                    questionTextDiv.style.opacity = opacity; // Set new opacity
                } else {
                    clearInterval(fadeInInterval); // Stop the interval when fully visible
                }
            }, 50); // Adjust timing as needed
        }
    }, 50); // Change question every 50ms
}




// Event listeners for buttons
document.getElementById("next-button").addEventListener("click", nextTopic);
document.getElementById("prev-button").addEventListener("click", previousTopic);
document.getElementById("draw-button").addEventListener("click", drawQuestion);

// Initial setup
showQuestion();
