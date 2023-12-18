//Attribute and Vitality Counter Variables
var strCounter = 0;
var dexCounter = 0;
var endCounter = 0;
var intCounter = 0;
var witCounter = 0;
var resCounter = 0;
var chaCounter = 0;
var subCounter = 0;
var cogCounter = 0;
var heaCounter = 0;
var eneCounter = 0;


  // Function to handle checkbox change event - reference to the specific checkbox
  function updateAttCounter(checkbox, values) {

    var changedCheckbox = checkbox;

    var attCounter = 0;

    console.log (changedCheckbox.classList[1]);

    const checkboxAtttribute = changedCheckbox.classList[1];

// Sequence of Skill toggle functions
if (changedCheckbox.checked) {
    
    //Skill 001 Variables
    var skillcheck1_1 = values.value1;
    var skillcheck1_2 = values.value2;
    var skillcheck1_3 = values.value3;
    //Skill 002 Variables
    var skillcheck2_1 = values.value4;
    var skillcheck2_2 = values.value5;
    var skillcheck2_3 = values.value6;
    //Skill 002 Variables
    var skillcheck3_1 = values.value7;
    var skillcheck3_2 = values.value8;
    var skillcheck3_3 = values.value9;

    var skill_1_1 = $(skillcheck1_1);
    var skill_1_2 = $(skillcheck1_2);
    var skill_1_3 = $(skillcheck1_3);
    var skill_2_1 = $(skillcheck2_1);
    var skill_2_2 = $(skillcheck2_2);
    var skill_2_3 = $(skillcheck2_3);
    var skill_3_1 = $(skillcheck3_1);
    var skill_3_2 = $(skillcheck3_2);
    var skill_3_3 = $(skillcheck3_3);

    
    var counter = document.getElementById("counter");


    switch (checkboxAtttribute) {

        case 'str':

        strCounter++;
        var attCounter = strCounter;
        console.log(attCounter);
        break;

        case 'dex':
        
        dexCounter++;
        var attCounter = dexCounter;
        console.log(attCounter);
        break;

        case 'end':
        
        endCounter++;
        var attCounter = endCounter;
        console.log(attCounter);
        break;

        case 'int':
        
        intCounter++;
        var attCounter = intCounter;
        console.log(attCounter);
        break;

        case 'wit':
        
        witCounter++;
        var attCounter = witCounter;
        console.log(attCounter);
        break;

        case 'res':

        resCounter++;
        var attCounter = resCounter;
        console.log(attCounter);
        break;

        case 'cha':

        chaCounter++;
        var attCounter = chaCounter;
        console.log(attCounter);
        break;

        case 'sub':

        subCounter++;
        var attCounter = subCounter;
        console.log(attCounter);
        break;

        case 'cog':

        cogCounter++;
        var attCounter = cogCounter;
        console.log(attCounter);
        break;
        
    }

    switch (attCounter) {

        case 1:
            //Skill 001    
            if(skill_1_1.hasClass('char-skills') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                skill_1_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                skill_1_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills')) {
                skill_1_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_3.removeClass('char-skills-orange').addClass('char-skills-red')
            } 

            //Skill 002

            if(skill_2_1.hasClass('char-skills') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                skill_2_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                skill_2_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills')) {
                skill_2_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_3.removeClass('char-skills-orange').addClass('char-skills-red')
            } 

            //Skill 003

            if(skill_3_1.hasClass('char-skills') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                skill_3_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                skill_3_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills')) {
                skill_3_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_3.removeClass('char-skills-orange').addClass('char-skills-red')
            }            

            break;
        case 2:
            //Skill 001

            if(skill_1_1.hasClass('char-skills') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                skill_1_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                skill_1_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills')) {
                skill_1_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_3.removeClass('char-skills-orange').addClass('char-skills-red')
            } 

            //Skill 002

            if(skill_2_1.hasClass('char-skills') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                skill_2_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                skill_2_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills')) {
                skill_2_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_3.removeClass('char-skills-orange').addClass('char-skills-red')
            } 

            //Skill 003

            if(skill_3_1.hasClass('char-skills') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                skill_3_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                skill_3_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills')) {
                skill_3_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_3.removeClass('char-skills-orange').addClass('char-skills-red')
            }              


            break;
        case 3:
            //Skill 001

            if(skill_1_1.hasClass('char-skills') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                skill_1_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                skill_1_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills')) {
                skill_1_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-orange')) {
                skill_1_3.removeClass('char-skills-orange').addClass('char-skills-red')
            } 

            //Skill 002

            if(skill_2_1.hasClass('char-skills') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                skill_2_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                skill_2_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills')) {
                skill_2_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-orange')) {
                skill_2_3.removeClass('char-skills-orange').addClass('char-skills-red')
            } 

            //Skill 003

            if(skill_3_1.hasClass('char-skills') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                skill_3_1.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                skill_3_2.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills')) {
                skill_3_3.removeClass('char-skills').addClass('char-skills-orange')
            } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_1.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_2.removeClass('char-skills-orange').addClass('char-skills-red')
            } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-orange')) {
                skill_3_3.removeClass('char-skills-orange').addClass('char-skills-red')
            }             

            break;
    }

} 
    else {

        var counter = document.getElementById("counter");

    //Skill 001 Variables
    var skillcheck1_1 = values.value1;
    var skillcheck1_2 = values.value2;
    var skillcheck1_3 = values.value3;
    //Skill 002 Variables
    var skillcheck2_1 = values.value4;
    var skillcheck2_2 = values.value5;
    var skillcheck2_3 = values.value6;
    //Skill 003 Variables
    var skillcheck3_1 = values.value7;
    var skillcheck3_2 = values.value8;
    var skillcheck3_3 = values.value9;
    

    var skill_1_1 = $(skillcheck1_1);
    var skill_1_2 = $(skillcheck1_2);
    var skill_1_3 = $(skillcheck1_3);
    var skill_2_1 = $(skillcheck2_1);
    var skill_2_2 = $(skillcheck2_2);
    var skill_2_3 = $(skillcheck2_3);
    var skill_3_1 = $(skillcheck3_1);
    var skill_3_2 = $(skillcheck3_2);
    var skill_3_3 = $(skillcheck3_3);

    switch (checkboxAtttribute) {

        case 'str':

        strCounter--;
        var attCounter = strCounter;
        console.log(attCounter);
        break;

        case 'dex':
        
        dexCounter--;
        var attCounter = dexCounter;
        console.log(attCounter);
        break;

        case 'end':
        
        endCounter--;
        var attCounter = endCounter;
        console.log(attCounter);
        break;

        case 'int':
        
        intCounter--;
        var attCounter = intCounter;
        console.log(attCounter);
        break;

        case 'wit':

        witCounter--;
        var attCounter = witCounter;
        console.log(attCounter);
        break;

        case 'res':

        resCounter--;
        var attCounter = resCounter;
        console.log(attCounter);
        break;

        case 'cha':

        chaCounter--;
        var attCounter = chaCounter;
        console.log(attCounter);
        break;

        case 'sub':

        subCounter--;
        var attCounter = subCounter;
        console.log(attCounter);
        break;

        case 'cog':

        cogCounter--;
        var attCounter = cogCounter;
        console.log(attCounter);
        break;

    }
    
        switch (attCounter) {
            case 0:
                //Skill 001
                if(skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-red')) {
                    skill_1_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills')) {
                    skill_1_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                    skill_1_1.removeClass('char-skills-orange').addClass('char-skills')
                } 

                //Skill 002

                if(skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-red')) {
                    skill_2_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills')) {
                    skill_2_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                    skill_2_1.removeClass('char-skills-orange').addClass('char-skills')
                } 

                //Skill 003

                if(skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-red')) {
                    skill_3_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills')) {
                    skill_3_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                    skill_3_1.removeClass('char-skills-orange').addClass('char-skills')
                }               

                
                break;
            case 1:
                //Skill 001

                //Skill 001
                if(skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-red')) {
                    skill_1_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills')) {
                    skill_1_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                    skill_1_1.removeClass('char-skills-orange').addClass('char-skills')
                } 

                //Skill 002

                if(skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-red')) {
                    skill_2_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills')) {
                    skill_2_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                    skill_2_1.removeClass('char-skills-orange').addClass('char-skills')
                } 

                //Skill 003

                if(skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-red')) {
                    skill_3_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills')) {
                    skill_3_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                    skill_3_1.removeClass('char-skills-orange').addClass('char-skills')
                }                
                
                              
                break;
            case 2:
                //Skill 001

                //Skill 001
                if(skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-red')) {
                    skill_1_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-red') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-red') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills-orange')) {
                    skill_1_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills-orange') && skill_1_3.hasClass('char-skills')) {
                    skill_1_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_1_1.hasClass('char-skills-orange') && skill_1_2.hasClass('char-skills') && skill_1_3.hasClass('char-skills')) {
                    skill_1_1.removeClass('char-skills-orange').addClass('char-skills')
                } 

                //Skill 002

                if(skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-red')) {
                    skill_2_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-red') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-red') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills-orange')) {
                    skill_2_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills-orange') && skill_2_3.hasClass('char-skills')) {
                    skill_2_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_2_1.hasClass('char-skills-orange') && skill_2_2.hasClass('char-skills') && skill_2_3.hasClass('char-skills')) {
                    skill_2_1.removeClass('char-skills-orange').addClass('char-skills')
                } 

                //Skill 003

                if(skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-red')) {
                    skill_3_3.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-red') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_2.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-red') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_1.removeClass('char-skills-red').addClass('char-skills-orange')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills-orange')) {
                    skill_3_3.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills-orange') && skill_3_3.hasClass('char-skills')) {
                    skill_3_2.removeClass('char-skills-orange').addClass('char-skills')
                } else if (skill_3_1.hasClass('char-skills-orange') && skill_3_2.hasClass('char-skills') && skill_3_3.hasClass('char-skills')) {
                    skill_3_1.removeClass('char-skills-orange').addClass('char-skills')
                }              
                
                break;             
        }

    }
};

