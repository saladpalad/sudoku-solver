const sudokuBoard = document.querySelector('#sudoku')
const solveButton = document.querySelector('#solve')
const feedback = document.querySelector('#solution')

const squares = 81
let submissionArray = []

for(let i = 0; i < squares; i++){
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)

    const currBoxStartCol = Math.floor( (i % 9) / 3) * 3;
    const currBoxStartRow = Math.floor(Math.floor(i / 9) / 3) * 3;
    
    const currBoxNumber = (currBoxStartCol / 3) + currBoxStartRow;
     
    if (currBoxNumber % 2 == 0) {
         inputElement.classList.add('in-even-box');
    }

    sudokuBoard.appendChild(inputElement)
}

function joinValues(){
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if(input.value){
            submissionArray.push(input.value)
        } else {
            submissionArray.push('.')
        }
    })
    console.log(submissionArray)
}

function solutionDisplay(isSolvable, solution){
    const inputs = document.querySelectorAll('input')
    if(isSolvable && solution){
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
    } else {
        feedback.innerHTML = 'Unsolvable puzzle :('
    }
}

function solve(){
    joinValues()
    const data = {numbers: submissionArray.join('')}
    console.log('data', data)

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }) .then(response => response.json())
    .then(data => {
        console.log(data)
        solutionDisplay(data.solvable, data.solution)
        submissionArray = []
    })
    .catch((error) => {
        console.error('Error: ', error)
    })
}



solveButton.addEventListener('click', solve)