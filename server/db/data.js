let idx=0;
const quotes = [
    {id:idx++,message: "Elementary, my dear Watson", author: "Sherlock Holmes"},
    {id:idx++,message: 'I think therefore I am', author: "Rene Descartes"},
    {id:idx++,message: 'Life is like riding a bicycle. To keep your balance, you must keep moving', author: "Albert Einstein"},
    {id:idx++,message: "You talkin' to me?", author: "Travis Bickle"}
];

exports.getQuotes = (id) =>{
    return quotes.find(q=>q.id===+id);
};