/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// There are three sections; Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the contents as the code for a new Lambda function, using the alexa-skill-kit-sdk-factskill template.
// This code includes helper functions for compatibility with versions of the SDK prior to 1.0.9, which includes the dialog directives.


 // 1. Text strings =====================================================================================================

var data = [
    {
    "reward": {
       "type": "flight",
       "destination": "Denver",
       "points": 25000,
     },
   },
   {
     "reward": {
        "type": "flight",
        "destination": "Denver",
        "points": 25000,
      },
    },
    {
      "reward": {
         "type": "flight",
         "destination": "Denver",
         "points": 25000,
       },
   },];

var points = 24800;

var speechOutput = '';
var reprompt;
var welcomeOutput = "Welcome to Capital One's Rewards Plan. Your access to personalized advice on how to spend and save your rewards. Ask how many rewards you have or how many points to your next reward.";
var welcomeReprompt = "You can find out how many points you have or discover what you can get by accumulating more points. Ask how many rewards you have or how many points to your next reward.";

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
	'GetPointsIntent': function () {
        var accumulatedPoints = usersPoints();
        console.log(data[1].reward.type);
        speechOutput = "You have " + accumulatedPoints.toLocaleString('en-US') + " Capital One rewards points.";
        this.emit(':tell', speechOutput);
    },
    'GetPointsToNextMilestone': function () {
        speechOutput = "";
        reprompt = "";
        this.emit(':ask', speechOutput, reprompt);
    },
    'GetRewardsIntent': function () {
        speechOutput = "";
        reprompt = "";
        this.emit(':ask', speechOutput, reprompt);
    }
};

// 3. Functions  =================================================================================================

function usersPoints() {
    return points;
}

function usersRewards () {
    var loops = 0;
    var qualifyingRewards = [];
    Object.keys(data.starSignDates).some( function(reward) {
        if( qualifiesForReward(reward) && loops < 2) {
            loops += 1;
            qualifyingRewards += reward;
        }
    });
}
