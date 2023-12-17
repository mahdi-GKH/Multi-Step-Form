const steps = document.getElementsByClassName('steps');
const nextBTN = document.getElementById('nextBTN');
const preBTN = document.getElementById('preBTN');

const levels = document.getElementsByClassName('level');
const skills = document.getElementsByClassName('skill');
const result = document.getElementsByClassName('res');






const lines = document.getElementsByClassName('line');
const numbers = document.getElementsByClassName('number');

const orangeColor = '#FC6C4C';
const whiteColor = '#E5E7EB';


let currentStep = 0;


var data = {
    fullName : undefined,
    email : undefined,
    phoneNumber : undefined,
    github : undefined,
    level : undefined,
    skills : []
}


function handelBTNs(){
    if(currentStep == 0){
        nextBTN.disabled = false;
        nextBTN.classList.remove('disabled');
        preBTN.disabled = true;
        preBTN.classList.add('disabled');
    }else if(currentStep > 0){

        nextBTN.disabled = true;
        nextBTN.classList.add('disabled');
        preBTN.disabled = false;
        preBTN.classList.remove('disabled');

    }
}

function form_validation(){
    let name = document.forms["inputs"]["fullName"].value;
    let email = document.forms["inputs"]["email"].value;
    let number = document.forms["inputs"]["phoneNumber"].value;
    let link = document.forms["inputs"]["githubLink"].value;
    
    if(name == '' || email == '' || number == '' || link == ''){
        
        alert('Fill in all fields');
        return false;
        

    }else if(name.length < 4 || number.length < 3 || link.length < 12){
        alert('Error!');
        return false;
    }else if(!email.includes('@')){
        alert('email');
        return false;
    }
    else{
        data.fullName = name;
        data.email = email;
        data.phoneNumber = number;
        data.github = link;
        return true;
    }
} 

function nextStep(){
    
    
    let valid =  currentStep == 0 ? form_validation() : true;

    if(currentStep < 3 && valid){
        steps[currentStep].style.display = 'none';
        lines[currentStep].style.backgroundColor = orangeColor;
        
        currentStep++;
        steps[currentStep].style.display = 'grid';
        numbers[currentStep].style.backgroundColor = orangeColor;
        numbers[currentStep].style.color = 'white';
        handelBTNs();
        if(currentStep == 3){
            result[0].children[1].innerHTML = data.fullName;
            result[1].children[1].innerHTML = data.email;
            result[2].children[1].innerHTML = data.phoneNumber;
            result[3].children[1].innerHTML = data.github;
            result[4].children[1].innerHTML = data.level;
            result[5].children[1].innerHTML = data.skills;
            nextBTN.disabled = false;
            nextBTN.classList.remove('disabled');
            
            

        }
        
    }else if(currentStep == 3){
        
        
        document.getElementById('steps').style.display = 'none';
        document.getElementById('info').style.display = 'none';
        document.getElementById('inputs').style.display = 'none';
        document.getElementById('btnS').style.display = 'none';
        for(let d of document.getElementsByTagName('hr')){
            d.style.display = 'none';
        }
        document.getElementById('last').style.display = 'flex';
    }
    
    
    



    


}


function backStep(){

    if(currentStep > 0){
        steps[currentStep].style.display = 'none';
        lines[currentStep-1].style.backgroundColor = null;

        numbers[currentStep].style.backgroundColor = null;
        
        numbers[currentStep].style.color = null;


        
        currentStep--;
        steps[currentStep].style.display = 'grid';

        handelBTNs();
        
    }
    

}


for(let x of levels){
    x.addEventListener('click',()=>{
        for(let y of levels){
            y.style.borderColor = null;
            y.style.color = null;
        }
        x.style.borderColor = 'orange';
        x.style.color = 'orange';
        data.level = x.children[1].innerHTML;
        nextBTN.disabled = false;
        nextBTN.classList.remove('disabled');

        
    })
}
for(let x of skills){
    x.addEventListener('click',()=>{
        
        if(x.children[0].checked){
            x.children[0].checked = false;
            
            data.skills = data.skills.filter(function (str) { return str.indexOf(x.children[1].innerHTML) === -1; })
        }else{
            x.children[0].checked = true;
            data.skills.push(x.children[1].innerHTML);

        }

        

        
        nextBTN.disabled = false;
        nextBTN.classList.remove('disabled');

        
    })
}


nextBTN.addEventListener('click' , nextStep);
preBTN.addEventListener('click' , backStep);

