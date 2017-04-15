
'use strict';

//let moment = require('moment');  // Moment is just too good not to use
let gas = require('gas-local');
let ejs = require('ejs');
let Document = require('./stubs/document.js');
let Spreadsheet = require('./stubs/spreadsheet.js');

const sourcePath = 'dev';

let hooksForMocks = {

	production: false,

	FormApp: {
		getActiveForm: function () {
			/* return new Form(); */
		},
	},

	DocumentApp: {
		getActiveDocument: function () {
			/* return new Document(); */
		},
	},

	SpreadsheetApp: {
		active: null,

		/*
			Have to hold the same one otherwise we create more than one 
			within each iteration
		*/
		getActiveSpreadsheet: function () {
			if (this.active == null) {
				this.active = new Spreadsheet();
			}
			return this.active;
		},

		/*
			Have to hold the same one otherwise we create more than one 
			within each iteration
		*/
		openById: function (id) {
			if (this.active == null) {
				this.active = new Spreadsheet();
			}
			return this.active;
		},
	},

	//Moment: moment,

	__proto__: gas.globalMockDefault,

};

//hooksForMocks.Moment.load = function () {};  // load is part of GAS ecosystem

try {
	var virtual = gas.require('./' + sourcePath, hooksForMocks);
} catch (err) {
	throw Error("No development folder. Have you run a scaffold with yeo yet?");
}


// Passed into include in order to ensure templates have virtual source too
virtual.virtual = function () { 
	return gas.require('./' + sourcePath, hooksForMocks);
};

module.exports = virtual;