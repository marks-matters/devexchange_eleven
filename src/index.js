/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// There are three sections; Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the contents as the code for a new Lambda function, using the alexa-skill-kit-sdk-factskill template.
// This code includes helper functions for compatibility with versions of the SDK prior to 1.0.9, which includes the dialog directives.


 // 1. Text strings =====================================================================================================

var data = [
{
"type": "a flight to",
"destination": "Denver",
"points": 25000
},
{
"type": "a flight to",
"destination": "Orlando",
"points": 25000
},
{
"type": "a flight to",
"destination": "New York",
"points": 25000
},
{
"type": "a flight to",
"destination": "Seattle",
"points": 45000
},
{
"type": "a flight to",
"destination": "Los Angeles",
"points": 50000
},
{
"type": "dinner at",
"destination": "PePe la Pew",
"points": 3500
},
{
"type": "dinner at",
"destination": "Welly's",
"points": 2000
},
{
"type": "dinner at",
"destination": "Wildwood",
"points": 4000
},
{
"type": "dinner at",
"destination": "Bolton Tarven",
"points": 1000
},
{
"type": "a spa day at",
"destination": "Body Love",
"points": 10000
},
{
"type": "a spa day at",
"destination": "Mistress Love",
"points": 15000
},
{
"type": "a spa day at",
"destination": "Creature Comforts",
"points": 13000
},
{
"type": "a Gift Card to spend at",
"destination": "Home Depot",
"points": 7000
},
{
"type": "a Gift Card to spend at",
"destination": "Amazon",
"points": 8000
},
{
"type": "a Gift Card to spend at",
"destination": "Tiffany's",
"points": 9000
},
{
"type": "the world as your",
"destination": "oyster",
"points": 100000000
}
];

var userRewardPoints = getRandomInt(1000, 100000);
var nextRewardRequiredPoints;
var qualifyingRewards = [];

var speechOutput = '';
var reprompt;
var welcomeOutput = "Welcome to Capital One's Rewards Capitalizer. Your access to personalized advice on how to spend and save your rewards. Ask how many points you have or what you can do with them.";
var welcomeReprompt = "You can find out how many points you have or discover what you can get by accumulating more points. Ask how many points you have or what you can do with them.";

const appId = ''; // TODO insert App ID here
const AWSregion = 'us-east-1';

 // 2. Skill Code =======================================================================================================
"use strict";
var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');

AWS.config.update({
    region: AWSregion
});

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
          this.emit(':ask', welcomeOutput, welcomeReprompt);
    },
	'AMAZON.HelpIntent': function () {
        speechOutput = "";
        reprompt = "";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = 'Goodbye';
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        speechOutput = 'Goodbye';
        this.emit(':tell', speechOutput);
    },
    'SessionEndedRequest': function () {
        speechOutput = 'Goodbye';
        this.emit(':tell', speechOutput);
    },
<<<<<<< HEAD
	'GetAccountsListIntent': function () {
        speechOutput = "You have a Visa and a Platinum Visa account.";
        reprompt = "";
        this.emit(':ask', speechOutput, reprompt);
    },
=======
    
    //////////////////////////////
    
>>>>>>> 5d0710b8ce33d4e67eacf8f27e25477b1448a780
	'GetPointsIntent': function () {
        var accumulatedPoints = usersPoints();
        speechOutput = "You have " + accumulatedPoints.toLocaleString('en-US') + " Capital One rewards points.";
        reprompt = "";
        this.emit(':ask', speechOutput, reprompt);
    },
    'GetPointsToNextMilestone': function () {
        var userAwards = usersRewards();
        var deficitPoints = deficitRewardPoints();
        speechOutput = "You need " + deficitRewards.toLocaleString('en-US') + " more points you can get " + userAwards[2];
        this.emit(':tell', speechOutput);
    },
    'GetRewardsIntent': function () {
        var accumulatedPoints = usersPoints();
        var userAwards = usersRewards();
        var deficitPoints = deficitRewardPoints();
        speechOutput = "With your " + accumulatedPoints.toLocaleString('en-US') + " reward points, you can get " + userAwards[0] + " or " + userAwards[1] + ". Based on your previous purchases, may I recommend "  + userAwards[2] + ", you only need " + deficitPoints.toLocaleString('en-US')  + " more points.";
        this.emit(':tell', speechOutput);
    }
};

// 3. Functions  =================================================================================================

function usersPoints() {
    return userRewardPoints;
}

function usersRewards () {
    var loops = 0;
    qualifyingRewards = [];
    for (var i = 0; i < data.length; i++) {
        if( qualifiesForReward( data[i].points ) && loops < 2) {
            loops += 1;
            qualifyingRewards.push(data[i].type + " " + data[i].destination);
        }
    };
    if ( qualifyingRewards.length == 0 ) {
        qualifyingRewards.push("nothing");
        qualifyingRewards.push("just happiness with your current level of points.");
    }
    for (var i = 0; i < data.length; i++) {
        if( qualifiesForReward( data[i].points ) ) {
        } else if ( loops < 3 ) {
            loops += 1;
            qualifyingRewards.push(data[i].type + " " + data[i].destination);
            nextRewardRequiredPoints = data[i].points;
        }
    };
    return qualifyingRewards;
}

function qualifiesForReward ( requiredPoints ) {
    console.log("rp:" + requiredPoints);
    if ( requiredPoints <= userRewardPoints ) {
        return true;
    } else {
        return false;
    }
}

function deficitRewardPoints() {
    return (nextRewardRequiredPoints - userRewardPoints);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
