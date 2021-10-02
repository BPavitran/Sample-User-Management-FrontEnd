import { environment } from "../../environments/environment";
import { Location } from "@angular/common";

export class Util {
    public static apiUrl(path) {
      const url1 = Location.joinWithSlash(environment.api_url, "api");
      return Location.joinWithSlash(url1, path);
  }
}
