import {HttpHeaders} from '@angular/common/http';

export const environment = {
  API_BASE_URL: "http://127.0.0.1:8000/ws/",
  HTTP_OPTIONS: {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  },
  production: false
};
