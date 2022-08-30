import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Message, Position} from '../interfaces'
import {Observable} from 'rxjs'

@Injectable()
export class PositionsService {
  constructor(private http: HttpClient) {}

  fetch(categoryId: string): Observable<Position[]> { //get all positions of category
    return this.http.get<Position[]>(`/api/positions/${categoryId}`)
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/positions', position)
  }

  delete(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/positions/${position._id}`)
  }

  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/positions/${position._id}`, {
      name: position.name,
      cost: position.cost
    })
  }
}
