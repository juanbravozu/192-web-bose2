var songs = [],
    fft,
    songIndex,
    tone,
    reverb;

function preload() {
    songs.push(loadSound('/sounds/mantis.mp3'));
    songs.push(loadSound('/sounds/bangarang.mp3'));
    songs.push(loadSound('/sounds/bohemian.mp3'));
}

function toggleSong() {
    if (songs[songIndex].isPlaying()) {
        songs[songIndex].pause();
    } else {
        songs[songIndex].play();
    }
}

function selectSong(index) {

    if (index === songIndex && songs[index].isPlaying()) {
        toggleSong();
    } else {
        songs.forEach((song) => {
            song.pause();
        });
        songs[index].play();
        songIndex = index;
    }

}

function displaySpectrum(spectrum) {
    spectrum.forEach((value, index) => {
        if (index % 2 == 0) {
            if (index < 128) {
                for (var j = 0; j < map(value, 0, 255, 0, (width / 2) - 100); j++) {
                    stroke(tone + (index * 8), 80, 80);
                    point(width / 2 + j, index * 4);
                }
            } else {
                for (var j = 0; j < map(value, 0, 255, 0, (width / 2) - 100); j++) {
                    stroke(tone + (index * 8), 80, 80);
                    point(width / 2 - j, (index - 128) * 4);
                }
            }

        }

        tone += 3;
    });
}

function getReverb() {
    songs[songIndex].disconnect();

    reverb.process(songs[songIndex]);

    songs[songIndex].play();
}

function setup() {
    colorMode(HSB, 360, 100, 100); // set colour mode of sketch to HSB (360 degress, 100%, 100%)
    angleMode(DEGREES);
    rectMode(CENTER);
    strokeWeight(4);
    createCanvas(window.innerWidth, window.innerHeight - 66);
    fill(0);
    fft = new p5.FFT(0.8, 256);
    reverb = new p5.Reverb();
    songIndex = undefined;

    tone = 0;
}

function draw() {
    background(25);
    fill(0);

    var spectrum = fft.analyze();
    displaySpectrum(spectrum);
    noStroke();
    rect(width / 2, height - 75, width, 151);

    for (var i = 0; i < 3; i++) {
        if (songIndex != i) {
            fill(255);
        } else {
            fill(70);
        }
        rect((width * (i + 1)) / 4, height - 75, 200, 75);
    }

    fill(200);
    rect(width/8, height-75, 60, 60);
    fill(0);
    textAlign(CENTER);
    text('Reverb', width/8, height.-70);
    textSize(20);
    textStyle(BOLD);
    text('Orquesta', width / 4, height - 70);
    text('Electrónica', width / 2, height - 70);
    text('Rock', (width * 3) / 4, height - 70);
}

function mouseClicked() {
    if (mouseX < width / 4 + 100 && mouseX > width / 4 - 100
        && mouseY < height - 37 && mouseY > height - 112) {
        selectSong(0);
    }

    if (mouseX < width / 2 + 100 && mouseX > width / 2 - 100
        && mouseY < height - 37 && mouseY > height - 112) {
        selectSong(1);
        console.log('select');
    }

    if (mouseX < (width * 3) / 4 + 100 && mouseX > (width * 3) / 4 - 100
        && mouseY < height - 37 && mouseY > height - 112) {
        selectSong(2);
    }
}
