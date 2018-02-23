/*------------------------SIMULATED USER INPUTS-------------------------------*/
// let dob         = '1994-04-28';
// let dbt         = '18000';
// let aggInt      = '4.25';
// let inv_1       = '18000';
// let inv_acc_1   = 'sAndP';
// let inv_2       = '0';
// let inv_acc_2   = 'tenYearBond';

// let stp_1_start = 'now';
// let stp_1_start = dobToAge(dob);
// let stp_1_end   = 'paid-off';
// let stp_1_typ   = 'debt-repay';
// let stp_1_acc   = 'debts';
// let stp_1_amnt  = '6000';
//
// let stp_2_start = dobToAge(dob);
// let stp_2_end   = '27';
// let stp_2_typ   = 'investment';
// let stp_2_acc   = 'sAndP';
// let stp_2_amnt  = '15000';
//
// let stp_3_start = '27';
// let stp_3_end   = '35';
// let stp_3_typ   = 'investment';
// let stp_3_acc   = 'sAndP';
// let stp_3_amnt  = '25000';
//
// let stp_4_start = '50';
// let stp_4_end   = '60';
// let stp_4_typ   = 'withdraw';
// let stp_4_acc   = 'sAndP';
// let stp_4_amnt  = '30000';
//
// let stp_5_start = '60';
// let stp_5_end   = '80';
// let stp_5_typ   = 'withdraw';
// let stp_5_acc   = 'sAndP';
// let stp_5_amnt  = '70000';

/*--------------------------PUSH DATA INTO OBJECTS----------------------------*/

let user = {
    'age'       : dobToAge(dob),
    'aggInt'    : Number(aggInt)
}
let accounts = {
    'debts' : 0,
    'sAndP' : 0,
    'tenYearBond' : 0
}
let steps = [];
function Step(start, end, account, type, amount) {
    this.start = start,
    this.end = end,
    this.account = account,
    this.type = type,
    this.amount = Number(amount)
}
// let step_1 = new Step(stp_1_start, stp_1_end, stp_1_typ, stp_1_acc, stp_1_amnt);
// let step_2 = new Step(stp_2_start, stp_2_end, stp_2_typ, stp_2_acc, stp_2_amnt);
// let step_3 = new Step(stp_3_start, stp_3_end, stp_3_typ, stp_3_acc, stp_3_amnt);
// let step_4 = new Step(stp_4_start, stp_4_end, stp_4_typ, stp_4_acc, stp_4_amnt);
// let step_5 = new Step(stp_5_start, stp_5_end, stp_5_typ, stp_5_acc, stp_5_amnt);
// steps.push(step_1);
// steps.push(step_2);
// steps.push(step_3);
// steps.push(step_4);
// steps.push(step_5);

let allSimulations = [];

function returnDuration() {
    let duration = 0;
    for (let s of steps) {
        if (s['end'] > duration) {
            duration = s['end'];
        }
    }
    return duration;
}
function dobToAge(dob) {
    let today = new Date().getTime();
    let birthday = new Date(dob).getTime();
    return Math.round((today - birthday) / (365.25 * 24 * 60 * 60 * 1000) * 100) / 100;
}
function dateToAge(dob, date) {
    let birthTime = new Date(dob).getTime();
    let dateTime = new Date(date).getTime();
    return Math.round((dateTime - birthTime) / (365.25 * 24 * 60 * 60 * 1000) * 100) / 100;
}
function returnNetInf(netInf, annInf) {
    return Math.round(((((netInf + 100) / 100) * ((annInf + 100) / 100)) - 1) * 10000) / 100;
}
function netWorth(acnts) {
    let netWorth = acnts['debts'] * (-1);
    for (let a in acnts) {
        if (a === 'debts') {
            continue;
        }
        netWorth += acnts[a];
    }
    return netWorth;
}
function inflationAdjust(amnt, netInflation) {
    return Math.round(amnt / (100 + netInflation) * 100);
}
function simulateStarting(year) {
    function simulate(yr, age) {
        let currentSteps = [];
        let thisYearChanges = {
            'debts' : 0,
            'sAndP' : 0,
            'tenYearBond' : 0
        };
        for (let step of steps) {
            if ((step['start'] <= age && step['end'] > age) || (step['start'] <= age && step['end'] === 'paid-off' && thisSimAccounts['debts'] !== 0)) {
                currentSteps.push(step);
                let account = step['account'];
                if (step['type'] !== 'withdraw') {
                    thisYearChanges[account] += step['amount'];
                }
                else {
                    thisYearChanges[account] -= step['amount'];
                }
                thisYearChanges[account];
            }
        }
        let percentOfYear = 1;
        if (Math.round(age) !== age) {
            percentOfYear = Math.round((Math.ceil(age) - age) * 100) / 100;
        }
        let debt = thisSimAccounts['debts'];
        if (debt !== 0) {
            debt *= (100 + (user['aggInt'] * percentOfYear)) / 100; // Account for interest
            debt -= (thisYearChanges['debts'] * percentOfYear);
            if (debt <= 0) {
                debt = 0;
            }
            thisSimAccounts['debts'] = Math.round(debt);
        }
        for (let property in thisSimAccounts) {
            if (thisSimAccounts.hasOwnProperty(property) && property !== 'debts') {
                thisSimAccounts[property] *= (100 + (percentOfYear * markets[property][yr])) / 100;
                thisSimAccounts[property] += (percentOfYear * thisYearChanges[property]);
                thisSimAccounts[property] = Math.round(thisSimAccounts[property]);
                // console.log(markets[property][yr]);
            }
        }
        let annInf = inflation[yr] * percentOfYear;
        netInf = returnNetInf(netInf, annInf);
        // return netWorth(thisSimAccounts); // Used for net worths that are NOT inflation adjusted
        return inflationAdjust(netWorth(thisSimAccounts), netInf); // Used to produce inflation adjusted net worths
    }
    let historicalCase = [];
    let y = year;
    let a = user['age'];
    let thisSimAccounts = $.extend(true, {}, accounts);
    let netInf = 0;
    let fuse = 0;
    let dur = returnDuration();
    while (a < dur && fuse < 100) {
        // console.log(`simulating ${y} at age ${a}`)
        historicalCase.push(simulate(y, a));
        y++;
        if (y >= '2018') {
            y = '1950';
        }
        if (Math.round(a) !== a) {
            a = Math.ceil(a);
        }
        else {
            a++;
        }
        fuse++;
    }
    return historicalCase;
    // console.log(historicalCase);
}
function runSimulation() {
    let allSims = [];
    let year = 1950;
    for (year; year <= 2017; year++) {
        allSims.push(simulateStarting(year));
    }
    allSimulations = allSims;
}

