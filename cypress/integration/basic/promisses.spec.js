/// <reference types="cypress" />

// const getSomething = () => {
//     setTimeout(() =>{
//         console.log('Respondendo...')
//         return 11;
//     }, 1000)
// }

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(10);
        }, 1000)
    })
}

const system = () => {
    console.log('init');
    // const something = getSomething();
    // console.log(`Something is: ${something}`);
    getSomething().then(some => {
        console.log(`Something is: ${some}`)
    });
    console.log('end');
}

system();