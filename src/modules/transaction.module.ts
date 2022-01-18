import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "src/controllers/transaction.controller";
import { Transaction } from "src/models/transaction.model";
import { TransactionService } from "src/services/transaction.service";


@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    controllers : [TransactionController],
    providers : [TransactionService]
})
export class TransactionModule {}