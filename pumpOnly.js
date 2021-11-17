d = document
c = console
// *************************** cells/fields to look at or blank or update ***************************
const fields =
    [
        "PSS",
        "tor",
        "powe",
        "pum",
        "cpd",
        "cpm",
        "cpy",
        "cpdCS",
        "cpmCS",
        "cpyCS",
        "hours",
        "powCen",
        "pfp",
        "pfpa",
        "pfpr",
        "saving",
        "PSSm",
        "erdTor",
        "mpkp",
        "erdReFl",
        "erdLeakage",
        "priceERD",
        "pricePumpOnly"
    ]

const blank = () => fields.forEach(value => pairs([["", value, " ", 2]]))

//************************** set value pairs to the current document ****************************/
const pairs = valueP =>
    valueP.forEach(pair => {
        if (pair[0] != 0 && isNaN(pair[0]) === false && isFinite(pair[0]) === true) {
            //  this bit need to be innserHTML as the cubbed bit dosnt get translated
            d.getElementById(pair[1]).innerHTML = pair[0].toFixed(pair[3])
        } else {
            d.getElementById(pair[1]).innerHTML = pair[2]
        }
    })

// ***************************get values***************************
const getv = id => parseFloat(d.getElementById(id).value)

// ***************************this gets all the listerners for the doument ***************************
const listeners = ["outletPressure","inletPressure" ,"mrr", "mpl", "money", "rateFix","inletFlow"]

// ***************************this gets all the listerners for the doument ***************************
const listen = () => {
    const pageInputs = d.querySelectorAll('.inp') // this gets the class "inp"
    pageInputs.forEach(el => el.addEventListener('keyup', looky, false)) //this each of them a listener
    listeners.forEach(value => d.getElementById(value).addEventListener('change', looky, false))
    looky() // call of look-up
}

const able = (perfA, pfrA, mifA, mifB, perfB, pfrB) => {
    d.getElementById("PerFlRaMD").disabled = perfA
    d.getElementById("pfr").disabled = pfrA
    d.getElementById("mif").disabled = mifA
    d.getElementById("mif").style.background = mifB
    d.getElementById("PerFlRaMD").style.background = perfB
    d.getElementById("pfr").style.background = pfrB
}

//this disables the oposite value from edit so the you can set a value not to change and have the values around it change
const disble = () => {
    rateFixV = d.getElementById("rateFix").value
    if (rateFixV == 0) {
        able(true, true, false, "BlanchedAlmond", "white", "white")
    }
    if (rateFixV == 1) {
        able(false, false, true, "white", "BlanchedAlmond", "BlanchedAlmond")
    }
    if (rateFixV == 2) {
        able(false, false, false, "white", "white", "white")
    }
}

