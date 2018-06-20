const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const server=require('../app');

chai.use(chaiHttp);

let token,directorId;

describe('api/directory tests',()=>{
    before((done)=>{
        chai.request(server)
        .post('/authenticate')
        .send({username:'metin123',password:'123456'})
        .end((err,res)=>{
            token=res.body.token;
            done();
        })
    });

    describe('/GET directors',()=>{
        it('it should all the directors',(done)=>{
            chai.request(server)
            .get('/api/directors')
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    describe('/POST director',()=>{
        it('it should post director',(done)=>{
            const director={
                name:'metin',
                surname:'ozturk',
                bio:'uzun hikaye'
            };

            chai.request(server)
            .post('/api/directors')
            .send(director)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.status(200);
                res.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('surname');
                res.body.should.have.property('bio');
                directorId=res.body._id;
                done();
            });
        });
    });
    describe('/GET/:directorId director',()=>{
        it('it should GET a director by the given id',(done)=>{
            chai.request(server)
            .get('/api/directors/'+directorId)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.status(200);
                res.body.should.be.a('array'); 
                done();
            });
        });
    });
    describe('/PUT/:directorId director',()=>{
        it('it should UPDATE a director given by id',(done)=>{
            const director={
                name:'mehmet',
                surname:'kara',
                bio:'ne yapcan bea'
            };

            chai.request(server)
            .put('/api/directors/'+directorId)
            .send(director)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.status(200);
                res.should.be.a('object');
                res.body.should.have.property('name').eql(director.name);
                res.body.should.have.property('surname').eql(director.surname);
                res.body.should.have.property('bio').eql(director.bio);
                done();
            });
        });
    });

    describe('/DELETE/:directorId director',()=>{
        it('it should DELETE a movie given by id',(done)=>{
            chai.request(server)
            .delete('/api/directors/'+directorId)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.status(200);
                res.should.have.be.a('object');
                res.body.should.have.property('status').eql(1); 
                done();
            });
        }); 
    });
});