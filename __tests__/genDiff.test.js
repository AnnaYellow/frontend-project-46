import genDiff from '../src/genDiff.js'

const difference = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}'

test('gendiff', () => {
    //expect(genDiff('../file1.json', '../file1.json')).toEqual(difference);
    expect(genDiff('/home/annayellow/frontend-project-46/file1.json', '/home/annayellow/frontend-project-46/file2.json')).toEqual(difference);
    //expect(genDiff('', '')).toEqual(null);
    //expect(genDiff('../file1.json', '../file1.js')).toEqual(null);
})