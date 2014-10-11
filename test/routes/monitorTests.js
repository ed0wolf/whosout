var assert = require('assert'),
	sinon = require('sinon');
var monitor = require('../../src/routes/monitor');

describe('monitor route', function() {
	describe('when calling monitor', function() {
		var res;
		var end;
		beforeEach(function() {
			end = sinon.spy();
			res = {
				status: sinon.stub().returns({end: end})
			};
			monitor(null, res);
		});

		it('should set a 201 status code', function() {
			assert(res.status.calledWith(201));
		});

		it('should call end', function() {
			assert(end.called);
		});
	});
});
