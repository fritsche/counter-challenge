function count() {
    const url = 'https://counterchallenge.herokuapp.com/'
    fetch(url)
        .then(response => {
            let contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json) {
                    let span = document.getElementById('count-span')
                    span.innerText = json.counter.value
                });
            } else {
                console.log("Oops, we haven't got JSON!");
            }
        })
}

const button = document.getElementById('count-button')
button.addEventListener("click", count)

count()