const express = require('express');
const router = express.Router();

const manga = [
    {id: 1, nama: 'Manga Bagus1'},
    {id: 2, nama: 'Manga Bagus2'},
    {id: 3, nama: 'Manga Bagus3'},
    {id: 4, nama: 'Manga Bagus4'},
    {id: 5, nama: 'Manga Bagus5'},
    {id: 6, nama: 'Manga Bagus6'},
    {id: 7, nama: 'Manga Bagus7'}
];

function validateInput(masukan){ //a function to validate the input
    const skema = Joi.object({ //validation schema
        nama: Joi.string().min(3).required()
     });
    return skema.validate(masukan);
}

router.get('/', (request, response) => { //to fetch all data
    response.send(manga);
});

router.post('/', (request, response) => { //insert data
    const { error } = validateInput(request.body); //using object destructing
    if(error) return status(400).send(error.details[0].message);

    const postingManga = {
        id : manga.length+1,
        nama : request.body.nama
    };

    manga.push(postingManga);
    response.send(manga);
});

router.put('/:id', (request, response) => { //edit data
    const mangaSearch = manga.find(c => c.id === parseInt(request.params.id));
    if (!mangaSearch) return response.status(404).send('Manga not found');
  
    const { error } = validateInput(request.body); 
    if (error) return response.status(400).send(error.details[0].message);//inpout validation based on validateInput function
    
    mangaSearch.nama = request.body.nama;//update process 
    response.send(manga); //show all data
  });

  router.delete('/:id', (request, response) => { //delete data
    const mangaSearch = manga.find(c => c.id === parseInt(request.params.id));
    if (!mangaSearch) return response.status(404).send('Manga not found');
  
    const index = manga.indexOf(mangaSearch); //search an array index based on id that founded and stored in the mangaSearch variable
    manga.splice(index, 1); //array splice is a method to remove array items https://www.w3schools.com/jsref/jsref_splice.asp
  
    response.send(manga);
  });

router.get('/:id', (request, response) => { //get particular data based on id parameter
    const mangaSearch = manga.find(c => c.id === parseInt(request.params.id));
    if (!mangaSearch) return response.status(404).send('Manga not found');
    response.send(mangaSearch);
});

module.exports = router;