//Update Health Track

function updateHealthTrack (checkbox) {

    var changedCheckbox = checkbox;
    const checkboxVitality = changedCheckbox.classList[2];

    if (changedCheckbox.checked) { 

        switch (checkboxVitality) {

            case 'hea':
    
            heaCounter++;
            console.log("health ", heaCounter);

        //Increment Health Track

            var healthIndex = "health" + String(heaCounter);
            var healthCheckbox = document.getElementById(healthIndex);

            healthCheckbox.classList.remove('health-checkbox');
            healthCheckbox.classList.add('health-checkbox-red');

            break;
    
            case 'ene':
            
            eneCounter++;
            console.log("energy", eneCounter);

        //Increment Energy Track

            var energyIndex = "energy" + String(eneCounter);
            var energyCheckbox = document.getElementById(energyIndex);

            energyCheckbox.classList.remove('energy-checkbox');
            energyCheckbox.classList.add('energy-checkbox-blue');               

            break;
    
            case 'non':
            console.log("Attribute not associated with Health or Energy");
            break;
        };
        

    } else { 

        switch (checkboxVitality) {

            case 'hea':
    
            heaCounter--;
            console.log("health ", heaCounter);

        //Decrement Health Track

            var healthIndex = "health" + String(heaCounter + 1);
            var healthCheckbox = document.getElementById(healthIndex);

            healthCheckbox.classList.remove('health-checkbox-red');
            healthCheckbox.classList.add('health-checkbox');            

            break;
    
            case 'ene':
            
            eneCounter--;
            console.log("energy", eneCounter);

        //Decrement Energy Track

            var energyIndex = "energy" + String(eneCounter + 1);
            var energyCheckbox = document.getElementById(energyIndex);

            energyCheckbox.classList.remove('energy-checkbox-blue');
            energyCheckbox.classList.add('energy-checkbox');

            break;
    
            case 'non':
            console.log("Attribute not associated with Health or Energy");
            break;
        };


         

    }

};





