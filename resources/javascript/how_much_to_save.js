$( document ).ready(function() {
    "use strict";

/*---Initialize variables that will be used in user input---*/
    let desLiv;
    let mrkt;
    /*-----*/
    let minInv = 50000;
    let maxInv = 1000000;
    let invStp = 50000;
    /*-----*/
    let minYrs = 5;
    let maxYrs = 50;
    let yrsStp = 5;

/*---Table Functionality---*/
    /* Returns an array of interest adjusted balances starting with a start year and going for a set number of years, assuming a yearly withdrawal and initial investment. */
    function accountBalances(mrkt, initInv, yrlyWithdrwl, strtYr, numYrs) {
        let yr, balances, balance, IAbalance, IAbalances;
        yr = strtYr;
        balances = []; // The balances array isnt actually used, but is not to be removed because it could be useful if for some reason user doesn't wan't an interest adjusted answer
        balance = initInv;
        IAbalance;
        IAbalances = [];
        for (yr; yr <= (strtYr + numYrs); yr++) {
            balances.push(balance);
            IAbalance = Math.floor(adjustForInflation(balance, yr, strtYr));
            if (IAbalance <= 0) {
                IAbalances.push(0); // If the interest adjusted balance is negative or zero just push 0 so that further balances are also zero
            }
            else {
                IAbalances.push(IAbalance);
            }
            let percentChange = mrkt[yr];
            balance = Math.floor((balance - adjustForInflation(yrlyWithdrwl, strtYr, yr)) * (100 + percentChange) / 100);
        }
        return IAbalances;
    }
    /* Returns true if the array argument has no zero values. Simulates that user's money has lasted the tested number of years. */
    function allBalancesAboveZero(balancesArray) {
        let sortedBalances = balancesArray.sort(function(a,b) {
            return a - b;
        });
        if (sortedBalances[0] > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    /* Goes through every historical case possible over the number of years specified and determines the % of those cases where the money lasted the tested number of years. As a side note, by returning the cases instead of the percentage and eliminating the allBalancesAboveZero function it will return an array of arrays with all of the interest adjusted balances as a 2-D array*/
    function percentHistoricalBalancesAboveZero(initInv, numYrs, strtYr) {
        let cases, yr, casesAsString, trueCases, totalCases, percentage;
        cases = [];
        yr = strtYr;
        for (yr; yr <= (2017 - numYrs); yr++) {
            cases.push(allBalancesAboveZero(accountBalances(mrkt, initInv, desLiv, yr, numYrs)));
        }
        casesAsString = cases.join('');
        if (/true/.test(casesAsString)) {
            trueCases = casesAsString.match(/true/g).length;
        }
        else {
            trueCases = 0;
        }
        totalCases = cases.length;
        percentage = Math.round((trueCases / totalCases) * 100);
        return percentage;
    }
    /* Goes through every investment value starting with minInv and increasing by invStp then goes through every duration starting with minYrs and increasing by yrsStp and the returns a single cases object which has the investment amount as it's property key and the % of instances where that investment was enough for each duration interval in an array. */
    function generateCases() {
        let startYear, cases, inv;
        desLiv = $('section.user-info input').val();
        mrkt = $('section.user-info select').val();
        mrkt = markets[mrkt];
        for (let yr in mrkt) {
            startYear = Number(yr); // This sets the starting year to the first property key value of the current market used. If there is a better way though this should be changed because it could cause bugs in certain browsers
            break;
        }
        console.log(startYear);
        cases = {};
        inv = minInv;
        for (inv; inv <= maxInv; inv += invStp) {
            let years, successByInv;
            years = minYrs;
            successByInv = []; // This is the array of success percentages for a given investment (ie. $150,000 -> [50%, 43%, 32%, 11%...])
            for (years; years <= maxYrs; years += yrsStp) {
                let successRate = percentHistoricalBalancesAboveZero(inv, years, startYear)
                successByInv.push(successRate);
            }
            cases[inv] = successByInv;
        }
        return cases;
    }
    /* Goes through each td element in the table element and colors it according to it's value. The lowest hue possible is 0 (0%) and the highest hue possible is 120 (100%) */
    function colorChart() {
        let table, dataCells, i, LNG;
        table = $('table.historical-confidence-table');
        dataCells = table.find('td');
        i = 0;
        LNG = dataCells.length;
        for (i; i < LNG; i++) {
            let thisCell, thisValue, thisHue, thisColor;
            thisCell = dataCells[i];
            thisValue = $(thisCell).html();
            thisValue = parseInt(thisValue);
            thisHue = thisValue * 1.2;
            thisColor = `hsla(${thisHue}, 100%, 70%, 1)`;
            $(thisCell).css('background-color', thisColor)
        }
    }
    /* Converts the cases object into an html string corresponding to a table with the data relevant to the user inputs and then replaces the table's current html with the created string. Finally it calls the colorChart function in order to color the newly generated table.*/
    function generateTable() {
        let cases, table, tableStr;
        cases = generateCases();
        table = $('table.historical-confidence-table');
        tableStr = `<tr>
        					<th></th>
        					<th>5 Yrs</th>
        					<th>10 Yrs</th>
        					<th>15 Yrs</th>
        					<th>20 Yrs</th>
        					<th>25 Yrs</th>
        					<th>30 Yrs</th>
        					<th>35 Yrs</th>
        					<th>40 Yrs</th>
        					<th>45 Yrs</th>
        					<th>50 Yrs</th>
        				</tr>`;
        for (let amount in cases) {
            let amountStr, tableRow, percentages
            amountStr = numberToDollarString(amount);
            tableRow = `<tr><th>${amountStr}</th>`;
            percentages = cases[amount];
            for (let p of percentages) {
                tableRow += `<td>${p}%</td>`
            }
            tableRow += `</tr>`;
            tableStr += tableRow;
        }
        table.html(tableStr);
        colorChart();
    }
    /* Updates the table whenever an input is changed */
    $('section.user-info input').change(function() {
        generateTable()
    });
    $('section.user-info select').change(function() {
        generateTable()
    });
});
