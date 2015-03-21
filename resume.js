Handlebars.registerHelper('log', function(obj) {
	console.log(obj);
});

Handlebars.registerHelper('flat', function(items) {
	var result = '';
	for ( var index = 0; index < items.length; index++ ) {
		var item = items[index].title ? items[index].title : items[index];
		result += index === 0 ? item : ', ' + item;
	}

	return result;
});

Handlebars.registerHelper('experience_item', function (company) {
	console.log(company);
	var index = company.positions.length;
	while(index--) {
		var enabled = company.positions[index].enabled;
		if (! isEnabled(enabled)) {
			company.positions.splice(index, 1);
		}
	}

	if (company.positions.length == 0)
		return;

	var item = loadTemplateById('#experience-item');
	return new Handlebars.SafeString(item(company));
});

function isEnabled(enabled) {
	return enabled.indexOf('web') != -1;
}

function loadTemplateById( id ) {
	return Handlebars.compile($(id).html());
}

function loadResume( resume ) {
	var title = loadTemplateById('#title');
	var experience = loadTemplateById('#experience');
	var education = loadTemplateById('#education');
	var items = loadTemplateById('#items');
	var flat_items = loadTemplateById('#flat-items');

	var page = $('#main');
	page.append(title(resume));
	page.append(experience(resume.professionalexperience));
	page.append(education(resume.education));
	page.append(items(resume.awards));
	page.append(flat_items(resume.languages));
}

function error( result ) {
	console.log('Failed to load resume: ' + result);
}

$.getJSON('resume.json').then(loadResume, error);
