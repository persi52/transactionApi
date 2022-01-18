import { BadRequestException, NotFoundException } from '@nestjs/common';
import fetch from 'cross-fetch'
export class CurrencyCalculator{
    
    private currencyUrl = "https://api.exchangerate.host/2021-01-01"

    async calculateCurrency(currency : string) : Promise<number>{
                   
        await fetch(this.currencyUrl)
        .then(response => response.json()).then(async response => {  
            if(response.success)
                if(response.rates[currency]) {
                    console.log(response.rates[currency])
                    return await response.rates[currency] 
                }
                else throw new NotFoundException({
                    status : 404,
                    message: "Currency not found"            
                })
            else throw new BadRequestException({
                message : "something went wrong"
            })
        })

       return 1;
    }
}