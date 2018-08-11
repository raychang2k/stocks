import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const stocks: Array<string> = ['AAPL', 'GOO', 'FB', 'AMZN', 'TWTR'];
const service = 'https://angular2-in-action.api.herokuapp.com';

export interface StockInterface {
  symobl: string;
  lastTradePriceOny: number;
  change: number;
  changeInPercent: number;
}

@Injectable({
  providedIn: 'root'
})

export class StocksService {

  constructor(private http: HttpClient) { }

  get() {
    return stocks.slice();
  }

  add(stock) {
    stocks.push(stock);
    return this.get();
  }

  remove(stock) {
    stocks.splice(stocks.indexOf(stock), 1);
    return this.get();
  }

  load(symobls) {
    if (symobls) {
      return this.http.get<Array<StockInterface>>(service + '/stocks/snapshot?symobls=' + symobls.join());
    }
  }
}