// ***************************this is the bit to make the Pemeate flow rate go from hours between days***************************
// ***************************change the pfr and perlramd ***************************
const getFlow = f => {
    let k = 0
    let [pr,prd,mrr,rateFix] = ["pfr","PerFlRaMD","mrr","rateFix"].map(getv)
    
    
    // mif is no longer in use
    
    
    //let [pr, prd, mif, mrr, rateFix] = ["pfr", "PerFlRaMD", "mif", "mrr", "rateFix"].map(getv)
    
    // let id = d.activeElement.id
    // let mifa

    // switch (mrr) {
    //     case 0:
    //         k = 4
    //         break;
    //     case 1:
    //         k = 3.3333333333
    //         break;
    //     case 2:
    //         k = 2.85714285714
    //         break;
    //     case 3:
    //         k = 2.5
    //         break;
    //     case 4:
    //         k = 2.2222222222
    //         break;
    //     case 5:
    //         k = 2
    //         break
    //     case 6:
    //         k = 0
    // }

    // // change to the membrain inlet flow
    // //if (id == "mif" && rateFix == 2) {
    // if (id == "mif") {
    //     mifa = mif / k
    //     kd = 24 * mifa
    //     d.getElementById("pfr").value = mifa.toFixed(2)
    //     d.getElementById("PerFlRaMD").value = kd.toFixed(2)
    // }

    // // change to the membrain recovery rate

    // if (id == "mrr" && rateFix == 2) {
    //     mifa = mif / k
    //     kd = 24 * mifa
    //     d.getElementById("pfr").value = mifa.toFixed(2)
    //     d.getElementById("PerFlRaMD").value = kd.toFixed(2)
    // }

    // if (id == "mrr" && rateFix == 1) {
    //     mifa = pr * k
    //     kd = 24 * pr
    //     d.getElementById("mif").value = mifa.toFixed(2)
    //     d.getElementById("PerFlRaMD").value = kd.toFixed(2)
    // }

    // if (id == "mrr" && rateFix == 0) {
    //     let mifa = mif / k
    //     kd = 24 * mifa
    //     d.getElementById("pfr").value = mifa.toFixed(2)
    //     d.getElementById("PerFlRaMD").value = kd.toFixed(2)
    // }

    // //change to permeate flow rates 
    // if (id == "pfr") {
    //     prd = pr * 24
    //     mif = pr * k
    //     d.getElementById("PerFlRaMD").value = prd.toFixed(2)
    //     d.getElementById("mif").value = mif.toFixed(2)
    // }

    // if (id == "PerFlRaMD") {
    //     pr = prd / 24
    //     mif = pr * k
    //     d.getElementById("pfr").value = pr.toFixed(2)
    //     d.getElementById("mif").value = mif.toFixed(2)
    // }
    // c.log("ratefix == " + rateFix)
    // c.log("MIFA=" + mifa + " * 24= " + mifa * 24)
}

// *************************** no pump ***************************
const errorP = () => {
    var x = d.getElementById("errorP");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);
}

// *************************** no motor ***************************
const errorM = () => {
    var x = d.getElementById("errorM");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);
}

// not used but the general template is usefull, e.g. multi-line tenerey
const membrainPressureLossMultiplier = (mult) => {
    return mult === 2 ? 1
        : mult > 2 ? mult * 0.5
            : mult / 2;
}

const emotorP = (powerX) => emotorChoise.find(a => a[0] >= powerX)
const emotorM = (powerX) => emotorChoise.find(a => a[0] >= powerX)

const cPricingERD = (size) => pricingERD.find(a => a[2] == size)



