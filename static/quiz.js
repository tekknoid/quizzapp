async function updateQuiz(req, res) {
    
    // Get data
    const url = '/quiz';
    const response = await fetch(url);
    const data = await response.json();

    let htmlString = "";

    htmlString += "<form action='/home' method='post' action='http://localhost:3000/check' id='form' class='mx-auto' style='width: 200px'>"+data['question'];
    htmlString += "<br><br><button type='submit' class='btn btn-warning'> Submit </button>"
    htmlString += "<br><br>"
    for (index in data['answers']) {
        htmlString += "<div> <input type='radio' multiple id="+data['id']+" name ='answer' value="+(index)+" checked>  "+
        "<label for='javascript'>"+ data['answers'][index]+"  </label></div>";
        
        
    }

    htmlString+="<p><br>"
    htmlString+="<br><input id="+data['id'] +" name ='correct-answer'  type='hidden' value="+data['correct']+"></p>"
    htmlString +="</form>"
    document.getElementById('container').innerHTML = htmlString;
    document.getElementById("form").addEventListener('submit',submitAnswer);

}


async function submitAnswer(event) {
    var formData = new FormData(document.querySelector("form"));
    var htmlString ='';
    htmlString+='<p>'+'correct answer:  '+formData.get('answer')+'</p>';
    htmlString+='<p>'+'your answer:  '+formData.get('correct-answer')+'</p>';

    
    if (formData.get('correct-answer') === formData.get('answer') ) 
    {
    document.getElementById('container').innerHTML = htmlString+'CORRECT ANSWER'; 
    }
    else {
    document.getElementById('container').innerHTML = htmlString+'WRONG ANSWER';
    }
    return true;
    }
        