// On checkbox check functions


function checkboxFunctions(checkbox, values) {

    updateAttCounter(checkbox, values);
    updateHealthTrack (checkbox);
};



//----Dynamic Equipment Field Generator

let fieldCountEquip = 1;

    function addEquipmentFormField() {
        if (fieldCountEquip >= 3) {
            alert('Maximum limit reached (3 fields)');
            return;
        }

        fieldCountEquip++;

        const formContainer = document.getElementById('parent-equipment-block');

        const newFieldDiv = document.createElement('div');
        newFieldDiv.classList.add('equipment-container-block');

        const div = document.createElement('div');
        div.classList.add('divider-line-equip');
        newFieldDiv.appendChild(div);

        const inputA = document.createElement('input');
        inputA.type = 'text';
        inputA.name = `field${fieldCountEquip}a`;
        inputA.placeholder = 'Equipment Title';
        inputA.classList.add('input-field');
        newFieldDiv.appendChild(inputA);

        const inputB = document.createElement('textarea');
        inputB.type = 'textarea';
        inputB.name = `field${fieldCountEquip}b`;
        inputB.placeholder = 'Equipment Description';
        inputB.classList.add('input-field-double');
        newFieldDiv.appendChild(inputB);

        formContainer.insertBefore(newFieldDiv, formContainer.lastChild.previousElementSibling);
    };


    //----Dynamic Weapon Field Generator

    let fieldCountWeap = 1;

    function addWeaponFormField() {

    if (fieldCountWeap >= 3) {
        alert('Maximum limit reached (3 fields)');
        return;
    }

    fieldCountWeap++;

    const formContainer = document.getElementById('parent-weapon-block');

    const newFieldDiv = document.createElement('div');
        newFieldDiv.classList.add('weapon-container-block');

        const div = document.createElement('div');
        div.classList.add('divider-line-weapon');
        newFieldDiv.appendChild(div);

        const labelA = document.createElement('label');
        labelA.textContent = "Weapon";
        labelA.classList.add('weapon-heading-field');
        newFieldDiv.appendChild(labelA);

        const labelB = document.createElement('label');
        labelB.textContent = "Type";
        labelB.classList.add('weapon-heading-field');
        newFieldDiv.appendChild(labelB);

        const labelC = document.createElement('label');
        labelC.textContent = "Range";
        labelC.classList.add('weapon-heading-field');
        newFieldDiv.appendChild(labelC);

        const labelD = document.createElement('label');
        labelD.textContent = "Dmg";
        labelD.classList.add('weapon-heading-field');
        newFieldDiv.appendChild(labelD);

        const labelE = document.createElement('label');
        labelE.textContent = "Complication";
        labelE.classList.add('weapon-heading-field');
        newFieldDiv.appendChild(labelE);


        const inputWeaponName = document.createElement('input');
        inputWeaponName.type = 'text';
        inputWeaponName.name = `field${fieldCountEquip}a`;
        inputWeaponName.placeholder = 'Weapon Name';
        inputWeaponName.classList.add('input-field-fill');
        newFieldDiv.appendChild(inputWeaponName);


        const attackTypeSelect = document.createElement('select');
        attackTypeSelect.className = 'dropdown-select';
        const attackTypeOptions = ['Attack', 'Arcana'];
        attackTypeOptions.forEach(optionText => {
            const attackTypeOptionsOption = document.createElement('option');
            attackTypeOptionsOption.value = optionText.toLowerCase().replace(/\s/g, '');
            attackTypeOptionsOption.textContent = optionText;
            attackTypeSelect.appendChild(attackTypeOptionsOption);
        });
        newFieldDiv.appendChild(attackTypeSelect);


        const attackRangeSelect = document.createElement('select');
        attackRangeSelect.className = 'dropdown-select';
        const attackRangeOptions = ['Close', 'Medium', 'Long'];
        attackRangeOptions.forEach(optionText => {
            const attackRangeOption = document.createElement('option');
            attackRangeOption.value = optionText.toLowerCase().replace(/\s/g, '');
            attackRangeOption.textContent = optionText;
            attackRangeSelect.appendChild(attackRangeOption);
        });
        newFieldDiv.appendChild(attackRangeSelect);


        const attackDmgSelect = document.createElement('select');
        attackDmgSelect.className = 'dropdown-select';
        const attackDmgOptions = ['+1', '+2', '+3', '+4', '+5', '+6'];
        attackDmgOptions.forEach(optionText => {
            const attackDmgOption = document.createElement('option');
            attackDmgOption.value = optionText.toLowerCase().replace(/\s/g, '');
            attackDmgOption.textContent = optionText;
            attackDmgSelect.appendChild(attackDmgOption);
        });
        newFieldDiv.appendChild(attackDmgSelect);


        const attackCompSelect = document.createElement('select');
        attackCompSelect.className = 'dropdown-select';
        const attackCompOptions = ['Bleed', 'Burn', 'Stun'];
        attackCompOptions.forEach(optionText => {
            const attackCompOption = document.createElement('option');
            attackCompOption.value = optionText.toLowerCase().replace(/\s/g, '');
            attackCompOption.textContent = optionText;
            attackCompSelect.appendChild(attackCompOption);
        });
        newFieldDiv.appendChild(attackCompSelect);

        

        formContainer.insertBefore(newFieldDiv, formContainer.lastChild.previousElementSibling);

};