//  *************************** new look-up function to find values from 2d array ***************************
const looky = () => {

//     c.clear()
//     disble()
    getFlow()



var [outletPressure,inletPressure]=["outletPressure","inletPressure"].map(getv)

let pressureDifferential=outletPressure-inletPressure
if(pressureDifferential<0){
    
    
    // error pressure dif can not be negertive
    
    alert("neg pressure diff")
    
    
}

d.getElementById("pressureDifferential").innerText = pressureDifferential



console.log ( outletPressure+" "+inletPressure)



 let echangeRate // this allows for a flexible exchange rate multiplyer


   if (d.getElementById("money").value === "p") { money = "£" 
         echangeRate=1    
    }
    if (d.getElementById("money").value === "d") { money = "$" 
        echangeRate=1.40 // set to do nothing 
    }
    if (d.getElementById("money").value === "e") { money = "€" 
        echangeRate=1.15 // set to do nothing
    }

   var [membraneRecoveryRateVal, costPerKWHour, membranePressureLoss, permeateFlowRatePerDayInput, permeateFlowRatePerDayInputRaw, hours, inletFlow, permeateFlowRate] = ["mrr", "cpkwh", "mpl", "PerFlRaMD", "PerFlRaMD", "hours","inletFlow", "pfr"].map(getv)
    c.log("inletFlow " + inletFlow)

//     // this is to be factored in after speaking with ben
//     c.log("mp multiply " + offSetMembrainOutputPressure[parseInt(membranePressureLoss)][0])

//     //if (parseFloat(membranePressureLoss)===0.98){membranePressureLoss=-1}

//     membrainOutputPressureFig = membraneInletPressure - offSetMembrainOutputPressure[parseInt(membranePressureLoss)][1]
//     c.log("membrain Output Pressure Fig  =" + membrainOutputPressureFig)
//     //convert the multipler value
//     let membraneRecoveryRate = rates[membraneRecoveryRateVal][0]
//     let ERDmembraneRecoveryRate = rates[membraneRecoveryRateVal][1]

//     c.log("value of mrr " + membraneRecoveryRateVal)
//     c.log("ERD Membrain recovery rate " + ERDmembraneRecoveryRate) // this is part of the look-up
//     c.log(" membraneRecoveryRate = " + membraneRecoveryRate)

//     blank()
//     // this next section is dumped to change from permeateFlowRatePerDayInput to mif

    inletFlowDay = (inletFlow * 24)//* membraneRecoveryRate// this will make the screen input look like its wrong as if you input 7 it may end up wanting 14.2
    c.log("inletFlowDay  " + inletFlowDay)

//     //MAIN LOOP - if no pump - no do 
    if (inletFlowDay > 2.5000000001) { // guard to stop error, needs sence check - see ben/tony for correct figure

    



//         //************************************** jump at (filter), if this is wrong a per flow change will not trigger a set of figures, e.g gap in say 7 to 7.1
        chosenPump = pumps.filter(a => a[16] >= inletFlowDay && a[15] <= inletFlowDay)
console.log(chosenPump[0]+" "+chosenPump[1])


// }// remove this  , seriously remove it as it will have you scratching your head for hours if you dont


         if (chosenPump != 0) {

            let pump = chosenPump[chosenPump.length - 1][0] + " " + chosenPump[chosenPump.length - 1][1]
             let pricingPumpOnly = chosenPump[0][24]

            d.getElementById("pum").innerText = pump


// }}// remove before flight


//             if (chosenPump.length > 0) { // this checks if there is a figure to choose from

//                 chosenLine = newPump.filter(a => a[0] === chosenPump[chosenPump.length - 1][0] && a[1] === chosenPump[chosenPump.length - 1][1] && a[2] === membraneInletPressure)

//                 c.log("chosen Pump = " + chosenPump)
//                 // c.log("chosen Pump Line = " + chosenLine)

//                 if (chosenLine.length != 0) {

//                     d.getElementById("pum").innerText = pump

//                     //set powercentre name
//                     let powCen = chosenPump[chosenPump.length - 1][10]
//                     let ERDLookUp = chosenPump[0][membraneRecoveryRateVal + 17]

//                     d.getElementById("powCen").innerText = powCen

//                     //Pump Data
//                     j = 550
//                     let it = 0 //iteratetor
//                     for (i = 11; i < 120; i = i + 3) {
//                         j += 50

//                         if (chosenLine[0][i] >= membrainInletFlowDay) {
//                             pumpShaftSpeed = j
//                             torque = chosenLine[0][i + 1]
//                             power = chosenLine[0][i + 2]
//                             break
//                         }
//                         it += 1
//                     }
//                     let meters3PerDay = parseFloat(chosenLine[0][i])
//                     let pumpVolumetricLoss = parseFloat(chosenLine[0][9])
//                     let highPressureFeedFlow = (meters3PerDay + pumpVolumetricLoss) / 24
//                     let costPerDay = power * hours * costPerKWHour
                    
                    
//                     let cost = {
//                         cDay: costPerDay,
//                         cMonth: costPerDay * 31,
//                         cYear: costPerDay * 365
//                     }
//                     let inc1 = cost.cMonth
//                     cost.cDay = money + cost.cDay.toFixed(2).toString()
//                     cost.cMonth = money + cost.cMonth.toFixed(2).toString()
//                     cost.cYear = money + cost.cYear.toFixed(2).toString()
                    
//                     let emotrCost = emotorP(power)[2] + pricingPumpOnly
                    
                    
//                     // this is to allow for exchange rate

// console.log("emotrCost before = "+emotrCost)
                    
// emotrCost *= echangeRate 
                    
// console.log("emotrCost after = "+emotrCost)                   
                    
                    
//                     // this is the section for eleltric motor
//                     c.log("Chosen Electric Motor Pump = " + emotorP(power))

//                     //pairs([[money + costcDay,"cpd"," ",2]]) does not work out the box so...
//                     d.getElementById("cpd").innerText = cost.cDay
//                     d.getElementById("cpm").innerText = cost.cMonth
//                     d.getElementById("cpy").innerText = cost.cYear

//                     let pkp = power / permeateFlowRate

//                     d.getElementById("pkp").innerText = parseFloat(pkp).toFixed(2)


// d.getElementById("pricePumpOnly").innerText = money +emotrCost.toFixed(2).toString()
//                     pairs([
//                         [pumpShaftSpeed, "PSS", " ", 2],
//                         [torque, "tor", " ", 2],
//                         [power, "powe", " ", 2],
//                         [membrainOutputPressureFig, "pfpr", " ", 2],
//                         [inletPress[chosenPump[chosenPump.length - 1][23]][it], "pfp", " ", 2],
//                         //[emotrCost, "pricePumpOnly", " ", 2]
//                     ])

//                     c.log("Pump should be " + pump)
//                     c.log("power centre is " + powCen)
//                     c.log("power/permeateFlowRate " + " " + power + " / " + permeateFlowRate + " = " + power / permeateFlowRate)
//                     c.log("volumetric loss = " + pumpVolumetricLoss)
//                     c.log("m3 per day " + meters3PerDay)
//                     c.log("High Pressure feed flow " + highPressureFeedFlow)
//                     c.log("pump Shaft Speed= " + j)
//                     c.log("column = " + it) // this is the column for the inlet pressure -inletPress
//                     c.log("cost per day " + costPerDay)
//                     c.log("Pump speed " + pumpShaftSpeed) // to be removed
//                     c.log("Pump torque " + torque) // to be removed
//                     c.log("Pump power kW " + power) // to be removed
//                     c.log("inlet pressure " + chosenPump[chosenPump.length - 1][23]) // to be removed
//                     c.log("ERD Look Up is " + ERDLookUp + " " + ERDmembraneRecoveryRate + " " + membraneInletPressure + " chosenPump[chosenPump.length - 1][22] " + chosenPump[chosenPump.length - 1][22])

//                     //Motor Data
//                     //                                                       size                          %                          %             
//                     let chosenMotor = ERDvals.filter(a => a[2] === ERDmembraneRecoveryRate && a[1] === ERDLookUp && a[3] === membraneInletPressure)

//                     // c.log("** chosen Motor Line ** " + chosenMotor)

//                     if (chosenMotor.length > 0) {

//                         let chosenMotorPower = power - parseFloat(chosenMotor[0][i + 4])
//                         let motor = chosenMotor[0][0]
//                         let membrainOutputPressure = parseFloat(chosenMotor[0][4])
//                         let sav = chosenMotorPower * offSetMembrainOutputPressure[parseInt(membranePressureLoss)][0]
//                         let costPerDayCostSaving = sav * hours * costPerKWHour
//                         let motorVolumetricLoss = parseFloat(chosenMotor[0][11])

//                         let cElectricERD = emotorM(chosenMotorPower * offSetMembrainOutputPressure[parseInt(membranePressureLoss)][0])
//                         let priceERDc = cElectricERD[2] + chosenPump[0][25]

//                         // to allow for exchange rate
// priceERDc *= echangeRate
//                         //*****************************************************************************************************
//                         let erdReturnFlow = ((((100 - ERDmembraneRecoveryRate) / 100) * meters3PerDay) - motorVolumetricLoss) / 24
//                         //*****************************************************************************************************

//                         let pumpDrainFlow = (pumpVolumetricLoss + motorVolumetricLoss) / 24

//                         motorLoss = chosenLine[0][i + 2] + chosenMotor[0][11]
//                         let motorTorque = chosenMotor[0][i + 3]

//                         c.log("parseInt(membranePressureLoss) with cccc " + parseInt(membranePressureLoss))
//                         c.log("power parseFloat(chosenMotor[0][11]) offSetMembrainOutputPressure[parseInt(membranePressureLoss)][0]")
//                         c.log("sav = " + sav)
//                         c.log(power + " " + parseFloat(chosenMotor[0][11]) + " " + offSetMembrainOutputPressure[parseInt(membranePressureLoss)][0] + "**fff****")
//                         c.log("M O P " + membrainOutputPressure)
//                         c.log("Motror consumption = " + chosenMotor[0][i + 2])
//                         c.log("Motor torque = " + motorTorque)
//                         c.log("Electric Power kW = " + chosenMotorPower)
//                         c.log("Motor loss " + chosenMotor[0][11])
//                         c.log("Motor is " + motor)
//                         c.log("cost per day saving " + costPerDayCostSaving)

//                         //c.log("found motor")
//                         c.log(inletPress[chosenPump[chosenPump.length - 1][23]][it] + " Inlet pressure calc ")

//                         let savm = chosenMotorPower * offSetMembrainOutputPressure[parseInt(membranePressureLoss)][0]
//                         let mpkp = savm / permeateFlowRate

//                         d.getElementById("mpkp").innerText = parseFloat(mpkp).toFixed(2)

//                     //exchange rate problem
                    
                
//                         let costSaving = {
//                             cDay: costPerDayCostSaving,
//                             cMonth: costPerDayCostSaving * 31,
//                             cYear: costPerDayCostSaving * 365
//                         }

//                         //graph values
//                         let start1 = emotrCost 
//                         let start2 = priceERDc 

//                         let inc2 = costSaving.cMonth
                        
                        
//                         document.getElementById("graph").href = "graph2.html?start1=" + start1 + "&start2=" + start2 + "&inc1=" + inc1 + "&inc2=" + inc2+"&costPerKWHour="+costPerKWHour

//                         costSaving.cDay = money + costSaving.cDay.toFixed(2).toString()
//                         costSaving.cMonth = money + costSaving.cMonth.toFixed(2).toString()
//                         costSaving.cYear = money + costSaving.cYear.toFixed(2).toString()

//                         d.getElementById("cpdCS").innerText = costSaving.cDay
//                         d.getElementById("cpmCS").innerText = costSaving.cMonth
//                         d.getElementById("cpyCS").innerText = costSaving.cYear
                        
// d.getElementById("priceERD").innerText = money +priceERDc.toFixed(2).toString()

//                         pairs([
//                             [chosenMotorPower * offSetMembrainOutputPressure[parseInt(membranePressureLoss)][0], "saving", " ", 2],
//                             [pumpVolumetricLoss / 24, "pl", " ", 2],
//                             [motorVolumetricLoss / 24, "erdLeakage", " ", 2],
//                             [erdReturnFlow, "erdReFl", " ", 2],
//                             [torque - motorTorque, "erdTor", " ", 2],
//                             [pumpShaftSpeed, "PSSm", " ", 2],
//                             [highPressureFeedFlow, "pfpa", " ", 2],
//                         ])


//                         console.log("ERD Price = " + priceERD)
//                         c.log("Chosen Electric Motor  ERD = " + emotorM(chosenMotorPower * offSetMembrainOutputPressure[parseInt(membranePressureLoss)][0]))

//                         if (inletPress[chosenPump[chosenPump.length - 1][23]][it] === "Consult TWHC") {
//                             d.getElementById("pfp").innerText = "Consult TWHC"
//                         }
//                     } else {
//                         errorM()
//                         c.log("No motor Found")
//                     }

//                     // then the line is column filerted by the i postition +2 (80 becomes 82) this is then the first figure in the triptic
//                     // i = the position in the array to manipulated to get the array elemnt in the second array(erd figs)
//                 }
//             }
        } else {
            console.log("No pump Found")      
            errorP()
        }
    } else {
        errorP()
        c.log("this is the trap for being off the figures")
     }
}