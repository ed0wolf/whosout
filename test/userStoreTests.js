var assert = require('assert');
var UserStore = require('../src/userStore');

describe('UserStore', function() {
	describe('when constructing a new user store', function() {
		var userStore;
		var userkey;
		beforeEach(function() {
			userStore = new UserStore();
		});

		it('should have an empty users object', function() {
			assert.equal(Object.keys(userStore.users).length, 0);
		});

		describe('when adding a new user', function() {
			var user = {username: 'bruce1234'};
			beforeEach(function() {
				userkey = userStore.add(user);
			});
			
			it('should not return null' ,function() {
				assert.notEqual(userkey, null);
			});

			it('should have added the user', function(){
				assert.equal(userStore.users[userkey], user);
			});
		});

		describe('when adding the same user who already exists', function() {
			var user = {username: 'teddy'};
			var firstUserkey, secondUserkey;
			beforeEach(function() {
				firstUserkey = userStore.add(user);
				secondUserkey = userStore.add(user);
			});

			it('should return two different userkeys', function(){
				assert.notEqual(firstUserkey, secondUserkey);
			});

			it('should contain the user at the second user key', function(){
				assert.equal(userStore.get(secondUserkey), user);
			});

			it('should contain the user at the original user key', function(){
				assert.equal(userStore.get(firstUserkey), user);
			});
		});

		describe('when calling add without key', function() {
			beforeEach(function() {
				userkey = userStore.add(null);
			});

			it('should return false', function(){
				assert.equal(userkey, null);
			});

			it('should not have added anything', function() {
				assert.equal(Object.keys(userStore.users).length, 0);
			});
		});

		describe('when getting user', function(){
			var result;
		 	describe('which does not exist', function(){
				beforeEach(function(){
					result = userStore.get('some-userkey');
				});

				it('should have returned null', function(){
					assert.equal(result, null);
				});
			});

			describe('which does exist', function(){
				var user = {username: 'wallace'};
				beforeEach(function(){
					result = userStore.get(userStore.add(user));
				});

				it('should return the user', function() {
					assert.equal(result, user);
				});
			});
		});
	});
});
