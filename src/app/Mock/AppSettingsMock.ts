import { AppModes } from 'src/app/model/AppSettings';
import { Observable } from 'rxjs';
export class AppSettingsMock{
    getMode():Observable<AppModes|null> {
        return new Observable(subject => {
            subject.next(AppModes.DEMO)
        })
    }
}