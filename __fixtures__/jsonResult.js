const jsonResult = '{"name":"tree","children":[{"name":"common","children":[{"name":"follow","value":false,"status":"added"},{"name":"setting1","value":"Value 1","status":"unchanged"},{"name":"setting2","value":200,"status":"removed"},{"name":"setting3","value":true,"newValue":null,"status":"updated"},{"name":"setting4","value":"blah blah","status":"added"},{"name":"setting5","value":{"key5":"value5"},"status":"added"},{"name":"setting6","children":[{"name":"doge","children":[{"name":"wow","value":"","newValue":"so much","status":"updated"}],"status":"node"},{"name":"key","value":"value","status":"unchanged"},{"name":"ops","value":"vops","status":"added"}],"status":"node"}],"status":"node"},{"name":"group1","children":[{"name":"baz","value":"bas","newValue":"bars","status":"updated"},{"name":"foo","value":"bar","status":"unchanged"},{"name":"nest","value":{"key":"value"},"newValue":"str","status":"updated"}],"status":"node"},{"name":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"name":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"status":"added"}]}';
export default jsonResult;
