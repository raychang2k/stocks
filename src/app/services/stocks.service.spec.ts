import { MockStocksResponse, MockSymbolsList } from './stocks.mock';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StocksService } from './stocks.service';

describe('StocksService', () => {
  const baseUrl = 'https://angular2-in-action-api.herokuapp.com';
  let service: StocksService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StocksService],
    });
    service = TestBed.get(StocksService);
    http = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should manage a list of stocks', () => {
    expect(service.get()).toEqual(MockSymbolsList);
    service.add('TEST');
    expect(service.get()).toEqual([...MockSymbolsList, 'TEST']);
    service.remove('TEST');
    expect(service.get()).toEqual(MockSymbolsList);
  });

  it('should load the stock data from API', (done) => {
    service.load(MockSymbolsList).subscribe(result => {
      expect(result).toEqual(MockStocksResponse);
      done();
    });

    const request = http.expectOne(baseUrl + '/stocks/snapshot?symbols=' + MockSymbolsList.join(','));
    request.flush(MockStocksResponse);
  });
});
