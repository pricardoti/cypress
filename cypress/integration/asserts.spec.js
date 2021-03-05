/// <reference types="cypress" />

it('Equality', () =>{
    const a = 1;

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(2);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b');
})

it('Truthy', () =>{

    const a = true;
    const b = null;
    let c;

    expect(true).to.be.true;
    expect(a).to.be.true;

    expect(null).to.be.null;
    expect(b).to.be.null;
    expect(a).to.be.not.null;

    expect(a).to.be.not.undefined;
    expect(b).to.be.not.undefined;
    expect(c).to.be.undefined;
})

it('Objects', () =>{
    const obj = {
        a: 1,
        b: 2
    };

    // Formas sememlhantes de validar objetos
    expect(obj).equal(obj);
    expect(obj).equals(obj);
    expect(obj).eq(obj);
    expect(obj).to.be.equal(obj);

    // Comparação de referencia de memoria e não de valor
    // expect(obj).to.be.equal({ a: 1, b: 2});
    // expect(obj).to.be.equal({ a: 1, b: 2});

    // compara os atributos/valores
    expect(obj).to.be.deep.equal({ a: 1, b: 2});
    expect(obj).eql({ a: 1, b: 2});

    expect(obj).include({ a: 1 });
    expect(obj).includes({ b: 2 });

    expect(obj).to.have.property('b');
    expect(obj).to.have.property('b', 2);

    expect(obj).to.be.not.empty;
    expect({}).to.be.empty;
})

it('Arrays', () =>{
    const itens = [1, 2, 3];
    expect(itens).to.have.members([1, 2, 3]);
        
    // Nestes formato falha o teste
    // expect(itens, 'O members não verifica apenas um item').to.have.members([2]);
    // expect(itens).to.have.include([2]);

    expect(itens).to.have.include(2);
    expect(itens).to.not.have.include(4);

    expect(itens).to.be.not.empty;
    expect([]).to.be.empty;
})

it('Types', () =>{
    const num = 1;
    const str = 'String';

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');

    expect({}).to.be.a('object');
    expect([]).to.be.a('array');

    expect(new Map()).to.be.a('map');
    expect(function() {}).to.be.a('function');
    expect(() => {}).to.be.a('function');
})

it('Strings', () => {
    const str = 'String de testes';
    expect(str).to.be.equal('String de testes');
    expect(str).to.be.not.empty;
    expect(str).to.have.length(16);
    expect(str).to.have.contains('testes');
    
    // Regex
    expect(str).to.match(/^String/); 
    expect(str).to.match(/testes$/);
    expect(str).to.match(/.{15}/);
    expect(str).to.match(/\w+/);
    expect(str).to.match(/\D+/);
})

it('Numbers', () => {
    const intNumber = 4;
    const floatNumber = 5.123;

    expect(intNumber).to.be.equal(4);
    expect(intNumber).to.be.above(3); // Maior
    expect(intNumber).to.be.below(8); // Menor

    expect(floatNumber).to.be.equal(5.123);
    expect(floatNumber).to.be.closeTo(5.1, 0.1); // Precisão de uma casa decimal
    expect(floatNumber).to.be.closeTo(5.1, 0.1);
    expect(floatNumber).to.be.above(5);
})
