import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];
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

  load(symbols) {
    if (symbols) {
      const url: string = service + '/stocks/snapshot';
      let params: HttpParams = new HttpParams()
        .set('symbols', symbols.join());

      console.log(params.toString());
      return this.http.get<Array<StockInterface>>(url, {params});
    }
  }
}
