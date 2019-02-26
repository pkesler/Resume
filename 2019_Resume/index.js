'use strict';

var resume;
var greekedResume;
var toggleResume;

$(document).ready(function() {
    $('#highlights').click(collapseHigh);
    $('#experience').click(collapseExp);
    $('#education').click(collapseEd);
    $.getJSON('https://gist.githubusercontent.com/pkesler/22393d21a20eb23fabce668908a9b285/raw/19b7c5bd1b99dd5811530cb11c94e66b4bdbb4da/resume.json', function(json) {
        resume = json;
        displayFromJson(resume);
    });
});

$(document).on('click', '#easterEgg', function() {

    if (greekedResume == null) {
        $.getJSON('https://gist.githubusercontent.com/pkesler/11aa57db7dbdea81abe0dc8e9aa9ee15/raw/bd37766fabd01bff7f6f71b65a5a9055f4ab56bb/greekedResume.json', function(json) {
            greekedResume = json;
            toggleResume = greekedResume;
            displayFromJson(toggleResume);
            toggleResume = resume;
        });
    } else if (toggleResume == greekedResume) {
        displayFromJson(toggleResume);
        toggleResume = resume;
    } else {
        displayFromJson(toggleResume);
        toggleResume = greekedResume;
    }

});

function collapseHigh() {
    $('#highBox').toggle();
}

function collapseExp() {
    $('#expBox').toggle();
}

function collapseEd() {
    $('#edBox').toggle();
}

function displayFromJson(currentResume) {
    //$('.name').html(currentResume.name);
    $('#leftHighlight').html(displayLeftHighlights(currentResume));
    $('#rightHighlight').html(displayRightHighlights(currentResume));
    $('#expBox').html(displayExperience(currentResume));
    $('#edBox').html(displayEducation(currentResume));
    $('#myFoot').html(
        '<p>' + currentResume.email + ' | ' +
        currentResume.phone + ' | ' +
        '<a href="https://www.linkedin.com/in/pkesler/" target="_blank">' + currentResume.linkedin + '</a>' + ' | ' +
        '<a href="https://github.com/pkesler" target="_blank">' + currentResume.github + '</a>' + '</p>'
    );
}

function displayLeftHighlights(currentResume) {
    var leftHighlights = '';
    for (var hl of currentResume.leftHighlights) {
        leftHighlights += '&#9702; ' + hl.hl + '<br>';
    }
    return leftHighlights;
}

function displayRightHighlights(currentResume) {
    var rightHighlights = '';
    for (var hl of currentResume.rightHighlights) {
        rightHighlights += '&#9702; ' + hl.hl + '<br>';
    }
    return rightHighlights;
}

function displayExperience(currentResume) {
    var expString = '';
    for (var exp of currentResume.experience) {
        expString += '<div>' + '<h4>' + exp.company + '</h4>' + '<p>';
        for (var desc of exp.descriptions) {
            expString += '&#9702; ' + desc.desc + '<br>';
        }
        expString += '</p>' + '</div>';
    }
    return expString;
}

function displayEducation(currentResume) {
    var edString = '';
    for (var ed of currentResume.educations) {
        edString += '<div>' + '<h4>' + ed.name + '</h4>';
        for (var deg of ed.degrees) {
            edString += '<p>' + deg.degree + '</p>';
        }
        edString += '</div>';
    }
    return edString;
}