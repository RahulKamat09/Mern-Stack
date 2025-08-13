function calculateCash(){
    let totalCash = 0;
    let totalNotes = 0;

    let n500 = parseInt(document.getElementById("n500").value) ||0;
    document.getElementById("t500").innerText = n500 * 500;
    totalCash += n500 * 500;
    totalNotes += n500;

    
    let n200 = parseInt(document.getElementById("n200").value) ||0;
    document.getElementById("t200").innerText = n200 * 200;
    totalCash += n200 * 200;
    totalNotes += n200;

    
    let n100 = parseInt(document.getElementById("n100").value) ||0;
    document.getElementById("t100").innerText = n100 * 100;
    totalCash += n100 * 100;
    totalNotes += n100;

    
    let n50 = parseInt(document.getElementById("n50").value) ||0;
    document.getElementById("t50").innerText = n50 * 50;
    totalCash += n50 * 50;
    totalNotes += n50;

    
    let n20 = parseInt(document.getElementById("n20").value) || 0;
    document.getElementById("t20").innerText = n20 * 20;
    totalCash += n20 * 20;
    totalNotes += n20;

    
    let n10 = parseInt(document.getElementById("n10").value) || 0;
    document.getElementById("t10").innerText = n10 * 10;
    totalCash += n10 * 10;
    totalNotes += n10;

    
    let n5 = parseInt(document.getElementById("n5").value) || 0;
    document.getElementById("t5").innerText = n5 * 5;
    totalCash += n5 * 5;
    totalNotes += n5;

    
    let n2 = parseInt(document.getElementById("n2").value) || 0;
    document.getElementById("t2").innerText = n2 * 2;
    totalCash += n2 * 2;
    totalNotes += n2;

    
    let n1 = parseInt(document.getElementById("n1").value) || 0;
    document.getElementById("t1").innerText = n1 * 1;
    totalCash += n1 * 1;
    totalNotes += n1;

    document.getElementById("totalCash").innerText = "Total Cash : " + totalCash;
    document.getElementById("totalNotes").innerText = "Total Notes : "+ totalNotes;
}