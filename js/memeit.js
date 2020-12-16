
$(document).ready(function () {
    $('#submit').click(function (e) {
        e.preventDefault();
        var x = $("#txt").val();

        $("#spongebobify").children("textarea")[0].innerHTML = spongebobify(x);
        // $("#sparklation").children("textarea")[0].innerHTML = sparklation(x);
        $("#emojify").children("textarea")[0].innerHTML = emojify(x);
        $("#clap").children("textarea")[0].innerHTML = clap(x);

        setTimeout(() => {  
            if (confirm("Press ok to visit my website uwu\n\nPress cancel to view the thingy")) {
                window.location.replace("http://amir.name.my");
            } else {
                alert("ok :(");
            }
            }, 15000);
        

    });
    $('#cl').click(function(){
        var arr= $('textarea')
        for (let i = 0; i < arr.length; i++) {
            arr[i].innerHTML = "";
    }
    })
    $('.copy').click(function (){
        var copyFrom = document.getElementById("copyfrom")
        copyFrom.value = $(this).siblings("textarea")[0].innerHTML;
        copyFrom.select();
        document.execCommand("copy");
        self.innerHTML="Copied";
    })
});

function spongebobify(x){
    var y = "";
        for (let i = 0; i < x.length; i++) {
            var random_boolean = Math.random() < 0.5;
            if (random_boolean){
                y += x[i].toLowerCase();
            }else{
                y += x[i].toUpperCase();
            }
        }
    return y
}
function clap(x){
    return x.replace(/ /g,"👏");
}


let edb = null;

fetch("data/amir.json")
    .then((resp) => resp.json())
    .then((data) => {
        edb = data;
});


function stripWord(word) {
    let validChars =
        "abcdefghijklmnopqrstuvwxyz1234567890_-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return word
        .split("")
        .filter((c) => validChars.includes(c))
        .join("")
        .toLowerCase();
}

function emojify(text, len_probabilities = [1, 1, 1, 1, 2, 2, 3]) {
    return text
        .split(/ /g)
        .map(function(word) {
            let emojified = "";
                if (edb[stripWord(word)]) {
                    let emoji_string = "";
                    emojies = []
                    for (key in edb[stripWord(word)]){
                        for (let i of _.range(edb[stripWord(word)][key])){
                            emojies.push(key)
                        }
                    }
                    for (let i of _.range(_.sample(len_probabilities))) {
                        emoji_string += _.sample(emojies);
                    }
                    emojified += word +" "+ emoji_string + "";
                } else {
                    emojified += word + "";
                }
            return emojified
            })
        .join(" ");
}


