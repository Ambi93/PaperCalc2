function addPaperType() {
    var papersDiv = document.getElementById('papers');
    var paperTypeDiv = document.createElement('div');
    paperTypeDiv.className = 'paper-type';

    var paperTypeHTML = `
        <label>Paper Type:</label>
        <select class="paper-type-select" onchange="setPaperDimensions(this)">
            <option value="custom">Custom</option>
            <option value="roll">Roll</option>
            <option value="ream">Standard Ream (A4)</option>
            <option value="single">Single Sheet (A4)</option>
        </select>
        <label>Brand Name:</label>
        <input type="text" class="brand-name">
        <label>Line:</label>
        <input type="text" class="line-name">
        <label>GSM:</label>
        <input type="number" class="gsm">
        <label>Width (mm):</label>
        <input type="number" class="width">
        <label>Length (mm):</label>
        <input type="number" class="length">
        <label>Cost ($):</label>
        <input type="number" class="cost">
    `;

    paperTypeDiv.innerHTML = paperTypeHTML;
    papersDiv.appendChild(paperTypeDiv);
}

function setPaperDimensions(selectElement) {
    var paperType = selectElement.value;
    var paperTypeDiv = selectElement.parentElement;
    var widthInput = paperTypeDiv.querySelector('.width');
    var lengthInput = paperTypeDiv.querySelector('.length');

    switch (paperType) {
        case 'roll':
            // Example default dimensions for roll
            widthInput.value = 1000;
            lengthInput.value = 2000;
            break;
        case 'ream':
            // A4 dimensions for standard ream
            widthInput.value = 210;
            lengthInput.value = 297;
            break;
        case 'single':
            // A4 dimensions for single sheet
            widthInput.value = 210;
            lengthInput.value = 297;
            break;
        default:
            widthInput.value = "";
            lengthInput.value = "";
    }
}

function calculate() {
    var paperTypeDivs = document.getElementsByClassName('paper-type');
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h3>Results:</h3>';

    for (var i = 0; i < paperTypeDivs.length; i++) {
        var paperTypeDiv = paperTypeDivs[i];
        var brandName = paperTypeDiv.querySelector('.brand-name').value;
        var lineName = paperTypeDiv.querySelector('.line-name').value;
        var gsm = paperTypeDiv.querySelector('.gsm').value;
        var width = paperTypeDiv.querySelector('.width').value / 1000;
        var length = paperTypeDiv.querySelector('.length').value / 1000;
        var cost = paperTypeDiv.querySelector('.cost').value;

        var area = width * length;
        var costPerM2 = (cost / area).toFixed(2);

        resultDiv.innerHTML += `<p>${brandName} - ${lineName} (${gsm} GSM): $${costPerM2} per m²</p>`;
    }
}