import platforms from '../js/platforms.js';


export const breakingBad = {
    name: 'Breaking Bad',
    cover: '/src/movieCovers/breakingBad.jpeg',
    year: '2008',
    duration: '5 Temporadas',
    gender: ['Crimen', 'Suspenso', 'Gánsteres', 'Suspenso', 'Humor negro'],
    trailer: 'https://www.youtube.com/watch?v=mXd1zTwcQ18&ab_channel=AMCLatinoam%C3%A9rica',
    sinopsis: `Un profesor de química con cáncer terminal se asocia con un exalumno suyo para fabricar y vender metanfetamina a fin de que su familia no pase apuros económicos.`,
    type: 'series',
    platforms: [platforms.netflix.name],
    id: 0
}

export const betterCallSaul = {
    name: 'Better Call Saul',
    cover: '/src/movieCovers/betterCallSaul.jpeg',
    year: '2015',
    duration: '6 Temporadas',
    gender: ['Humor negro', 'Tragedia', 'Drama legal', 'Crimen'],
    trailer: `https://www.youtube.com/watch?v=PjElOuIECdE&t=4s`,
    sinopsis: `Esta precuela de "Breaking Bad" nominada al Emmy narra la vida del picapleitos Jimmy McGill y su transformación en Saul Goodman, el abogado de moral laxa. Ve todo lo que quieras. Esta precuela de "Breaking Bad" fue nominada a los Emmy al mejor drama, mejor actor protagonista y actor de reparto.`,
    type: 'series',
    platforms: [platforms.netflix.name],
    id: 1
}

export const series = [
    breakingBad,
    betterCallSaul
];

export default series;

