"use strict";

var test = require("simple-test-framework");
var validvaluepicker = require('../lib/validvaluepicker.js');

var objectToTest = {
  "a": "Hi there",
  "b": "Message 2",
  "c": {
    "ca": "Message 3"
  }
};

test("Your project works",function(t) {
  t.check(
    validvaluepicker.pick(objectToTest, [
      "a"
    ]) == "Hi there"
  );
  t.check(
    validvaluepicker.pick(objectToTest, [
      "c=>ca"
    ]) == "Message 3"
  );
  t.check(
    validvaluepicker.pick(objectToTest, [
      "c=>blahblah",
      "c=>ca",
      "a",
    ]) == "Message 3"
  );
  t.check(
    validvaluepicker.pick(objectToTest, [
      "a",
      "c=>ca",
    ]) == "Hi there"
  );
  t.check(
    validvaluepicker.pick(objectToTest, [
      "blah",
      "c=>blahblah",
    ]) == ""
  );

  t.finish();
});
