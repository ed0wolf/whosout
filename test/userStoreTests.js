var assert = require('assert');
var UserStore = require('../src/userStore');

describe('UserStore', function() {
	describe('when constructing a new user store', function() {
		var userStore;
		beforeEach(function() {
			userStore = new UserStore();
		});

		it('should have an empty users object', function() {
			assert.equal(Object.keys(userStore.users).length, 0);
		});

		describe('when adding a new ', function() {
			var user = {username: 'bruce1234'};
			var username = 'some-username';
			var resultvalue;
			beforeEach(function() {
				resultValue = userStore.add(username, user);
			});
			
			it('should return true' ,function() {
				assert.equal(resultValue, true)
			});

			it('should have added the user', function(){
				assert.equal(userStore.users[username], user);
			});
		});

		describe('when calling add without key', function() {
			var isAdded;
			beforeEach(function() {
				isAdded = userStore.add(null, null);
			});

			it('should return false', function(){
				assert.equal(isAdded, false);
			});

			it('should not have added anything', function() {
				assert.equal(Object.keys(userStore.users).length, 0);
			});
		});

		describe('when getting user', function(){
			var result;
		 	describe('which does not exist', function(){
				beforeEach(function(){
					result = userStore.get('some-username');
				});

				it('should have returned null', function(){
					assert.equal(result, null);
				});
			});

			describe('which does exist', function(){
				var username = 'some-username';
				var user = {user: 'details'};
				beforeEach(function(){
					userStore.add(username, user);
					result = userStore.get(username);
				});

				it('should return the user', function() {
					assert.equal(result, user);
				});
			});
		});
	});
});