function returnAvrgHistoricalCase(allSimulationsArray) {
    const NUM_SIMS = allSimulationsArray.length;
    const LNG_OF_SIM = allSimulationsArray[0].length;
    let averageCase = [];
    i = 0;
    // console.log(`${NUM_SIMS} | ${LNG_OF_SIM}`);
    for (i; i < LNG_OF_SIM; i++) {
        averageCase[i] = 0;
    }
    // console.log(averageCase);
    for (let sim of allSimulationsArray) {
        i = 0;
        // console.log(sim);
        for (i; i < LNG_OF_SIM; i++) {
            averageCase[i] += sim[i];
        }
    }
    // console.log(averageCase);
    for (i = 0; i < LNG_OF_SIM; i++) {
        averageCase[i] = Math.round(averageCase[i] / NUM_SIMS);
    }
    // console.log(averageCase);
    return averageCase;
}
function returnMednHistoricalCase(allSimulationsArray) {
    const NUM_SIMS = allSimulationsArray.length;
    const LNG_OF_SIM = allSimulationsArray[0].length;
    let medianCase;
    let finalIndex = (LNG_OF_SIM - 1);
    let middleSim = Math.floor((NUM_SIMS - 1) / 2);
    let finalNumbers = [];
    let orderedSimulations = allSimulationsArray.slice();
    for (let subArr of orderedSimulations) {
        let finalNum = subArr[finalIndex];
        finalNumbers.push(finalNum);
    }
    let orderedFinalNums = finalNumbers.slice().sort(function (a,b) {
        return a - b;
    })
    let medianFinal = orderedFinalNums[middleSim];
    // return medianFinal;
    for (let subArr of allSimulationsArray) {
        if (subArr[finalIndex] == medianFinal) {
            medianCase = subArr;
            break;
        }
    }
    return medianCase;
} //This might better be altered to determine median for EVERY year and plug that into a new array that it returns instead of just returning the median final value.
function returnWrstHistoricalCase(allSimulationsArray) {
    const NUM_SIMS = allSimulationsArray.length;
    const LNG_OF_SIM = allSimulationsArray[0].length;
    let finalIndex = (LNG_OF_SIM - 1);
    let worstCaseFinal = Infinity;
    let worstCase;
    for (let sim of allSimulationsArray) {
        if (sim[finalIndex] < worstCaseFinal) {
            worstCaseFinal = sim[finalIndex];
            worstCase = sim;
        }
    }
    return worstCase;
}
function returnBestHistoricalCase(allSimulationsArray) {
    const NUM_SIMS = allSimulationsArray.length;
    const LNG_OF_SIM = allSimulationsArray[0].length;
    let finalIndex = (LNG_OF_SIM - 1);
    let bestCaseFinal = -Infinity;
    let bestCase;
    for (let sim of allSimulationsArray) {
        if (sim[finalIndex] > bestCaseFinal) {
            bestCaseFinal = sim[finalIndex];
            bestCase = sim;
        }
    }
    return bestCase;
}
function arrayToObjectWithAge(array) {
    let object = {};
    let i = 0;
    let age = Math.ceil(user['age']);
    const LNG = array.length;
    // console.log(array);
    for (i; i < LNG; i++) {
        object[age] = array[i];
        // console.log(`${age} | ${i}`);
        age++;
    }
    return object;
}

