import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTransactionDto } from 'src/dto/createTransaction.dto';
import { GetCommisionDto } from 'src/dto/getCommision.dto';
import { Transaction } from 'src/models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getTransactions(): Promise<Transaction[]> {
    return this.transactionService.getTransactions();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createTransaction(@Body() body : CreateTransactionDto) : Promise<GetCommisionDto>{

    return this.transactionService.createTransaction(body);
  }
}