//----Dynamic Ability Field Generator 1

let fieldCountAbility1 = 1;

    function addAbilityFormField1() {
        if (fieldCountAbility1 >= 3) {
            alert('Maximum limit reached (3 fields)');
            return;
        }

        fieldCountAbility1++;

        const formContainer = document.getElementById('parent-ability-001');

        const newFieldDiv = document.createElement('div');
        newFieldDiv.classList.add('ability-container-block');

        const div = document.createElement('div');
        div.classList.add('divider-line-equip');
        newFieldDiv.appendChild(div);

        const inputA = document.createElement('input');
        inputA.type = 'text';
        inputA.name = `field${fieldCountAbility1}a`;
        inputA.placeholder = 'Ability Title';
        inputA.classList.add('input-field-ability-title');
        newFieldDiv.appendChild(inputA);

        const inputB = document.createElement('textarea');
        inputB.type = 'textarea';
        inputB.name = `field${fieldCountAbility1}b`;
        inputB.placeholder = 'Flavour Text';
        inputB.classList.add('input-field-flav');
        newFieldDiv.appendChild(inputB);

        const inputC = document.createElement('textarea');
        inputC.type = 'textarea';
        inputC.name = `field${fieldCountAbility1}c`;
        inputC.placeholder = 'Ability Description';
        inputC.classList.add('input-field-desc');
        newFieldDiv.appendChild(inputC);

        const div2 = document.createElement('div');
        newFieldDiv.appendChild(div2);

        formContainer.insertBefore(newFieldDiv, formContainer.lastChild.previousElementSibling);
    };


    //----Dynamic Ability Field Generator 2

