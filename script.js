/* Creating cell data of random number 1 to 100 
                &&
    Shuffling the array */


    function createCellData() {
        let cellData = [];
        for(let k = 0; k < 100; k++){
            cellData.push(k+1);
        }
        cellData = cellData.sort((a,b) => Math.random() - 0.5);
        return cellData;
    }


/*
    It will create 10/10 table
*/

function createTable(){
    let tbody = document.createElement('tbody');
    let temp = 0;
    const cellData = createCellData();
    for(let i = 0; i < 10; i++){
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        for(let j = 0; j < 10; j++){
            let td = document.createElement('td');
            // td.innerText = cellData[temp++];
            td.setAttribute("id",cellData[temp]);
            td.style.backgroundColor = `rgb(${170 + (Math.random() * 50)}, ${170 + (Math.random() * 50)}, ${170 + (Math.random() * 50)})`;
            temp+=1;
            td.addEventListener("click", checkMultiple);
            tr.appendChild(td);
        }
    }
    let table = document.getElementById("myTable");
    table.appendChild(tbody);
}
createTable();



/* 
    Click Event triggered __ checkMultiple function __ 
*/

function checkMultiple(event) {
    let num = +event.target.id;
    let score = +document.getElementById("score").innerText;
    let mine = [2,3,5,7];

    playMusic(num);

    

    // __ Looser Logic __

    if (mine.includes(num)) {
        // document.getElementById(num).style.backgroundImage = `url('images/bomb.png')`;
        for(let j = 1; j <= 100; j++){
            document.getElementById(j).style.backgroundImage = `url('images/bomb.png')`;
        }
        
        setTimeout(() => {
            window.location.href = `index.html`;
        }, 4000);
        return;
    }

      // __Game logic, when to increase score__

    if (!mine.includes(num) && !document.getElementById(num).style.backgroundImage){
        document.getElementById("score").innerText = score+=1;
    }
    

    // __Game logic, converting multiples to Gold__

    for(let i = 1; i <= 100; i++){
        if(i % num == 0 && !document.getElementById(i).style.backgroundImage){
            document.getElementById(i).style.backgroundImage = `url('images/gold.png')`;
            // document.getElementById(i).setAttribute("class","gold");
        }
    }

    // __winner Logic __

    if (num == 1) {
        
        let Tname = document.getElementById("player").innerText;
        let score = document.getElementById("score").innerText;
        const nameScore = [score, [Tname]];
        
        if (localStorage.getItem('winners') == null) {
            localStorage.setItem('winners', "[[],[],[]]");
        }
        
        let oldData = JSON.parse(localStorage.getItem('winners'));
        // console.log(oldData);

        for (let i = 0; i < 3; i++) {
            if (oldData[i] == '') {
                oldData[i] = nameScore;
                break;
            } else {
                if (oldData[i][0] == score) {
                    oldData[i][1].push(Tname);
                    break;
                }
                if (oldData[i][0] > score) {

                    if(i == 0){
                        oldData[2] = oldData[1];
                        oldData[1] = oldData[0];
                        oldData[0] = nameScore;
                    }
                    else if(i == 1){
                        oldData[2] = oldData[1];
                        oldData[1] = nameScore;
                    }
                    else {
                        oldData[2] = nameScore;
                    }
                    break;

                }
            }
        }
        if(oldData[1] != ''){
            oldData.sort((a,b) => a[0] - b[0]);
        }
        
        localStorage.setItem('winners', JSON.stringify(oldData));
        window.open('leaderboard.html','leaderboard','width=1300,height = 1100');

        setTimeout(() => {
            window.location.href = `index.html`;
        }, 3000);
        
    }
}

function playMusic(num){
    let mines = [2,3,5,7];
    if(num == 1){
        triggerAudio('audio/crowdCheers.mp3');
    }
    else if(mines.includes(num)){
        triggerAudio('audio/Explosion.mp3');
    }
    else if(document.getElementById(num).style.backgroundImage){
        triggerAudio('audio/hit.mp3');
    }
    else{
        triggerAudio('audio/bell.mp3')
    }
}


function triggerAudio(filename){
    let clickAudio = new Audio(filename);
    clickAudio.play();
}