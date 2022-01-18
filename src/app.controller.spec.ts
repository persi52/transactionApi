import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { request } from 'http';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';

describe('AppController', () => {

  let transactionController: TransactionController;
  let transactionService: TransactionService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: TransactionService,
      useFactory: () => ({
        getTransactions: jest.fn(() => [])     
      })
    }
  
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [TransactionService],
    }).compile();

    transactionController = app.get<TransactionController>(TransactionController);
    transactionService = app.get<TransactionService>(TransactionService);
  });

  describe('get Transactions', () => {
    it('should return transaction array', () => {
       expect(transactionController.getTransactions()).toBe(Array);
    });     
    
   
  });
  describe('create Transaction', () => {
    it('should return the 0.5 amount commission', async () => {

      const result = {
        amount : 0.5,
        currency : "EUR"
      };
     // const result = ['test'];
      jest.spyOn(transactionService, 'createTransaction').mockImplementation(async () => result);

      expect(await transactionController.createTransaction({
        date : new Date("2022-05-07"),
        amount : 1000,
        currency : "EUR",
        client_id : 42
      })).toBe(result);
    });

    it('should throw not found exception with wrong currency', async () => {   

      expect(await transactionController.createTransaction({
        date : new Date("2022-05-07"),
        amount : 1000,
        currency : "sss",
        client_id : 42
      })).toThrow(NotFoundException);
    });

    it('should throw bad request exception with negative amount', async () => {   

      expect(await transactionController.createTransaction({
        date : new Date("2022-05-07"),
        amount : -55,
        currency : "sss",
        client_id : 42
      })).toThrow(BadRequestException);
    });

    it('should throw bad request exception with negative client_id', async () => {   

      expect(await transactionController.createTransaction({
        date : new Date("2022-05-07"),
        amount : 233,
        currency : "USD",
        client_id : -42
      })).toThrow(BadRequestException);
    });
});
 
})

  
