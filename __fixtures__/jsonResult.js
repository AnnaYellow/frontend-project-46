const jsonResult = '{"type":"root","children":[{"type":"nested","name":"common","children":[{"type":"only2","name":"follow","value":false},{"type":"identical","name":"setting1","value":"Value 1"},{"type":"only1","name":"setting2","value":200},{"type":"different","name":"setting3","value":true,"value2":null},{"type":"only2","name":"setting4","value":"blah blah"},{"type":"only2","name":"setting5","value":{"key5":"value5"}},{"type":"nested","name":"setting6","children":[{"type":"nested","name":"doge","children":[{"type":"different","name":"wow","value":"","value2":"so much"}]},{"type":"identical","name":"key","value":"value"},{"type":"only2","name":"ops","value":"vops"}]}]},{"type":"nested","name":"group1","children":[{"type":"different","name":"baz","value":"bas","value2":"bars"},{"type":"identical","name":"foo","value":"bar"},{"type":"different","name":"nest","value":{"key":"value"},"value2":"str"}]},{"type":"only1","name":"group2","value":{"abc":12345,"deep":{"id":45}}},{"type":"only2","name":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]}';
export default jsonResult;
