let drafts = [];

function countCharacters() {

    let text = document.getElementById("text").value;

    let count = text.length;

    document.getElementById("count").innerHTML = count;

    let limit = parseInt(document.getElementById("platform").value);

    document.getElementById("limit").innerHTML = limit;

    let message = document.getElementById("message");

    if (count > limit) {

        message.innerHTML = "Character limit exceeded!";
        message.style.color = "red";

    }
    else {

        message.innerHTML = "Within character limit";
        message.style.color = "green";

    }

}

function changeLimit() {

    countCharacters();

}

function saveDraft() {

    let post = document.getElementById("text").value.trim();

    if (post == "") {

        alert("Please write something first.");
        return;

    }

    drafts.push(post);

    showDrafts();

}

function showDrafts() {

    let list = document.getElementById("draftList");

    list.innerHTML = "";

    for (let i = 0; i < drafts.length; i++) {

        list.innerHTML += "<li>" + drafts[i] + "</li>";

    }

}

function submitPost() {

    let post = document.getElementById("text").value.trim();

    if (post == "") {

        alert("Please write something first.");
        return;

    }

    alert("Post Submitted Successfully!");

    document.getElementById("text").value = "";

    document.getElementById("count").innerHTML = "0";

    document.getElementById("message").innerHTML = "";

}