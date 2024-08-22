const router = require('express').Router();
const Book = require('../../models/Book');

// TODO: Add a comment describing the purpose of this route
// this route is getting all the books and returning them as json
router.get('/', (req, res) => {
  // TODO: Add a comment describing the functionality of this method
  // The functionality of this method is to find all the books in the database and return them as json. 
  Book.findAll().then((bookData) => {
    res.json(bookData);
  });
});

// TODO: Add a comment describing the purpose of this route
// This route is getting all the books that are paperbacks and returning them as json
router.get('/paperbacks', (req, res) => {
  Book.findAll({
    // TODO: Add a comment describing the functionality of this property
    // This property is ordering the books by title
    order: ['title'],
    // TODO: Add a comment describing the functionality of this property
    // This property is filtering the books that are paperbacks
    where: {
      is_paperback: true
    },
    attributes: {
      // TODO: Add a comment describing the functionality of this property
      // This property is excluding the is_paperback and edition columns
      exclude: ['is_paperback', 'edition']
    }
  }).then((bookData) => {
    res.json(bookData);
  });
});

// TODO: Add a comment describing the purpose of this route
// The purpose of this route is to get a specific book by its id and return it as json. 
// This route is getting a specific book by its id and returning it as json
router.get('/:id', (req, res) => {
  // TODO: Add a comment describing the functionality of this method
  // The functionality of this method is to find a specific book by its id and return it as json.
  Book.findByPk(req.params.id).then((bookData) => {
    res.json(bookData);
  });
});

// CREATE a book
router.post('/', (req, res) => {
  Book.create(req.body)
    .then((newBook) => {
      res.json(newBook);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple books
router.post('/seed', (req, res) => {
  Book.bulkCreate([
    {
      title: 'Make It Stick: The Science of Successful Learning',
      author: 'Peter Brown',
      isbn: '978-0674729018',
      pages: 336,
      edition: 1,
      is_paperback: false
    },
    {
      title: 'Essential Scrum: A Practical Guide to the Most Popular Agile Process',
      author: 'Kenneth Rubin',
      isbn: '978-0137043293',
      pages: 500,
      edition: 1,
      is_paperback: true
    },
    {
      title: "White Fragility: Why It's So Hard for White People to Talk About Racism",
      author: 'Robin DiAngelo',
      isbn: '978-0807047415',
      pages: 192,
      edition: 2,
      is_paperback: true
    },
    {
      title: 'The Pragmatic Programmer: Your Journey To Mastery',
      author: 'David Thomas',
      isbn: '978-0135957059',
      pages: 352,
      edition: 2,
      is_paperback: false
    },
    {
      title: 'The Art of Computer Programming, Vol. 1: Fundamental Algorithms',
      author: 'Donald Knuth',
      isbn: '978-0201896831',
      pages: 672,
      edition: 3,
      is_paperback: false
    },
    {
      title: 'Algorithms of Oppression: How Search Engines Reinforce Racism',
      author: 'Safiya Umoja Noble',
      isbn: '978-1479837243',
      pages: 256,
      edition: 1,
      is_paperback: true
    }
  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
