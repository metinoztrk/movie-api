const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../app');

chai.use(chaiHttp);

let token,movieId;

describe('/api/movies tests',()=>{
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({username:'metin123',password:'123456'})
            .end((err,res)=>{
                token=res.body.token;
                done();
            });
    })
    describe('/GET movie',()=>{
        it('it should all the movie',(done)=>{
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    describe('/POST movie',() =>{
        it('it should post movie',(done) =>{
            const movie = {
                title:'Udemy',
                director_id:'5b22b22760fbc429002368f5',
                category:'Komedi',
                country:'Türkiye',
                year:1960,
                imdb_score:5
            };
            chai.request(server)
            .post('/api/movies')
            .send(movie)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('director_id');
                res.body.should.have.property('title');   
                res.body.should.have.property('category');
                res.body.should.have.property('country');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                movieId=res.body._id;
                done();
            });
        });
    });

    describe('/GET/:movie_id movie',()=>{
        it('it should GET a movie by the given id',(done)=>{
            chai.request(server)
                .get('/api/movies/'+ movieId)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('title');   
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });

    describe('/PUT/:movie_id movie',() =>{
        it('it should UPDATE a movie given by id',(done) =>{
            const movies = {
                title:'Update',
                director_id:'5b24ea4482878306601c3a37',
                category:'Bilişim',
                country:'Amerika',
                year:1975,
                imdb_score:7
            };
            chai.request(server)
            .put('/api/movies/' + movieId)
            .send(movies)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(movies.title); 
                res.body.should.have.property('director_id').eql(movies.director_id);    
                res.body.should.have.property('category').eql(movies.category);
                res.body.should.have.property('country').eql(movies.country);
                res.body.should.have.property('year').eql(movies.year);
                res.body.should.have.property('imdb_score').eql(movies.imdb_score);
                done();
            });
        });
    });

    describe('/DELETE/:movie_id movie',() =>{
        it('it should DELETE a movie given by id',(done) =>{
            chai.request(server)
            .delete('/api/movies/'+movieId)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1); 
                done();
            });
        });
    });
});