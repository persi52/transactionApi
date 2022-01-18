import { IsDateString, IsPositive, Length, Min } from "class-validator";

export class CreateTransactionDto{
        
        @IsDateString()
        date : Date;

        @IsPositive()
        amount : number;

        @Length(3)
        currency : string;

        @IsPositive()
        client_id : number;
    
}
   