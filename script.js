async function getData(word) {
    try {
        const main = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`, {
            method: "GET"
        });
        const data = await main.json();
        const container = document.getElementById('container');
        let ele = data[0];
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('contentOne');
        mainDiv.innerHTML =
            `
            <div class="mainDiv">
            <p>Searched word : ${ele.word}</p>
            <p>Text : ${ele.phonetics[0].text}</p>
            <audio src="${ele.phonetics[0].audio}" controls></audio>
            </div>
            `;
        container.append(mainDiv);
        const el = data[0].meanings;
        el.forEach((elem) => {
            let anotherDiv = document.createElement('div');
            anotherDiv.classList.add('contentTwo');
            anotherDiv.innerHTML =
                `
                <div class="secDiv">
                <p>Part of Speech : ${elem.partOfSpeech}</p>
                <p>Definition : ${elem.definitions[0].definition}</p>
                <p>Example : ${elem.definitions[0].example}</p>
                </div>
                `;
            container.append(anotherDiv);
        });
    } catch (err) {
        console.log(err);
        maindiv.innerText = err;
    }
}

function search() {
    const word1 = document.getElementById('word').value;
    getData(word1);
    container.innerHTML = "";
}