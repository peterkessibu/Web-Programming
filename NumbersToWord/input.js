function isNumberKey(evt) {
    const charCode = evt.which || evt.keyCode;
    return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
}

function numToWord(inputNumber, outputNumber) {
    const str = String(inputNumber);
    const rev = str.split("").reverse();
    const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const twos = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const numLength = rev.length;
    let word = [];
    let j = 0;
    
    for (let i = 0; i < numLength; i++) {
        switch (i) {
            case 0:
                word[j] = (rev[i] == 0 || rev[i + 1] == 1) ? "" : ones[rev[i]];
                break;
            case 1:
                aboveTens(i, rev, word);
                break;
            case 2:
                if (rev[i] != 0) {
                    // Check if there are any non-zero digits in the last two positions
                    const isNonZeroInLastTwo = rev[i - 1] != 0 || rev[i - 2] != 0;
                    word[j] = isNonZeroInLastTwo ? ones[rev[i]] + " Hundred and " : ones[rev[i]] + " Hundred";
                } else {
                    word[j] = "";
                }
                break;
        }
        j++;
    }

    function aboveTens(i, rev, word) {
        if (rev[i] == 0) {
            word[j] = "";
        } else if (rev[i] == 1) {
            word[j] = twos[rev[i - 1]];
        } else {
            word[j] = tens[rev[i] - 2];
        }
    }
    
    word = word.reverse().filter(Boolean);
    let finalOutput = word.join(" ");

    // Remove trailing 'and' if the final output ends with "Hundred and"
    if (finalOutput.endsWith(" Hundred and")) {
        finalOutput = finalOutput.slice(0, -4);
    }

    document.getElementById(outputNumber).innerText = finalOutput;
}
