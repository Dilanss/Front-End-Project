document.querySelector(".control-buttons span").onclick = function () {

    let yourname = prompt("What is your name??");

    if(yourname == null || yourname == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {    
        document.querySelector(".name span").innerHTML = yourname;
    }

    document.querySelector(".control-buttons").remove();

};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

// Create range odf the keys
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange)

// Propertyes of css to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    // Add event click
    block.addEventListener('click', function () {
        // Trigger the flip block funtion
        flipBlock(block);
    });
});

// Fill block Funtion
function flipBlock(selectedBlock) {

    // Add clas 
    selectedBlock.classList.add('is-flipped');

    // Coolect add flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If theres two selectec blocks
    if(allFlippedBlocks.length === 2) {
        // console.log('Two Flipped blocks selected')

        // Stop clicking selected
        stopClicking();

        // Check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Function stopClicking
function stopClicking() {

    // Add clas the no clicking on main container
    blocksContainer.classList.add('no-clicking')

    setTimeout(() => {
        // Remove class no clicking 
        blocksContainer.classList.remove('no-clicking')

    }, duration);
}

// Check maches block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement= document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);
    }
}

function shuffle(array) {
    // Settings Vars
    let current = array.length,
        temp,
        random;
    
    while (current > 0) {
        // Random numbers 
        random = Math.floor(Math.random() * current);

        // Decrease length by one
        current--;

        //[1] Save current element
        temp = array[current];

        // [2] Curremt Element = random elements
        array[current] = array[random];

        // [3] Random Elements = Get Element From Stash
        array[random] = temp;
    }

    return array;
}

// Current array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
// New array [1, 2, 3, 0, 5, 9, 7, 8, 6, 4]
/*
    [1] Save Current Element in Stash
    [2] Current Element = Random Elements
    [3] Random Elements = Get Element From Stash
*/ 
