var source = $("#some-template").html(); 
var template = Handlebars.compile(source); 

var data = { 
    users: [ { 
        person: {
            firstName: "Tharaka", 
            lastName: "Wije"
        },
        jobTitle: "Front End Technical Lead",
        twitter: "gazraa" 
    }, {
        person: {
            firstName: "Tharaka", 
            lastName: "W"
        }, 
        jobTitle: "Photographer",
        twitter: "photobasics"
    }, {
        person: {
            firstName: "Tharaka", 
            lastName: "S"
        }, 
        jobTitle: "LEGO Geek",
        twitter: "minifigures"
    } ]
}; 

Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
});

$('body').append(template(data));