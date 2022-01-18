import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransactionService } from 'src/services/transaction.service';
import { TransactionModule } from 'src/modules/transaction.module';
import { Repository } from 'typeorm';
import { Transaction } from 'src/models/transaction.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let transactionService = { createTransaction: () => ['test'] };
  let repository: Repository<Transaction>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TransactionModule,
        // Use the e2e_test database to run the tests
        ConfigModule.forRoot({isGlobal : true}),
        TypeOrmModule.forRoot({
        type: 'postgres',    
        host: process.env.POSTGRES_HOST,
        port: parseInt(<string>process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        autoLoadEntities: true,
        synchronize : true 
       })
      ],
    }).compile();

   
    app = moduleFixture.createNestApplication();
    await app.init();
    repository = app.get('TransactionRepository');

  }); 

  describe('GET /', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    }); 

 

  it('/ (GET)', async () => {
    
    return await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(Array);
  });
  });
})