function assessPlan() {
    fillInUser();
    fillInAccounts();
    fillInSteps();
    runSimulation();
    let wrst = arrayToObjectWithAge(returnWrstHistoricalCase(allSimulations));
    let best = arrayToObjectWithAge(returnBestHistoricalCase(allSimulations));
    let avrg = arrayToObjectWithAge(returnAvrgHistoricalCase(allSimulations));
    let medn = arrayToObjectWithAge(returnMednHistoricalCase(allSimulations));
    console.log(`Summary of all historical cases:`)
    console.log(allSimulations);
    console.log('Worst historical case:');
    console.log(wrst);
    console.log('Median historical case:');
    console.log(medn);
    console.log('Average historical case:');
    console.log(avrg);
    console.log('Best historical case:');
    console.log(best);
}

function inputToObject(inputHandle, object, property) {
    let value = $(inputHandle).val();
    object[property] = value;
}
function fillInUser() {
    let dob = $('input#dob').val();
    user['age'] = dobToAge(dob);
    inputToObject('input#aggInt', user, 'aggInt');
    // console.log(user);
}
function fillInAccounts() {
    for (let prop in accounts) {
        accounts[prop] = 0;
    }
    let dbt = Number($('input#debts').val());
    accounts['debts'] = dbt;
    let num_acnts = $('div.account').length;
    let i = 1;
    for (i; i <= num_acnts; i++) {
        let accountName = $(`#acnt-mrkt-${i}`).val();
        let accountVal = Number($(`#acnt-val-${i}`).val());
        accounts[accountName] += accountVal;
    }
    // console.log(num_acnts);
    // console.log(accounts);
}
function fillInSteps() {
    steps = [];
    let num_stps = $('div.step').length;
    let i = 1;
    for (i; i <= num_stps; i++) {
        let stepStart = $(`#step-strt-${i}`).val();
        let stepEnd = $(`#step-end-${i}`).val();
        let stepMarket = $(`#step-mrkt-${i}`).val();
        let stepType = $(`#step-type-${i}`).val();
        let stepAmount = $(`#step-val-${i}`).val();
        steps.push(new Step(stepStart, stepEnd, stepMarket, stepType, stepAmount));
    }
    // console.log(num_stps);
    // console.log(steps);
}


/*--------------------- USER INTERFACE -------------------------------*/
let initialAccounts = 0;
let initialPlans = 0;
$('button.add-account').on('click', function() {
    initialAccounts++;
    $('button.add-account').before(`    <div class='account'>
                                        <div class='input'>
                    						<label for='acnt-val-${initialAccounts}'>Value</label>
                    						<input type='number' id='acnt-val-${initialAccounts}' step="100" min="0">
                    					</div>
                    					<div class='input'>
                    						<label for='acnt-mrkt-${initialAccounts}'>Market</label>
                    						<select id='acnt-mrkt-${initialAccounts}'>
                                                <option value='sAndP'>S and P 500</option>
                                                <option value='tenYearBond'>10 Year Bond</option>
                                            </select>
                    					</div>
                    				</div>`
    )
});
$('button.add-step').on('click', function() {
    initialPlans++;
    let dob = $('#dob').val();
    let age = dobToAge(dob);
    $('button.add-step').before(`<div class='step'>
                                        <div class='time-frame'>
                                            <div class='input'>
                        						<label for='step-strt-${initialPlans}'>Start (age)</label>
                        						<input type='number' id='step-strt-${initialPlans}' min='${age}' max='90'>
                        					</div>
                                            <div class='input'>
                                                <label for='step-end-${initialPlans}'>End (age)</label>
                                                <input type='number' id='step-end-${initialPlans}' min='${age}' max='90'>
                                            </div>
                                        </div>
                                        <div class='values'>
                        					<div class='input'>
                        						<label for='step-mrkt-${initialPlans}'>Market</label>
                        						<select id='step-mrkt-${initialPlans}'>
                                                    <option value='debts'>Debts</option>
                                                    <option value='sAndP'>S and P 500</option>
                                                    <option value='tenYearBond'>10 Year Bond</option>
                                                </select>
                        					</div>
                                            <div class='input'>
                        						<label for='step-type-${initialPlans}'>Type</label>
                        						<select id='step-type-${initialPlans}'>
                                                    <option value='debt-repay'>Repay Debt</option>
                                                    <option value='investment'>Investment</option>
                                                    <option value='withdraw'>Withdrawal</option>
                                                </select>
                        					</div>
                                            <div class='input'>
                                                <label for='step-val-${initialPlans}'>Amount</label>
                                                <input type='number' id='step-val-${initialPlans}' step='50'>
                                            </div>
                                        </div>
                    				</div>`
    )
});
$('button.assess').on('click', function() {
    // console.log('click');
    assessPlan();
});

/*-------------------- RESTRICTING INPUTS ---------------------------*/