let fieldCountAbility2 = 1;

function addAbilityFormField2() {
    if (fieldCountAbility2 >= 3) {
        alert('Maximum limit reached (3 fields)');
        return;
    }

    fieldCountAbility2++;

    const formContainer = document.getElementById('parent-ability-002');

    const newFieldDiv = document.createElement('div');
    newFieldDiv.classList.add('ability-container-block');

    const div = document.createElement('div');
    div.classList.add('divider-line-equip');
    newFieldDiv.appendChild(div);

    const inputA = document.createElement('input');
    inputA.type = 'text';
    inputA.name = `field${fieldCountAbility2}a`;
    inputA.placeholder = 'Ability Title';
    inputA.classList.add('input-field-ability-title');
    newFieldDiv.appendChild(inputA);

    const inputB = document.createElement('textarea');
    inputB.type = 'textarea';
    inputB.name = `field${fieldCountAbility2}b`;
    inputB.placeholder = 'Flavour Text';
    inputB.classList.add('input-field-flav');
    newFieldDiv.appendChild(inputB);

    const inputC = document.createElement('textarea');
    inputC.type = 'textarea';
    inputC.name = `field${fieldCountAbility2}c`;
    inputC.placeholder = 'Ability Description';
    inputC.classList.add('input-field-desc');
    newFieldDiv.appendChild(inputC);

    const div2 = document.createElement('div');
    newFieldDiv.appendChild(div2);

    formContainer.insertBefore(newFieldDiv, formContainer.lastChild.previousElementSibling);
};


//----Dynamic Ability Field Generator 3

let fieldCountAbility3 = 1;

function addAbilityFormField3() {
    if (fieldCountAbility3 >= 3) {
        alert('Maximum limit reached (3 fields)');
        return;
    }

    fieldCountAbility3++;

    const formContainer = document.getElementById('parent-ability-003');

    const newFieldDiv = document.createElement('div');
    newFieldDiv.classList.add('ability-container-block');

    const div = document.createElement('div');
    div.classList.add('divider-line-equip');
    newFieldDiv.appendChild(div);

    const inputA = document.createElement('input');
    inputA.type = 'text';
    inputA.name = `field${fieldCountAbility3}a`;
    inputA.placeholder = 'Ability Title';
    inputA.classList.add('input-field-ability-title');
    newFieldDiv.appendChild(inputA);

    const inputB = document.createElement('textarea');
    inputB.type = 'textarea';
    inputB.name = `field${fieldCountAbility3}b`;
    inputB.placeholder = 'Flavour Text';
    inputB.classList.add('input-field-flav');
    newFieldDiv.appendChild(inputB);

    const inputC = document.createElement('textarea');
    inputC.type = 'textarea';
    inputC.name = `field${fieldCountAbility3}c`;
    inputC.placeholder = 'Ability Description';
    inputC.classList.add('input-field-desc');
    newFieldDiv.appendChild(inputC);

    const div2 = document.createElement('div');
    newFieldDiv.appendChild(div2);

    formContainer.insertBefore(newFieldDiv, formContainer.lastChild.previousElementSibling);
};