import { Get, Injectable, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyCalculator } from 'src/calculators/currencyCalculator';
import { CreateTransactionDto } from 'src/dto/createTransaction.dto';
import { GetCommisionDto } from 'src/dto/getCommision.dto';
import { Transaction } from 'src/models/transaction.model';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {

  private readonly currencyCalculator = new CurrencyCalculator();
  
  constructor(   
    @InjectRepository(Transaction)  
    private readonly transactionsRepository: Repository<Transaction>      
){}
  
  async getTransactions(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }
   
  async createTransaction(body : CreateTransactionDto) : Promise<GetCommisionDto>{
    let newTransaction = new Transaction()
    let currencyRatio : number;    
     
    currencyRatio = await body.currency!="EUR" ? 
    await this.currencyCalculator.calculateCurrency(body.currency.toString()) : 1
    
    newTransaction = await {
      id : new Date().getTime(),
      date : new Date(body.date),
      amount : currencyRatio * body.amount,
      currency : "EUR",
      client_id : body.client_id
    }    
    console.log(newTransaction)
    await this.transactionsRepository.save(newTransaction);  

    return {
      amount :  await this.calculateCommision(newTransaction.amount,newTransaction.client_id),
      currency : "EUR"
    }
  }

  async getClientMonthlyAmount(client_id : number) : Promise<number>{
    const currentDate = new Date()
    let finalAmount;
    await this.transactionsRepository.query('SELECT SUM(amount) as amount ' + 
    'FROM transactions ' + 
    'WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2 ' +
    'AND client_id = $3',
    [currentDate.getMonth()+1,currentDate.getFullYear(),client_id])
    .then(results => {       
       finalAmount = results[0].amount;
    }) 
   
    return finalAmount;
  }

  async calculateCommision(amount : number, client_id : number) : Promise<number>{

      let commision;
      if(await this.getClientMonthlyAmount(client_id) > 1000) return 0.03;
      else if (client_id == 42) return 0.05;
      else commision = amount*0.05 > 0.05 ? amount*0.05 : 0.05

      return Math.round((commision + Number.EPSILON) * 100) / 100
  }

}
