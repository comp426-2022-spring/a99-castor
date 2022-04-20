function simple()
{
    alert("simple");   
    window.text = "Control";
}

function simpleone(){
    var textMultiple = {
         text1:"text1",
         text2:"text2"
     };
    return textMultiple;
 }

export {simple,simpleone};